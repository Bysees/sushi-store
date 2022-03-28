import { access } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

class ProductsMiddleware {
  async typeCheck(req, res, next) {

    if (req.method === "OPTIONS") {
      return next()
    }
    const { productType } = req.query

    if (!productType) {
      return res.status(403).send({ message: 'Не указан тип продукта' })
    }

    const filePath = resolve(__dirname, '..', 'data', 'products', `${productType}.json`)
    try {
      await access(filePath)
      req.query = { productType }
      next()
    } catch (e) {
      res.status(404).json({ message: 'Указан несуществующий тип продукта' })
    }
  }
}

export default new ProductsMiddleware()