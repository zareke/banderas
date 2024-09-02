import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [points, setPoints] = useState(0);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/flag/images"
      );
      const data = await response.json();
      const countriesData = data.data;
      setCountries(countriesData);
      selectRandomCountry(countriesData);
    }

    fetchCountries();
  }, []);

  function selectRandomCountry(countriesData) {
    const randomCountry =
      countriesData[Math.floor(Math.random() * countriesData.length)];
    setCurrentCountry(randomCountry);
    setTimer(15);
  }

  function handleInputChange(e) {
    setInput(e.target.value.toUpperCase());
  }

  function checkAnswer(isTimeUp = false) {
    if (!isTimeUp && input === currentCountry.name.toUpperCase()) {
      setPoints(points + 10);
    } else {
      setPoints(points - 1);
    }
    setInput("");
    selectRandomCountry(countries);
  }

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      checkAnswer(true);
    }
  }, [timer]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adivina el país por su bandera</h1>
      {currentCountry && (
        <div>
          <img
            src={currentCountry.flag}
            alt="Bandera"
            className={styles.flagImage}
          />
        </div>
      )}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Escribe el nombre del país (en inglés)"
        className={styles.inputField}
      />
      <button onClick={() => checkAnswer(false)} className={styles.button}>
        Comprobar
      </button>
      <div className="centrador">
        <h2 className={styles.points}>Puntos: {points}</h2>
      </div>
      <div className="centrador">
        {" "}
        <h3 className={styles.timer}>Tiempo restante: {timer}</h3>
      </div>
    </div>
  );
}
