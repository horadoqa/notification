const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../../data/usuarios.json');
const NOTIFICATIONS_FILE = path.join(__dirname, '../../data/notificacoes_enviadas.json');

async function saveUsers(users) {
  await fs.writeFile(
    USERS_FILE,
    JSON.stringify(users, null, 2),
    'utf-8'
  );
}

async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  saveUsers,
  readUsers: () => readJson(USERS_FILE),
  readNotifications: () => readJson(NOTIFICATIONS_FILE),
  saveNotifications: (data) => writeJson(NOTIFICATIONS_FILE, data),
};
