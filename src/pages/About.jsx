import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { LayersIcon, AwardIcon, ShieldIcon } from '../components/Icons'

/* ── Purification steps ─────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'Source Selection',      desc: 'Pristine groundwater from deep underground aquifers, naturally filtered over centuries.' },
  { num: '02', title: 'Pre-filtration',         desc: 'Multi-grade sand and gravel beds remove suspended sediment and large particles.' },
  { num: '03', title: 'Activated Carbon',       desc: 'GAC removes chlorine, organic compounds, odours, and chemical traces.' },
  { num: '04', title: 'Reverse Osmosis',        desc: '7-stage RO membrane at 0.0001 µm rejects 99.9% of dissolved salts, heavy metals, and micro-contaminants.' },
  { num: '05', title: 'Mineral Enhancement',    desc: 'Calcium and magnesium re-added at precise health-optimal concentrations post-RO.' },
  { num: '06', title: 'Alkalinity Calibration', desc: 'pH fine-tuned to 8.5–9.0. Every batch measured and certified before bottling.' },
  { num: '07', title: 'Quality Testing & Bottling', desc: 'NABL-accredited lab checks 50+ parameters. Bottled in a dust-free, positive-pressure clean room.' },
]

function ProcessStep({ step }) {
  const ref  = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.55, rootMargin: '-15% 0px -15% 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
      padding: '1.1rem 0 1.1rem 1.6rem',
      borderLeft: `2px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.07)'}`,
      opacity: active ? 1 : 0.3,
      transition: 'opacity 0.5s ease, border-color 0.5s ease',
    }}>
      <div style={{
        flexShrink: 0, width: '34px', height: '34px', borderRadius: '50%',
        background: active ? 'rgba(201,160,39,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
        display: 'grid', placeItems: 'center',
        transition: 'all 0.5s ease',
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 600, color: active ? 'var(--gold)' : 'var(--text-muted)', letterSpacing: '0.05em' }}>
          {step.num}
        </span>
      </div>
      <div>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', color: active ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '0.2rem', transition: 'color 0.5s', fontWeight: 400 }}>
          {step.title}
        </h4>
        <p style={{ fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
      </div>
    </div>
  )
}

/* ── About tabs ─────────────────────────────────────────────── */
const TABS = [
  {
    label: '7-Layer Facility',
    Icon: LayersIcon,
    heading: '7-Layer In-House Facility',
    content: 'State-of-the-art in-house purification plant with 7-stage RO technology — from raw groundwater to crystal-clear alkaline water, entirely under our roof. Full quality control at every stage, zero outsourcing.',
  },
  {
    label: 'FSSAI Licensed',
    Icon: AwardIcon,
    heading: 'FSSAI Licensed & Certified',
    content: 'Government-certified facility under FSSAI License No. 11423850000323. Independently audited and renewed annually — our licence is our commitment to your safety and trust.',
  },
  {
    label: 'Quality',
    Icon: ShieldIcon,
    heading: 'Minerals & BPA Free',
    content: 'Post-RO mineral enhancement restores calcium and magnesium at health-optimal levels. Every bottle is manufactured from certified BPA-free, food-grade PET — zero harmful chemicals, zero compromise.',
  },
]

