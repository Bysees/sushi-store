const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

class ProductsController {
  async getAll(req, res, next) {
    try {
      const { productType } = req.query
      const filePath = path.resolve(__dirname, '..', 'data', 'products', `${productType}.json`)

      let products = fs.readFileSync(filePath, { encoding: 'utf-8' })
      products = JSON.parse(products)

      res.status(200).send({ products })
    } catch {
      res.status(500).send({ message: 'something went wrong' })
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params

      const product = getAllProducts().find(product => product.id === id)

      if (!product) {
        return res.status(404).send({ message: `Product with id - ${req.productId} doesn't exist` })
      }

      res.status(200).send({ product })
    } catch {
      res.status(500).send({ message: `something went wrong` })
    }
  }

  async edit(req, res, next) {
    try {
      const { productType } = req.query
      let { product: editedProduct } = req.body
      editedProduct = JSON.parse(editedProduct)

      if (req.files) {
        const picture = req.files.picture
        picture.mv(`./static/${productType}/` + picture.name)
        editedProduct = {
          ...editedProduct,
          img: `/picture/${picture.name}`
        }
      }

      const filePath = path.resolve(__dirname, '..', 'data', 'products', `${productType}.json`)

      let products = fs.readFileSync(filePath, { encoding: 'utf-8' })
      products = JSON.parse(products)
      const editedProducts = products.map((product) => {
        if (product.id === editedProduct.id) {
          return editedProduct
        }
        return product
      })

      fs.writeFileSync(filePath, JSON.stringify(editedProducts, null, 2))

      res.status(200).send({ message: `Product has been edited`, editedProduct })
    } catch {
      res.status(500).send({ message: `something went wrong` })
    }
  }

  async create(req, res, next) {
    try {
      const { productType } = req.query
      let { product: newProduct } = req.body
      newProduct = JSON.parse(newProduct)
      newProduct.id = generateNewId()

      if (req.files) {
        const picture = req.files.picture
        picture.mv(`./static/${productType}/` + picture.name)
        newProduct.img = `/picture/${picture.name}`
      }

      if (!req.files) {
        newProduct.img = `/picture/no-image.jpg`
      }

      const filePath = path.resolve(__dirname, '..', 'data', 'products', `${productType}.json`)
      let products = fs.readFileSync(filePath, { encoding: 'utf-8' })
      products = JSON.parse(products)
      const editedProducts = [...products, newProduct]

      fs.writeFileSync(filePath, JSON.stringify(editedProducts, null, 2))

      res.status(201).send({ message: `Product has been created`, newProduct })
    } catch {
      res.status(500).send({ message: `something went wrong` })
    }
  }

  async remove(req, res, next) {
    try {
      const { productType } = req.query
      const { id } = req.params

      const filePath = path.resolve(__dirname, '..', 'data', 'products', `${productType}.json`)
      let products = fs.readFileSync(filePath, { encoding: 'utf-8' })
      products = JSON.parse(products)
      const editedProducts = products.filter(product => product.id !== id)

      fs.writeFileSync(filePath, JSON.stringify(editedProducts, null, 2))

      res.send({ message: `Product has been removed` })
    } catch {
      res.status(500).send({ message: `something went wrong` })
    }
  }
}

module.exports = new ProductsController()

function getAllProducts() {
  let products = []
  const fileNames = fs.readdirSync(path.resolve(__dirname, '..', 'data', 'products'))
  fileNames.forEach(filename => {
    const items = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products', filename), { encoding: 'utf-8' })
    products = [...products, ...JSON.parse(items)]
  })
  return products
}

function generateNewId() {
  const id = crypto.randomBytes(4).toString('hex')
  const IdExistYet = getAllProducts().some(item => item.id === id)
  if (IdExistYet) {
    return generateNewId()
  }
  return id
}