const express = require('express');
const router = express.Router();
const { login, refreshToken, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/refresh', refreshToken);
router.put('/change-password', protect, changePassword);

module.exports = router;
