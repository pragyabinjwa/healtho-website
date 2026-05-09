import { motion } from 'framer-motion'

const BADGES = [
  {
    id: 'fssai',
    icon: '🛡️',
    title: 'FSSAI Licensed',
    subtitle: 'Food Safety & Standards Authority of India',
    number: '[See Certificate]',
    numberLabel: 'License No.',
    validUntil: '2027',
    color: '#C9A027',
    desc: 'We are licensed by FSSAI — India\'s apex food safety regulator — ensuring every bottle meets strict national food standards for packaged drinking water.',
  },
  {
    id: 'bis',
    icon: '🏅',
    title: 'BIS Compliant',
    subtitle: 'Bureau of Indian Standards IS:14543',
    number: 'IS 14543',
    numberLabel: 'Standard',
    validUntil: 'Ongoing',
    color: '#00B4D8',
    desc: 'Our water meets IS:14543, the Indian standard for packaged drinking water, covering physical, chemical, and microbiological quality benchmarks.',
  },
  {
    id: 'iso',
    icon: '🌐',
    title: 'ISO 9001 : 2015',
    subtitle: 'Quality Management System',
    number: 'In Process',
    numberLabel: 'Certification',
    validUntil: 'Applied',
    color: '#C9A027',
    desc: 'Our production processes are aligned with ISO 9001:2015 standards, ensuring consistent quality at every stage — from sourcing to delivery.',
  },
  {
    id: 'iso22',
    icon: '🍃',
    title: 'ISO 22000',
    subtitle: 'Food Safety Management System',
    number: 'In Process',
    numberLabel: 'Certification',
    validUntil: 'Applied',
    color: '#00B4D8',
    desc: 'ISO 22000 integrates food safety management across the entire supply chain, from water source through to the sealed bottle in your hands.',
  },
  {
    id: 'gst',
    icon: '📋',
    title: 'GST Registered',
    subtitle: 'Goods & Services Tax — Govt. of India',
    number: '23CANPC8799P1ZP',
    numberLabel: 'GSTIN',
    validUntil: 'Active',
    color: '#C9A027',
    desc: 'Fully registered under India\'s GST framework. All transactions are invoiced and compliant with national tax regulations.',
  },
  {
    id: 'bpa',
    icon: '♻️',
    title: 'BPA Free Packaging',
    subtitle: 'Food-Grade, Non-Toxic Bottles',
    number: '100% Verified',
    numberLabel: 'Status',
    validUntil: 'Always',
    color: '#00B4D8',
    desc: 'All Healtho bottles are manufactured from BPA-free, food-grade PET plastic — safe for adults, children, and infants alike.',
  },
]

function Badge({ badge, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${badge.color}30`,
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(16px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: `radial-gradient(circle, ${badge.color}12, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Icon */}
      <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${badge.color}15`, border: `1px solid ${badge.color}30`, display: 'grid', placeItems: 'center', fontSize: '2rem', marginBottom: '1.2rem' }}>
        {badge.icon}
      </div>

      <h3 style={{ color: badge.color, fontFamily: 'var(--font-serif)', marginBottom: '0.3rem' }}>{badge.title}</h3>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.2rem', letterSpacing: '0.05em' }}>{badge.subtitle}</p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>{badge.numberLabel}</span>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.2rem', fontFamily: badge.id === 'gst' ? 'var(--font-sans)' : 'inherit' }}>
            {badge.number}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Valid</span>
          <div style={{ fontSize: '0.88rem', color: badge.color, marginTop: '0.2rem' }}>{badge.validUntil}</div>
        </div>
      </div>

      <p style={{ fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>{badge.desc}</p>
    </motion.div>
  )
}

export default function Credentials() {
  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '50vh', display: 'flex', alignItems: 'flex-end',
        background: 'linear-gradient(150deg, #020810, #050D1A 45%, #0A1E38)',
        paddingBottom: '4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,160,39,0.06), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Quality Assurance
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ fontWeight: 300 }}>
            Our<br /><em style={{ color: 'var(--gold)' }}>Credentials</em>
          </motion.h1>
          <div className="divider left" style={{ marginTop: '1.5rem' }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            style={{ maxWidth: '540px', fontSize: '1.05rem', lineHeight: 1.8, marginTop: '1.5rem' }}>
            Healtho is verified, licensed, and compliant with India's highest food safety and quality standards. Drink with confidence.
          </motion.p>
        </div>
      </section>

      {/* Badges grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {BADGES.map((badge, i) => <Badge key={badge.id} badge={badge} index={i} />)}
          </div>
        </div>
      </section>

      {/* FSSAI detail section */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>FSSAI Certificate</p>
              <h2 style={{ marginBottom: '1.5rem' }}>Government<br /><em>Certified & Licensed</em></h2>
              <div className="divider left" />
              <p style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                The Food Safety and Standards Authority of India (FSSAI) is the apex regulatory body under the Ministry of Health & Family Welfare. Our FSSAI license validates that Healtho meets all statutory requirements for packaged drinking water production in India.
              </p>
              <div className="glass-card" style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.8rem', minWidth: '300px' }}>
                {[
                  ['License Holder', 'Ankit Chouhan'],
                  ['Trade Name',     'Mahima Chilled Water'],
                  ['FSSAI No.',      '[From Certificate — PDF on file]'],
                  ['Valid Until',    '2027'],
                  ['Category',       'Packaged Drinking Water'],
                  ['State',          'Madhya Pradesh'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {/* GST Detail card */}
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>GST Registration</p>
              <h2 style={{ marginBottom: '1.5rem' }}>Tax<br /><em>Compliant Business</em></h2>
              <div className="divider left" />
              <p style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Fully registered under India's Goods and Services Tax system. All purchase invoices include a valid GSTIN. Your business purchases are fully tax-creditable.
              </p>
              <div className="glass-card" style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.8rem', minWidth: '300px', borderColor: 'var(--border-blue)' }}>
                {[
                  ['GSTIN',         '23CANPC8799P1ZP'],
                  ['Legal Name',    'Ankit Chouhan'],
                  ['Trade Name',    'Mahima Chilled Water'],
                  ['ARN',           'AA2302265843​41F'],
                  ['Date of ARN',   '24 March 2026'],
                  ['State Code',    '23 — Madhya Pradesh'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', textAlign: 'right', wordBreak: 'break-all' }}>{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality promise */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ maxWidth: '700px', margin: '0 auto 1rem', fontWeight: 300 }}>
            Every bottle carries our <em style={{ color: 'var(--gold)' }}>promise of purity</em> — backed by law, science, and conscience.
          </motion.h2>
          <div className="divider" />
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