function AboutTabs() {
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {TABS.map((tab, i) => (
          <button key={tab.label} onClick={() => setActive(i)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '50px',
              border: `1px solid ${active === i ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
              background: active === i ? 'rgba(201,160,39,0.1)' : 'transparent',
              color: active === i ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: '0.76rem',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              letterSpacing: '0.04em',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {(() => { const T = TABS[active]; const Icon = T.Icon; return (
        <motion.div key={active}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="glass-card"
          style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', background: 'rgba(201,160,39,0.08)', border: '1px solid var(--border-gold)', display: 'grid', placeItems: 'center' }}>
            <Icon size={19} color="var(--gold)" strokeWidth={1.5} />
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.45rem' }}>{TABS[active].heading}</h4>
            <p style={{ fontSize: '0.82rem', margin: 0, lineHeight: 1.65 }}>{TABS[active].content}</p>
          </div>
        </motion.div>
        )})()}
      </AnimatePresence>
    </div>
  )
}

/* ── Gallery ────────────────────────────────────────────────── */
const GALLERY = [
  { id:1, src:'/assets/bottle-hero.jpg',       cat:'Product', caption:'Healtho 500ml — Premium Alkaline Water' },
  { id:2, src:'/assets/bottle-concepts-1.jpg', cat:'Design',  caption:'Label Concepts — Series A' },
  { id:3, src:'/assets/bottle-concepts-2.jpg', cat:'Design',  caption:'Label Concepts — Series B' },
  { id:4, src:null, ph:'🏭', cat:'Factory',  caption:'RO Purification Unit — In-House Facility' },
  { id:5, src:null, ph:'💧', cat:'Source',   caption:'Groundwater Source — Deep Aquifer' },
  { id:6, src:null, ph:'📦', cat:'Product',  caption:'Bulk Supply — Dispenser Ready' },
]

export default function About() {
  const [lightbox, setLightbox] = useState(null)
  const withSrc = GALLERY.filter(g => g.src)

  const prevLb = () => {
    const i = withSrc.findIndex(g => g.id === lightbox.id)
    setLightbox(withSrc[(i - 1 + withSrc.length) % withSrc.length])
  }
  const nextLb = () => {
    const i = withSrc.findIndex(g => g.id === lightbox.id)
    setLightbox(withSrc[(i + 1) % withSrc.length])
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '55vh', display: 'flex', alignItems: 'flex-end',
        position: 'relative', overflow: 'hidden', paddingBottom: '4.5rem',
        background: 'linear-gradient(160deg, #020810, #050D1A 35%, #0A1E38 65%, #051828)',
      }}>
        <WaveCanvas intensity={0.9} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
            style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>
            About Healtho
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }} style={{ fontWeight:300, maxWidth:'640px' }}>
            Committed to Purity.<br /><em style={{ color:'var(--blue)' }}>Dedicated to Health.</em>
          </motion.h1>
          <div className="divider left" style={{ marginTop:'1.5rem' }} />
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.3 }}
            style={{ maxWidth:'520px', fontSize:'0.96rem', lineHeight:1.85, marginTop:'1.4rem', color:'var(--text-muted)' }}>
            Hydration is the foundation of health — and we take that seriously. Every bottle is our promise to deliver water that is pure, mineral-rich, and verified for safety.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BRAND STORY — left text + right tabs
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'4.5rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4.5rem', alignItems:'start' }}>

            {/* Left — story text, left aligned, compact */}
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.85 }}>
              <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.7rem' }}>Our Story</p>
              <h2 style={{ fontWeight:300, marginBottom:'1.2rem', lineHeight:1.2, fontSize:'2rem' }}>
                Better Hydration<br /><em>Begins Here</em>
              </h2>
              <div className="divider left" />
              <p style={{ marginTop:'1.2rem', marginBottom:'0.8rem', lineHeight:1.75, fontSize:'0.88rem' }}>
                Most water quenches thirst. Healtho does more — it supports your body's natural pH balance, replenishes minerals lost daily, and delivers a taste that is unmistakably clean.
              </p>
              <p style={{ lineHeight:1.75, fontSize:'0.88rem' }}>
                Backed by a state-of-the-art 7-layer in-house purification facility, government licensing, and rigorous quality assurance that leaves nothing to chance.
              </p>
            </motion.div>

            {/* Right — tabs */}
            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.85 }}>
              <AboutTabs />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7-LAYER PURIFICATION PROCESS — compact, full width
      ══════════════════════════════════════════════════════ */}
      <section id="process" style={{ padding:'4rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.4rem' }}>How We Do It</p>
            <h2 style={{ fontWeight:300, fontSize:'1.8rem', marginBottom:'0.6rem' }}>7-Layer Purification <em>Technology</em></h2>
            <p style={{ fontSize:'0.88rem', color:'var(--text-muted)', maxWidth:'520px', lineHeight:1.75 }}>
              From raw groundwater to pH 8.5+ alkaline water — every step controlled and certified in our licensed facility.
            </p>
          </motion.div>

          {/* Steps — single column, compact */}
          <div style={{ maxWidth:'660px' }}>
            {STEPS.map((step) => <ProcessStep key={step.num} step={step} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING QUOTE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'4rem 0', textAlign:'center', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ maxWidth:'640px', margin:'0 auto 0.8rem', fontWeight:300, lineHeight:1.3, fontSize:'1.9rem' }}>
            "We don't just sell water —<br />
            <em style={{ color:'var(--gold)' }}>we deliver a standard of purity."</em>
          </motion.h2>
          <div className="divider" />
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.3 }}
            style={{ fontSize:'0.82rem', color:'var(--text-muted)', marginTop:'0.8rem' }}>
            — Healtho
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PHOTO GALLERY
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'4.5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.4rem' }}>Gallery</p>
            <h2 style={{ marginTop:'0', fontWeight:300, fontSize:'1.8rem' }}>Inside <em>Healtho</em></h2>
            <div className="divider left" />
          </motion.div>

          <div style={{ columns:'3 260px', columnGap:'1rem' }}>
            {GALLERY.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.07 }}
                onClick={() => item.src && setLightbox(item)}
                style={{ breakInside:'avoid', marginBottom:'1rem', borderRadius:'12px', overflow:'hidden', border:'1px solid var(--border-gold)', cursor:item.src?'zoom-in':'default', background:item.src?'transparent':'var(--bg-card)' }}>
                {item.src ? (
                  <div style={{ position:'relative', overflow:'hidden' }}>
                    <img src={item.src} alt={item.caption} style={{ width:'100%', display:'block', transition:'transform 0.5s' }}
                      onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,13,26,0.85) 0%, transparent 50%)', opacity:0, transition:'opacity 0.3s', display:'flex', alignItems:'flex-end', padding:'1rem' }}
                      onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0'}>
                      <p style={{ fontSize:'0.82rem', color:'#fff', margin:0 }}>{item.caption}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding:'2rem 1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem', minHeight:'140px', justifyContent:'center' }}>
                    <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:'rgba(0,180,216,0.06)', border:'1px solid var(--border-blue)', display:'grid', placeItems:'center', fontSize:'1.3rem' }}>{item.ph}</div>
                    <span style={{ fontSize:'0.68rem', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.15em' }}>{item.cat}</span>
                    <p style={{ fontSize:'0.8rem', margin:0, lineHeight:1.5 }}>{item.caption}</p>
                    <div style={{ fontSize:'0.66rem', color:'var(--text-muted)', border:'1px dashed rgba(255,255,255,0.12)', padding:'0.25rem 0.7rem', borderRadius:'50px' }}>Photo coming soon</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setLightbox(null)}
            style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(2,8,16,0.96)', backdropFilter:'blur(16px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
            <motion.div initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.88, opacity:0 }}
              onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:'860px', width:'100%' }}>
              <img src={lightbox.src} alt={lightbox.caption} style={{ width:'100%', borderRadius:'16px', border:'1px solid var(--border-gold)' }} />
              <p style={{ margin:'0.8rem 0 0', fontSize:'0.88rem', color:'var(--text-muted)' }}>{lightbox.caption}</p>
              <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:'-14px', right:'-14px', width:'36px', height:'36px', borderRadius:'50%', background:'rgba(201,160,39,0.9)', border:'none', cursor:'pointer', fontSize:'1.1rem', display:'grid', placeItems:'center', color:'#000' }}>×</button>
              {withSrc.length > 1 && <>
                <button onClick={prevLb} style={{ position:'absolute', left:'-52px', top:'50%', transform:'translateY(-50%)', width:'40px', height:'40px', borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid var(--border-gold)', cursor:'pointer', color:'var(--gold)', fontSize:'1.3rem' }}>‹</button>
                <button onClick={nextLb} style={{ position:'absolute', right:'-52px', top:'50%', transform:'translateY(-50%)', width:'40px', height:'40px', borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid var(--border-gold)', cursor:'pointer', color:'var(--gold)', fontSize:'1.3rem' }}>›</button>
              </>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 800px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  )
}
