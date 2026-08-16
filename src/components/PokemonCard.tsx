import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DropDown from "./DropDown";
import { PokemonSprite } from "./PokemonSprite";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../constants/Constants";

function PokemonCard() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    var movieURL = `${PAGE.POKEMON}`;
    navigate(movieURL);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <PokemonSprite />
      <Card.Body>
        <Card.Text>
          A strange seed was\nplanted on its\nback at birth.\fThe plant
          sprouts\nand grows with\nthis POKéMON.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Category: Fire</ListGroup.Item>
        <ListGroup.Item>Mass: 15</ListGroup.Item>
        <DropDown />
      </ListGroup>
      <Card.Body>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            handleRedirect();
          }}
          className="text-decoration-none"
        >
          Pokemon Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
