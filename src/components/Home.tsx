import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";
import { Spinner } from 'react-bootstrap';
import DropDown from './DropDown';
import { PokemonSprite } from './PokemonSprite';


function Home() {
  return (
    <Card style={{ width: '18rem' }}>
      {/*<Card.Img variant="top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png" />*/}
      <PokemonSprite/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Category: </ListGroup.Item>
        <ListGroup.Item>Mass: </ListGroup.Item>
        <DropDown/>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Pokemon Details</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Home;
