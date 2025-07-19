#!/bin/bash

# Script para configurar variáveis de ambiente em produção
# Execute: chmod +x deploy-env.sh && ./deploy-env.sh

echo "🚀 Configurando variáveis de ambiente para produção..."

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
fi

echo "🔐 Configurando variáveis de ambiente no Vercel..."

# Configurar cada variável
echo "Configurando SMTP_HOST..."
echo "smtp.zoho.com" | vercel env add SMTP_HOST production

echo "Configurando SMTP_PORT..."
echo "465" | vercel env add SMTP_PORT production

echo "Configurando SMTP_SECURE..."
echo "true" | vercel env add SMTP_SECURE production

echo "Configurando SMTP_USER..."
echo "contact@travertino.com" | vercel env add SMTP_USER production

echo "Configurando EMAIL_FROM..."
echo "contact@travertino.com" | vercel env add EMAIL_FROM production

echo "Configurando EMAIL_FROM_NAME..."
echo "Medistone Italy" | vercel env add EMAIL_FROM_NAME production

echo "Configurando EMAIL_TO..."
echo "contact@travertino.com" | vercel env add EMAIL_TO production

# Solicitar entrada manual para dados sensíveis
echo ""
echo "🔑 Agora você precisa configurar manualmente:"
echo "1. SMTP_PASS (senha de aplicativo do Zoho)"
echo "2. NEXT_PUBLIC_BASE_URL (URL do seu domínio)"
echo ""
echo "Execute os comandos abaixo:"
echo "vercel env add SMTP_PASS production"
echo "vercel env add NEXT_PUBLIC_BASE_URL production"
echo ""
echo "✅ Configuração básica concluída!"
echo "🚀 Execute 'vercel --prod' para fazer deploy"
