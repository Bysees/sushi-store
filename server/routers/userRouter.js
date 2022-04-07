import Router from 'express'
import userController from '../controllers/userController.js'
import authMiddeware from '../middlewares/authMiddleware.js'
import imgMiddleware from '../middlewares/imgMiddleware.js'
const router = new Router()

router.put('/info',
  authMiddeware,
  userController.editInfo)

router.put('/avatar',
  authMiddeware,
  imgMiddleware('avatar', 'users'),
  userController.editImage)

export default router