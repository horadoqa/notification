const express = require('express');
const { syncUsers } = require('../services/serverestService');

const router = express.Router();

router.post('/sync', async (req, res) => {
  try {
    const result = await syncUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
