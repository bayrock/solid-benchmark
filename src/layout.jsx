/* @refresh reload */
import { render } from 'solid-js/web'
import Benchmark from './pages/HumanBenchmark'
import './global.sass'

// render(() => <Nav />, document.getElementById('nav'))
render(() => <Benchmark />, document.getElementById('main'))
