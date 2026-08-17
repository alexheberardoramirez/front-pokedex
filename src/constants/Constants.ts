export const API_CONFIG = {
  BASE_URL_POKEMON: 'http://localhost:8080/api/v1/pokemon',
  NUMBER_OF_POKEMONS: '?offset=0&limit=',
  SEARCH_ENDPOINT: '/pagination',
  GET_POKEMON_BY_ID_ENDPOINT: '/pokemon?id=',
  DEFAULT_LIMIT: 10,
} as const;

export const PAGE = {
  HOME: '/',
  CREATE: '/create',
  POKEMON: '/pokemon'
} as const;