import { unlinkSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname, parse } from 'path'
import { randomBytes } from 'crypto'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class ProductsController {

  getAll(req, res) {
    try {
      const { productType, label = 'all' } = req.query

      if (!productType) {
        let products = getAllProducts()

        if (label === 'all') {
          return res.status(200).send(products)
        } else {
          products = products.filter(product => product.labels.includes(label))
          return res.status(200).send(allProductsByLabel)
        }
      }

      const productFiles = readdirSync(resolve(__dirname, '..', 'data', 'products'))
      const productFileNames = productFiles.map(filename => parse(filename).name)
      const isProductTypeCorrect = productFileNames.includes(productType)

      if (!isProductTypeCorrect) {
        return res.status(404).send({ message: `Тип товаров "${productType}" не существует` })
      }

      let products = getProductsByType(productType)

      if (label === 'all') {
        return res.status(200).send(products)
      } else {
        products = products.filter(product => product.labels.includes(label))
        return res.status(200).send(products)
      }

    } catch {
      res.status(500).send({ message: `Произошла непредвиденная ошибка` })
    }
  }

  getOne(req, res) {
    try {
      const { id } = req.params
      const allProducts = getAllProducts()
      const product = allProducts.find(product => product.id === id)

      if (!product) {
        return res.status(404).send({ message: `Продукт с id - ${req.productId} не существует` })
      }

      res.status(200).send(product)
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  create(req, res) {
    try {
      const { productType } = req.query
      let { product: newProduct } = req.body
      newProduct = JSON.parse(newProduct)
      newProduct.id = generateNewId()

      if (req.file) {
        const picture = req.file
        newProduct.img = `/picture/${picture.filename}`
      }

      const productsByType = getProductsByType(productType)
      const updatedProducts = [...productsByType, newProduct]
      writeProductsByType(productType, updatedProducts)

      res.status(201).send({ message: 'Продукт был успешно добавлен', newProduct })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  edit(req, res) {
    try {
      const { productType } = req.query
      let { product: editedProduct } = req.body
      editedProduct = JSON.parse(editedProduct)

      const productsByType = getProductsByType(productType)
      const product = productsByType.find(product => product.id === editedProduct.id)

      if (req.file) {
        const picture = req.file
        editedProduct.img = `/picture/${picture.filename}`
      }

      if (product.img !== editedProduct.img) {
        const imgName = product.img.split('/')[2]
        deleteCurrentPicture(productType, imgName)
      }

      const updatedProducts = productsByType.map((product) => {
        if (product.id === editedProduct.id) {
          return editedProduct
        }
        return product
      })

      writeProductsByType(productType, updatedProducts)

      res.status(200).send({ message: 'Продукт был успешно отредактирован', editedProduct })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  remove(req, res) {
    try {
      const { productType } = req.query
      const { id } = req.params

      const productsByType = getProductsByType(productType)
      const updatedProducts = productsByType.filter(product => product.id !== id)
      const product = productsByType.find(product => product.id === id)

      const imgName = product.img.split('/')[2]
      deleteCurrentPicture(productType, imgName)

      writeProductsByType(productType, updatedProducts)

      res.status(200).send({ message: 'Продукт был успешно удалён' })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
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

function deleteCurrentPicture(productType, fileName) {
  try {
    const filePathPictures = resolve(__dirname, '..', 'static', productType, fileName)
    unlinkSync(filePathPictures)
  } catch {
    console.log('Image already not exist')
  }
}

function generateNewId() {
  const id = randomBytes(4).toString('hex')
  const allProducts = getAllProducts()
  const IdExistYet = allProducts.some(item => item.id === id)
  if (IdExistYet) {
    return generateNewId()
  }
  return id
}