import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import UserChat from './chats/UserChat'
import AdminChat from './chats/AdminChat'


const Messenger = () => {

  const user = useSelector(state => {
    return {
      name: state.user.name,
      role: state.user.role,
    }
  })
  const isAdmin = user.role === 'admin'

  //! DONE - TODO 1: При подключении Админа, проверить уже подключенных юзеров и отобразить в навбаре
  //! DONE - TODO 2: При введение сообщения, показывать что собеседник его печатает
  // TODO - Получать уведомление о том, что пользователь отключился от чата.
  //TODO 3: Продумать декомпозицию

  return (
    <Fragment>
      {isAdmin
        ? <AdminChat />
        : <UserChat />
      }
    </Fragment>

  )
}

export default Messenger