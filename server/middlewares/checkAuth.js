import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken

const checkAuth = async (req, res, next) => {

  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).send({ message: 'Пользователь не авторизован' })
    }

    const clientUser = verify(token, process.env.SECRET_KEY)

    req.clientUser = clientUser
    next()
  } catch {
    res.status(401).send({ message: 'Пользователь не авторизован' })
  }
}

export default checkAuth