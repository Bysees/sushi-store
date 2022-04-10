import Router from 'express'
import authRouter from './authRouter.js'
import productsRouter from './productsRouter.js'
import userRouter from './userRouter.js'
import categoryRouter from './categoryRouter.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/products', productsRouter)
router.use('/category', categoryRouter)

export default router