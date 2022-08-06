import Container from '../common/Container'
import Navbar from './navbar/Navbar'

import appStyles from '../../styles/app.module.scss'

const Header = () => (
  <header className={appStyles.header}>
    <Container>
      <Navbar />
    </Container>
  </header>
)

export default Header
