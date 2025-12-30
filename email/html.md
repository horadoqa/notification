# Enviando e-mail com fotmato

## 1️⃣ Atualize o util de e-mail para aceitar HTML

Edite `utils/email.util.js`:

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail({ to, subject, html, text }) {
  await transporter.sendMail({
    from: `"Serverest" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text, // fallback (opcional, mas recomendado)
    html
  });
}

module.exports = { sendEmail };
```

📌 **Boa prática**: sempre enviar `text` junto com `html`, caso o cliente de e-mail não renderize HTML.

---

## 2️⃣ Crie o template HTML do e-mail

Você pode montar o HTML direto no código ou separar em um arquivo.
Aqui vai um **template simples, limpo e profissional**.

```js
function notificationTemplate(userName) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: auto;
      padding: 24px;
      border-radius: 6px;
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .content {
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Olá, ${userName} 👋</div>

    <div class="content">
      <p>
        Obrigado por utilizar o <strong>Serverest</strong>.
      </p>

      <p>
        Lembramos que os cadastros permanecem registrados em nosso Banco de Dados
        por <strong>24 horas</strong>.
      </p>

      <p>
        Esperamos que a plataforma esteja ajudando no seu desenvolvimento 🚀
      </p>
    </div>

    <div class="footer">
      <p>
        Atenciosamente,<br />
        <strong>Equipe Serverest</strong>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

module.exports = { notificationTemplate };
```

Salve como:
`utils/templates/notification.template.js`

---

## 3️⃣ Use o HTML no seu código de notificações

Agora altere seu `sendNotifications`:

```js
const {
  readUsers,
  readNotifications,
  saveNotifications
} = require('../utils/file.util');

const { sendEmail } = require('../utils/email.util');
const { notificationTemplate } = require('../utils/templates/notification.template');

function getToday() {
  return new Date().toISOString().split('T')[0];
}

async function sendNotifications() {
  const users = await readUsers();
  const sentNotifications = await readNotifications();
  const today = getToday();

  let enviados = 0;
  let ignorados = 0;

  for (const user of users) {
    const alreadySentToday = sentNotifications.some(
      n => n.email === user.email && n.data === today
    );

    if (alreadySentToday) {
      ignorados++;
      continue;
    }

    const html = notificationTemplate(user.nome);

    const text = `
Olá, ${user.nome}

Obrigado por usar o Serverest.

Lembramos que os cadastros ficam registrados por 24 horas.

Atenciosamente,
Equipe Serverest
    `;

    await sendEmail({
      to: user.email,
      subject: 'Notificação Serverest',
      html,
      text
    });

    sentNotifications.push({
      email: user.email,
      data: today
    });

    enviados++;
  }

  await saveNotifications(sentNotifications);

  return {
    message: 'Processo de notificação finalizado',
    enviados,
    ignorados
  };
}

module.exports = { sendNotifications };
```

---

## 4️⃣ Resultado final

📩 O usuário recebe um e-mail:

* Com layout profissional
* Responsivo
* Com fallback em texto
* Personalizado com o nome

---

## 5️⃣ Próximos upgrades (se quiser)

Posso te ajudar a:

* Criar **templates reutilizáveis**
* Usar **Handlebars/EJS**
* Adicionar **botão CTA**
* Incluir **logo**
* Internacionalizar o e-mail
* Integrar com **Mailtrap / SendGrid**

É só dizer 🚀
