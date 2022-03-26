import { unlinkSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { randomBytes } from 'crypto'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class ProductsController {
  async getAll(req, res, next) {
    try {
      const { productType } = req.query

      if (!productType) {
        return res.status(200).send(getAllProducts())
      }

      res.status(200).send(getProductsByType(productType))

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

      if (req.file) {

        //! Удаление картинки
        try {
          const products = getProductsByType(productType)
          const imgName = products.find(product => product.id === editedProduct.id).img.split('/')[2]
          unlinkSync(resolve(__dirname, '..', 'static', productType, imgName))
        } catch {
          console.log('Image already not exist')
        }
        //! -----------------

        const picture = req.file
        editedProduct = {
          ...editedProduct,
          img: `/picture/${picture.filename}`
        }
      }

      const editedProducts = getProductsByType(productType).map((product) => {
        if (product.id === editedProduct.id) {
          return editedProduct
        }
        return product
      })

      writeProductsByType(productType, editedProducts)

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

      if (!req.file) {
        newProduct.img = `/picture/no-image.jpg`
      }

      if (req.file) {
        const picture = req.file
        newProduct.img = `/picture/${picture.filename}`
      }
      const editedProducts = [...getProductsByType(productType), newProduct]


      writeProductsByType(productType, editedProducts)

      res.status(201).send({ message: `Product has been created`, newProduct })
    } catch (err) {
      res.status(500).send({ message: `something went wrong` })
    }
  }

  async remove(req, res, next) {
    try {
      const { productType } = req.query
      const { id } = req.params

      const products = getProductsByType(productType)
      const editedProducts = products.filter(product => product.id !== id)

      //! Удаление картинки
      try {
        const imgName = products.find(product => product.id === id).img.split('/')[2]
        unlinkSync(resolve(__dirname, '..', 'static', productType, imgName))
      } catch {
        console.log('Image already not exist')
      }
      //! -----------------

      writeProductsByType(productType, editedProducts)

      res.send({ message: `Product has been removed` })
    } catch {
      res.status(500).send({ message: `something went wrong` })
    }
  }
}

export default new ProductsController()

function getAllProducts() {
  let products = []
  const fileNames = readdirSync(resolve(__dirname, '..', 'data', 'products'))
  fileNames.forEach(filename => {
    const items = readFileSync(resolve(__dirname, '..', 'data', 'products', filename), { encoding: 'utf-8' })
    products = [...products, ...JSON.parse(items)]
  })
  return products
}

function getProductsByType(type) {
  const filePath = resolve(__dirname, '..', 'data', 'products', `${type}.json`)
  let products = readFileSync(filePath, { encoding: 'utf-8' })
  products = JSON.parse(products)
  return products
}

function writeProductsByType(type, products) {
  const filePath = resolve(__dirname, '..', 'data', 'products', `${type}.json`)
  writeFileSync(filePath, JSON.stringify(products, null, 2))
}

function generateNewId() {
  const id = randomBytes(4).toString('hex')
  const IdExistYet = getAllProducts().some(item => item.id === id)
  if (IdExistYet) {
    return generateNewId()
  }
  return id
}