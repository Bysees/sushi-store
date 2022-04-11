import dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { resolve, dirname } from 'path'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url';
import router from './routers/index.js'
import { staticEmiter } from './controllers/categoryController.js'

staticEmiter.on('static-dirs-changed', setExpressStaticFiles)

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const PORT = process.env.PORT

function setExpressStaticFiles() {
  const pictures = readdirSync(resolve(__dirname, 'static'))
  pictures.forEach((dirname) => {
    app.use('/api/picture', express.static(resolve(__dirname, 'static', dirname)))
  })
}

setExpressStaticFiles()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api', router)

if (process.env.NODE_ENV?.trim() === 'production') {
  app.use(express.static(resolve(__dirname, '..', 'client', 'build')))
  app.get('/api/*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))