import { inject, observer } from 'mobx-react'
import { Navbar, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NavLinkItem } from './navigation'

const Header = ({ Authentication }) => {
  const location = useLocation()

  if (!Authentication.IsAuthenticated) {
    return null
  }

  const principal = Authentication.Principal
  const name = `${principal.firstName} ${principal.lastName}`
  const initials = `${principal.firstName.substring(0, 1)}${principal.lastName.substring(0, 1)}`

  return (
    <header role="banner">
      <Navbar staticTop fluid>
        <Navbar.Header>
          <Navbar.Brand className="logo">
            <a href="/">Stack<span className="logo-shaded">Hat</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav role="navigation" aria-label="Main navigation">
            <NavLinkItem
              to="/dashboard"
              isActive={location.pathname.startsWith("/dashboard")}
              text="Home"
              icon="home"
            />
          </Nav>
          <Nav pullRight>
            <NavLinkItem to="/account" title={name} text={initials} />
            <NavLinkItem to="/logout" text="Sign Out" icon="sign-out-alt" />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  Authentication: PropTypes.shape({
    IsAuthenticated: PropTypes.bool.isRequired,
    Principal: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
}

export default inject("Authentication")(observer(Header))
