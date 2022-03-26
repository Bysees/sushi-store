import { Router } from 'express'
import productsController from '../controllers/productsController.js'
import imgMiddleware from '../middlewares/imgMiddleware.js'
import productsMiddleware from '../middlewares/productsMiddleware.js'
const router = Router()

router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)

router.post('/',
  productsMiddleware.typeCheck,
  imgMiddleware('picture'),
  productsController.create)

router.put('/',
  productsMiddleware.typeCheck,
  imgMiddleware('picture'),
  productsController.edit)

router.delete('/:id',
  productsMiddleware.typeCheck,
  productsController.remove)

export default router