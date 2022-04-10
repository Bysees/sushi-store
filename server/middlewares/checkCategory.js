import { access } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const checkCategory = async (req, res, next) => {

  if (req.method === "OPTIONS") {
    return next()
  }
  const { category } = req.query

  if (!category) {
    return res.status(403).send({ message: 'Не указана категория продуктов' })
  }

  const filePath = resolve(__dirname, '..', 'data', 'products', `${category}.json`)
  try {
    await access(filePath)
    req.query = { category }
    next()
  } catch {
    res.status(404).send({ message: 'Указана несуществующая категория' })
  }
}

export default checkCategory