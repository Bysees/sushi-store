import Router from 'express'
import { roles } from '../consts/roles.js'
import categoryController from '../controllers/categoryController.js'
import checkAuth from '../middlewares/checkAuth.js'
import checkRole from '../middlewares/checkRole.js'

const router = new Router()

router.get('/',
  categoryController.get,
)

router.post('/',
  checkAuth,
  checkRole(roles.admin),
  categoryController.create,
)

router.put('/:type',
  checkAuth,
  checkRole(roles.admin),
  categoryController.edit,
)

router.delete('/:type',
  checkAuth,
  checkRole(roles.admin),
  categoryController.remove,
)

export default router