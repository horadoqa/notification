const axios = require('axios');
const { saveUsers } = require('../utils/file.util');

const SERVERREST_URL = 'https://serverest.dev/usuarios';

async function syncUsers() {
  const response = await axios.get(SERVERREST_URL);

  const usuarios = response.data.usuarios.map(user => ({
    nome: user.nome,
    email: user.email
  }));

  // Remove duplicados usando email
  const uniqueUsers = Array.from(
    new Map(usuarios.map(u => [u.email, u])).values()
  );

  await saveUsers(uniqueUsers);

  return {
    message: 'Usuários sincronizados com sucesso',
    totalRecebidos: usuarios.length,
    totalSalvos: uniqueUsers.length
  };
}

module.exports = { syncUsers };
