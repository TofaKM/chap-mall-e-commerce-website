import { Navbar, NavLink, Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"

function Sidebar ({side,closeSide}){
    return(
        <>
        <Offcanvas placement="start" show={side} onHide={closeSide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>MENU</Offcanvas.Title>
            </Offcanvas.Header>
            <hr />
            <Offcanvas.Body>
                <Navbar className="d-block">
                    <NavLink as={Link} to="/history">Go to Purchase History 📜</NavLink>
                </Navbar>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}
export default Sidebar