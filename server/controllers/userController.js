import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import jsonwebtoken from 'jsonwebtoken'
import { fileURLToPath } from 'url';

const { sign } = jsonwebtoken
const __dirname = dirname(fileURLToPath(import.meta.url));

const filePathUsers = resolve(__dirname, '..', 'data', 'users', 'users.json')

class UserController {

  editInfo(req, res, next) {
    try {
      const clientUser = req.user
      const { description, name } = req.body

      const users = getUsersFromDB()
      const user = users.find((user) => user.login === clientUser.login)

      const editedUser = { ...user, name, description }
      const updatedUsers = users.map((user) => {
        if (user.login === clientUser.login) {
          return editedUser
        }
        return user
      })

      writeUsersToDB(updatedUsers)

      const token = generateJWT(editedUser)

      res.status(200).send({ token })
    } catch {
      res.status(403).send({ message: 'something went wrong' })
    }
  }

  async editImage(req, res, next) {
    try {
      const clientUser = req.user
      const avatar = req.file

      const avatarUrl = `/picture/${avatar.filename}`

      const users = getUsersFromDB()
      const user = users.find(user => user.id === clientUser.id)

      const avatarFileName = user.avatar.split('/')[2]

      if (avatarFileName) {
        deleteCurrentPicture(avatarFileName)
      }

      const editedUser = {
        ...user,
        avatar: avatarUrl
      }

      const updatedUsers = users.map((user) => {
        if (user.login === clientUser.login) {
          return editedUser
        }
        return user
      })

      writeUsersToDB(updatedUsers)

      const token = generateJWT(editedUser)
      res.status(200).json({ token })
    } catch (err) {
      res.status(403).send({ message: 'something went wrong' })
    }
  }
}

function getUsersFromDB() {
  const users = readFileSync(filePathUsers, { encoding: 'utf8' })
  return JSON.parse(users)
}

function writeUsersToDB(users) {
  writeFileSync(filePathUsers, JSON.stringify(users, null, 2))
}

function deleteCurrentPicture(fileName) {
  try {
    const filePathPictures = resolve(__dirname, '..', 'static', 'users', fileName)
    unlinkSync(filePathPictures)
  } catch (err) {
    console.log(err)
  }
}

function generateJWT(user) {
  return sign(user, process.env.SECRET_KEY, { expiresIn: '24h' })
}

export default new UserController()