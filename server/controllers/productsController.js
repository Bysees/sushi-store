import { unlinkSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname, parse } from 'path'
import { randomBytes } from 'crypto'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class ProductsController {

  getAll(req, res) {
    try {
      const { category, label = 'all' } = req.query

      if (!category) {
        let products = getAllProducts()


        if (label === 'all') {
          return res.status(200).send(products)
        } else {
          const filtredItems = products.items.filter(product => product.labels.includes(label))
          products = { ...products, items: filtredItems }
          return res.status(200).send(products)
        }
      }

      const productFiles = readdirSync(resolve(__dirname, '..', 'data', 'products'))
      const productFileNames = productFiles.map(filename => parse(filename).name)
      const isCategoryCorrect = productFileNames.includes(category)

      if (!isCategoryCorrect) {
        return res.status(404).send({ message: `Тип товаров "${category}" не существует` })
      }

      let products = getProductsByCategory(category)

      if (label === 'all') {
        return res.status(200).send(products)
      } else {
        const filtredItems = products.items.filter(product => product.labels.includes(label))
        products = { ...products, items: filtredItems }
        return res.status(200).send(products)
      }

    } catch {
      res.status(500).send({ message: `Произошла непредвиденная ошибка` })
    }
  }

  getOne(req, res) {
    try {
      const { id } = req.params
      let allProducts = getAllProducts()
      allProducts = allProducts.flatMap(({ items }) => items)
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
      const { category } = req.query
      let { product: newProduct } = req.body
      newProduct = JSON.parse(newProduct)

      const allProducts = getAllProducts()
      const allProductItems = allProducts.flatMap(products => products.items)
      const isProductTitleExist = allProductItems.find(item => item.title.toLowerCase() === newProduct.title.toLowerCase())

      if (isProductTitleExist) {
        return res.status(403).send({ message: `Продукт с названием "${newProduct.title}" уже существует` })
      }

      if (req.file) {
        const picture = req.file
        newProduct.img = `/picture/${picture.filename}`
      }

      newProduct.id = generateNewId()
      const productsByCategory = getProductsByCategory(category)
      const updatedProducts = { ...productsByCategory, items: [...productsByCategory.items, newProduct] }

      writeProductsByCategory(category, updatedProducts)

      res.status(201).send({ message: 'Продукт был успешно добавлен', newProduct })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  edit(req, res) {
    try {
      const { category } = req.query
      let { product: editedProduct } = req.body
      editedProduct = JSON.parse(editedProduct)

      const productsByCategory = getProductsByCategory(category)
      const productEqualTitle = productsByCategory.items.find(item => (
        (item.title.toLowerCase() === editedProduct.title.toLowerCase())
      ))
      const isTheSameProduct = productEqualTitle?.id === editedProduct.id

      if (productEqualTitle && !isTheSameProduct) {
        return res.status(403).send({ message: `Продукт с названием "${editedProduct.title}" уже существует` })
      }

      const product = productsByCategory.items.find(product => product.id === editedProduct.id)

      if (req.file) {
        const picture = req.file
        editedProduct.img = `/picture/${picture.filename}`
      }

      if (product.img !== editedProduct.img) {
        const imgName = product.img.split('/')[2]
        deleteCurrentPicture(category, imgName)
      }

      const updatedItems = productsByCategory.items.map((product) => {
        if (product.id === editedProduct.id) {
          return editedProduct
        }
        return product
      })

      const updatedProducts = {
        ...productsByCategory,
        items: updatedItems
      }

      writeProductsByCategory(category, updatedProducts)

      res.status(200).send({ message: 'Продукт был успешно отредактирован', editedProduct })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  remove(req, res) {
    try {
      const { category } = req.query
      const { id } = req.params

      const productsByCategory = getProductsByCategory(category)
      const product = productsByCategory.items.find(product => product.id === id)

      const imgName = product.img.split('/')[2]
      deleteCurrentPicture(category, imgName)

      const updatedItems = productsByCategory.items.filter(product => product.id !== id)

      const updatedProducts = {
        ...productsByCategory,
        items: updatedItems
      }

      writeProductsByCategory(category, updatedProducts)

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
    products = [...products, { ...JSON.parse(items) }]
  })
  return products
}

function getProductsByCategory(category) {
  const filePath = resolve(__dirname, '..', 'data', 'products', `${category}.json`)
  let products = readFileSync(filePath, { encoding: 'utf-8' })
  products = JSON.parse(products)
  return products
}

function writeProductsByCategory(category, products) {
  const filePath = resolve(__dirname, '..', 'data', 'products', `${category}.json`)
  writeFileSync(filePath, JSON.stringify(products, null, 2))
}

function deleteCurrentPicture(categoryDir, fileName) {
  try {
    const filePathPictures = resolve(__dirname, '..', 'static', categoryDir, fileName)
    unlinkSync(filePathPictures)
  } catch {
    console.log('Image already not exist')
  }
}

function generateNewId() {
  const id = randomBytes(4).toString('hex')
  const allProducts = getAllProducts()
  const allProductItems = allProducts.flatMap(products => products.items)
  const IdExistYet = allProductItems.some(item => item.id === id)

  if (IdExistYet) {
    return generateNewId()
  }

  return id
}