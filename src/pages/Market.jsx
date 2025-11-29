import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import '../styles/Market.css'

function Market() {
  const [marketData, setMarketData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { language, setLanguage, translations } = useLanguage()

  useEffect(() => {
    // Temporary: Skip authentication check
    // if (!isAuthenticated) {
    //   navigate('/auth')
    //   return
    // }
    loadMarketData()
  }, [isAuthenticated, navigate])

  const loadMarketData = () => {
    // Simulated market data - In production, fetch from real API
    const crops = [
      { id: 1, name: 'Wheat', category: 'Grains', price: 2150, change: +5.2, unit: 'quintal', mandi: 'Delhi', trend: 'up' },
      { id: 2, name: 'Rice (Basmati)', category: 'Grains', price: 3800, change: -2.1, unit: 'quintal', mandi: 'Karnal', trend: 'down' },
      { id: 3, name: 'Cotton', category: 'Cash Crops', price: 6200, change: +8.5, unit: 'quintal', mandi: 'Gujarat', trend: 'up' },
      { id: 4, name: 'Sugarcane', category: 'Cash Crops', price: 350, change: +1.2, unit: 'quintal', mandi: 'Lucknow', trend: 'up' },
      { id: 5, name: 'Tomato', category: 'Vegetables', price: 1200, change: -12.5, unit: 'quintal', mandi: 'Mumbai', trend: 'down' },
      { id: 6, name: 'Onion', category: 'Vegetables', price: 1800, change: +15.3, unit: 'quintal', mandi: 'Nashik', trend: 'up' },
      { id: 7, name: 'Potato', category: 'Vegetables', price: 900, change: -3.2, unit: 'quintal', mandi: 'Agra', trend: 'down' },
      { id: 8, name: 'Soybean', category: 'Pulses', price: 4500, change: +6.7, unit: 'quintal', mandi: 'Indore', trend: 'up' },
      { id: 9, name: 'Mustard', category: 'Oilseeds', price: 5200, change: +4.1, unit: 'quintal', mandi: 'Jaipur', trend: 'up' },
      { id: 10, name: 'Groundnut', category: 'Oilseeds', price: 5800, change: -1.8, unit: 'quintal', mandi: 'Rajkot', trend: 'down' },
      { id: 11, name: 'Maize', category: 'Grains', price: 1850, change: +2.9, unit: 'quintal', mandi: 'Karnataka', trend: 'up' },
      { id: 12, name: 'Turmeric', category: 'Spices', price: 7200, change: +10.5, unit: 'quintal', mandi: 'Erode', trend: 'up' }
    ]
    setMarketData(crops)
  }

  const categories = ['All', 'Grains', 'Vegetables', 'Cash Crops', 'Pulses', 'Oilseeds', 'Spices']

  const filteredData = marketData.filter(crop => {
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="market-page">
      <nav className="dashboard-nav">
        <h1 className="logo">🌾 Farmify</h1>
        
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/weather" className="nav-item">Weather</Link>
          <Link to="/market" className="nav-item active">Market</Link>
          <Link to="/resources" className="nav-item">Resources</Link>
        </div>

        <div className="nav-actions">
          <div className="language-selector">
            <button 
              className="language-btn" 
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              🌐 {translations[language]?.name || 'English'}
            </button>
            {showLanguageMenu && (
              <div className="language-menu">
                {Object.keys(translations).map(lang => (
                  <button
                    key={lang}
                    className={`language-option ${language === lang ? 'active' : ''}`}
                    onClick={() => { setLanguage(lang); setShowLanguageMenu(false); }}
                  >
                    {translations[lang].name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="account-btn" onClick={() => navigate('/account')}>
            <span className="avatar">👤</span>
            Account
          </button>
        </div>
      </nav>

      <main className="market-main">
        <div className="market-header">
          <div>
            <h1>Market Prices</h1>
            <p className="market-subtitle">Live updates from mandis across India</p>
          </div>
          <div className="market-info">
            <span className="update-time">🕒 Updated 10 mins ago</span>
          </div>
        </div>

        <div className="market-controls">
          <input 
            type="text"
            placeholder="Search crops..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="market-stats">
          <div className="stat-card green">
            <span className="stat-icon">📈</span>
            <div>
              <div className="stat-label">Trending Up</div>
              <div className="stat-number">{marketData.filter(c => c.trend === 'up').length}</div>
            </div>
          </div>
          <div className="stat-card red">
            <span className="stat-icon">📉</span>
            <div>
              <div className="stat-label">Trending Down</div>
              <div className="stat-number">{marketData.filter(c => c.trend === 'down').length}</div>
            </div>
          </div>
          <div className="stat-card blue">
            <span className="stat-icon">🏪</span>
            <div>
              <div className="stat-label">Active Mandis</div>
              <div className="stat-number">250+</div>
            </div>
          </div>
        </div>

        <div className="price-grid">
          {filteredData.map(crop => (
            <div key={crop.id} className="price-card">
              <div className="price-header">
                <div>
                  <h3 className="crop-name">{crop.name}</h3>
                  <span className="crop-category">{crop.category}</span>
                </div>
                <span className={`trend-indicator ${crop.trend}`}>
                  {crop.trend === 'up' ? '📈' : '📉'}
                </span>
              </div>
              
              <div className="price-main">
                <div className="price-amount">₹{crop.price}</div>
                <div className="price-unit">per {crop.unit}</div>
              </div>

              <div className="price-change">
                <span className={`change-value ${crop.change > 0 ? 'positive' : 'negative'}`}>
                  {crop.change > 0 ? '+' : ''}{crop.change}%
                </span>
                <span className="change-label">vs last week</span>
              </div>

              <div className="mandi-info">
                📍 {crop.mandi} Mandi
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No crops found matching your search</p>
          </div>
        )}

        <div className="market-tips">
          <h3>💡 Market Insights</h3>
          <div className="tips-list">
            <div className="insight-card">
              <span className="insight-icon">🌾</span>
              <p><strong>Wheat prices rising:</strong> Due to high demand from flour mills</p>
            </div>
            <div className="insight-card">
              <span className="insight-icon">🧅</span>
              <p><strong>Onion surplus:</strong> Good harvest season leading to competitive prices</p>
            </div>
            <div className="insight-card">
              <span className="insight-icon">🌶️</span>
              <p><strong>Spice demand up:</strong> Festival season driving higher turmeric prices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Market
