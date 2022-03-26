import dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { resolve, dirname } from 'path'
import { readdirSync } from 'fs'
import route from './routers/index.js'
import { fileURLToPath } from 'url';

dotenv.config()
const app = express()
const PORT = 5000
const __dirname = dirname(fileURLToPath(import.meta.url));

const pictures = readdirSync(resolve(__dirname, 'static'))
pictures.forEach((dirname) => {
  app.use('/picture', express.static(resolve(__dirname, 'static', dirname)))
})

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/', route)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))