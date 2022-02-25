import React, { memo, useCallback, useMemo } from 'react'
import { useRef, useState, useEffect } from 'react'
import styles from '../messenger.module.scss'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import Message from './Message'

const AdminChat = () => {

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [connectedSessionsId, setConnectedSessionsId] = useState([])
  const [notifersSessionsId, setNotifersSessionsId] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState('')
  const [messages, setMessages] = useState({})
  const [isTyping, setIsTyping] = useState(false)

  const socket = useRef(null)

  const user = useSelector(state => ({
    name: state.user.name,
    role: state.user.role
  }))

  const openChat = () => {
    setIsChatOpen(true)
  }

  const hideChat = () => {
    setIsChatOpen(false)
  }


  const getCurrentSessionId = useCallback((sessionId) => () => {
    setIsChatOpen(true)
    setCurrentSessionId(sessionId)
    setNotifersSessionsId(sessionsId => sessionsId.filter(id => id !== sessionId))
  }, [setIsChatOpen, setCurrentSessionId, setNotifersSessionsId])

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
      role: user.role,
      name: user.name,
      sessionId: currentSessionId,
    }))
  }


  const sendMessage = () => {
    if (currentMessage) {
      socket.current.send(JSON.stringify({
        type: 'message',
        role: user.role,
        name: user.name,
        sessionId: currentSessionId,
        message: currentMessage
      }))
      sendMessageCondition('finished')
      setCurrentMessage('')
    }
  }

  useEffect(() => {
    if (user.name) {
      socket.current = new WebSocket('ws://localhost:8000')

      socket.current.onopen = (ws) => {
        console.log('Admin socket is open')

        socket.current.send(JSON.stringify({
          type: 'connection',
          name: user.name,
          role: user.role
        }))

      }
    }

    socket.current.onclose = () => {

      console.log('Admin socket is closed');
    }

    socket.current.onerror = (e) => {

      console.log('Ошибка подключения к WS: ', e)
    }
  }, [user.name, user.role])

  useEffect(() => {
    socket.current.onmessage = (event) => {
      const userData = JSON.parse(event.data)

      switch (userData.type) {

        case 'connection':
          connectionHandler(userData)
          break

        case 'message':
          messageHandler(userData)
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
          console.log('Default, нет подходящего типа')
      }

    }

  }, [currentSessionId])

  const connectionHandler = (userData) => {
    console.log('Connection handler: ', userData)
    if (userData.role !== 'admin') {
      setConnectedSessionsId(users => [...users, userData.sessionId])
    }
  }

  const messageHandler = (userData) => {

    const isOwnMessage = userData.name === user.name

    if (isOwnMessage) {
      addMessage(setMessages, userData, userData.sessionId)
    }

    if (!isOwnMessage) {

      addMessage(setMessages, userData, userData.sessionId)

      const isActiveChatNow = currentSessionId === userData.sessionId

      if (!isActiveChatNow) {
        setNotifersSessionsId(sessionsId => [...sessionsId, userData.sessionId])
      }
    }
  }

  const addMessage = (callback, userData, keyId) => {
    callback(messages => {

      let newMessages;
      // const hasMessages = messages.hasOwnProperty(keyId)
      const hasMessages = keyId in messages

      if (!hasMessages) {

        newMessages = {
          ...messages,
          [keyId]: [userData]
        }
      }

      if (hasMessages) {

        newMessages = {
          ...messages,
          [keyId]: [...messages[keyId], userData]
        }
      }

      return newMessages
    })
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.messenger}>
        <div className={cn(styles.header, isChatOpen && styles.header_open)}>

          {isChatOpen
            ? <button onClick={hideChat} className={styles.toogleChatBtn}>
              свернуть
            </button>
            : <button onClick={openChat} className={styles.toogleChatBtn}>
              открыть
            </button>}

          <UsersBar
            connectedSessionsId={connectedSessionsId}
            currentSessionId={currentSessionId}
            notifersSessionsId={notifersSessionsId}
            getCurrentSessionId={getCurrentSessionId}
          />

        </div>
        <div className={cn(styles.body, isChatOpen && styles.body_open)}>

          {messages[currentSessionId]?.map((userData, i) => {

            const isMineMessage = userData.name === user.name
            const title = isMineMessage ? 'Вы' : 'Пользователь'

            return (
              <Message
                key={i}
                message={userData.message}
                title={title}
                self={isMineMessage} />
            )
          })}

          {isTyping &&
            <div className={styles.typing}>
              User пишет сообщение
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


export default AdminChat


const UsersBar = memo(({
  connectedSessionsId,
  currentSessionId,
  notifersSessionsId,
  getCurrentSessionId
}) => {


  return (<>
    {connectedSessionsId.map((sessionId) => {

      const isNewMessage = notifersSessionsId.includes(sessionId)
      const isActive = currentSessionId === sessionId
      const isNotice = isNewMessage && !isActive

      return (
        <nav
          key={sessionId}
          className={cn(
            styles.link,
            isNotice && styles.link__notice,
            isActive && styles.link__active)}
          onClick={getCurrentSessionId(sessionId)}>
          <div>{sessionId}</div>
        </nav>
      )
    })}

  </>)
})