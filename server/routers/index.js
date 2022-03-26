import Router from 'express'
import authRouter from './authRouter.js'
import productsRouter from './productsRouter.js'
import userRouter from './userRouter.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/products', productsRouter)

export default router