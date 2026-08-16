import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import  Home  from "./components/Home"
import PokemonDetail from './components/PokemonDetail';
import NavBar from './components/Navbar';
import { PAGE } from "./constants/Constants"

  function App() {


  return (
    <Container className="mt-5">
     
      <Router>
          <section id="center">
            <NavBar/>
            <Routes>
              <Route path={PAGE.HOME} element={<Home/>} />
              <Route path={`${PAGE.POKEMON}`} element={<PokemonDetail />} />
             {/*Home
              <Route path={PAGE.HOME} element={<Body moviesSegmented={moviesSegmented} />} />
              <Route path={`${PAGE.MOVIE}/:title/:id`} element={<WatchMovie />} />
              <Route path={`${PAGE.CREATE_MOVIE}`} element={<CreateMovieForm />} />
              */}
            </Routes>
          </section>
       
      </Router>
    </Container>
  )
}

export default App
