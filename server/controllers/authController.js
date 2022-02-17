const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

//! npm i jsonwebtoken bcrypt

//? bcrypt асинхронная функция,
//? Encrypt: await bcrypt.hash(pass, 5)
//? Decrypt: bcrypt.compareSynd(current-pass, db-pass)

//? Tocode: jwt.sign(payload : {login, role, id} , secretKey : string, options : {expiresIn : '24h'})
//? secretKey лучше хранить в .env файле!

//! Создаём AuthMiddleware и в гет запрос вторым параметром
//? Decode: jwn.verify(token, secretKey)

class AuthController {

  async create(req, res, next) {
    try {
      const clientUser = req.body
      const users = getUsersFromBD()
      const hasUser = checkValueInArr(users, 'name', clientUser.name)

      if (!hasUser) {
        addUserToBD(clientUser)
        const token = generateJWT(clientUser.name, clientUser.role)
        return res.status(200).json({ token })
      }

      res.status(403).json({ message: `User with name ${clientUser.name} already exists` })
    } catch (e) {
      res.status(500).json({ message: `Server error` })
    }
  }

  login(req, res, next) {
    try {
      const clientUser = req.body
      let users = getUsersFromBD()
      const hasUser = checkValueInArr(users, 'name', clientUser.name)

      if (!hasUser) {
        return res.status(403).json({ message: `Login or password incorrect` })
      }

      const serverUser = getValueFromArr(users, 'name', clientUser.name)
      const isPasswordCorrect = serverUser.password === clientUser.password

      if (!isPasswordCorrect) {
        return res.status(403).json({ message: `Login or password incorrect` })
      }

      const token = generateJWT(serverUser.name, serverUser.role)
      res.status(200).json({ token })
    } catch (e) {
      res.status(500).json({ message: `Server error` })
    }
  }

  check(req, res, next) {
    const clientUser = req.user
    const token = generateJWT(clientUser.name, clientUser.role)
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

function getValueFromArr(arr, field, value) {
  let result
  arr.forEach(item => {
    if (item[field] === value) {
      result = item
    }
  })
  return result
}

function getUsersFromBD() {
  const users = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), { encoding: 'utf8' })
  return JSON.parse(users)
}

function addUserToBD(clientUser) {
  const users = getUsersFromBD()
  users.push(clientUser)
  fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), JSON.stringify(users, null, 2))
}

function generateJWT(name, role) {
  return jwt.sign({ name, role }, process.env.SECRET_KEY, { expiresIn: '1h' })
}


module.exports = new AuthController()