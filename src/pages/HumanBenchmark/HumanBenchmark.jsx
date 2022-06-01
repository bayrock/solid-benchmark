import { createSignal, Show } from 'solid-js'
import styles from './HumanBenchmark.module.sass'
import lightning from '../../assets/lightning.svg'
import config from './config.json'

function HumanBenchmark() {
  const RESULT_STAGE = config.MAX_CLICKS + 1
  const START_STAGE = 0

  const [stage, setStage] = createSignal(START_STAGE)
  const [waiting, setWaiting] = createSignal(false)
  // const [time, setInterval] = createSignal(null)

  const nextStage = () => {
    if (waiting()) return console.log("Premature click!")
    setStage((stage() < RESULT_STAGE) ? stage() + 1 : START_STAGE)

    if (stage() === START_STAGE) return console.log("Reset benchmark!")
    if (stage() === RESULT_STAGE) return console.log("Finished benchmark!")

    if (stage() === START_STAGE + 1)
      console.log("Started benchmark!")   
    else
      console.log("Detected reaction!")

    setWaiting(true)
    setTimeout(() => setWaiting(false), 3000)
  }

  return (
    <section class={styles.container} onClick={nextStage}>
      <Show when={stage() === START_STAGE}>
        <img src={lightning} alt="⚡" class={styles.logo}/>
        <h2>Human Benchmark</h2>
        <h4>Click anywhere to begin</h4>
      </Show>
      <Show when={waiting() && stage() !== START_STAGE}>
        <h2>Get ready! x{stage()}</h2>
      </Show>
      <Show when={stage() === RESULT_STAGE}>
        <h2>RESULTS:</h2>
        <h4>{stage()-1} clicks made</h4>
      </Show>
    </section>
  )
}

export default HumanBenchmark
