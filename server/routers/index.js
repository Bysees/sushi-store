const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const productsRouter = require('./productsRouter')

router.use('/auth', authRouter)
router.use('/products', productsRouter)


module.exports = router