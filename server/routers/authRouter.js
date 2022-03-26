import { Router } from 'express'
import authController from '../controllers/authController.js'
import authMiddeware from '../middlewares/authMiddleware.js'
const router = Router()

router.post('/registration', authController.create)
router.post('/login', authController.login)
router.put('/changePassword', authMiddeware, authController.changePassword)
router.get('/', authMiddeware, authController.check)

export default router



