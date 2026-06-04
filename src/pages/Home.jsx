import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, AwardIcon, ZapIcon, ArrowRight } from '../components/Icons'

const FEATURES = [
  { Icon: LayersIcon, title: '7-Layer Filtration',  sub: 'Multi-stage in-house purification removes every contaminant.' },
  { Icon: PHIcon,     title: 'pH 8.5+ Alkaline',    sub: 'Precisely calibrated alkalinity for optimal hydration.' },
  { Icon: DropIcon,   title: 'Mineral Enhanced',    sub: 'Calcium & Magnesium re-added post-RO for taste and health.' },
  { Icon: ShieldIcon, title: 'BPA Free Packaging',  sub: 'Certified food-grade PET — zero harmful chemicals.' },
  { Icon: AwardIcon,  title: 'FSSAI Certified',     sub: 'Government licensed, independently tested and verified.' },
]

const BENEFITS = [
  { Icon: ZapIcon,    title: 'Superior Hydration',   text: 'Faster cellular absorption — hydrates at the molecular level.' },
  { Icon: PHIcon,     title: 'Optimal pH Balance',   text: 'Supports your body\'s natural alkaline state.' },
  { Icon: DropIcon,   title: 'Antioxidant-Rich',     text: 'Low ORP water actively neutralises free radicals.' },
  { Icon: ShieldIcon, title: 'Digestive Health',     text: 'Gentler on your digestive system than regular water.' },
  { Icon: ZapIcon,    title: 'Electrolyte Balance',  text: 'Mineral-enhanced formula for lasting energy.' },
  { Icon: AwardIcon,  title: 'Bone & Joint Health',  text: 'Calcium and magnesium support long-term bone density.' },
]

function FeatureCard({ Icon, title, sub, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.9rem' }}
    >
      <div style={{
        width: '56px', height: '56px', flexShrink: 0, borderRadius: '14px',
        background: 'rgba(0,180,216,0.07)', border: '1px solid rgba(0,180,216,0.22)',
        display: 'grid', placeItems: 'center',
      }}>
        <Icon size={24} color="var(--blue)" strokeWidth={1.5} />
      </div>
      <div>
        <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginBottom: '0.3rem' }}>{title}</h4>
        <p style={{ fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{sub}</p>
      </div>
    </motion.div>
  )
}

