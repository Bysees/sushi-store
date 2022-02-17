const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const authMiddeware = require('../middlewares/authMiddleware')

router.post('/registration', AuthController.create)
router.post('/login', AuthController.login)
router.get('/', authMiddeware, AuthController.check)


module.exports = router



