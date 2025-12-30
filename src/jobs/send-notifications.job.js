const { sendNotifications } = require('../services/notificationService');

(async () => {
  try {
    const result = await sendNotifications();
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
    process.exit(1);
  }
})();
