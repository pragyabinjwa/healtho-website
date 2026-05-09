import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact',  path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '0.75rem 2rem' : '1.3rem 2rem',
      background: scrolled ? 'rgba(5,13,26,0.96)' : 'linear-gradient(to bottom,rgba(5,13,26,0.7),transparent)',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,160,39,0.12)' : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s ease',
    }}>
      <Link to="/">
        <img src="/assets/logo.png" alt="Healtho"
          style={{ height: scrolled ? '34px' : '42px', transition: 'height 0.4s', filter: 'drop-shadow(0 0 8px rgba(0,180,216,0.35))' }} />
      </Link>

      <ul className="nav-desktop" style={{ display: 'flex', gap: '2.4rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_LINKS.map(({ label, path }) => {
          const active = location.pathname === path
          return (
            <li key={path}>
              <Link to={path} style={{
                fontSize: '0.78rem', letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 500,
                color: active ? 'var(--gold)' : 'var(--text-primary)',
                position: 'relative', paddingBottom: '4px', transition: 'color 0.3s',
              }}>
                {label}
                {active && <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'var(--gold)' }} />}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link to="/contact" className="btn btn-gold" style={{ fontSize: '0.72rem', padding: '0.6rem 1.5rem' }}>
        Contact Now
      </Link>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(o => !o)} className="hamburger"
        style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Menu">
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: '22px', height: '2px', background: 'var(--gold)', borderRadius: '2px', transition: '0.3s',
            transform: menuOpen ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none',
          }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, top: '60px', background: 'rgba(5,13,26,0.98)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.2rem', zIndex: 999,
        }}>
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} style={{
              fontSize: '1.8rem', fontFamily: 'var(--font-serif)',
              color: location.pathname === path ? 'var(--gold)' : 'var(--text-primary)',
            }}>{label}</Link>
          ))}
          <Link to="/contact" className="btn btn-gold" style={{ marginTop: '0.5rem' }}>Contact Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .hamburger   { display: flex !important; }
          nav > a.btn  { display: none; }
        }
      `}</style>
    </nav>
  )
}
