import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";
import { API_CONFIG } from "../constants/Constants.ts"

const PokemonService  = {

  searchPokemons: async (query: string, numberOfPokemons: number = 8): Promise<PokemonResponseDTO[]> => {
    try {

      const urlBase = `${API_CONFIG.BASE_URL_POKEMON}${API_CONFIG.SEARCH_ENDPOINT}${API_CONFIG.NUMBER_OF_POKEMONS}${numberOfPokemons}`;
      console.log("getpokemonspagination%%%%")
      console.log(`${API_CONFIG.BASE_URL_POKEMON}${API_CONFIG.SEARCH_ENDPOINT}${API_CONFIG.NUMBER_OF_POKEMONS}${numberOfPokemons}`)
    
      const urlCompleta = query ? `${urlBase}?query=${query}` : urlBase;

      const response = await fetch(urlCompleta);
        
      if (!response.ok) {
        throw new Error('Server error connection');
      }

      const pokemons: PokemonResponseDTO[] = await response.json();

     // console.log(pokemons)
      return pokemons;
    } catch (error) {
      console.error("Server error connection:", error);
      return [];
    }
  },

};


export default PokemonService ;