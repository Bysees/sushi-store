require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./routers/index')
const PORT = 5000

//! websocket --------------
const fs = require('fs')
const path = require('path')
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

app.ws('/', (ws, req) => {

  ws.on('message', (data) => {
    const userData = JSON.parse(data)

    if (userData.type === 'connection') {
      connectionHandler(ws, userData)
    }

    if (userData.type === 'message') {

      if (userData.role === 'user') {

        aWss.clients.forEach(client => {

          //! Отправляю сообщение админу
          if (client.userData.role === 'admin') {
            client.send(JSON.stringify(userData))
          }

          //! Возвращаю сообщение себе
          if (client.userData.name === userData.name) {
            client.send(JSON.stringify(userData))
          }

        })
      }

      if (userData.role === 'admin') {

        aWss.clients.forEach(client => {

          //! На клиенте получаю текущего юзера, который прислал мне сообщение и добавляю
          if (client.currentChatUser === userData.currentChatUser) {
            client.send(JSON.stringify(userData))
          }

          if (client.userData.role === 'admin') {
            client.send(JSON.stringify(userData))
          }

        })

      }

    }

  })
})

function connectionHandler(ws, userData) {
  ws.userData = userData

  // if (userData.role === 'user') {
  ws.currentChatUser = userData.name
  // }

  const data = userData

  aWss.clients.forEach(client => {
    client.send(JSON.stringify(data))
  })
}

function messageHandler(ws, userData) {

  const data = {
    type: 'message',
    name: userData.name,
    role: userData.role,
    message: userData.message
  }

  broadcastHandler(ws, data)
}

function broadcastHandler(ws, data) {

  aWss.clients.forEach(client => {

    // if (client.userData.role === 'admin') {
    //   client.send(JSON.stringify(data))
    // }

    //! Сообщение возвращается только мне и админу
    if (client.userData.name === data.name || client.userData.role === 'admin') {
      client.send(JSON.stringify(data))
    }

  })
}


function getUsersFromBD() {
  const users = fs.readFileSync(path.resolve(__dirname, 'data', 'users.json'), { encoding: 'utf8' })
  return JSON.parse(users)
}

function getItemByValueFromArr(arr, field, value) {
  let result
  arr.forEach(item => {
    if (item[field] === value) {
      result = item
    }
  })
  return result
}


//!----------------------
app.use(cors())
app.use(express.json())

app.use('/', route)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))