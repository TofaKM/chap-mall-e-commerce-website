import { useState } from "react"
import { Badge, Button, Form, FormControl, Nav, Navbar, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import Sidebar from "../side/Sidebar"
import Bag from "../bag/Bag"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/Auth" // Import AuthContext

function Navigation() {
    const [bag, setBag] = useState(false)
    const [side, setSide] = useState(false)

    const { total } = useCart()
    const { user, logoutUser } = useAuth() // Get authentication state

    return (
        <>
            <Navbar expand="lg" bg="light" className="fixed-top p-3 d-flex align-items-center">
                {user && (
                    <Button variant="outline-dark" className="me-2" onClick={() => setSide(!side)}>
                        <i className="bi bi-list"></i>
                    </Button>
                )}
                {/*BRAND*/}
                <Navbar.Brand><NavLink as={Link} to={user ? "/userpage" : "/"}>CHAP</NavLink></Navbar.Brand>
                {/*Home*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <NavLink as={Link} to={user ? "/userpage" : "/"}>Home</NavLink>
                        {!user && <NavLink as={Link} to="/about">About</NavLink>}
                        {!user && <NavLink as={Link} to="/contact">Contact</NavLink>}
                    </Nav>

                    {user ? (
                        <Nav className="ms-auto d-flex align-items-center">
                            <NavLink as={Link} to="/userpage"> 👋 {user.email}</NavLink>
                            <Form className="d-flex me-2">
                                <FormControl id="search" placeholder="Search..." />
                                <Button variant="outline-dark"><i className="bi bi-search"></i></Button>
                            </Form>
                            <Button variant="outline-success" className="me-2" onClick={() => setBag(!bag)}>
                                <i className="bi bi-cart"></i>
                                {total > 0 && <Badge bg="danger">{total}</Badge>}
                            </Button>
                            <Button variant="outline-danger" className="me-2"><i className="bi bi-heart"></i></Button>
                            <Button variant="outline-warning" className="me-2"><i className="bi bi-bell"></i></Button>
                            <Button variant="outline-dark" onClick={logoutUser}><i className="bi bi-box-arrow-right"></i></Button>
                        </Nav>
                    ) : (
                        <Nav className="ms-auto">
                            <NavLink as={Link} to="/login">Login</NavLink>
                            <NavLink as={Link} to="/register">Register</NavLink>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
            {/*SIDEBAR & CART*/}
            {user && (
                <>
                    <Sidebar side={side} closeSide={() => setSide(false)} />
                    <Bag bag={bag} closeBag={() => setBag(false)} />
                </>
            )}
        </>
    );
}

export default Navigation;
