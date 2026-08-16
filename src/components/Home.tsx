import { useEffect, useState } from 'react';
import pokemonService from '../services/PokemonService '
import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PokemonCard from './PokemonCard';

function Home() {
    const [pokemons, setPokemons] = useState<PokemonResponseDTO[]>([]);

         useEffect(() => {
        onLandHomePageGetPokemons('');
      }, []);

    const onLandHomePageGetPokemons = async (query: string): Promise<void> => {
    var getPokemons: PokemonResponseDTO[] = await pokemonService.searchPokemons(query);

    //var getSegmentedMovies: PokemonResponseDTO[][] = Util.segmentMovies(getMovies);

    setPokemons(getPokemons);

  };
  console.log(pokemons)
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
