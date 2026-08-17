import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { PAGE } from "../constants/Constants";
import { useNavigate } from "react-router-dom";

interface PokemonSprites {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}
interface CardProps {
    pokemonSprites: PokemonSprites;
    pokemonName: string;
    pokemonId: number;
}

  function PokemonSprite({ pokemonSprites, pokemonName, pokemonId }: CardProps) {
    pokemonSprites
  const sprites: PokemonSprites = {
    backDefault:
      pokemonSprites.backDefault,
    backShiny:
      pokemonSprites.backShiny,
    frontDefault:
      pokemonSprites.frontDefault,
    frontShiny:
      pokemonSprites.frontShiny,
  };

  const listaSprites: string[] = [
    sprites.backDefault,
    sprites.backShiny,
    sprites.frontDefault,
    sprites.frontShiny,
  ];

  const [indiceActual, setIndiceActual] = useState<number>(0);

  useEffect(() => {
    const temporizador = setInterval(() => {
      setIndiceActual((indicePrevio) => {
        return (indicePrevio + 1) % listaSprites.length;
      });
    }, 500);

    return () => clearInterval(temporizador);
  }, [listaSprites.length]);

    const navigate = useNavigate();

const handleRedirect = (pokemonName: string, id: number) => {
    var pokemonURL = `${PAGE.POKEMON}/${pokemonName}/${id}`;
    navigate(pokemonURL);
  };

  return (
    <Card.Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleRedirect(pokemonName, pokemonId);
      }}
      className="text-decoration-none"
    >
      <Card
        style={{ width: "14rem" }}
        className="text-center p-3 shadow mx-auto mt-4"
      >
        <div
          className="bg-light rounded-circle p-2 mx-auto d-flex align-items-center justify-content-center"
          style={{
            width: "120px",
            height: "120px",
            border: "2px solid #dee2e6",
          }}
        >
          <img
            src={listaSprites[indiceActual]}
            alt="Pokémon Animación Sprite"
            style={{
              width: "96px",
              height: "96px",
              imageRendering: "pixelated",
            }}
          />
        </div>

        <Card.Body className="px-1">
          <Card.Title className="fs-5 mb-1">{pokemonName}</Card.Title>
          <Card.Text className="text-muted small"></Card.Text>
        </Card.Body>
      </Card>
    </Card.Link>
  );
}

export default PokemonSprite;;
