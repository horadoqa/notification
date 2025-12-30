const {
  readUsers,
  readNotifications,
  saveNotifications
} = require('../utils/file.util');

function getToday() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
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

    // Simula envio
    console.log(`
Caro ${user.nome}, obrigado por usar o serverest, esperamos que esteja ajudando no seu desenvolvimento.

Lembramos que os cadastros ficam registrados no nosso Banco de Dados por 24 horas.

Atenciosamente,
    `);

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
