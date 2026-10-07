import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Insights from './components/Insights'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Insights />
      <Footer />

      <main>
        <h1>ASEIX DATA HOUSE</h1>
        <p>Data • Technology • Intelligence</p>
      </main>
    </div>
  )
}

export default App