import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import jsonwebtoken from 'jsonwebtoken'
import { fileURLToPath } from 'url';

const { sign } = jsonwebtoken
const __dirname = dirname(fileURLToPath(import.meta.url));


class UserController {

  editInfo(req, res) {
    try {
      const clientUser = req.clientUser
      const { description = '', name = '' } = req.body

      const usersDB = getUsersFromDB()
      const userDB = usersDB.find(userDB => userDB.login.toLowerCase() === clientUser.login.toLowerCase())
      const editedUser = {
        ...userDB, name, description
      }

      const updatedUsers = usersDB.map((userDB) => {
        if (userDB.login.toLowerCase() === clientUser.login.toLowerCase()) {
          return editedUser
        }
        return userDB
      })

      writeUsersToDB(updatedUsers)

      const token = generateJWT(editedUser)

      res.status(200).send({ token })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
  }

  async editImage(req, res) {
    try {
      const clientUser = req.clientUser
      const avatar = req.file

      const avatarUrl = `/picture/${avatar.filename}`

      const usersDB = getUsersFromDB()
      const userDB = usersDB.find(userDB => userDB.login.toLowerCase() === clientUser.login.toLowerCase())

      const avatarFileName = userDB.avatar.split('/')[2]

      if (avatarFileName) {
        deleteCurrentPicture(avatarFileName)
      }

      const editedUser = {
        ...userDB, avatar: avatarUrl
      }

      const updatedUsers = usersDB.map((userDB) => {
        if (userDB.login.toLowerCase() === clientUser.login.toLowerCase()) {
          return editedUser
        }
        return userDB
      })

      writeUsersToDB(updatedUsers)

      const token = generateJWT(editedUser)
      res.status(200).json({ token })
    } catch {
      res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
    }
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

function deleteCurrentPicture(fileName) {
  try {
    const filePathPictures = resolve(__dirname, '..', 'static', 'users', fileName)
    unlinkSync(filePathPictures)
  } catch {
    console.log('Image already not exist')
  }
}

function generateJWT(user) {
  return sign(user, process.env.SECRET_KEY, { expiresIn: '24h' })
}

export default new UserController()