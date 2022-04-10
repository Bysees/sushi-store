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
    app.use('/picture', express.static(resolve(__dirname, 'static', dirname)))
  })
}

setExpressStaticFiles()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api', router)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))