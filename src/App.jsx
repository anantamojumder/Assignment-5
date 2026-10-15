import banner from './assets/banner-stack.png';
import logo from './assets/logo-text.png';
import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight, Layers3, Code2, Star } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
fetch(`${import.meta.env.BASE_URL}technologies.json`)

const GRADIENT = 'linear-gradient(105deg, #ff641f 0%, #ed238a 53%, #8c35e8 100%)'



function Brand({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? 'brand-footer' : ''}`}
      href="#home"
      aria-label="Dev Stack home"
    >
      <img
        src={logo}
        alt="Dev Stack"
        className="brand-logo"
      />
    </a>
  );
}



function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['Home', '#home'], ['Technologies', '#technologies'], ['Projects', '#projects'], ['About', '#about'], ['Contact', '#contact']]
  return <header className="header">

    <div className="nav-shell">

      <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <Brand />
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href], i) => <a key={label} className={i === 0 ? 'active' : ''} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>

      <div className="auth-links"><a href="#signin" className="sign-in">Sign In</a><a href="#signup" className="sign-up">Sign Up</a></div>
    </div>

  </header>
}



function Hero() {
  return <section className="hero container" id="home">
    <div className="hero-copy">

      {/* <h1>Build Your Ideal<br /><span className="gradient-text">Development Stack</span></h1> */}

      <p className="hero-description">Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.</p>

      <div className="hero-actions"><a className="button primary" href="#technologies">Explore Technologies <ArrowRight size={16} /></a><a className="button secondary" href="#about">Learn More</a></div>

    </div>
    

<div className="hero-art">

  <img
    src={banner}
    alt="Development Stack Banner"
    className="hero-banner-image"
  />

</div>


  </section>
}


function TechCard({ tech, added, onAdd }) {
  return <article className="tech-card">
    <div className="card-top"><img className="tech-icon" src={tech.icon} alt={`${tech.name} logo`} loading="lazy" onError={e => { e.currentTarget.style.visibility = 'hidden' }} />

      <span className={`badge badge-${tech.badge.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{tech.badge}</span></div>

    <h3>{tech.name}</h3><p className="tech-description">{tech.description}</p>

    <div className="card-meta"><span className="category-chip">{tech.category}</span><span className="difficulty">{tech.difficulty}</span><span className="rating">
    <Star size={12} fill="currentColor" />{tech.rating.toFixed(1)}</span></div>

    <button className={`add-button ${added ? 'added-button' : ''}`} onClick={() => onAdd(tech)} disabled={added}>{added ? '✓ Added to Stack' : 'Add to Stack'}</button>

  </article>

}


function StackPanel({ stack, onRemove, onClear }) {
  return <aside className="stack-panel">
    <div className="stack-heading"><div><h3>Your Stack</h3><p>{stack.length} {stack.length === 1 ? 'Technology' : 'Technologies'} Selected</p></div>
    <span className="stack-count">{stack.length}</span></div>
    {stack.length === 0 ? <div className="empty-stack"><div className="empty-icon"><Layers3 size={24} /></div><strong>Your stack is empty</strong>
    <p>Add technologies from the list to start building your ideal development stack.</p>
    </div> :

    <div className="stack-items">{stack.map(item => <div className="stack-item" key={item.id}><img src={item.icon} alt="" onError={e => { e.currentTarget.style.visibility = 'hidden' }} />
    <div className="stack-item-text"><strong>{item.name}</strong><span>{item.category}</span></div><button aria-label={`Remove ${item.name}`} className="remove-item" onClick={() => onRemove(item)}>
      <X size={16} /></button></div>)}</div>}
    {stack.length > 0 && <div className="stack-summary"><span>Stack coverage</span><strong>{Math.min(100, Math.round(stack.length / 8 * 100))}%</strong><div className="progress-track">
      <div style={{ width: `${Math.min(100, stack.length / 8 * 100)}%` }} /></div></div>}

    <button className="remove-all" onClick={onClear} disabled={!stack.length}>Remove All</button>
  </aside>
}


function Footer() {
  return <footer className="footer" id="contact"><div className="container footer-main">
    <div className="footer-brand" id="about"><Brand footer /><p>Curated tools, technologies, and resources for developers building modern software.</p><div className="social-links"><a href="https://github.com" aria-label="GitHub"><b>GitHub</b></a>
    <a href="https://twitter.com" aria-label="Twitter"><b>Twitter</b></a><a href="https://linkedin.com" aria-label="LinkedIn"><b>LinkedIn</b></a></div></div>
    <div className="footer-col"><h4>PRODUCT</h4><a href="#home">Home</a><a href="#technologies">Technologies</a><a href="#projects">Projects</a></div>
    <div className="footer-col"><h4>COMPANY</h4><a href="#about">About</a><a href="#contact">Contact</a><a href="mailto:hello@devstack.example">Careers</a></div>
    <div className="footer-col"><h4>LEGAL</h4><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Dev Stack. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div></footer>
}


export default function App() {
  const [technologies, setTechnologies] = useState([])
  const [stack, setStack] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [filter, setFilter] = useState('All')
 

  useEffect(() => {
    let active = true
    fetch('/technologies.json')

      .then(response => { if (!response.ok) throw new Error('Could not load technology data.'); return response.json() })
      .then(data => { if (active) setTechnologies(data) })
      .catch(() => { if (active) setLoadError('We could not load the technology list. Please refresh the page and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }

  }, [])

  const addToStack = tech => {
    if (stack.some(item => item.id === tech.id)) { toast.warning(`${tech.name} is already in your stack.`); return }
    setStack(current => [...current, tech])
    toast.success(`${tech.name} added to your stack!`)
  }
  const removeFromStack = tech => {
    setStack(current => current.filter(item => item.id !== tech.id))
    toast.info(`${tech.name} removed from your stack.`)
  }
  const removeAll = () => {
    if (!stack.length) return
    setStack([])
    toast.info('Your stack has been cleared.')
  }
  
const excludedTechs = ['git', 'python', 'mongodb'];

const visibleTechnologies = technologies.filter(
  tech => !excludedTechs.includes(tech.name.trim().toLowerCase())
);

const filtered = filter === 'All'
  ? visibleTechnologies
  : visibleTechnologies.filter(
      tech => tech.category === filter
    );

  return <><Header /><main><Hero />
    <section className="technology-section container" id="technologies">
      <div className="section-heading"><div><h2>Explore the <span className="gradient-text">Technologies</span>

      </h2><p>Pick technologies to build your ideal stack.</p></div><span className="available-count"></span></div>
      
      <div className="content-layout"><div className="technology-grid">
        {loading ? <div className="loading-state"><span className="spinner" />Loading technologies…</div> : loadError ? <div className="error-state">{loadError}</div> : 
        filtered.length ? filtered.map(tech => <TechCard key={tech.id} tech={tech} added={stack.some(item => item.id === tech.id)} onAdd={addToStack} />) : <p>No technologies found in this category.</p>}

      </div><StackPanel stack={stack} onRemove={removeFromStack} onClear={removeAll} /></div>

    </section>
  </main><Footer /><ToastContainer position="top-right" autoClose={2500} newestOnTop closeOnClick pauseOnHover theme="light" /><style>{`:root { --brand-gradient: ${GRADIENT}; }`}</style></>
}