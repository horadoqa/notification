const express = require('express');
const { sendNotifications } = require('../services/notificationService');

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const result = await sendNotifications();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
