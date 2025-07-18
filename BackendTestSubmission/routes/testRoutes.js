const express = require('express');
const { testAPI, logTest } = require('../controllers/testController');

const router = express.Router();

router.get('/test', testAPI);
router.post('/log-test', logTest);

module.exports = router;
