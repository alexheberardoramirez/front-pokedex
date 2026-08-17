import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Home  from "./components/Home"
import PokemonDetail from './components/PokemonDetail';
import PokemonNavBar from './components/PokemonNavBar';
import { PAGE } from "./constants/Constants"
import { useEffect, useState } from 'react';
import pokemonService from './services/PokemonService '
import type { PokemonResponseDTO } from "./interfaces/pokemon.ts";
import Create from './components/Create.tsx';


  function App() {

    const [pokemons, setPokemons] = useState<PokemonResponseDTO[]>([]);

         useEffect(() => {
        onLandHomePageGetPokemons('');
      }, []);

    const onLandHomePageGetPokemons = async (query: string): Promise<void> => {
    var getPokemons: PokemonResponseDTO[] = await pokemonService.searchPokemons(query);
    setPokemons(getPokemons);
  };

  return (
    <Container className="mt-5">
     
      <Router>
          <section id="center">
            <PokemonNavBar/>
            <Routes>
              <Route path={PAGE.HOME} element={<Home pokemons={pokemons}/>} />
              <Route path={`${PAGE.POKEMON}/:title/:id`} element={<PokemonDetail />} />
              <Route path={PAGE.CREATE} element={<Create />} />
            </Routes>
          </section>
       
      </Router>
    </Container>
  )
}

export default App
