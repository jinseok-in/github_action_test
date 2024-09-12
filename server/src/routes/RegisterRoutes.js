const express = require('express');
const { postUserRegister, postCheckEmail } = require('../controllers/RegisterController');
const router = express.Router();

router.post('/userdata', postUserRegister);
router.post('/useremail', postCheckEmail);

module.exports = router;