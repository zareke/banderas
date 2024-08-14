import { useState, useEffect } from 'react';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [points, setPoints] = useState(0);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(15);

  // Obtener los datos de los países y seleccionar uno aleatoriamente
  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
      const data = await response.json();
      const countriesData = data.data;
      setCountries(countriesData);
      selectRandomCountry(countriesData);
    }

    fetchCountries();
  }, []);

  // Seleccionar un país aleatoriamente
  function selectRandomCountry(countriesData) {
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
    setCurrentCountry(randomCountry);
    console.log(randomCountry)
    setTimer(15); // Reinicia el temporizador
  }

  // Manejar la entrada del usuario
  function handleInputChange(e) {
    setInput(e.target.value.toUpperCase()); // Convertir a mayúsculas
  }

  // Comprobar si la respuesta es correcta
  function checkAnswer(isTimeUp = false) {
    if (!isTimeUp && input === currentCountry.name.toUpperCase()) {
      setPoints(points + 10);
    } else {
      setPoints(points - 1);
    }
    setInput('');
    selectRandomCountry(countries);
  }

  // Temporizador
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      checkAnswer(true); // Cambiar de país cuando se acaba el tiempo
    }
  }, [timer]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Adivina el país por su bandera</h1>
      {currentCountry && (
        <div>
          <img src={currentCountry.flag} alt="Bandera" style={{ width: '200px' }} />
        </div>
      )}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Escribe el nombre del país"
        style={{ textTransform: 'uppercase' }} // Estilo para mostrar mayúsculas
      />
      <button onClick={() => checkAnswer(false)}>Comprobar</button>
      <div>
        <h2>Puntos: {points}</h2>
        <h3>Tiempo restante: {timer}</h3>
      </div>
    </div>
  );
}
