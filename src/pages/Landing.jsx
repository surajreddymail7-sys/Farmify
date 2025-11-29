import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import '../styles/Landing.css'

function Landing() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [stats] = useState([
    { value: '50K+', label: 'Active Farmers' },
    { value: '1200+', label: 'Expert Tips' },
    { value: '95%', label: 'Success Rate' }
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Plant/Seed particles
    const particles = []
    const plantEmojis = ['🌱', '🌿', '🍃', '🌾', '🌻', '🌼', '🪴']
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        size: Math.random() * 20 + 15,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        emoji: plantEmojis[Math.floor(Math.random() * plantEmojis.length)],
        rotation: Math.random() * 360
      })
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        // Mouse repulsion effect
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.x -= (dx / distance) * force * 3
          particle.y -= (dy / distance) * force * 3
        } else {
          // Return to base position
          particle.x += (particle.baseX - particle.x) * 0.05
          particle.y += (particle.baseY - particle.y) * 0.05
        }

        // Natural drift
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce from edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw plant emoji
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.font = `${particle.size}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(particle.emoji, 0, 0)
        ctx.restore()

        particle.rotation += 0.5
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="particles-canvas" />
      
      <nav className="landing-nav">
        <h1 className="logo">🌾 Farmify</h1>
        <div className="nav-items">
          <a href="#features" className="nav-link">Features</a>
          <a href="#benefits" className="nav-link">Benefits</a>
          <Link to="/auth" className="nav-login">Sign In</Link>
        </div>
      </nav>

      <main className="landing-hero">
        <div className="hero-content">
          <span className="hero-badge">🚀 India's #1 Farming Platform</span>
          <h1 className="hero-title">Smart Farming for<br />Modern India</h1>
          <p className="hero-subtitle">Get real-time market prices, weather updates, expert advice, and connect with farmers across the nation</p>
          <div className="hero-buttons">
            <Link to="/auth">
              <button className="hero-btn primary">Get Started Free</button>
            </Link>
            <button className="hero-btn secondary">Watch Demo</button>
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <section id="features" className="features-section">
        <h2 className="section-title">Everything You Need to Grow</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Market Prices</h3>
            <p>Live updates on crop prices from mandis across India</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌤️</span>
            <h3>Weather Alerts</h3>
            <p>Accurate forecasts and timely alerts for your region</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👨‍🌾</span>
            <h3>Expert Advice</h3>
            <p>Connect with agricultural experts and experienced farmers</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📚</span>
            <h3>Resources</h3>
            <p>Modern farming techniques, crop guides, and tutorials</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Community</h3>
            <p>Share experiences and learn from fellow farmers</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤖</span>
            <h3>AI Assistant</h3>
            <p>Get instant answers to all your farming questions</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
