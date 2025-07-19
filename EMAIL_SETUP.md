# Configuração do Sistema de E-mail - Medistone

## 📧 Configuração do Zoho Mail SMTP

### 1. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` na raiz do projeto e configure as seguintes variáveis:

```env
# Configurações SMTP do Zoho Mail
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@travertino.com
SMTP_PASS=sua_senha_do_zoho_aqui

# Configurações de e-mail
EMAIL_FROM=contact@travertino.com
EMAIL_FROM_NAME=Medistone Italy
EMAIL_TO=contact@travertino.com

# URL base da aplicação
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Configurar Senha de Aplicativo no Zoho

Para usar SMTP com autenticação de dois fatores:

1. Acesse [Zoho Mail](https://mail.zoho.com)
2. Vá em **Configurações** → **Segurança** → **Senhas de Aplicativo**
3. Gere uma nova senha de aplicativo para "SMTP"
4. Use essa senha no campo `SMTP_PASS` do `.env.local`

### 3. Configurações de Produção

Para ambientes de produção (Vercel, DigitalOcean, etc.):

#### Vercel
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_SECURE
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add EMAIL_FROM
vercel env add EMAIL_FROM_NAME
vercel env add EMAIL_TO
```

#### Outras Plataformas
Configure as mesmas variáveis de ambiente no painel de controle da sua plataforma.

## 🚀 Funcionalidades Implementadas

### ✅ API Route (`/api/send-email`)
- **Método POST**: Envia e-mails via SMTP
- **Método GET**: Verifica se a API está funcionando
- **Validação**: Sanitização e validação de dados
- **Segurança**: Não exposição de credenciais
- **Tratamento de Erros**: Logs detalhados e respostas seguras

### ✅ Formulário de Contato
- **Campos**: Nome, Sobrenome, E-mail, Telefone, Mensagem
- **Validação**: Campos obrigatórios e formato de e-mail
- **Feedback**: Mensagens de sucesso e erro
- **UX**: Loading state durante envio
- **Redirecionamento**: Para página de agradecimento

### ✅ Página de Agradecimento (`/thank-you`)
- **Confirmação**: Visual de sucesso
- **Redirecionamento**: Automático para home em 10s
- **Navegação**: Links para home e produtos
- **Informações**: Próximos passos do processo

## 🧪 Como Testar

### 1. Teste da API
```bash
# Verificar se a API está funcionando
curl -X GET http://localhost:3000/api/send-email

# Teste de envio (substitua os dados)
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "João",
    "lastName": "Silva",
    "email": "joao@exemplo.com",
    "phone": "+55 11 99999-9999",
    "message": "Teste de mensagem"
  }'
```

### 2. Teste do Formulário
1. Acesse `http://localhost:3000/contacts`
2. Preencha o formulário
3. Clique em "Submit"
4. Verifique as mensagens de feedback
5. Confirme o redirecionamento para `/thank-you`

### 3. Verificar E-mails
- Verifique a caixa de entrada de `contact@travertino.com`
- Confirme o formato HTML do e-mail
- Teste a funcionalidade "Reply-To"

## 🔧 Solução de Problemas

### Erro de Autenticação SMTP
- Verifique se a senha de aplicativo está correta
- Confirme se o 2FA está habilitado no Zoho
- Teste as credenciais em um cliente de e-mail

### Erro de Conexão
- Verifique se a porta 587 não está bloqueada
- Teste com porta 465 (SSL) alterando:
  ```env
  SMTP_PORT=465
  SMTP_SECURE=true
  ```

### Formulário Não Envia
- Verifique o console do navegador para erros
- Confirme se todas as variáveis de ambiente estão configuradas
- Teste a API diretamente com curl

## 📝 Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # API de envio de e-mail
│   ├── contacts/
│   │   └── page.tsx              # Formulário de contato
│   └── thank-you/
│       └── page.tsx              # Página de agradecimento
├── .env.local                    # Variáveis de ambiente (local)
├── .env.example                  # Exemplo de configuração
└── EMAIL_SETUP.md               # Este arquivo
```

## 🔒 Segurança

- ✅ Credenciais em variáveis de ambiente
- ✅ Validação e sanitização de dados
- ✅ Não exposição de erros internos
- ✅ Rate limiting implícito (Next.js)
- ✅ HTTPS em produção (recomendado)

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do servidor
2. Teste as configurações SMTP
3. Confirme as variáveis de ambiente
4. Verifique a conectividade de rede
