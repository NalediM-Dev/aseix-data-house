jsx
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Insights from './components/Insights'
import Footer from './components/Footer'
import Pricing from './pages/Pricing'

import RetailSalesIntelligence from './pages/RetailSalesIntelligence'
import WorkforceAnalytics from './pages/WorkforceAnalytics'
import { jsx } from 'react/jsx-runtime'
import BusinessPerformanceDashboard from './pages/BusinessPerformanceDashboard'

function App() {
  const path = window.location.pathname

  // Pricing page
if (path === '/pricing') {
  return <Pricing />
}

  // Retail Sales Intelligence page
  if (path === '/projects/retail-sales-intelligence') {
    return <RetailSalesIntelligence />
  }

  // Workforce Analytics page
  if (path === '/projects/workforce-analytics') {
    return <WorkforceAnalytics />
  }

  if (path === '/projects/business-performance-dashboard') {
  return <BusinessPerformanceDashboard />
}

  // Main ASEIX DATA HOUSE homepage
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Insights />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

