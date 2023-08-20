const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();
const auth = require('../middleware/auth');

router.post('/register', authController.singup);
router.post('/login', authController.login);
router.get('/user', auth, authController.getUser);

module.exports = router;