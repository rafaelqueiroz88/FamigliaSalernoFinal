import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const NavigationBar = () => {

    let history = useHistory()
    const user_slug = localStorage.getItem('slug') != null ? localStorage.getItem('slug') : null

    const handleLogOff = (e) => {
        e.preventDefault()
        localStorage.clear('token')
        localStorage.clear('slug')
        localStorage.clear('email')
        localStorage.clear('user_type')
        history.go(0)
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Famiglia Salerno</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/pizzas">Pizzas</Nav.Link>
                            {
                                user_slug == null ? 
                                '' :
                                <Nav.Link href={`/enderecos/${user_slug}`}>Endereços</Nav.Link>
                            }

                            {
                                user_slug == null ? 
                                '' :
                                <Nav.Link href={`/pedidos/${user_slug}`}>Endereços</Nav.Link>
                            }
                            
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    <Nav>
                        {
                            user_slug == null ? 
                            <Nav.Link href="/entrar">Entrar</Nav.Link> :
                            <Nav.Link onClick={handleLogOff} >Sair</Nav.Link>
                        }
                        
                        {/* <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar