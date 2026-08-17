import type { PokemonRequestDTO } from "../interfaces/pokemon.ts";
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import { useEffect } from 'react';
import pokemonService from '../services/PokemonService '
import type { PokemonResponseDTO } from "../interfaces/pokemon.ts";

export function Create() {
    const [pokemons, setPokemons] = useState<PokemonRequestDTO[]>([]);
  // 1. Inicializamos el estado con la estructura exacta del RequestDTO
  // Incluimos valores por defecto válidos para cumplir con los @NotNull y @NotEmpty de tu Java
  const [formData, setFormData] = useState<PokemonRequestDTO>({
    name: 'alex',
    weight: 120,
    customName: '',
    sprites: {
      frontDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      frontShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      backDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      backShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
    },

    abilities: [{ name: 'overgrow' }],
    types: [{ name: 'grass' }],
    stats: [{ base_stat: 45, name: "a", }],
    flavorTextEntries: [{ flavor_text: "flavor" }],
    chain: {  name_one: 'a',name_two: 'b', name_three: 'c', }
  });

  // Estado para capturar errores visuales en el formulario (HTML5 validation)
  const [validated, setValidated] = useState(false);

  // Manejador común para inputs de texto y número simples
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Si el campo es 'weight', lo parseamos a número entero para que calce con el 'int' de Java
      [name]: name === 'weight' ? parseInt(value) || 0 : value
    }));
  };

  // Manejador del envío del formulario (Submit)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      // Enviamos el JSON al controlador de Spring Boot
      const response = await fetch('http://localhost:8080/api/v1/pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('¡Pokémon creado con éxito en la base de datos!');
        // Aquí puedes resetear el formulario o redirigir al usuario
      } else {
        const errorData = await response.json();
        alert(`Error del servidor: ${errorData.message || 'No se pudo guardar'}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un problema de conexión con el backend.');
    }
  };

  /*
           useEffect(() => {
        onLandCreatePage('');
      }, []);

    const onLandCreatePage = async (query: string): Promise<void> => {
    var getPokemon: PokemonResponseDTO[] = await pokemonService.savePokemon(formData);
  //  setPokemons(getPokemons);
  };*/
    const saludar = () => {
        pokemonService.savePokemon(formData);
    };
  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <Card className="shadow">
        <Card.Header className="bg-primary text-white text-center py-3">
          <Card.Title className="mb-0">Registrar Nuevo Pokémon</Card.Title>
        </Card.Header>
        <Card.Body className="p-4">
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="g-3">
              
              {/* Campo: Name (@NotBlank) */}
              <Col xs={12}>
                <Form.Group controlId="formPokemonName">
                  <Form.Label className="fw-bold">Nombre del Pokémon *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Bulbasaur"
                  />
                  <Form.Control.Feedback type="invalid">
                    El nombre es requerido y no puede estar vacío.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Campo: Custom Name (Opcional) */}
              <Col xs={12}>
                <Form.Group controlId="formPokemonCustomName">
                  <Form.Label className="fw-bold">Nombre Personalizado (Apodo)</Form.Label>
                  <Form.Control
                    type="text"
                    name="customName"
                    value={formData.customName}
                    onChange={handleChange}
                    placeholder="Ej. Mi Compañero Verde"
                  />
                </Form.Group>
              </Col>

              {/* Campo: Weight (@NotNull int) */}
              <Col xs={12}>
                <Form.Group controlId="formPokemonWeight">
                  <Form.Label className="fw-bold">Peso (en hectogramos) *</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="1"
                    name="weight"
                    value={formData.weight || ''}
                    onChange={handleChange}
                    placeholder="Ej. 69"
                  />
                  <Form.Control.Feedback type="invalid">
                    El peso es requerido y debe ser mayor a 0.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Información sobre los campos automáticos */}
              <Col xs={12}>
                <div className="alert alert-info small mb-0 mt-2">
                  ℹ️ Los Sprites, Habilidades, Estadísticas y Cadena de evolución se adjuntarán automáticamente con valores base válidos para cumplir con las restricciones del servidor.
                </div>
              </Col>

              {/* Botón de Envío */}
              <Col xs={12} className="text-end mt-4">
                <Button type="submit" variant="success" className="px-4 w-100" onClick={saludar}>
                  Guardar Pokémon en la Base de Datos
                </Button>
              </Col>

            </Row>
          </Form>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default Create
