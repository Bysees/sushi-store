require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./routers/index')
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/', route)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))