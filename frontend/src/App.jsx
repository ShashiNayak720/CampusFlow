import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import About from './pages/About'
import Contact from './pages/Contact'
import Quiz from './pages/Quiz'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route
  path="/events/:id/register"
  element={<Register />}
/>
      </Routes>

    </BrowserRouter>
  )
}

export default App