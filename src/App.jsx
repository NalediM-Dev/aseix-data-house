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
import BusinessPerformanceDashboard from './pages/BusinessPerformanceDashboard'

import WhyDataMatters from './pages/WhyDataMatters'
import BusinessIntelligence from './pages/BusinessIntelligence'
import ActionableInsights from './pages/ActionableInsights'

function App() {
const path = window.location.pathname

if (path === '/pricing') {
return <Pricing />
}

if (path === '/projects/retail-sales-intelligence') {
return <RetailSalesIntelligence />
}

if (path === '/projects/workforce-analytics') {
return <WorkforceAnalytics />
}

if (path === '/projects/business-performance-dashboard') {
return <BusinessPerformanceDashboard />
}

if (path === '/insights/why-data-matters') {
return <WhyDataMatters />
}

if (path === '/insights/business-intelligence') {
return <BusinessIntelligence />
}

if (path === '/insights/actionable-insights') {
return <ActionableInsights />
}

return ( <div> <Navbar /> <Hero /> <Services /> <Projects /> <About /> <Insights /> <Contact /> <Footer /> </div>
)
}

export default App
