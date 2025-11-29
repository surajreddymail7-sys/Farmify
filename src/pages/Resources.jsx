import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import '../App.css'
import '../styles/Resources.css'
import '../styles/Dashboard.css'

const agriculturePlans = {
  en: [
    {
      id: 1,
      title: 'Small Scale Vegetable Farming',
      category: 'Vegetables',
      duration: '3-4 months',
      investment: '₹15,000 - ₹25,000',
      description: 'Complete guide for growing vegetables on 0.5-1 acre land with drip irrigation and organic methods.',
      details: ['Seasonal crop selection', 'Soil preparation & composting', 'Drip irrigation setup', 'Pest management', 'Marketing strategies']
    },
    {
      id: 2,
      title: 'Organic Rice Cultivation',
      category: 'Grains',
      duration: '4-6 months',
      investment: '₹30,000 - ₹50,000 per acre',
      description: 'Traditional paddy farming with modern organic techniques for sustainable rice production.',
      details: ['Land preparation & leveling', 'Seed selection (SRI method)', 'Water management', 'Organic fertilizers', 'Harvesting & storage']
    },
    {
      id: 3,
      title: 'Fruit Orchard Development',
      category: 'Fruits',
      duration: '2-3 years (to bearing)',
      investment: '₹80,000 - ₹1,50,000 per acre',
      description: 'Long-term plan for mango, guava, or citrus orchards with high-density planting.',
      details: ['Site selection & soil testing', 'Variety selection', 'Planting & spacing', 'Pruning techniques', 'Drip & fertigation']
    },
    {
      id: 4,
      title: 'Dairy Farming Integration',
      category: 'Livestock',
      duration: 'Ongoing',
      investment: '₹1,00,000 - ₹2,50,000',
      description: 'Mixed farming with dairy cows/buffaloes for milk production and manure for crops.',
      details: ['Animal selection & housing', 'Fodder cultivation', 'Milking & hygiene', 'Veterinary care', 'Marketing milk products']
    },
    {
      id: 5,
      title: 'Mushroom Cultivation',
      category: 'Specialty Crops',
      duration: '45-60 days per cycle',
      investment: '₹20,000 - ₹40,000',
      description: 'Indoor mushroom farming (oyster/button) with minimal space and high returns.',
      details: ['Mushroom house setup', 'Spawn preparation', 'Temperature control', 'Harvesting cycles', 'Value addition & packaging']
    },
    {
      id: 6,
      title: 'Vermicompost Production',
      category: 'Soil Health',
      duration: '2-3 months per batch',
      investment: '₹10,000 - ₹20,000',
      description: 'Organic fertilizer production using earthworms for sale and farm use.',
      details: ['Vermibed construction', 'Worm species selection', 'Feed management', 'Harvesting & packaging', 'Quality standards']
    },
  ],
}

// Add translations for other languages (shortened for brevity)
agriculturePlans.hi = agriculturePlans.en.map(plan => ({
  ...plan,
  title: plan.id === 1 ? 'छोटे पैमाने पर सब्जी की खेती' :
         plan.id === 2 ? 'जैविक धान की खेती' :
         plan.id === 3 ? 'फलों के बाग का विकास' :
         plan.id === 4 ? 'डेयरी फार्मिंग एकीकरण' :
         plan.id === 5 ? 'मशरूम की खेती' : 'वर्मीकम्पोस्ट उत्पादन',
}))

function Resources() {
  const { t, language, setLanguage, translations } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  
  const categories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Livestock', 'Specialty Crops', 'Soil Health']
  
  const plans = agriculturePlans[language] || agriculturePlans.en
  const filteredPlans = selectedCategory === 'All' 
    ? plans 
    : plans.filter(plan => plan.category === selectedCategory)

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan)
  }

  const closeModal = () => {
    setSelectedPlan(null)
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setShowLanguageMenu(false)
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1 className="logo" onClick={() => navigate('/dashboard')}>🌾 Farmify</h1>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/weather" className="nav-item">Weather</Link>
          <Link to="/market" className="nav-item">Market</Link>
          <Link to="/resources" className="nav-item active">Resources</Link>
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
                    onClick={() => handleLanguageChange(lang)}
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

      <main className="content resources-page">
        <section className="page-hero">
          <h2>{t('agriculturePlans')}</h2>
          <p>Comprehensive guides for different farming ventures with investment details and timelines</p>
        </section>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="plans-grid">
          {filteredPlans.map(plan => (
            <article key={plan.id} className="plan-card">
              <div className="plan-badge">{plan.category}</div>
              <h3>{plan.title}</h3>
              <div className="plan-meta">
                <span className="meta-item">
                  <strong>⏱️ Duration:</strong> {plan.duration}
                </span>
                <span className="meta-item">
                  <strong>💰 Investment:</strong> {plan.investment}
                </span>
              </div>
              <p>{plan.description}</p>
              <div className="plan-details">
                <strong>Key Steps:</strong>
                <ul>
                  {plan.details.slice(0, 3).map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
              <button className="primary" onClick={() => handleViewDetails(plan)}>
                {t('viewDetails')}
              </button>
            </article>
          ))}
        </div>
      </main>

      {selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-header">
              <div className="plan-badge">{selectedPlan.category}</div>
              <h2>{selectedPlan.title}</h2>
            </div>
            
            <div className="modal-body">
              <div className="plan-meta-detail">
                <div className="meta-detail-item">
                  <span className="meta-icon">⏱️</span>
                  <div>
                    <div className="meta-label">Duration</div>
                    <div className="meta-value">{selectedPlan.duration}</div>
                  </div>
                </div>
                <div className="meta-detail-item">
                  <span className="meta-icon">💰</span>
                  <div>
                    <div className="meta-label">Investment</div>
                    <div className="meta-value">{selectedPlan.investment}</div>
                  </div>
                </div>
              </div>

              <div className="plan-description">
                <h3>About This Plan</h3>
                <p>{selectedPlan.description}</p>
              </div>

              <div className="plan-steps">
                <h3>Detailed Steps</h3>
                <ol>
                  {selectedPlan.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ol>
              </div>

              <div className="plan-tips">
                <h3>💡 Pro Tips</h3>
                <ul>
                  <li>Start with soil testing to understand nutrient requirements</li>
                  <li>Maintain proper records of expenses and yields</li>
                  <li>Consult local agricultural experts for region-specific advice</li>
                  <li>Consider crop insurance to mitigate risks</li>
                </ul>
              </div>

              <div className="plan-actions">
                <button className="primary" onClick={closeModal}>Got It!</button>
                <button className="secondary">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Resources
