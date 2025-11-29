import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import '../styles/Weather.css'

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('Punjab')
  const [loading, setLoading] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { language, setLanguage, translations } = useLanguage()

  useEffect(() => {
    // Temporary: Skip authentication check
    // if (!isAuthenticated) {
    //   navigate('/auth')
    //   return
    // }
    if (user?.location) {
      setLocation(user.location)
      fetchWeather(user.location)
    }
  }, [isAuthenticated, navigate, user])

  const fetchWeather = async (loc) => {
    setLoading(true)
    // Simulated weather data - In production, use real API like OpenWeatherMap
    setTimeout(() => {
      setWeatherData({
        location: loc,
        temperature: Math.floor(Math.random() * 15) + 20,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        rainfall: Math.floor(Math.random() * 50),
        forecast: [
          { day: 'Today', temp: 28, condition: 'Sunny', icon: '☀️' },
          { day: 'Tomorrow', temp: 26, condition: 'Cloudy', icon: '☁️' },
          { day: 'Wed', temp: 24, condition: 'Rainy', icon: '🌧️' },
          { day: 'Thu', temp: 27, condition: 'Sunny', icon: '☀️' },
          { day: 'Fri', temp: 29, condition: 'Sunny', icon: '☀️' }
        ],
        alerts: [
          { type: 'warning', message: 'Heavy rainfall expected in next 48 hours' },
          { type: 'info', message: 'Good conditions for wheat sowing this week' }
        ]
      })
      setLoading(false)
    }, 800)
  }

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Partly Cloudy': '⛅'
    }
    return icons[condition] || '🌤️'
  }

  return (
    <div className="weather-page">
      <nav className="dashboard-nav">
        <h1 className="logo">🌾 Farmify</h1>
        
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/weather" className="nav-item active">Weather</Link>
          <Link to="/market" className="nav-item">Market</Link>
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

      <main className="weather-main">
        <div className="weather-header">
          <h1>Weather Forecast</h1>
          <select 
            value={location} 
            onChange={(e) => {
              setLocation(e.target.value)
              fetchWeather(e.target.value)
            }}
            className="location-select"
          >
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading weather data...</div>
        ) : weatherData ? (
          <>
            <div className="current-weather">
              <div className="weather-main-info">
                <div className="weather-icon-large">{getWeatherIcon(weatherData.condition)}</div>
                <div>
                  <h2 className="temperature">{weatherData.temperature}°C</h2>
                  <p className="condition">{weatherData.condition}</p>
                  <p className="location-name">📍 {weatherData.location}</p>
                </div>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <div>
                    <div className="detail-label">Humidity</div>
                    <div className="detail-value">{weatherData.humidity}%</div>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🌬️</span>
                  <div>
                    <div className="detail-label">Wind Speed</div>
                    <div className="detail-value">{weatherData.windSpeed} km/h</div>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🌧️</span>
                  <div>
                    <div className="detail-label">Rainfall</div>
                    <div className="detail-value">{weatherData.rainfall} mm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="weather-alerts">
              {weatherData.alerts.map((alert, i) => (
                <div key={i} className={`alert alert-${alert.type}`}>
                  <span className="alert-icon">{alert.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                  {alert.message}
                </div>
              ))}
            </div>

            <div className="forecast-section">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {weatherData.forecast.map((day, i) => (
                  <div key={i} className="forecast-card">
                    <div className="forecast-day">{day.day}</div>
                    <div className="forecast-icon">{day.icon}</div>
                    <div className="forecast-temp">{day.temp}°C</div>
                    <div className="forecast-condition">{day.condition}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="farming-tips">
              <h3>🌾 Farming Recommendations</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <span className="tip-icon">💧</span>
                  <p>Good time for irrigation - soil moisture optimal</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">🌱</span>
                  <p>Favorable conditions for sowing wheat and mustard</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">🚜</span>
                  <p>Avoid heavy machinery use if rainfall expected</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}

export default Weather
