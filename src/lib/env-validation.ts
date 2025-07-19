// Validação de variáveis de ambiente
// Garante que todas as variáveis necessárias estão configuradas

interface RequiredEnvVars {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_SECURE: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  EMAIL_FROM: string;
  EMAIL_FROM_NAME: string;
  EMAIL_TO: string;
}

export function validateEnvironmentVariables(): RequiredEnvVars {
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT', 
    'SMTP_SECURE',
    'SMTP_USER',
    'SMTP_PASS',
    'EMAIL_FROM',
    'EMAIL_FROM_NAME',
    'EMAIL_TO'
  ];

  const missingVars: string[] = [];
  const envVars: Partial<RequiredEnvVars> = {};

  // Verificar cada variável
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      missingVars.push(varName);
    } else {
      envVars[varName as keyof RequiredEnvVars] = value;
    }
  }

  // Se houver variáveis faltando, logar erro detalhado
  if (missingVars.length > 0) {
    console.error('❌ Variáveis de ambiente faltando:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    
    console.error('\n📋 Para configurar no Vercel:');
    missingVars.forEach(varName => {
      console.error(`   vercel env add ${varName}`);
    });
    
    console.error('\n📋 Para configurar localmente (.env.local):');
    missingVars.forEach(varName => {
      console.error(`   ${varName}=seu_valor_aqui`);
    });
    
    throw new Error(`Variáveis de ambiente faltando: ${missingVars.join(', ')}`);
  }

  return envVars as RequiredEnvVars;
}

// Função para mascarar valores sensíveis nos logs
export function logEnvironmentStatus() {
  const env = process.env.NODE_ENV || 'development';
  
  console.log(`🌍 Ambiente: ${env}`);
  console.log('📧 Configurações de e-mail:');
  console.log(`   Host: ${process.env.SMTP_HOST || '❌ não configurado'}`);
  console.log(`   Porta: ${process.env.SMTP_PORT || '❌ não configurado'}`);
  console.log(`   Usuário: ${process.env.SMTP_USER || '❌ não configurado'}`);
  console.log(`   Senha: ${process.env.SMTP_PASS ? '✅ configurada' : '❌ não configurada'}`);
  console.log(`   De: ${process.env.EMAIL_FROM || '❌ não configurado'}`);
  console.log(`   Para: ${process.env.EMAIL_TO || '❌ não configurado'}`);
}
