const { WebSocketServer } = require('ws')


const wss = new WebSocketServer({ port: 8000 })


wss.on('connection', (ws, req) => {

  console.log('IP: ')

  ws.on('message', (messageData) => {
    eventMessageHandler(ws, messageData, wss)
  })

  ws.on('error', (e) => {
    console.log('Websocket ERROR: ', e)
  })
})


function eventMessageHandler(ws, messageData, broadcast) {

  const userData = JSON.parse(messageData)

  switch (userData.type) {
    case 'connection':
      connectionHandler(ws, userData, broadcast)
      break

    case 'message':
      messageHandler(ws, userData, broadcast)
      break

    case 'typing':
      typingHandler(ws, userData, broadcast)
      break

    default:
      console.log('Нет подходящего типа для обработки события')
  }
}

function connectionHandler(ws, userData, broadcast) {

  if (userData.sessionId) {
    ws.sessionId = userData.sessionId
  }

  ws.userData = userData

  switch (userData.role) {
    case 'admin':
      adminConnectionHandler(ws, userData, broadcast)
      break
    case 'person':
      personConnectionHandler(ws, userData, broadcast)
      break
    default:
      console.log('Нет подходящей роли для обработки коннекта')
  }
}

function adminConnectionHandler(ws, userData, broadcast) {

  broadcast.clients.forEach(client => {
    //! Отправляю данные всех подключенных к чату пользователей себе
    if (client.sessionId) {
      ws.send(JSON.stringify(client.userData))
    }
  })
}

function personConnectionHandler(ws, userData, broadcast) {

  //! Отправляю сообщение себе об удачном соеденении
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'подключение к чату установлено!'
  }))

  broadcastToAdmin(ws, userData, broadcast)
}

function messageHandler(ws, userData, broadcast) {

  switch (userData.role) {
    case 'admin':
      adminMessageHandler(ws, userData, broadcast)
      break
    case 'person':
      personMessageHandler(ws, userData, broadcast)
      break
    default:
      console.log('Нет подходящей роли для обработки сообщения')
  }
}

function adminMessageHandler(ws, userData, broadcast) {

  //! Возвращаю сообщение себе
  ws.send(JSON.stringify(userData))

  broadcastToPerson(ws, userData, broadcast)
}

function personMessageHandler(ws, userData, broadcast) {

  //! Возвращаю сообщение себе
  ws.send(JSON.stringify(userData))

  broadcastToAdmin(ws, userData, broadcast)
}

function typingHandler(ws, userData, broadcast) {

  switch (userData.role) {
    case 'admin':
      broadcastToPerson(ws, userData, broadcast)
      break
    case 'person':
      broadcastToAdmin(ws, userData, broadcast)
      break
    default:
      console.log('Нет подходящей кондиции для обработки сообщения')
  }
}


function broadcastToAdmin(ws, userData, broadcast) {

  broadcast.clients.forEach(client => {
    //! Отправляю сообщение админу (админам)
    if (client.userData.role === 'admin') {
      client.send(JSON.stringify(userData))
    }
  })
}

function broadcastToPerson(ws, userData, broadcast) {

  broadcast.clients.forEach(client => {
    if (client.userData.sessionId === userData.sessionId) {
      client.send(JSON.stringify(userData))
    }
  })
}