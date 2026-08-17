import Dropdown from "react-bootstrap/Dropdown";
import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";

interface BodyProps {
  pokemon: PokemonResponseDTO;
}

function DropDown({ pokemon }: BodyProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        Skills
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {pokemon.abilities.map((ability) => (
          <div key={ability.name}>
            <Dropdown.Item>{ability.name}</Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
