const { syncUsers } = require('../services/serverestService');

(async () => {
  try {
    const result = await syncUsers();
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao sincronizar usuários:', error);
    process.exit(1);
  }
})();
