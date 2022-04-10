import Router from 'express'
import authController from '../controllers/authController.js'
import checkAuth from '../middlewares/checkAuth.js'
const router = new Router()

router.post('/registration', authController.create)
router.post('/login', authController.login)
router.put('/changePassword', checkAuth, authController.changePassword)
router.get('/', checkAuth, authController.check)

export default router



