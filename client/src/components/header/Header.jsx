import React from 'react'
import { useToogle } from '../../hooks/useToogle'

import Container from '../common/Container'
import LoginForm from '../forms/login/LoginForm'
import RegistrationForm from '../forms/registration/RegistrationForm'

import appStyles from '../../styles/app.module.scss'
import Navbar from './navbar/Navbar'

const Header = () => {

  const [isLoginForm, showLoginForm, hideLoginForm] = useToogle(false)
  const [isRegistrationForm, showRegistrationForm, hideRegistrationForm] = useToogle(false)

  return (
    <header className={appStyles.header}>

      {isLoginForm && <LoginForm onHide={hideLoginForm} />}
      {isRegistrationForm && <RegistrationForm onHide={hideRegistrationForm} />}

      <Container>
        <Navbar
          showLoginForm={showLoginForm}
          showRegistrationForm={showRegistrationForm}
        />
      </Container>

    </header >
  )
}

export default Header