import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarMenu.css';  // Import the CSS file

function NavbarMenu() {
return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
    <Container>
        <Navbar.Brand href="#home">Metric Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto small-nav">  {/* Add custom class small-nav */}
            <Nav.Link href="./dashboard">Dashboard</Nav.Link>
            <Nav.Link href="./school">School</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
);
}

export default NavbarMenu;
