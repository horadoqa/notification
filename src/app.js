const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/notifications', notificationsRoutes);

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
