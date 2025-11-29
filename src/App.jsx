import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Weather from './pages/Weather'
import Market from './pages/Market'
import Resources from './pages/Resources'
import Articles from './pages/Articles'
import AI from './pages/AI'
import Account from './pages/Account'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/market" element={<Market />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
