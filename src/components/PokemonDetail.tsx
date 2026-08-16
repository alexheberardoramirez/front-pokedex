import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProgressBar } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

function PokemonDetail() {
  return (
    <Stack gap={2}>
      <div className="p-2">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
          fluid
        />
      </div>
      <div className="p-2">
        <p>
          {" "}
          A strange seed was\nplanted on its\nback at birth.\fThe plant
          sprouts\nand grows with\nthis POKéMON.
        </p>
      </div>
      <div className="p-2">
        <Container>
          <Row>
            <Col>
              <div className="w-100 p-3">
                <p>hp</p>
                <ProgressBar now={60} label={`${60}%`} className="w-25" />
                <p>attack</p>
                <ProgressBar now={20} label={`${60}%`} className="w-25" />
                <p>defense</p>
                <ProgressBar now={90} label={`${90}%`} className="w-25" />
              </div>
            </Col>
            <Col>
              <Stack gap={1}>
                <div className="p-2">
                  <ListGroup className="w-50 mx-auto mt-3">
                    <ListGroup.Item>evolutionary lineage</ListGroup.Item>
                    <ListGroup.Item>bulbasaur</ListGroup.Item>
                    <ListGroup.Item>ivysaur</ListGroup.Item>
                    <ListGroup.Item>venusaur</ListGroup.Item>
                  </ListGroup>
                </div>
              </Stack>
            </Col>
          </Row>
        </Container>
      </div>
    </Stack>
  );
}

export default PokemonDetail;
