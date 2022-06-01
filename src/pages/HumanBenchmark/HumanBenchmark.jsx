import { createSignal, Index, Show } from 'solid-js'
import styles from './HumanBenchmark.module.sass'
import lightning from '../../assets/lightning.svg'
import config from './config.json'

function HumanBenchmark() {
  const START_STAGE = 0
  const RESULT_STAGE = config.MAX_CLICKS + 1

  const [getStage, setStage] = createSignal(START_STAGE)
  const [getResults, setResults] = createSignal([])
  const [getTestStart, setTestStart] = createSignal(null)
  const [getInterval, setInterval] = createSignal(null)
  const [isWaiting, setWaiting] = createSignal(false)

  const isStartStage = () => getStage() === START_STAGE
  const isFirstStage = () => getStage() === START_STAGE + 1
  const isResultStage = () => getStage() === RESULT_STAGE
  const isPlaying = () => !isStartStage() && !isResultStage()
  const isInterrupted = () => getInterval() === null && isPlaying()
  const getTimeout = () => Math.floor(Math.random() * (config.MAX_INTERVAL - config.MIN_INTERVAL) + config.MIN_INTERVAL) * 1000
  const createResult = () => getResults().push(Date.now() - getTestStart())

  const createInterval = () =>
    setTimeout(() => {
      setWaiting(false)
      setTestStart(Date.now())
    }, getTimeout())

  const nextStage = () => {
    if (isWaiting() && !isInterrupted()) {
      clearInterval(getInterval())
      console.log("Interrupted benchmark!")
      return setInterval(null)
    } else if (isWaiting()) {
      return setInterval(createInterval())
    }

    setStage((getStage() < RESULT_STAGE) ? getStage() + 1 : START_STAGE)

    if (isStartStage()) {
      setResults([])
      return console.log("Reset benchmark!")
    }

    if (isResultStage()) {
      setResults([...getResults(), Date.now() - getTestStart()])
      console.log("Results:\n", getResults())
      return console.log("Finished benchmark!")
    }

    if (isFirstStage())
      console.log("Started benchmark!")
    else 
      createResult()

    setWaiting(true)
    setInterval(createInterval())
  }

  return (
    <section class={styles.container} onClick={nextStage}>
      <Show when={getStage() === START_STAGE}>
        <img src={lightning} alt="⚡" class={styles.logo}/>
        <h2>Human Benchmark</h2>
        <h4>Click anywhere to begin</h4>
      </Show>
      <Show when={isWaiting() && isPlaying() && !isInterrupted()}>
        <h2>Get ready! x{getStage()}</h2>
        <Show when={isFirstStage()}>
          <h4>It's about to happen..</h4>
        </Show>
      </Show>
      <Show when={isInterrupted()}>
        <h2>Interrupted test!</h2>
        <h4>Click anywhere to continue</h4>
      </Show>
      <Show when={!isWaiting() && isPlaying()}>
        <h2>Click!</h2>
      </Show>
      <Show when={getStage() === RESULT_STAGE}>
        <h2>RESULTS:</h2>
        <Index each={getResults()}>{(result, i) => <h4>{i + 1} - {result()}ms</h4>}</Index>
        <h3>Average - {Math.floor(getResults().reduce((prev, curr) => prev + curr) / config.MAX_CLICKS)}ms</h3>
        {/* <h4>{config.MAX_CLICKS} clicks made</h4> */}
      </Show>
    </section>
  )
}

export default HumanBenchmark