function BenefitCard({ Icon, title, text, delay, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        position: 'relative', padding: '1.8rem 1.4rem',
        background: 'linear-gradient(145deg, rgba(0,180,216,0.06), rgba(0,180,216,0.02))',
        borderRadius: '16px', border: '1px solid rgba(0,180,216,0.14)',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.9rem',
        cursor: 'default', overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.35)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,180,216,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Number badge */}
      <span style={{ position: 'absolute', top: '1rem', right: '1.2rem', fontSize: '0.72rem', color: 'rgba(201,160,39,0.35)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
        0{index + 1}
      </span>
      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)',
        display: 'grid', placeItems: 'center',
      }}>
        <Icon size={24} color="var(--blue)" strokeWidth={1.5} />
      </div>
      <div>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{title}</h4>
        <p style={{ fontSize: '0.84rem', lineHeight: 1.65, margin: 0, color: 'var(--text-muted)' }}>{text}</p>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bottleY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
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

        {/* Bottle — right, clean graphic */}
        <motion.div style={{
          y: bottleY, position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)', zIndex: 1,
        }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,180,216,0.20) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(36px)', pointerEvents: 'none' }} />
          <img src="/assets/bottle-hero.jpg" alt="Healtho Alkaline Water"
            style={{ height: '80vh', maxHeight: '700px', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 40px 80px rgba(0,180,216,0.30)) drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }} />
        </motion.div>

        {/* Floating particles */}
        {[
          { top:'18%', left:'8%',  size:5, color:'rgba(0,180,216,0.5)',   dur:4.2, d:0 },
          { top:'42%', left:'4%',  size:3, color:'rgba(201,160,39,0.4)',  dur:5.0, d:1.2 },
          { top:'72%', left:'12%', size:6, color:'rgba(0,180,216,0.35)',  dur:3.8, d:0.6 },
          { top:'28%', left:'44%', size:4, color:'rgba(255,255,255,0.15)', dur:6.0, d:2.0 },
        ].map((p, i) => (
          <motion.div key={i}
            style={{ position:'absolute', top:p.top, left:p.left, width:p.size, height:p.size, borderRadius:'50%', background:p.color, pointerEvents:'none' }}
            animate={{ y:[0,-16,0], opacity:[0.3,0.9,0.3] }}
            transition={{ duration:p.dur, repeat:Infinity, delay:p.d, ease:'easeInOut' }} />
        ))}

        {/* Hero text — left aligned */}
        <motion.div style={{ y: textY, opacity: heroOp, position: 'relative', zIndex: 2 }} className="container">
          <div style={{ maxWidth: '560px' }}>

            {/* Logo — bigger */}
            <motion.div {...stagger(0.15)} style={{ marginBottom: '1.6rem' }}>
              <img src="/assets/logo.png" alt="Healtho"
                style={{ height: '100px', filter: 'drop-shadow(0 0 14px rgba(0,180,216,0.45))' }} />
            </motion.div>

            {/* Heading */}
            <motion.h1 {...stagger(0.3)} style={{ fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '0.7rem', fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}>
              Premium <em style={{ color: 'var(--blue)' }}>Alkaline</em> Water
            </motion.h1>

            {/* Tagline */}
            <motion.p {...stagger(0.44)} style={{ fontSize: '0.78rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.8rem' }}>
              pure · premium · perfect
            </motion.p>

            {/* Description — 2 paragraphs, bigger */}
            <motion.p {...stagger(0.56)} style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: '480px', marginBottom: '1rem' }}>
              Healtho is India's premium packaged alkaline drinking water — 7-layer in-house filtration, pH 8.5+, mineral-enhanced, and FSSAI certified. Available in 1L for retail and bulk orders.
            </motion.p>
            <motion.p {...stagger(0.64)} style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: '480px', marginBottom: '2.2rem' }}>
              We also offer end-to-end custom label solutions for businesses — hotels, restaurants, corporates, and events — in four sizes with your branding.
            </motion.p>

            {/* Two CTAs */}
            <motion.div {...stagger(0.76)} style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-gold" style={{ gap: '0.5rem', fontSize: '0.95rem', padding: '0.85rem 1.8rem' }}>
                Explore Products <ArrowRight size={15} color="currentColor" />
              </Link>
              <Link to="/services" className="btn btn-outline" style={{ gap: '0.5rem', fontSize: '0.95rem', padding: '0.85rem 1.8rem' }}>
                Explore Services <ArrowRight size={15} color="currentColor" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}>
          <span style={{ fontSize: '0.64rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: '1px', height: '38px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BENEFITS OF ALKALINE WATER — animated, prominent
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.6rem' }}>Why Alkaline?</p>
            <h2 style={{ fontWeight: 300, fontSize: 'clamp(1.8rem,3vw,2.4rem)', margin: 0 }}>
              Benefits of <em style={{ color: 'var(--blue)' }}>Alkaline Water</em>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
            {BENEFITS.map(({ Icon, title, text }, i) => (
              <BenefitCard key={title} Icon={Icon} title={title} text={text} delay={i * 0.08} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT MAKES US DIFFERENT — centred cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>What makes us different</p>
            <h3 style={{ fontWeight: 300, fontSize: '1.5rem', margin: 0 }}>Built on <em>Five Pillars</em> of Purity</h3>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.2rem' }}>
            {FEATURES.map(({ Icon, title, sub }, i) => (
              <FeatureCard key={title} Icon={Icon} title={title} sub={sub} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TWO SERVICES OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>What We Offer</p>
            <h2 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Two Ways We <em>Serve You</em></h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '860px', margin: '0 auto' }}>
            {/* Product */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ background: 'rgba(0,180,216,0.04)', border: '1px solid rgba(0,180,216,0.18)', borderRadius: '20px', padding: '2.2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', display: 'grid', placeItems: 'center', marginBottom: '1.2rem' }}>
                <DropIcon size={24} color="var(--blue)" strokeWidth={1.4} />
              </div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '0.4rem' }}>Our Product</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>Healtho Alkaline Water</h3>
              <p style={{ fontSize: '0.86rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Premium packaged alkaline water, 1L bottle. pH 8.5+, mineral-enhanced, FSSAI certified — for retail and bulk orders.
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {['1 L Bottle','pH 8.5+','Retail & Bulk'].map(t => (
                  <span key={t} style={{ fontSize: '0.74rem', padding: '0.2rem 0.65rem', border: '1px solid rgba(0,180,216,0.2)', borderRadius: '50px', color: 'var(--blue)' }}>{t}</span>
                ))}
              </div>
              <Link to="/products" className="btn btn-gold" style={{ gap: '0.5rem', marginTop: 'auto' }}>
                Explore Products <ArrowRight size={14} color="currentColor" />
              </Link>
            </motion.div>

            {/* Service */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}
              style={{ background: 'rgba(201,160,39,0.04)', border: '1px solid var(--border-gold)', borderRadius: '20px', padding: '2.2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(201,160,39,0.08)', border: '1px solid var(--border-gold)', display: 'grid', placeItems: 'center', marginBottom: '1.2rem' }}>
                <AwardIcon size={24} color="var(--gold)" strokeWidth={1.4} />
              </div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>Our Service</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>Custom Label Bottles</h3>
              <p style={{ fontSize: '0.86rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                End-to-end custom-labelled water for hotels, restaurants, and corporates. Choose size, water type (RO or Alkaline), quantity, and branding.
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {['250ml–1L','RO or Alkaline','Custom Branding'].map(t => (
                  <span key={t} style={{ fontSize: '0.74rem', padding: '0.2rem 0.65rem', border: '1px solid var(--border-gold)', borderRadius: '50px', color: 'var(--gold)' }}>{t}</span>
                ))}
              </div>
              <Link to="/services" className="btn btn-outline" style={{ gap: '0.5rem', borderColor: 'var(--gold)', color: 'var(--gold)', marginTop: 'auto' }}>
                Explore Services <ArrowRight size={14} color="currentColor" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important; gap: 2rem !important;
          }
          section > .container > div[style*="grid-template-columns: repeat(auto-fit, minmax(180px"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  )
}
