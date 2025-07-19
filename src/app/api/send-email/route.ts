import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateEnvironmentVariables } from '@/lib/env-validation';

// Interface para os dados do formulário
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

// Função para validar e sanitizar dados
function validateAndSanitizeData(data: any): ContactFormData | null {
  // Verificar se os campos obrigatórios estão presentes
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    return null;
  }

  // Sanitizar dados (remover caracteres perigosos)
  const sanitize = (str: string) => str.trim().replace(/[<>]/g, '');

  return {
    firstName: sanitize(data.firstName),
    lastName: sanitize(data.lastName),
    email: sanitize(data.email),
    phone: data.phone ? sanitize(data.phone) : '',
    message: sanitize(data.message)
  };
}

// Função para validar formato de e-mail
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Configurar transporter do nodemailer
function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT || '465');
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: secure, // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Para desenvolvimento
      ciphers: 'SSLv3'
    },
    debug: process.env.NODE_ENV === 'development', // Debug apenas em desenvolvimento
    logger: process.env.NODE_ENV === 'development' // Log apenas em desenvolvimento
  });
}

// Função para criar o HTML do e-mail
function createEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova mensagem de contato - Medistone Italy</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1E1E1E; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nova Mensagem de Contato</h1>
          <p>Medistone Italy</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${data.firstName} ${data.lastName}</div>
          </div>
          <div class="field">
            <div class="label">E-mail:</div>
            <div class="value">${data.email}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Telefone:</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Mensagem:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>Esta mensagem foi enviada através do formulário de contato do site Medistone Italy</p>
          <p>Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'Europe/Rome' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Parse dos dados do formulário
    const body = await request.json();
    
    // Validar e sanitizar dados
    const validatedData = validateAndSanitizeData(body);
    if (!validatedData) {
      return NextResponse.json(
        { error: 'Dados inválidos. Verifique se todos os campos obrigatórios foram preenchidos.' },
        { status: 400 }
      );
    }

    // Validar formato do e-mail
    if (!isValidEmail(validatedData.email)) {
      return NextResponse.json(
        { error: 'Formato de e-mail inválido.' },
        { status: 400 }
      );
    }

    // Validar variáveis de ambiente
    try {
      validateEnvironmentVariables();
    } catch (error) {
      console.error('Erro de configuração:', error);
      return NextResponse.json(
        { error: 'Erro de configuração do servidor. Tente novamente mais tarde.' },
        { status: 500 }
      );
    }

    // Criar transporter
    const transporter = createTransporter();

    // Verificar conexão SMTP
    await transporter.verify();

    // Configurar opções do e-mail
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: validatedData.email,
      subject: `Nova mensagem de contato - ${validatedData.firstName} ${validatedData.lastName}`,
      html: createEmailHTML(validatedData),
      text: `
        Nova mensagem de contato - Medistone Italy
        
        Nome: ${validatedData.firstName} ${validatedData.lastName}
        E-mail: ${validatedData.email}
        ${validatedData.phone ? `Telefone: ${validatedData.phone}` : ''}
        
        Mensagem:
        ${validatedData.message}
        
        ---
        Esta mensagem foi enviada através do formulário de contato do site.
        Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'Europe/Rome' })}
      `
    };

    // Enviar e-mail
    const info = await transporter.sendMail(mailOptions);
    
    console.log('E-mail enviado com sucesso:', info.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Erro ao enviar e-mail:', error);

    // Tratamento específico para diferentes tipos de erro
    let errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';

    if (error.code === 'EAUTH') {
      console.error('Erro de autenticação SMTP. Verifique as credenciais.');
      errorMessage = 'Erro de configuração do servidor de e-mail. Entre em contato com o administrador.';
    } else if (error.code === 'ECONNECTION') {
      console.error('Erro de conexão SMTP.');
      errorMessage = 'Erro de conexão com o servidor de e-mail. Tente novamente mais tarde.';
    } else if (error.code === 'ETIMEDOUT') {
      console.error('Timeout na conexão SMTP.');
      errorMessage = 'Timeout na conexão. Tente novamente mais tarde.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Método GET para verificar se a API está funcionando
export async function GET() {
  return NextResponse.json(
    { message: 'API de envio de e-mail está funcionando' },
    { status: 200 }
  );
}
