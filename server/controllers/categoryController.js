import { unlinkSync, readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, rmSync } from 'fs'
import { resolve, dirname, } from 'path'
import { fileURLToPath } from 'url';
import EventEmiter from 'events';

const __dirname = dirname(fileURLToPath(import.meta.url));

class CategoryController {

  get(req, res) {
    try {
      const categories = getCategories()

      if (categories.length < 1) {
        return res.status(404).send({ message: 'Нет существующих категорий для продуктов' })
      }

      return res.status(200).send({ categories })
    } catch {
      res.status(500).send({ message: `Произошла непредвиденная ошибка` })
    }
  }

  create(req, res) {
    try {
      const { category: newCategory } = req.body

      if (!newCategory.eng || !newCategory.rus) {
        return res.status(403).send({ message: 'Не указано русского или английского названия' })
      }

      if (newCategory.eng.length > 16 || newCategory.rus.length > 16) {
        return res.status(403).send({ message: 'Название не может содержать больше 16-ти символов' })
      }

      const onlyEng = /^[a-zA-Z ]+$/
      const onlyRus = /^[а-яёА-ЯЁ ]+$/

      if (newCategory.eng.search(onlyEng) !== 0) {
        return res.status(403).send({ message: 'Для поля eng, только латинские буквы' })
      }

      if (newCategory.rus.search(onlyRus) !== 0) {
        return res.status(403).send({ message: 'Для поля rus, только кириллические буквы' })
      }

      newCategory.eng = newCategory.eng.toLowerCase()
      newCategory.rus = newCategory.rus.toLowerCase()

      const categories = getCategories()

      let isCategoryExist = false
      let caterogyName = ''

      categories.forEach(category => {
        if (category.rus === newCategory.rus) {
          isCategoryExist = true
          caterogyName = category.rus
        }

        if (category.eng === newCategory.eng) {
          isCategoryExist = true
          caterogyName = category.eng
        }
      })

      if (isCategoryExist) {
        return res.status(403).send({ message: `Категория с названием ${caterogyName} уже существует` })
      }

      const updatedCategories = [...categories, newCategory]
      reWriteCategories(updatedCategories)

      const newCategoryProducts = {
        category: newCategory,
        items: []
      }

      createCategoryInProducts(newCategory.eng, newCategoryProducts)
      createDirInStatic(newCategory.eng)


      res.status(201).send({ message: 'Категория была успешно добавлена' })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  edit(req, res) {
    try {
      let { type } = req.params
      const { category: newCategory } = req.body

      newCategory.eng = newCategory.eng.toLowerCase()
      newCategory.rus = newCategory.rus.toLowerCase()
      type = type.toLowerCase()

      if (type === 'sushi' || type === 'rolls') {
        return res.status(403).send({ message: 'Эту категорию запрещено редактировать' })
      }

      const onlyEng = /^[a-zA-Z ]+$/
      const onlyRus = /^[а-яёА-ЯЁ ]+$/

      if (newCategory.eng.search(onlyEng) !== 0) {
        return res.status(403).send({ message: 'Для поля eng, только латинские буквы' })
      }

      if (newCategory.rus.search(onlyRus) !== 0) {
        return res.status(403).send({ message: 'Для поля rus, только кириллические буквы' })
      }

      const categories = getCategories()

      const category = categories.find(category => category.eng === type)

      if (!category) {
        return res.status(404).send({ message: `Категории ${type} не существует` })
      }

      let isCategoryExist = false
      let caterogyName = ''

      categories.forEach(category => {
        if (category.rus === newCategory.rus) {
          isCategoryExist = true
          caterogyName = category.rus
        }

        if (category.eng === newCategory.eng) {
          isCategoryExist = true
          caterogyName = category.eng
        }
      })

      if (isCategoryExist) {
        return res.status(403).send({ message: `Категория с названием ${caterogyName} уже существует` })
      }

      const updatedCategories = categories.map(category => {
        if (category.eng === type) {
          return newCategory
        }
        return category
      })

      reWriteCategories(updatedCategories)

      let productByCategory = readFileSync(
        resolve(__dirname, '..', 'data', 'products', `${type}.json`),
        { encoding: 'utf-8' }
      )
      productByCategory = JSON.parse(productByCategory)

      productByCategory.category = newCategory

      createCategoryInProducts(newCategory.eng, productByCategory)
      deleteCategoryFromProducts(type)
      renameDirInStatic(type, newCategory.eng)

      res.status(200).send({ message: 'Категория была успешно отредактирована' })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  remove(req, res) {
    try {
      let { type } = req.params
      type = type.toLowerCase()

      if (type === 'sushi' || type === 'rolls') {
        return res.status(403).send({ message: 'Эту категорию запрещено удалять' })
      }

      const categories = getCategories()
      const category = categories.find(category => category.eng === type)

      if (!category) {
        return res.status(404).send({ message: `Категории ${type} не существует` })
      }

      const updatedCategories = categories.filter(category => category.eng !== type)
      reWriteCategories(updatedCategories)

      deleteCategoryFromProducts(type)
      deleteDirFromStatic(type)

      res.status(200).send({ message: 'Категория была успешно удалёна' })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }
}

export default new CategoryController()
export const staticEmiter = new EventEmiter()

function getCategories() {
  const categories = readFileSync(
    resolve(__dirname, '..', 'data', 'categories', 'categories.json'),
    { encoding: 'utf-8' }
  )
  return JSON.parse(categories)
}

function reWriteCategories(file) {
  writeFileSync(
    resolve(__dirname, '..', 'data', 'categories', 'categories.json'),
    JSON.stringify(file, null, 2)
  )
}

function createCategoryInProducts(filename, file) {
  writeFileSync(
    resolve(__dirname, '..', 'data', 'products', `${filename}.json`),
    JSON.stringify(file, null, 2)
  )
}

function createDirInStatic(filename) {
  const dirPath = resolve(__dirname, '..', 'static', filename)
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }
  staticEmiter.emit('static-dirs-changed')
}

function deleteDirFromStatic(dirname) {
  const dirPath = resolve(__dirname, '..', 'static', dirname)
  rmSync(dirPath, { recursive: true })
  staticEmiter.emit('static-dirs-changed')
}

function renameDirInStatic(dirname, newDirname) {
  const dirPath = resolve(__dirname, '..', 'static', dirname)
  const newDirPath = resolve(__dirname, '..', 'static', newDirname)
  renameSync(dirPath, newDirPath)
  staticEmiter.emit('static-dirs-changed')
}

function deleteCategoryFromProducts(filename) {
  unlinkSync(resolve(__dirname, '..', 'data', 'products', `${filename}.json`))
}