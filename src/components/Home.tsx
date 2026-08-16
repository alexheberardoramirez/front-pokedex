import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PokemonCard from './PokemonCard';
import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";

interface BodyProps {
    pokemons: PokemonResponseDTO[];
}

function Home({ pokemons }: BodyProps) {

  return (
        <Container fluid="md">
            <Row>
                {pokemons.map((pokemon) => (
                <Col key={pokemon.id}>
                    <PokemonCard pokemon={pokemon} />
                </Col>
                ))}
            </Row>
       </Container>


  );
}

export default Home;
