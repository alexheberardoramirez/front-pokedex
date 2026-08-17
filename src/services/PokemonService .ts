import type { PokemonResponseDTO, PokemonRequestDTO } from "../interfaces/pokemon.ts";
import { API_CONFIG } from "../constants/Constants.ts"

const PokemonService  = {

  searchPokemons: async (query: string, numberOfPokemons: number = 8): Promise<PokemonResponseDTO[]> => {
    try {

      const urlBase = `${API_CONFIG.BASE_URL_POKEMON}${API_CONFIG.SEARCH_ENDPOINT}${API_CONFIG.NUMBER_OF_POKEMONS}${numberOfPokemons}`;
     
      const urlCompleta = query ? `${urlBase}?query=${query}` : urlBase;

      const response = await fetch(urlCompleta);
        
      if (!response.ok) {
        throw new Error('Server error connection');
      }

      const pokemons: PokemonResponseDTO[] = await response.json();

      return pokemons;
    } catch (error) {
      console.error("Server error connection:", error);
      return [];
    }
  },

    getPokemonById: async (id: string): Promise<PokemonResponseDTO> => {
    try {
      const urlBase = `${API_CONFIG.BASE_URL_POKEMON}/${id}`
   
      const urlCompleta = id ? urlBase : urlBase;

      const response = await fetch(urlCompleta);

      if (!response.ok) {
        throw new Error('Server error connection');
      }

      const pokemon: PokemonResponseDTO = await response.json();

      return pokemon;
    } catch (error) {
      console.error("Server error connection", error);
      return {} as PokemonResponseDTO;
    }
  },
    savePokemon: async (pokemon: PokemonRequestDTO): Promise<PokemonRequestDTO> => {
    const urlBase = `${API_CONFIG.BASE_URL_POKEMON}`

    console.log("payload#######")
    console.log(pokemon)
    const response = await fetch(urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //
      },
      body: JSON.stringify(pokemon),
    });

  

    if (!response.ok) {
      const errorData = await response.json()
      
      const errorMessage = JSON.stringify(errorData);
      if (errorMessage.includes('E11000')) {
        const regex = /WriteError\{(code=\d+),\s*message='([^']+)',\s*details=\{([^}]*)\}\}/;
        const coincidencia = errorMessage.match(regex) ?? (Object.assign(["", "", ""], { index: 0, input: "" }) as RegExpMatchArray);
        const mensajeTxt = coincidencia[2];
        const regexDetalle = /(title dup key:\s*\{[^}]+\})/;
        const coincidenciaDetalle = mensajeTxt.match(regexDetalle);
        const detalleClave = coincidenciaDetalle ? coincidenciaDetalle[1] : "";

        throw new Error(detalleClave);
      } else {
        throw new Error('Error due Server Connection!');
      }
    }

    const responseMovie: PokemonResponseDTO = await response.json();
  
    console.log("responseMovie#######")
    console.log(responseMovie)
    
    return responseMovie;
  }
};




export default PokemonService ;