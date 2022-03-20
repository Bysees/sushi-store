const express = require('express')
const productsController = require('../controllers/productsController')
const productsMiddleware = require('../middlewares/productsMiddleware')
const router = express.Router()

router.get('/', productsMiddleware.typeCheck, productsController.getAll)
router.get('/:id', productsController.getOne)
router.post('/', productsMiddleware.typeCheck, productsMiddleware.imageCheck, productsController.create)
router.put('/', productsMiddleware.typeCheck, productsMiddleware.imageCheck, productsController.edit)
router.delete('/:id', productsMiddleware.typeCheck, productsController.remove)

module.exports = router