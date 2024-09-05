const express = require('express');
const router = express.Router();
const { runPythonScript } = require('../controllers/pythonController'); // 컨트롤러 임포트

router.post('/run-python', runPythonScript);  // POST 요청으로 변경

module.exports = router;