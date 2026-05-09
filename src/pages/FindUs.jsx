import { motion } from 'framer-motion'

/* Replace the src URL with your exact Google Maps embed link */
const MAP_EMBED = 'https://maps.google.com/maps?q=Madhya+Pradesh,+India&output=embed&z=8'

const INFO = [
  {
    icon: '📍',
    label: 'Plant & Office',
    lines: ['Mahima Chilled Water', 'Madhya Pradesh, India', '(Exact address — update here)'],
  },
  {
    icon: '📞',
    label: 'Phone / WhatsApp',
    lines: ['+91 XXXXX XXXXX'],
    href: 'tel:+91XXXXXXXXXX',
  },
  {
    icon: '✉️',
    label: 'Email',
    lines: ['hello@healthowater.in'],
    href: 'mailto:hello@healthowater.in',
  },
  {
    icon: '⏰',
    label: 'Working Hours',
    lines: ['Mon – Sat: 8 AM – 8 PM', 'Sun: 9 AM – 6 PM'],
  },
]

export default function FindUs() {
  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '45vh', display: 'flex', alignItems: 'flex-end',
        background: 'linear-gradient(155deg, #020810, #050D1A 40%, #0A1E38)',
        paddingBottom: '4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(0,180,216,0.07), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Location
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ fontWeight: 300 }}>
            Find<br /><em style={{ color: 'var(--blue)' }}>Healtho</em>
          </motion.h1>
          <div className="divider left" style={{ marginTop: '1.5rem' }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            style={{ maxWidth: '480px', fontSize: '1.05rem', lineHeight: 1.8, marginTop: '1.5rem' }}>
            Visit our plant, call for a bulk order, or drop by for a water tasting. We're always happy to welcome you.
          </motion.p>
        </div>
      </section>

      {/* Map + Info */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '3rem', alignItems: 'start' }}>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-gold)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', position: 'sticky', top: '100px', minHeight: '480px' }}
            >
              <iframe
                src={MAP_EMBED}
                title="Healtho Location Map"
                width="100%"
                height="480"
                style={{ border: 0, display: 'block', filter: 'invert(92%) hue-rotate(180deg) saturate(0.9) brightness(0.88)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            >
              {INFO.map(({ icon, label, lines, href }, i) => (
                <motion.div
                  key={label}
                  className="glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ borderColor: 'var(--gold)', transition: { duration: 0.3 } }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(201,160,39,0.1)', border: '1px solid var(--border-gold)', display: 'grid', placeItems: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.4rem' }}>{label}</span>
                      {lines.map((line, j) => (
                        href ? (
                          <a key={j} href={href} style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{line}</a>
                        ) : (
                          <span key={j} style={{ display: 'block', fontSize: '0.95rem', color: j === 0 ? 'var(--text-primary)' : 'var(--text-muted)', lineHeight: 1.6 }}>{line}</span>
                        )
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Directions CTA */}
              <a
                href="https://maps.google.com/maps?q=Madhya+Pradesh,+India"
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
                style={{ textAlign: 'center', marginTop: '0.5rem' }}
              >
                📍 Get Directions
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%20Healtho%2C%20I%20want%20to%20visit%20your%20plant%20and%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ textAlign: 'center' }}
              >
                💬 WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Delivery zones */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div className="section-header">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Coverage</p>
            <h2 style={{ marginTop: '0.5rem' }}>Delivery Zones</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {['City Centre', 'Residential Areas', 'Industrial Zones', 'Restaurants & Hotels', 'Corporate Offices', 'Events & Weddings'].map(zone => (
              <motion.div
                key={zone}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  padding: '1rem 1.5rem', borderRadius: '10px',
                  border: '1px solid var(--border-blue)',
                  background: 'rgba(0,180,216,0.04)',
                  textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)',
                }}
              >
                ✓ {zone}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 1fr 420px"] {
            grid-template-columns: 1fr !important;
          }
          iframe { height: 320px !important; }
        }
      `}</style>
    </>
  )
}
