require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const route = require('./routers/index')
const PORT = 5000

app.use(fileUpload({
  createParentPath: true,
}))

const pictures = fs.readdirSync(path.resolve(__dirname, 'static'))
pictures.forEach((dirname) => {
  app.use('/picture', express.static(path.resolve(__dirname, 'static', dirname)))
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', route)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))