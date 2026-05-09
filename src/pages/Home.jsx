import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, ZapIcon, AwardIcon, ArrowRight } from '../components/Icons'

const WA = 'https://wa.me/919109348483'

/* ── Feature items ─────────────────────────────────────────── */
const FEATURES = [
  { Icon: LayersIcon, title: '7-Layer Filtration',  sub: 'State-of-the-art multi-stage purification — every contaminant removed.' },
  { Icon: PHIcon,     title: 'pH 8.5+ Alkaline',    sub: 'Precisely calibrated alkalinity for optimal cellular hydration.' },
  { Icon: DropIcon,   title: 'Mineral Enhanced',    sub: 'Calcium & Magnesium added back post-RO for natural taste and health.' },
  { Icon: ShieldIcon, title: 'BPA Free Packaging',  sub: 'Certified food-grade PET — zero harmful chemicals, every bottle.' },
  { Icon: AwardIcon,  title: 'FSSAI Certified',     sub: 'Government licensed, independently tested, publicly verified.' },
]

const SIZES = ['500 ml', '1 L', '5 L', '20 L']

function FeatureCard({ Icon, title, sub, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}
    >
      <div style={{
        width: '48px', height: '48px', flexShrink: 0, borderRadius: '12px',
        background: 'rgba(0,180,216,0.06)', border: '1px solid rgba(0,180,216,0.18)',
        display: 'grid', placeItems: 'center',
      }}>
        <Icon size={22} color="var(--blue)" strokeWidth={1.5} />
      </div>
      <div>
        <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>{title}</h4>
        <p style={{ fontSize: '0.86rem', lineHeight: 1.65, margin: 0 }}>{sub}</p>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bottleY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const heroOp   = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const stagger = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: [0.4, 0, 0.2, 1] },
  })

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 130% 90% at 60% 110%, rgba(0,180,216,0.10) 0%, transparent 55%), linear-gradient(160deg, #020810 0%, #050D1A 35%, #0A1E38 65%, #0B3D91 100%)',
      }}>
        <WaveCanvas intensity={1.2} />

        {/* Glow behind bottle */}
        <motion.div style={{ y: bottleY, position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '420px', height: '420px',
            background: 'radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(24px)', pointerEvents: 'none',
          }} />
          <img
            src="/assets/bottle-hero.jpg"
            alt="Healtho Premium Bottle"
            style={{
              height: '82vh', maxHeight: '680px',
              objectFit: 'contain', position: 'relative', zIndex: 1,
              filter: 'drop-shadow(0 40px 80px rgba(0,180,216,0.25)) drop-shadow(0 0 1px rgba(255,255,255,0.15))',
            }}
          />
        </motion.div>

        {/* Floating particles */}
        {[
          { top:'18%', left:'8%',  size:5, color:'rgba(0,180,216,0.5)',  dur:4.2, d:0 },
          { top:'42%', left:'4%',  size:3, color:'rgba(201,160,39,0.4)', dur:5.0, d:1.2 },
          { top:'72%', left:'12%', size:6, color:'rgba(0,180,216,0.35)', dur:3.8, d:0.6 },
          { top:'28%', left:'45%', size:4, color:'rgba(255,255,255,0.2)',dur:6.0, d:2.0 },
        ].map((p,i) => (
          <motion.div key={i}
            style={{ position:'absolute', top:p.top, left:p.left, width:p.size, height:p.size, borderRadius:'50%', background:p.color, pointerEvents:'none' }}
            animate={{ y:[0,-16,0], opacity:[0.3,0.9,0.3] }}
            transition={{ duration:p.dur, repeat:Infinity, delay:p.d, ease:'easeInOut' }}
          />
        ))}

        {/* ── Hero text ── */}
        <motion.div style={{ y: textY, opacity: heroOp, position: 'relative', zIndex: 2 }} className="container">
          <div style={{ maxWidth: '600px' }}>

            <motion.div {...stagger(0.15)} style={{ marginBottom: '1.8rem' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                Healtho · Madhya Pradesh
              </span>
            </motion.div>

            {/* Big label */}
            <motion.div {...stagger(0.3)}>
              <div style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                letterSpacing: '0.45em', textTransform: 'uppercase',
                color: 'var(--blue)', fontWeight: 500,
                marginBottom: '0.6rem',
              }}>
                Premium Alkaline Water
              </div>
            </motion.div>

            <motion.h1 {...stagger(0.45)} style={{ fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.08, marginBottom: '0.4rem' }}>
              Pure.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Powerful.</em>
            </motion.h1>
            <motion.h1 {...stagger(0.55)} style={{ fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.08, marginBottom: '2rem' }}>
              Perfect.
            </motion.h1>

            <motion.p {...stagger(0.7)} style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: '460px', marginBottom: '2.2rem' }}>
              Crafted for superior hydration — Healtho undergoes 7-layer RO filtration, returning to you as pH-balanced alkaline water with essential minerals. Pure by science. Trusted by choice.
            </motion.p>

            <motion.div {...stagger(0.88)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-gold" style={{ gap: '0.6rem' }}>
                Explore Products <ArrowRight size={16} color="currentColor" />
              </Link>
              <a href={WA} target="_blank" rel="noreferrer" className="btn btn-outline">
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}
        >
          <span style={{ fontSize: '0.64rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: '1px', height: '38px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.6rem' }}>What makes us different</p>
            <h2 style={{ fontWeight: 300 }}>Built on <em>Five Pillars</em> of Purity</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {FEATURES.map(({ Icon, title, sub }, i) => (
              <FeatureCard key={title} Icon={Icon} title={title} sub={sub} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUR SIZES · ONE STANDARD
      ══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Text side */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85 }}>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>Our Range</p>
              <h2 style={{ marginBottom: '1rem', lineHeight: 1.15 }}>
                Four Sizes.<br />
                <em style={{ fontStyle: 'italic' }}>One Standard</em> — Pure.
              </h2>
              <div className="divider left" />
              <p style={{ margin: '1.5rem 0 1.2rem' }}>
                Whether you're hydrating on the go or supplying a full event — Healtho delivers the same pristine quality. Available in four sizes, every bottle identical in purity.
              </p>
              <p style={{ marginBottom: '2rem', color: 'var(--blue)', fontSize: '0.9rem', fontWeight: 500 }}>
                We also offer <strong style={{ color: 'var(--gold)' }}>custom labelling services</strong> — get Healtho water in your brand's identity. Perfect for hotels, restaurants, and corporate events.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn-gold">View Products</Link>
                <a href={`https://wa.me/919109348483?text=${encodeURIComponent('Hi Healtho! I am interested in custom label water bottle services.')}`} target="_blank" rel="noreferrer" className="btn btn-outline">
                  Custom Labels
                </a>
              </div>
            </motion.div>

            {/* Sizes visual */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {SIZES.map((size, i) => (
                <motion.div key={size}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  style={{
                    position: 'relative', borderRadius: '16px', overflow: 'hidden',
                    border: '1px solid var(--border-gold)',
                    aspectRatio: '3/4',
                    background: 'linear-gradient(160deg, rgba(10,30,56,0.9), rgba(5,13,26,0.95))',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                    padding: '1rem',
                  }}
                >
                  <img src="/assets/bottle-hero.jpg" alt={`Healtho ${size}`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center 30%', opacity: 0.75, padding: '1rem 1rem 3rem' }} />
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', background: 'rgba(5,13,26,0.7)', borderRadius: '8px', padding: '0.4rem 0.8rem', backdropFilter: 'blur(8px)', border: '1px solid var(--border-gold)' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--gold)', lineHeight: 1 }}>{size}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OUR PROMISE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,180,216,0.04), transparent)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85 }}>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>Our Promise</p>
              <h2 style={{ marginBottom: '1.5rem', lineHeight: 1.15 }}>
                Purity You Can<br /><em style={{ color: 'var(--blue)' }}>Trust & Verify</em>
              </h2>
              <div className="divider left" />
              <p style={{ margin: '1.5rem 0 1rem' }}>
                Healtho is more than filtered water. It is the result of a state-of-the-art 7-layer purification system designed, monitored, and certified to the highest standards in India.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Every batch is tested across 50+ parameters at an accredited lab. Our FSSAI government license is not a formality — it is a commitment renewed every year.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-outline">Our Process</Link>
                <Link to="/about#credentials" className="btn btn-gold">View Credentials</Link>
              </div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { Icon: LayersIcon, h: 'State-of-the-Art Technology',   t: 'A 7-stage purification facility purpose-built for consistency, capacity, and purity.' },
                { Icon: AwardIcon,  h: 'FSSAI Government Licensed',      t: 'License No. 11423850000323. Issued and monitored by India\'s apex food safety body.' },
                { Icon: ShieldIcon, h: 'Quality Assurance, Every Batch', t: '50+ parameters. NABL-accredited lab testing. Zero compromise, zero shortcuts.' },
              ].map(({ Icon, h, t }, i) => (
                <motion.div key={h}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', padding: '1.4rem', background: 'rgba(10,30,56,0.5)', borderRadius: '12px', border: '1px solid var(--border-gold)' }}
                >
                  <div style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px', background: 'rgba(201,160,39,0.08)', border: '1px solid var(--border-gold)', display: 'grid', placeItems: 'center' }}>
                    <Icon size={20} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginBottom: '0.3rem' }}>{h}</h4>
                    <p style={{ fontSize: '0.84rem', margin: 0, lineHeight: 1.65 }}>{t}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </>
  )
}
