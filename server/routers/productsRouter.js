import { Router } from 'express'
import { roles } from '../consts/roles.js'
import productsController from '../controllers/productsController.js'
import authMiddeware from '../middlewares/authMiddleware.js'
import checkRole from '../middlewares/checkRole.js'
import imgMiddleware from '../middlewares/imgMiddleware.js'
import productsMiddleware from '../middlewares/productsMiddleware.js'
const router = Router()

router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)

router.post('/',
  authMiddeware,
  checkRole(roles.admin),
  productsMiddleware.typeCheck,
  imgMiddleware('picture'),
  productsController.create)

router.put('/',
  authMiddeware,
  checkRole(roles.admin),
  productsMiddleware.typeCheck,
  imgMiddleware('picture'),
  productsController.edit)

router.delete('/:id',
  authMiddeware,
  checkRole(roles.admin),
  productsMiddleware.typeCheck,
  productsController.remove)

export default router