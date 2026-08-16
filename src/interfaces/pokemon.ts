export interface PokemonSprites {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface FlavorTextEntriesResponse {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

// Representación básica para la cadena de evolución (puedes hacerla más estricta si lo requieres)
export interface ChainResponse {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainResponse[]; // Estructura recursiva para las evoluciones
}

// 2. Interfaz Principal (Equivalente a tu public record)
export interface PokemonResponseDTO {
  id: number;          // Long en Java equivale a number en TS
  name: string;
  weight: number;      // int equivale a number en TS
  sprites: PokemonSprites;
  abilities: PokemonAbility[]; // List<> equivale a arreglos [] en TS
  types: PokemonType[];
  stats: Stats[];
  flavorTextEntries: FlavorTextEntriesResponse[];
  chain: ChainResponse;
  customName: string;
}