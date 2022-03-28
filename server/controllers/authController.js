import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import jsonwebtoken from 'jsonwebtoken'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { sign } = jsonwebtoken

const filePathUsers = resolve(__dirname, '..', 'data', 'users', 'users.json')

class AuthController {

  async create(req, res, next) {
    try {
      const clientUser = req.body
      if (!clientUser.login || !clientUser.password) {
        return res.status(403).json({ message: 'Не указан логин или пароль' })
      }

      const users = getUsersFromDB()
      const hasUser = checkValueInArr(users, 'login', clientUser.login)

      if (hasUser) {
        return res.status(403).json({ message: 'Пользователь с таким логином уже существует' })
      }

      clientUser.name = ''
      clientUser.description = ''
      clientUser.img = ''

      addUserToBD(clientUser)

      delete clientUser.password
      const token = generateJWT(clientUser)
      res.status(200).json({ token })
    } catch (e) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  changePassword(req, res, next) {
    try {
      const clientUser = req.body

      if (!clientUser.login || !clientUser.password) {
        return res.status(403).json({ message: 'Не указан логин или пароль' })
      }

      const users = getUsersFromDB()

      const updatedUsers = users.map((user) => {
        if (user.login === clientUser.login) {
          const editedUser = {
            ...user,
            password: clientUser.password
          }
          return editedUser
        }
        return user
      })

      writeFileSync(filePathUsers, JSON.stringify(updatedUsers, null, 2))

      delete clientUser.password
      const token = generateJWT(clientUser)

      res.status(200).json({ token })
    } catch {
      res.status(403).json({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  login(req, res, next) {
    try {
      const clientUser = req.body
      let users = getUsersFromDB()
      const hasUser = checkValueInArr(users, 'login', clientUser.login)

      if (!hasUser) {
        return res.status(403).json({ message: 'Неправильный логин или пароль' })
      }

      const serverUser = getItemByValueFromArr(users, 'login', clientUser.login)
      const isPasswordCorrect = serverUser.password === clientUser.password

      if (!isPasswordCorrect) {
        return res.status(403).json({ message: 'Неправильный логин или пароль' })
      }

      delete serverUser.password
      const token = generateJWT(serverUser)
      res.status(200).json({ token })
    } catch (e) {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  check(req, res, next) {
    const clientUser = req.user
    delete clientUser.exp
    delete clientUser.iat
    const token = generateJWT(clientUser)

    res.status(200).json({ token })
  }
}

function checkValueInArr(arr, field, value) {
  let result = false
  arr.forEach(item => {
    if (item[field] === value) {
      result = true
    }
  })
  return result
}

function getItemByValueFromArr(arr, field, value) {
  let result
  arr.forEach(item => {
    if (item[field] === value) {
      result = item
    }
  })
  return result
}

function getUsersFromDB() {
  const users = readFileSync(filePathUsers, { encoding: 'utf8' })
  return JSON.parse(users)
}

function addUserToBD(clientUser) {
  const users = getUsersFromDB()
  users.push(clientUser)
  writeFileSync(filePathUsers, JSON.stringify(users, null, 2))
}

function generateJWT(user) {
  return sign(user, process.env.SECRET_KEY, { expiresIn: '24h' })
}


export default new AuthController()