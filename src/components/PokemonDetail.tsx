import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProgressBar } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";
import pokemonService from "../services/PokemonService ";
import { useParams } from "react-router-dom";

function PokemonDetail() {
  const [pokemon, setPokemon] = useState<PokemonResponseDTO>(
    {} as PokemonResponseDTO,
  );
  
  const { id, title } = useParams() as { id: string; title: string };

  useEffect(() => {
    onLandPokemonDetailsPage();
  }, []);

  const onLandPokemonDetailsPage = async (): Promise<void> => {
    var getPokemon: PokemonResponseDTO = await pokemonService.getPokemonById(id);
    title
    setPokemon(getPokemon);
  };

  if (Object.keys(pokemon).length === 0|| 
    
    !pokemon.sprites || !pokemon.sprites.frontShiny ||
    
    !pokemon.types || pokemon.types.length === 0 ||
    
    !pokemon.stats || pokemon.stats.length === 0 ||
    
    !pokemon.abilities || pokemon.abilities.length === 0) {
    return (
      <Container className="text-center py-5">
        <h2>Loading Data...</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-capitalize">{pokemon.name}</h2>
      
      <Stack gap={2}>
        <div className="p-2 text-center">
          <Image
            src={pokemon.sprites?.frontShiny}
            fluid
            style={{ width: '120px', imageRendering: 'pixelated' }}
          />
        </div>
        <p className="mb-1 fw-bold">{pokemon.flavorTextEntries[0].flavor_text}</p>
        <div className="p-2">
          <Container>
            <Row>
              <Col md={6}>
                <div className="w-100 p-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name}>
                    <p className="mb-1 fw-bold">{stat.name}</p>
                    <ProgressBar now={stat.base_stat} label={`${stat.base_stat}%`} className="w-50 mb-3" />
                    </div>
                    ))}
                </div>
              </Col>
              
              <Col md={6}>
                <Stack gap={1}>
                  <div className="p-2">
                    <ListGroup className="w-100 mt-3">
                      <ListGroup.Item className="bg-light fw-bold">Evolutionary Lineage</ListGroup.Item>
                      <ListGroup.Item>{pokemon.chain.name_one}</ListGroup.Item>
                      <ListGroup.Item>{pokemon.chain.name_two}</ListGroup.Item>
                      <ListGroup.Item>{pokemon.chain.name_three}</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Stack>
              </Col>
            </Row>
          </Container>
        </div>
      </Stack>
    </Container>
  );
}

export default PokemonDetail;
