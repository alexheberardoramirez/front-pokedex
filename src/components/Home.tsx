import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PokemonCard from './PokemonCard';

function Home() {


  return (
        <Container fluid="md">
      <Row>
        <Col><PokemonCard/></Col>
        <Col><PokemonCard/></Col>
        <Col><PokemonCard/></Col>
        <Col><PokemonCard/></Col>
      </Row>
        <Row>
        <Col><PokemonCard/></Col>
        <Col><PokemonCard/></Col>
        <Col><PokemonCard/></Col>
        <Col><PokemonCard/></Col>
      </Row>
    </Container>






  );
}

export default Home;
