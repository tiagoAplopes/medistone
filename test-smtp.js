// Script para testar configuração SMTP do Zoho
// Execute com: node test-smtp.js

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSMTPConnection() {
  console.log('🔧 Testando configuração SMTP do Zoho Mail...\n');
  
  // Mostrar configurações (sem mostrar a senha)
  console.log('📋 Configurações atuais:');
  console.log(`   Host: ${process.env.SMTP_HOST}`);
  console.log(`   Porta: ${process.env.SMTP_PORT}`);
  console.log(`   Secure: ${process.env.SMTP_SECURE}`);
  console.log(`   Usuário: ${process.env.SMTP_USER}`);
  console.log(`   Senha: ${process.env.SMTP_PASS ? '***configurada***' : '❌ NÃO CONFIGURADA'}\n`);
  
  // Verificar se todas as variáveis estão configuradas
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('❌ Erro: Variáveis de ambiente não configuradas!');
    console.log('   Verifique o arquivo .env.local\n');
    return;
  }
  
  // Criar transporter
  const port = parseInt(process.env.SMTP_PORT || '465');
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    debug: true,
    logger: true
  });
  
  try {
    console.log('🔍 Testando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP bem-sucedida!\n');
    
    console.log('📧 Enviando e-mail de teste...');
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: 'Teste de Configuração SMTP - Medistone',
      html: `
        <h2>✅ Teste de Configuração SMTP</h2>
        <p>Este e-mail confirma que a configuração SMTP está funcionando corretamente.</p>
        <hr>
        <p><strong>Configurações testadas:</strong></p>
        <ul>
          <li>Host: ${process.env.SMTP_HOST}</li>
          <li>Porta: ${port}</li>
          <li>Secure: ${secure}</li>
          <li>Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'Europe/Rome' })}</li>
        </ul>
        <p><em>Sistema de e-mail Medistone Italy funcionando!</em></p>
      `,
      text: `
        ✅ Teste de Configuração SMTP
        
        Este e-mail confirma que a configuração SMTP está funcionando corretamente.
        
        Configurações testadas:
        - Host: ${process.env.SMTP_HOST}
        - Porta: ${port}
        - Secure: ${secure}
        - Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'Europe/Rome' })}
        
        Sistema de e-mail Medistone Italy funcionando!
      `
    });
    
    console.log('✅ E-mail de teste enviado com sucesso!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Para: ${process.env.EMAIL_TO}\n`);
    
    console.log('🎉 Configuração SMTP está funcionando perfeitamente!');
    console.log('   Agora você pode usar o formulário de contato no site.\n');
    
  } catch (error) {
    console.log('❌ Erro na configuração SMTP:\n');
    
    if (error.code === 'EAUTH') {
      console.log('🔐 Erro de Autenticação (535 Authentication Failed)');
      console.log('   Possíveis soluções:');
      console.log('   1. Use uma SENHA DE APLICATIVO, não a senha normal');
      console.log('   2. Habilite 2FA no Zoho Mail');
      console.log('   3. Gere uma nova senha de aplicativo');
      console.log('   4. Verifique se o usuário está correto\n');
      console.log('📖 Consulte o arquivo ZOHO_SMTP_SETUP.md para instruções detalhadas\n');
      
    } else if (error.code === 'ECONNECTION') {
      console.log('🌐 Erro de Conexão');
      console.log('   Possíveis soluções:');
      console.log('   1. Verifique sua conexão com a internet');
      console.log('   2. Tente porta 587 em vez de 465 (ou vice-versa)');
      console.log('   3. Verifique se o firewall não está bloqueando\n');
      
    } else if (error.code === 'ETIMEDOUT') {
      console.log('⏰ Timeout de Conexão');
      console.log('   Possíveis soluções:');
      console.log('   1. Verifique sua conexão com a internet');
      console.log('   2. Tente uma configuração diferente de porta/secure\n');
      
    } else {
      console.log('❓ Erro desconhecido:');
      console.log(`   Código: ${error.code}`);
      console.log(`   Mensagem: ${error.message}\n`);
    }
    
    console.log('🔧 Configurações sugeridas para testar:');
    console.log('   Opção 1 (SSL):');
    console.log('   SMTP_PORT=465');
    console.log('   SMTP_SECURE=true\n');
    console.log('   Opção 2 (TLS):');
    console.log('   SMTP_PORT=587');
    console.log('   SMTP_SECURE=false\n');
  }
}

// Executar teste
testSMTPConnection().catch(console.error);
