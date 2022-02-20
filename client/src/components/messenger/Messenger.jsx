import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from '../../redux/messages'
import styles from './messenger.module.scss'
import cn from 'classnames'


const Messenger = () => {

  const dispatch = useDispatch()
  const socket = useSelector(state => state.messages.socket)
  const authorized = useSelector(state => state.user.authorized)
  const user = useSelector(state => {
    return {
      name: state.user.name,
      role: state.user.role,
    }
  })

  const [messages, setMessages] = useState({})
  const [currentMessage, setCurrentMessage] = useState('')
  const [connectedUsers, setConnectedUsers] = useState([])
  const [currentChatUser, setCurrentChatUser] = useState('')
  const [messagesNotice, setMessagesNotice] = useState([])

  const getCurrentMessage = (e) => {
    const currrentText = e.target.value
    setCurrentMessage(currrentText)
  }

  const getCurrentChatUser = (user) => () => {
    setMessagesNotice(messagesNotice => messagesNotice.filter(userMsg => userMsg !== user))
    setCurrentChatUser(user)
  }

  const addMessage = (e) => {
    if (currentMessage) {
      setCurrentMessage('')

      if (user.role === 'user') {
        socket.send(JSON.stringify({
          type: 'message',
          message: currentMessage,
          name: user.name,
          role: user.role,
        }))
      }

      if (user.role === 'admin') {
        socket.send(JSON.stringify({
          type: 'message',
          message: currentMessage,
          name: user.name,
          role: user.role,
          currentChatUser: currentChatUser
        }))
      }

    }
  }


  //! Socket
  useEffect(() => {
    if (authorized === true) {

      const socket = new WebSocket('ws://localhost:5000/')
      dispatch(setSocket(socket))

      socket.onopen = () => {

        socket.send(JSON.stringify({
          type: 'connection',
          name: user.name,
          role: user.role
        }))

        socket.onmessage = event => {
          const userData = JSON.parse(event.data)

          if (userData.type === 'connection' && userData.role !== 'admin') {
            setConnectedUsers(users => [...users, userData.name])
          }

          if (userData.type === 'message') {

            setMessages(messages => {

              if (userData.role === 'admin') {

                console.log(messages)
                console.log(userData.currentChatUser)
                let newMessages = {
                  ...messages,
                  [userData.currentChatUser]: [...messages[userData.currentChatUser], userData]
                }

                return newMessages

              } else {

                let newMessages;

                if (!Array.isArray(messages[userData.name])) {

                  newMessages = {
                    ...messages,
                    [userData.name]: [userData]
                  }

                } else {

                  newMessages = {
                    ...messages,
                    [userData.name]: [...messages[userData.name], userData]
                  }

                }

                return newMessages
              }
            })

            setMessagesNotice(messageNotice => [...messageNotice, userData.name])
          }

        }
      }
    }
  }, [authorized, user.name, user.role, dispatch, setMessages, setConnectedUsers])


  return (
    <div className={styles.wrapper}>
      <div className={styles.messenger}>
        <div className={styles.header}>

          {/* //! User bar for admin */}
          {user.role === 'admin' && connectedUsers.map((user, i) => {
            return (
              <nav
                key={i}
                className={cn(
                  styles.link,
                  messagesNotice.find(notice => notice === user) && styles.link__notice,
                  currentChatUser === user && styles.link__active)}
                onClick={getCurrentChatUser(user)}>
                <div> {user}</div>
              </nav>
            )
          })}

        </div>
        <div className={styles.body}>

          {/* //! chat for admin */}
          {user.role === 'admin' && messages[currentChatUser]?.map((userData, i) => {
            return (
              <div key={i} className={styles.message}>
                <p className={cn(
                  styles.message__title,
                  userData.role === 'admin' && styles.message__title_left,
                  userData.role === 'user' && styles.message__title_right
                )}>
                  {userData.role === 'admin' && 'Вы'}
                  {userData.role === 'user' && 'Пользователь'}
                </p>
                <p className={cn(
                  styles.message__text,
                  userData.role === 'admin' && styles.message__text_left,
                  userData.role === 'user' && styles.message__text_right,
                )}>
                  {userData.message}
                </p>
              </div>
            )
          })}

          {/* //! chat for user */}
          {user.role === 'user' && messages[user.name]?.map((userData, i) => {
            return (
              <div key={i} className={styles.message}>
                <p className={cn(
                  styles.message__title,
                  userData.role === 'admin' && styles.message__title_right,
                  userData.role === 'user' && styles.message__title_left
                )}>
                  {userData.role === 'admin' && 'Администратор'}
                  {userData.role === 'user' && 'Вы'}
                </p>
                <p className={cn(
                  styles.message__text,
                  userData.role === 'admin' && styles.message__text_right,
                  userData.role === 'user' && styles.message__text_left,
                )}>
                  {userData.message}
                </p>
              </div>
            )
          })}

        </div>
        <div className={styles.footer}>

          <textarea
            className={styles.textarea}
            placeholder={'Enter your message'}
            value={currentMessage}
            onChange={getCurrentMessage}
          >
          </textarea>

          <button
            className={styles.send}
            onClick={addMessage}>
            Send
          </button>

        </div>
      </div>
    </div>
  )
}

export default Messenger