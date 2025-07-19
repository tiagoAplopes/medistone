# 🔧 Configuração SMTP Zoho Mail - Guia Completo

## ⚠️ IMPORTANTE: Erro de Autenticação Detectado

O erro `535 Authentication Failed` indica que você precisa configurar uma **Senha de Aplicativo** no Zoho Mail, não a senha normal da conta.

## 📋 Passo a Passo para Configurar

### 1. Acessar Configurações do Zoho Mail

1. Acesse [https://mail.zoho.com](https://mail.zoho.com)
2. Faça login com `contact@travertino.com`
3. Clique no ícone de **Configurações** (engrenagem) no canto superior direito
4. Selecione **"Configurações de Conta"** ou **"Account Settings"**

### 2. Habilitar Autenticação de Dois Fatores (se não estiver habilitada)

1. Vá para **"Segurança"** ou **"Security"**
2. Encontre **"Autenticação de Dois Fatores"** ou **"Two-Factor Authentication"**
3. Habilite se não estiver ativo
4. Configure com seu telefone ou app autenticador

### 3. Gerar Senha de Aplicativo

1. Ainda na seção **"Segurança"**, procure por:
   - **"Senhas de Aplicativo"** ou
   - **"App Passwords"** ou
   - **"Application-Specific Passwords"**

2. Clique em **"Gerar Nova Senha"** ou **"Generate New Password"**

3. Dê um nome para a senha (ex: "SMTP Medistone Website")

4. **COPIE A SENHA GERADA** - ela será mostrada apenas uma vez!

### 4. Atualizar .env.local

Substitua a senha no arquivo `.env.local`:

```env
# ANTES (não funciona)
SMTP_PASS=sua_senha_normal_aqui

# DEPOIS (funciona)
SMTP_PASS=sua_senha_de_aplicativo_aqui
```

## 🔄 Configurações Alternativas

Se ainda não funcionar, tente estas configurações:

### Opção 1: Porta 465 (SSL)
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@travertino.com
SMTP_PASS=sua_senha_de_aplicativo_aqui
```

### Opção 2: Porta 587 (TLS)
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@travertino.com
SMTP_PASS=sua_senha_de_aplicativo_aqui
```

### Opção 3: Configuração Alternativa Zoho
```env
SMTP_HOST=smtppro.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@travertino.com
SMTP_PASS=sua_senha_de_aplicativo_aqui
```

## 🧪 Testar Configuração

Após configurar a senha de aplicativo:

1. **Reinicie o servidor de desenvolvimento:**
   ```bash
   # Pare o servidor (Ctrl+C)
   npm run dev
   ```

2. **Teste a API diretamente:**
   ```bash
   curl -X POST http://localhost:3000/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Teste",
       "lastName": "Sistema",
       "email": "seu-email@exemplo.com",
       "message": "Teste de configuração SMTP"
     }'
   ```

3. **Teste pelo formulário:**
   - Acesse `http://localhost:3000/contacts`
   - Preencha e envie o formulário

## 🔍 Verificar Logs

Monitore os logs do servidor para ver detalhes:

```bash
# No terminal onde o servidor está rodando, você verá:
# ✅ Sucesso: "E-mail enviado com sucesso: <message-id>"
# ❌ Erro: Detalhes do erro de conexão/autenticação
```

## 📞 Problemas Comuns

### "Invalid login: 535 Authentication Failed"
- ✅ **Solução**: Use senha de aplicativo, não senha normal
- ✅ **Verificar**: 2FA está habilitado no Zoho

### "Connection timeout"
- ✅ **Solução**: Tente porta 465 em vez de 587
- ✅ **Verificar**: Firewall/antivírus não está bloqueando

### "Certificate error"
- ✅ **Solução**: Configuração TLS está correta no código
- ✅ **Verificar**: Use `SMTP_SECURE=true` para porta 465

## 📧 Configurações Zoho por Região

### Zoho.com (Global)
```env
SMTP_HOST=smtp.zoho.com
```

### Zoho.eu (Europa)
```env
SMTP_HOST=smtp.zoho.eu
```

### Zoho.in (Índia)
```env
SMTP_HOST=smtp.zoho.in
```

## ✅ Checklist Final

- [ ] Conta Zoho Mail ativa
- [ ] 2FA habilitado
- [ ] Senha de aplicativo gerada
- [ ] `.env.local` atualizado com senha de aplicativo
- [ ] Servidor reiniciado
- [ ] Teste realizado

## 🆘 Se Ainda Não Funcionar

1. **Verifique se o domínio está verificado no Zoho**
2. **Confirme se a conta não está suspensa**
3. **Tente criar uma nova senha de aplicativo**
4. **Contate o suporte do Zoho se necessário**

---

**💡 Dica**: Mantenha a senha de aplicativo segura e nunca a compartilhe. Ela tem os mesmos privilégios da sua senha principal!
