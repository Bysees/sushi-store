import Router from 'express'
import { roles } from '../consts/roles.js'
import productsController from '../controllers/productsController.js'
import checkAuth from '../middlewares/checkAuth.js'
import checkRole from '../middlewares/checkRole.js'
import imgHandler from '../middlewares/imgHandler.js'
import checkCategory from '../middlewares/checkCategory.js'

const router = new Router()

router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)

router.post('/',
  checkAuth,
  checkRole(roles.admin),
  checkCategory,
  imgHandler('picture'),
  productsController.create)

router.put('/',
  checkAuth,
  checkRole(roles.admin),
  checkCategory,
  imgHandler('picture'),
  productsController.edit)

router.delete('/:id',
  checkAuth,
  checkRole(roles.admin),
  checkCategory,
  productsController.remove)

export default router