import React, { Fragment } from 'react'
import styles from '../messenger.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import { useRef } from 'react'
import Message from './Message'

const sessionId = `person_${Date.now()}`

const UserChat = () => {

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('Привет')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const socket = useRef(null)
  const socketClosed = (socket.current === null)

  const getCurrentMessage = (e) => {
    const currentText = e.target.value
    setCurrentMessage(currentText)

    const condition = currentText ? 'began' : 'finished'

    sendMessageCondition(condition)
  }

  const sendMessageCondition = (condition) => {

    socket.current.send(JSON.stringify({
      type: 'typing',
      condition: condition,
      sessionId: sessionId,
      role: 'person',
    }))
  }

  const sendMessage = () => {

    if (currentMessage) {

      socket.current.send(JSON.stringify({
        type: 'message',
        sessionId: sessionId,
        role: 'person',
        message: currentMessage
      }))
      sendMessageCondition('finished')
      setCurrentMessage('')
    }
  }


  const openSocket = () => {
    socket.current = new WebSocket('ws://localhost:8000/')

    socket.current.onopen = () => {
      console.log('Socket is open')

      socket.current.send(JSON.stringify({
        type: 'connection',
        sessionId: sessionId,
        role: 'person'
      }))
    }

    socket.current.onmessage = (event) => {
      const userData = JSON.parse(event.data)

      switch (userData.type) {
        case 'connection':
          console.log('connection: ', userData.message)
          break

        case 'disconnected':
          console.log('disconnected: ', `${userData.name} отключился от чата`)
          break

        case 'message':
          setMessages(messages => [...messages, userData])
          console.log('message: ', userData)
          break
        case 'typing':

          if (userData.condition === 'began') {
            setIsTyping(true)
          }

          if (userData.condition === 'finished') {
            setIsTyping(false)
          }
          break
        default:
          console.log('default: ', userData)
      }

    }

    socket.current.onclose = () => {
      console.log('Socket is closed ')
    }
  }

  const openChat = () => {
    setIsChatOpen(true)

    if (socketClosed) {
      openSocket()
    }
  }

  const hideChat = () => {
    setIsChatOpen(false)
    socket.current.close()
    socket.current = null
  }


  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.messenger, isChatOpen && styles.messenger_open)}>
        <div className={styles.header}>

          {isChatOpen
            ? <p
              onClick={hideChat}
              className={styles.header__title}>
              Свернуть чат
            </p>
            : <p
              onClick={openChat}
              className={styles.header__title}>
              Начать чат
            </p>}

        </div>
        <div className={cn(styles.body, isChatOpen && styles.body_open)}>

          {messages.map((userData, i) => {

            const isMineMessage = userData.role === 'person'
            const title = isMineMessage ? 'Вы' : 'Администратор'

            return (
              <Message
                key={i}
                title={title}
                message={userData.message}
                self={isMineMessage} />
            )
          })}

          {isTyping &&
            <div className={styles.typing}>
              Администратор пишет сообщение
            </div>
          }

        </div>
        <div className={cn(styles.footer, isChatOpen && styles.footer_open)}>

          <textarea
            className={styles.textarea}
            placeholder={'Enter your message'}
            value={currentMessage}
            onChange={getCurrentMessage}>
          </textarea>

          <button
            className={styles.send}
            onClick={sendMessage}>
            Send
          </button>

        </div>
      </div>
    </div>
  )
}




export default UserChat