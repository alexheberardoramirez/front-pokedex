import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DropDown from "./DropDown";
import PokemonSprite from "./PokemonSprite";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../constants/Constants";
import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";

interface CardProps {
    pokemon: PokemonResponseDTO;
}

function PokemonCard({ pokemon }: CardProps) {
  const navigate = useNavigate();

  const handleRedirect = (pokemonName: string, id: number) => {
    var pokemonURL = `${PAGE.POKEMON}/${pokemonName}/${id}`;
    navigate(pokemonURL);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <PokemonSprite pokemonSprites={pokemon.sprites} pokemonName={pokemon.name} pokemonId={pokemon.id}/>
      <Card.Body>
        <Card.Text>
          {pokemon.flavorTextEntries[0].flavor_text}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Category: {pokemon.types[0].name}</ListGroup.Item>
        <ListGroup.Item>Mass: {pokemon.weight}</ListGroup.Item>
        <DropDown pokemon={pokemon}/>
      </ListGroup>
      <Card.Body>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            handleRedirect(pokemon.name, pokemon.id);
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
