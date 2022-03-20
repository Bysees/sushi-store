import React from 'react'

import Container from '../common/Container'
import LoginForm from '../forms/login/LoginForm'
import RegistrationForm from '../forms/registration/RegistrationForm'
import Navbar from './navbar/Navbar'

import { useToogle } from '../../hooks/useToogle'

import appStyles from '../../styles/app.module.scss'

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