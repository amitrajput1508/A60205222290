const Log = require('../logger/logger');

const testAPI = async (req, res) => {
  await Log('backend', 'info', 'handler', 'GET /api/test called');
  res.json({ message: 'API is working' });
};

const logTest = async (req, res) => {
  const { level, pkg, message } = req.body;

  try {
    await Log('backend', level, pkg, message);
    res.json({ status: 'success', message: 'Log sent!' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
};

module.exports = { testAPI, logTest };
