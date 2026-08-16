import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button, Container, Alert } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0)

  return (
  <Container className="mt-5">
      <Alert variant="success">
        ¡Bootstrap está funcionando correctamente con TypeScript!
      </Alert>
      <Button variant="primary">Botón de Bootstrap</Button>
    </Container>
  )
}

export default App
