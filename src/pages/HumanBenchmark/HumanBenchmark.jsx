import styles from './HumanBenchmark.module.sass'
import lightning from '../../assets/lightning.svg'

function HumanBenchmark() {
  return (
    <section class={styles.container}>
      <img src={lightning} alt="⚡" class={styles.logo}/>
      <h2>Human Benchmark</h2>
      <h4>Click anywhere to begin</h4>
    </section>
  )
}

export default HumanBenchmark
