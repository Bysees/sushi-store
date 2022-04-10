const checkRole = (role) => async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next()
    }

    const clientUser = req.clientUser

    if (clientUser.role !== role) {
      return res.status(403).send({ message: 'У вас недостаточно прав для совершения этой операции' })
    }
    next()
  } catch {
    res.status(500).send({ message: 'Произошла непредвиденная ошибка' })
  }
}

export default checkRole