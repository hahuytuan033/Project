const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, UserController.getUserDetails);
router.put('/profile', authMiddleware, UserController.updateUserDetails);

module.exports = router;