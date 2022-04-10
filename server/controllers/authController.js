import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import jsonwebtoken from 'jsonwebtoken'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { sign } = jsonwebtoken

class AuthController {

  create(req, res) {
    try {
      const clientUser = req.body
      if (!clientUser.login || !clientUser.password) {
        return res.status(403).json({ message: 'Не указан логин или пароль' })
      }

      const usersDB = getUsersFromDB()
      const userDB = usersDB.find(userDB => userDB.login.toLowerCase() === clientUser.login.toLowerCase())

      if (userDB) {
        return res.status(403).json({ message: 'Пользователь с таким логином уже существует' })
      }

      clientUser.role = clientUser.role || 'user'
      clientUser.name = ''
      clientUser.description = ''
      clientUser.avatar = ''

      addUserToDB(clientUser)

      delete clientUser.password
      const token = generateJWT(clientUser)
      res.status(200).json({ token })
    } catch {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  changePassword(req, res) {
    try {
      const clientUser = req.body

      if (!clientUser.login || !clientUser.password) {
        return res.status(403).json({ message: 'Не указан логин или пароль' })
      }

      const usersDB = getUsersFromDB()
      const userDB = usersDB.find(userDB => userDB.login.toLowerCase() === clientUser.login.toLowerCase())

      if (userDB.password === clientUser.password) {
        return res.status(403).json({ message: 'Новый пароль должен отличаться от прежнего' })
      }

      const updatedUsers = usersDB.map((userDB) => {
        if (userDB.login.toLowerCase() === clientUser.login.toLowerCase()) {
          const editedUser = {
            ...userDB,
            password: clientUser.password
          }
          return editedUser
        }
        return userDB
      })

      writeUsersToDB(updatedUsers)

      delete userDB.password
      const token = generateJWT(userDB)

      res.status(200).json({ token })
    } catch {
      res.status(403).json({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  login(req, res) {
    try {
      const clientUser = req.body
      const usersDB = getUsersFromDB()
      const userDB = usersDB.find(userDB => userDB.login.toLowerCase() === clientUser.login.toLowerCase())

      if (!userDB) {
        return res.status(403).json({ message: 'Неправильный логин или пароль' })
      }

      const isPasswordCorrect = userDB.password === clientUser.password

      if (!isPasswordCorrect) {
        return res.status(403).json({ message: 'Неправильный логин или пароль' })
      }

      delete userDB.password
      const token = generateJWT(userDB)
      res.status(200).json({ token })
    } catch {
      res.status(500).json({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  check(req, res) {
    const clientUser = req.clientUser
    delete clientUser.exp
    delete clientUser.iat
    const token = generateJWT(clientUser)

    res.status(200).json({ token })
  }
}

const filePathUsers = resolve(__dirname, '..', 'data', 'users', 'users.json')

function getUsersFromDB() {
  const usersDB = readFileSync(filePathUsers, { encoding: 'utf8' })
  return JSON.parse(usersDB)
}

function writeUsersToDB(users) {
  writeFileSync(filePathUsers, JSON.stringify(users, null, 2))
}

function addUserToDB(user) {
  const usersDB = getUsersFromDB()
  usersDB.push(user)
  writeFileSync(filePathUsers, JSON.stringify(usersDB, null, 2))
}

function generateJWT(user) {
  return sign(user, process.env.SECRET_KEY, { expiresIn: '24h' })
}

export default new AuthController()