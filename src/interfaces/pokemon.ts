export interface PokemonSprites {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}

export interface PokemonAbility {
  name: string;
}

export interface PokemonType {
  name: string;
}

export interface Stats {
  base_stat: number;
  name: string;
}

export interface FlavorTextEntriesResponse {
  flavor_text: string;
}

export interface ChainResponse {
  name_one: string;
  name_two: string;
  name_three: string;
}

export interface PokemonResponseDTO {
  id: number;
  name: string;
  weight: number;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: Stats[];
  flavorTextEntries: FlavorTextEntriesResponse[];
  chain: ChainResponse;
  customName: string;
}

export interface PokemonRequestDTO {
  name: string;
  weight: number;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: Stats[];
  flavorTextEntries: FlavorTextEntriesResponse[];
  chain: ChainResponse;
  customName: string;
}