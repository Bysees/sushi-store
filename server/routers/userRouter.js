import Router from 'express'
import userController from '../controllers/userController.js'
import checkAuth from '../middlewares/checkAuth.js'
import imgHandler from '../middlewares/imgHandler.js'
const router = new Router()

router.put('/info',
  checkAuth,
  userController.editInfo)

router.put('/avatar',
  checkAuth,
  imgHandler('avatar', 'users'),
  userController.editImage)

export default router