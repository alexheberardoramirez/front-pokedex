import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PAGE } from "../constants/Constants";
import { useNavigate } from "react-router-dom";

function PokemonNavBar() {
  const navigate = useNavigate();

  const handleRedirect = (page: string) => {
    navigate(page);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Pokemons</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                handleRedirect(PAGE.HOME);
              }}
              className="text-decoration-none"
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                handleRedirect(PAGE.CREATE);
              }}
              className="text-decoration-none"
            >
              Create
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PokemonNavBar;
