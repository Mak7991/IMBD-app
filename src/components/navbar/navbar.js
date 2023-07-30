import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";

import logo from "../../assests/MIT_Seal.svg.png";
import { withAppContext } from "../../Context";
import { Button } from "react-bootstrap";
import firebaseInstance from "../../firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NavbarMain() {
  const history = useHistory()

  const onLogout = () => {
    firebaseInstance.logOut()
    setTimeout(() => {
      history.push('/login')
    }, 2000);
  }

  return (
    <Navbar className="mainNavBar" expand="lg">
      <Container>
        <Navbar.Brand href="/profile">
          <img src={logo} style={{ height: '80px', width: '80px' }} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ alignItems: "center" }}>
            <Nav.Link href="/favourite-movies">Favourite Movies</Nav.Link>
            <Nav.Link href="/favourite-series">Favourite Series</Nav.Link>
            <Nav.Link href="/home">Home</Nav.Link>
            {!localStorage.getItem("token") ? null :
              <Button className="logout" onClick={onLogout}>Logout</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withAppContext(NavbarMain);
