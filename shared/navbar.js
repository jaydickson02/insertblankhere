import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

let navbar = (props) => {

    return(
        
        <Navbar varient="light" expand="sm" style={{paddingTop: '22px', paddingBottom:'22px'}}>
        <Navbar.Brand href="/">Presence</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end"  activeKey={props.activeLink}>
            <Nav.Link href="/articles/all">Articles</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    )
}

export default navbar;