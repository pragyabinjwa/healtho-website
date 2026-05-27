import { Link } from 'react-router-dom'
import { WAIcon } from './Icons'

const WA_NUMBER = '919109348483'
const WA_LINK   = `https://wa.me/${WA_NUMBER}`
const EMAIL     = 'healthoalkalinewater@gmail.com'
const ADDRESS   = '1 Abhinav Nagar, Near Teen Imli Square, Ring Road, Madhya Pradesh 452001'
const FSSAI_NO  = '11423850000323'
const GSTIN     = '23CANPC8799P1ZP'

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to top, #010508, var(--bg-primary))',
      borderTop: '1px solid var(--border-gold)',
      padding: '4rem 0 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr 1fr 1fr',
          gap: '3rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-gold)',
          alignItems: 'start',
        }}>
          {/* Brand */}
          <div style={{ minWidth: '180px' }}>
            <img src="/assets/logo.png" alt="Healtho"
              style={{ height: '44px', marginBottom: '1rem', filter: 'drop-shadow(0 0 6px rgba(0,180,216,0.3))' }} />
            <p style={{ fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '1.2rem', maxWidth: '200px' }}>
              Premium alkaline water.<br/>pH 8.5+ · Mineral Balanced · BPA Free
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', borderRadius: '50px', padding: '0.5rem 1.1rem', fontSize: '0.8rem', fontWeight: 500 }}>
              <WAIcon size={16} /> WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[['Home','/'],['Products','/products'],['About Us','/about'],['Contact','/contact']].map(([l,p]) => (
                <Link key={p} to={p} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color='var(--gold)'}
                  onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{l}</Link>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div>
            <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>Compliance</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>GSTIN</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{GSTIN}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>FSSAI License</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{FSSAI_NO}</div>
                <a href="/assets/fssai-certificate.pdf" target="_blank" rel="noreferrer"
                  style={{ fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  View Certificate ↗
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div style={{ lineHeight: 1.6 }}>{ADDRESS}</div>
              <a href={`mailto:${EMAIL}`} style={{ color: 'var(--text-muted)' }}>{EMAIL}</a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>+91 91093 48483</a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Healtho. All rights reserved.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            FSSAI {FSSAI_NO} · pH 8.5+ · BPA Free
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
