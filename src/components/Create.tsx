import type { PokemonRequestDTO } from "../interfaces/pokemon.ts";
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import pokemonService from '../services/PokemonService '
import type { Stats, PokemonSprites, PokemonAbility, PokemonType, ChainResponse } from "../interfaces/pokemon.ts";

export function Create() {
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
    flavorTextEntries: [{ flavor_text: "any kind of description " }],
    chain: {  name_one: 'a',name_two: 'b', name_three: 'c', }
  });

  const [sprites, setSprites] = useState<PokemonSprites>({
  frontDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  frontShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  backDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  backShiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
});

const [abilities, setAbilities] = useState<PokemonAbility[]>([
  { name: 'overgrow' }
]);
const [inputAbility, setInputAbility] = useState<string>('');


const [types, setTypes] = useState<PokemonType[]>([
  { name: 'grass' } // Tu valor inicial por defecto
]);

// Estado temporal para el cuadro de texto
const [inputType, setInputType] = useState<string>('');

// Maneja lo que el usuario escribe en el input de tipo
const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputType(e.target.value);
};

// Agrega el nuevo tipo al arreglo sin borrar los anteriores
const handleAddType = () => {
  if (!inputType.trim()) return; // Evita agregar si está vacío

  const newType: PokemonType = {
    name: inputType.trim().toLowerCase() // Guarda en minúsculas para estandarizar
  };

  // ACUMULA: Mantiene los anteriores y suma el nuevo
  setTypes((prev) => [...prev, newType]);
  
  // Limpia el cuadro de texto
  setInputType('');
};

// 1. Estado principal que se enviará al DTO de Java
const [stats, setStats] = useState<Stats[]>([
  { base_stat: 45, name: 'hp' } // Valor inicial por defecto para cumplir con el @NotEmpty
]);

// 2. Estados temporales para los dos campos del "borrador"
const [inputStatName, setInputStatName] = useState<string>('hp'); // Iniciamos con un tipo común
const [inputBaseStat, setInputBaseStat] = useState<number>(0);

// 3. Función para acumular la estadística en el arreglo
const handleAddStat = () => {
  if (!inputStatName.trim() || inputBaseStat <= 0) return; // Validación básica

  const newStat: Stats = {
    base_stat: inputBaseStat,
    name: inputStatName.trim().toLowerCase()
  };

  // ACUMULA: Mantiene los anteriores y agrega el nuevo objeto estructurado
  setStats((prev) => [...prev, newStat]);

  // Limpiamos los campos para la siguiente entrada
  setInputBaseStat(0);
};

const [chain, setChain] = useState<ChainResponse>({
  name_one: '',
  name_two: '',
  name_three: ''
});

const handleChainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setChain((prevChain) => ({
    ...prevChain,
    [name]: value // Actualiza dinámicamente name_one, name_two o name_three
  }));
};


const handleAbilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputAbility(e.target.value);
};


// Agrega la nueva habilidad al arreglo sin borrar las anteriores
const handleAddAbility = () => {
  if (!inputAbility.trim()) return; // No agrega si está vacío

  const newAbility: PokemonAbility = {
    name: inputAbility.trim().toLowerCase() // Formato limpio
  };

  // ACUMULA: Mantiene las anteriores (...prev) y agrega la nueva
  setAbilities((prev) => [...prev, newAbility]);
  
  // Limpia el textbox para que escriba la siguiente
  setInputAbility('');
};


const handleSpriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setSprites((prev) => ({
    ...prev,
    [name]: value
  }));
};


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

        setFormData((prevData) => ({
        ...prevData,
        stats: stats
        }));

        setFormData((prevData) => ({
        ...prevData,
        abilities: abilities
        }));

       const responsePokemon = pokemonService.savePokemon(formData);


      if (responsePokemon !== null) {
        alert('Pokemon saved in db successfully');
      } else {
        alert(`Server Error: Not able to save pokemon'}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error in backend');
    }
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
                  <Form.Label className="fw-bold">Pokémon Name *</Form.Label>
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

              {/* Campo: Weight (@NotNull int) */}
              <Col xs={12}>
                <Form.Group controlId="formPokemonWeight">
                  <Form.Label className="fw-bold">Mass *</Form.Label>
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

           {/* 1. Input Sprite 2 */}
                <Col xs={12} md={6}>
                    <Form.Group controlId="formPokemonFrontDefault">
                    <Form.Label className="fw-bold">Sprite 1 *</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="frontDefault" // 👈 Debe llamarse igual que la llave del objeto
                        value={sprites.frontDefault}
                        onChange={handleSpriteChange} // 👈 Usamos la misma función
                        placeholder="https://..."
                    />
                    <Form.Control.Feedback type="invalid">
                        Insert a valid HTTP image URL.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                {/* 2. Input Sprite 2 */}
                <Col xs={12} md={6}>
                    <Form.Group controlId="formPokemonFrontShiny">
                    <Form.Label className="fw-bold">Sprite 2 *</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="frontShiny" // 👈 Debe llamarse igual que la llave del objeto
                        value={sprites.frontShiny}
                        onChange={handleSpriteChange} // 👈 Usamos la misma función
                        placeholder="https://..."
                    />
                    <Form.Control.Feedback type="invalid">
                        Insert a valid HTTP image URL.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Col>

            {/* Campo: Third Stripe (@NotNull int) */}
              <Col xs={12}  md={6}>
                <Form.Group controlId="formPokemonWeight">
                  <Form.Label className="fw-bold">Sprite 3 *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="backDefault"
                    value={sprites.backDefault}
                    onChange={handleSpriteChange}
                    placeholder="https://..."
                  />
                  <Form.Control.Feedback type="invalid">
                    Este Campo debe ser el link de una imagen.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

            {/* Campo: Four Stripe (@NotNull int) */}
              <Col xs={12} md={6}>
                <Form.Group controlId="formPokemonWeight">
                  <Form.Label className="fw-bold">Sprite 4 *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="backShiny"
                    value={sprites.backShiny}
                    onChange={handleSpriteChange}
                    placeholder="https://..."
                  />
                  <Form.Control.Feedback type="invalid">
                    Este Campo debe ser el link de una imagen.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

             <Col xs={12}>
                <Form.Group controlId="formPokemonAbility" className="mb-3">
                    <Form.Label className="fw-bold"> Add Abilities *</Form.Label>
                    <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Ej. Jump"
                        value={inputAbility}          // Conectado al estado del texto
                        onChange={handleAbilityChange} // Actualiza el texto
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddAbility();     // Permite agregar presionando Enter
                        }
                        }}
                    />
                    <Button type="button" onClick={handleAddAbility}>
                        Add
                    </Button>
                    </div>
                </Form.Group>

                {/* Visualizador de habilidades acumuladas (con su respectivo key único) */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {abilities.map((ability) => (
                    <span key={ability.name} className="badge bg-primary p-2">
                        {ability.name}
                    </span>
                    ))}
                </div>
                </Col>
  
                <Col xs={12}>
                <Form.Group controlId="formPokemonType" className="mb-3">
                    <Form.Label className="fw-bold">Add Types *</Form.Label>
                    <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Ej. Fire"
                        value={inputType}          // Conectado al estado temporal del texto
                        onChange={handleTypeChange} // Actualiza el texto en tiempo real
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddType();        // Agrega el tipo al presionar Enter
                        }
                        }}
                    />
                    <Button type="button" variant="secondary" onClick={handleAddType}>
                        Add
                    </Button>
                    </div>
                </Form.Group>

                {/* Visualizador de tipos acumulados en formato Badge (etiquetas) */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {types.map((type) => (
                    <span key={type.name} className="badge bg-success p-2 text-capitalize">
                        {type.name}
                    </span>
                    ))}
                </div>
                </Col>


                    <Col xs={12}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Add Stats *</Form.Label>
                        <Row className="g-2">
                        
                        {/* Selector o entrada para el nombre de la estadística */}
                        <Col xs={6}>
                            <Form.Select 
                            value={inputStatName} 
                            onChange={(e) => setInputStatName(e.target.value)}
                            >
                            <option value="hp">HP</option>
                            <option value="attack">Attack</option>
                            <option value="defense">Defense</option>
                            <option value="special-attack">Sp. Atk</option>
                            <option value="special-defense">Sp. Def</option>
                            <option value="speed">Speed</option>
                            </Form.Select>
                        </Col>

                        {/* Input numérico para el base_stat */}
                        <Col xs={4}>
                            <Form.Control
                            type="number"
                            placeholder="Value"
                            min="1"
                            value={inputBaseStat || ''}
                            onChange={(e) => setInputBaseStat(parseInt(e.target.value) || 0)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddStat(); // Permite añadir rápido con Enter
                                }
                            }}
                            />
                        </Col>

                        {/* Botón para agregar */}
                        <Col xs={2}>
                            <Button 
                            type="button" 
                            variant="info" 
                            className="w-100 text-white" 
                            onClick={handleAddStat}
                            >
                            Add
                            </Button>
                        </Col>

                        </Row>
                    </Form.Group>

                    {/* Visualizador de Estadísticas Acumuladas */}
                    <div className="mb-3 p-2 bg-light rounded border">
                        <span className="d-block small text-muted fw-bold mb-2">Current Stats:</span>
                        {stats.length === 0 ? (
                        <span className="text-secondary small">No stats added yet.</span>
                        ) : (
                        <div className="d-flex flex-wrap gap-2">
                            {stats.map((st, index) => (
                            <span key={index} className="badge bg-info p-2 text-capitalize">
                                {st.name}: {st.base_stat}
                            </span>
                            ))}
                        </div>
                        )}
                    </div>
                    </Col>


              {/* Campo: description */}
              <Col xs={12}>
                <Form.Group controlId="formPokemonWeight">
                  <Form.Label className="fw-bold">Description *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    min="1"
                    name="flavorTextEntries"
                    value={formData.flavorTextEntries[0].flavor_text}
                    onChange={handleChange}
                    placeholder="Ej. this its a legendary pokemon from season 5"
                  />
                  <Form.Control.Feedback type="invalid">
                    You must insert a description
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
                  {/* Evolución 1 */}
                <Col md={4} xs={12}>
                <Form.Group controlId="formChainOne" className="mb-3">
                    <Form.Label className="fw-bold">Evolution 1 *</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    name="name_one" // Coincide con la interfaz
                    value={chain.name_one}
                    onChange={handleChainChange}
                    placeholder="Ej. Bulbasaur"
                    />
                </Form.Group>
                </Col>

                {/* Evolución 2 */}
                <Col md={4} xs={12}>
                <Form.Group controlId="formChainTwo" className="mb-3">
                    <Form.Label className="fw-bold">Evolution 2</Form.Label>
                    <Form.Control
                    type="text"
                    name="name_two" 
                    value={chain.name_two}
                    onChange={handleChainChange}
                    placeholder="Ej. Ivysaur"
                    />
                </Form.Group>
                </Col>

                {/* Evolución 3 */}
                <Col md={4} xs={12}>
                <Form.Group controlId="formChainThree" className="mb-3">
                    <Form.Label className="fw-bold">Evolution 3</Form.Label>
                    <Form.Control
                    type="text"
                    name="name_three"
                    value={chain.name_three}
                    onChange={handleChainChange}
                    placeholder="Ej. Venusaur"
                    />
                </Form.Group>
                </Col>

               {/* Campo: Custom Name */}
              <Col xs={12}>
                <Form.Group controlId="formPokemonCustomName">
                  <Form.Label className="fw-bold">Custom Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customName"
                    value={formData.customName}
                    onChange={handleChange}
                    placeholder="Ej. Mi Compañero Verde"
                  />
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
                <Button type="submit" variant="success" className="px-4 w-100" >
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
