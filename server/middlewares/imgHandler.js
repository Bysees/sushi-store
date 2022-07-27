import multer, { diskStorage } from 'multer'

function imgHandler(fieldname, path = '') {

  const storage = diskStorage({

    destination: function (req, file, cb) {
      const { category } = req.query
      const filePath = path ? path : category
      cb(null, `./static/${filePath}`)
    },

    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }

  })

  const types = ['image/png', 'image/jpg', 'image/jpeg']

  const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
      return cb(null, true)
    }

    cb(null, false)
  }

  return multer({ storage, fileFilter }).single(fieldname)
}


export default imgHandler