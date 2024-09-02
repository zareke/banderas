import styles from '../styles/Home.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido/a al Super Epico Juegazo de las Banderas</h1>
      <p className={styles.description}>
        ¿Cuánto sabes sobre las banderas del mundo? Poné a prueba tus conocimientos
        adivinando el país a partir de su bandera. ¡Ganas 10 puntos por cada respuesta correcta! <br></br>(Los nombres de los paises estan en inglés)
      </p>
      <button
        className={styles.button}
        onClick={() => window.location.href = '/juego'}
      >
        Comenzar Juego
      </button>
    </div>
  )
}