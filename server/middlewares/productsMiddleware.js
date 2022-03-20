const fsPromise = require('fs/promises')
const path = require('path')

class ProductsMiddleware {
  async typeCheck(req, res, next) {

    if (req.method === "OPTIONS") {
      return next()
    }
    const { productType } = req.query

    if (!productType) {
      return res.status(403).send({ message: 'You must provide type of product' })
    }

    const filePath = path.resolve(__dirname, '..', 'data', 'products', `${productType}.json`)
    try {

      await fsPromise.access(filePath)
      req.query = { productType }
      next()
    } catch (e) {
      res.status(404).json({ message: `Current type of product doesn't exist` })
    }
  }

  async imageCheck(req, res, next) {
    if (req.files) {

      if (req.files['picture'].mimetype === 'image/jpeg'
        || req.files['picture'].mimetype === 'image/png') {
        return next()
      } else {
        return res.status(403).json({ message: `Doesn't correct type, only "jpg" or "png"` })
      }
    }

    next()
  }
}

module.exports = new ProductsMiddleware()