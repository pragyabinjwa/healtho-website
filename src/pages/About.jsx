import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { LayersIcon, AwardIcon, ShieldIcon } from '../components/Icons'

/* ── Purification steps (7 layers, no UV / Ozone) ─────────── */
const STEPS = [
  { num: '01', title: 'Source Selection',      desc: 'Pristine groundwater from deep underground aquifers, naturally filtered over centuries.' },
  { num: '02', title: 'Pre-filtration',         desc: 'Multi-grade sand and gravel beds remove suspended sediment and large particles.' },
  { num: '03', title: 'Activated Carbon',       desc: 'GAC removes chlorine, organic compounds, odours, and chemical traces.' },
  { num: '04', title: 'Reverse Osmosis',        desc: '7-stage RO membrane at 0.0001 µm rejects 99.9% of dissolved salts, heavy metals, and micro-contaminants.' },
  { num: '05', title: 'Mineral Enhancement',    desc: 'Calcium and magnesium re-added at precise health-optimal concentrations post-RO.' },
  { num: '06', title: 'Alkalinity Calibration', desc: 'pH fine-tuned to 8.5–9.0. Every batch measured and certified before bottling.' },
  { num: '07', title: 'Quality Testing & Bottling', desc: 'NABL-accredited lab checks 50+ parameters. Bottled in a dust-free, positive-pressure clean room.' },
]

function ProcessStep({ step, i }) {
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
      display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
      padding: '1.8rem 0 1.8rem 2rem',
      borderLeft: `2px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.07)'}`,
      opacity: active ? 1 : 0.3,
      transition: 'opacity 0.5s ease, border-color 0.5s ease',
    }}>
      <div style={{
        flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%',
        background: active ? 'rgba(201,160,39,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
        display: 'grid', placeItems: 'center',
        transition: 'all 0.5s ease',
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, color: active ? 'var(--gold)' : 'var(--text-muted)', letterSpacing: '0.05em' }}>
          {step.num}
        </span>
      </div>
      <div>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: active ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '0.3rem', transition: 'color 0.5s', fontWeight: 400 }}>
          {step.title}
        </h4>
        <p style={{ fontSize: '0.84rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
      </div>
    </div>
  )
}

/* ── Gallery items ─────────────────────────────────────────── */
const GALLERY = [
  { id:1, src:'/assets/bottle-hero.jpg',       cat:'Product', caption:'Healtho 500ml — Premium Alkaline Water' },
  { id:2, src:'/assets/bottle-concepts-1.jpg', cat:'Design',  caption:'Label Concepts — Series A' },
  { id:3, src:'/assets/bottle-concepts-2.jpg', cat:'Design',  caption:'Label Concepts — Series B' },
  { id:4, src:null, ph:'🏭', cat:'Factory',  caption:'RO Purification Unit — In-House Facility' },
  { id:5, src:null, ph:'💧', cat:'Source',   caption:'Groundwater Source — Deep Aquifer' },
  { id:6, src:null, ph:'📦', cat:'Product',  caption:'20L Bulk Jar — Dispenser Ready' },
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
        minHeight: '65vh', display: 'flex', alignItems: 'flex-end',
        position: 'relative', overflow: 'hidden', paddingBottom: '5rem',
        background: 'linear-gradient(160deg, #020810, #050D1A 35%, #0A1E38 65%, #051828)',
      }}>
        <WaveCanvas intensity={0.9} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
            style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>
            About Healtho
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }} style={{ fontWeight:300, maxWidth:'700px' }}>
            Committed to Purity.<br /><em style={{ color:'var(--blue)' }}>Dedicated to Health.</em>
          </motion.h1>
          <div className="divider left" style={{ marginTop:'1.5rem' }} />
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.3 }}
            style={{ maxWidth:'580px', fontSize:'1.05rem', lineHeight:1.85, marginTop:'1.5rem', color:'var(--text-muted)' }}>
            Hydration is the foundation of health — and we take that seriously. At Healtho, every bottle is our promise to deliver water that is not just pure, but alive with minerals, calibrated for balance, and verified for safety.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>

            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.85 }}>
              <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>Our Story</p>
              <h2 style={{ fontWeight:300, marginBottom:'1.5rem', lineHeight:1.2 }}>
                Better Hydration<br /><em>Begins Here</em>
              </h2>
              <div className="divider left" />
              <p style={{ marginTop:'1.5rem', marginBottom:'1rem', lineHeight:1.85 }}>
                Most water quenches thirst. Healtho does more — it supports your body's natural pH balance, replenishes minerals lost daily, and delivers a taste that is unmistakably clean.
              </p>
              <p style={{ lineHeight:1.85 }}>
                We are committed to delivering purity and taste with health at every sip, backed by a state-of-the-art 7-layer purification facility, government licensing, and quality assurance that leaves nothing to chance.
              </p>
            </motion.div>

            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.85 }}>
              <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
                {[
                  { Icon:LayersIcon, h:'7-Layer In-House Facility',   t:'State-of-the-art purification machines and licensed water plant — entirely in-house, giving us full control over quality at every stage.' },
                  { Icon:AwardIcon,  h:'FSSAI Licensed',               t:'Government-certified facility. Our FSSAI license is publicly verifiable and renewed annually. License No. 11423850000323.' },
                  { Icon:ShieldIcon, h:'Quality You Can Verify',       t:'Every batch lab-tested. Every parameter logged. We don\'t just say "quality assured" — we prove it, batch by batch.' },
                ].map(({ Icon, h, t }) => (
                  <div key={h} className="glass-card" style={{ display:'flex', gap:'1.2rem', alignItems:'flex-start' }}>
                    <div style={{ width:'42px', height:'42px', flexShrink:0, borderRadius:'10px', background:'rgba(201,160,39,0.08)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center' }}>
                      <Icon size={20} color="var(--gold)" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', color:'var(--text-primary)', marginBottom:'0.3rem' }}>{h}</h4>
                      <p style={{ fontSize:'0.84rem', margin:0, lineHeight:1.65 }}>{t}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7-LAYER PURIFICATION PROCESS
      ══════════════════════════════════════════════════════ */}
      <section id="process" style={{ padding:'6rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div className="section-header" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)' }}>How We Do It</p>
            <h2 style={{ marginTop:'0.5rem', fontWeight:300 }}>7-Layer Purification<br /><em>Technology</em></h2>
            <div className="divider" />
            <p style={{ maxWidth:'560px', margin:'0 auto' }}>
              From raw groundwater to a bottle of crystal-clear pH 8.5+ alkaline water — every step controlled, monitored, and certified in our licensed, in-house facility.
            </p>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'start', maxWidth:'1000px', margin:'0 auto' }}>
            {/* Steps */}
            <div>
              {STEPS.map((step, i) => <ProcessStep key={step.num} step={step} i={i} />)}
            </div>

            {/* Sticky credentials */}
            <div style={{ position:'sticky', top:'120px', alignSelf:'start' }}>
              <div className="glass-card" style={{ marginBottom:'1.5rem' }}>
                <p style={{ fontSize:'0.68rem', color:'var(--gold)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.75rem' }}>FSSAI Certification</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
                  {[
                    ['License No.',   '11423850000323'],
                    ['License Holder','Ankit Chouhan'],
                    ['Trade Name',    'Mahima Chilled Water'],
                    ['Valid Until',   '2027'],
                    ['State',         'Madhya Pradesh'],
                  ].map(([l,v]) => (
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,0.04)', paddingBottom:'0.5rem' }}>
                      <span style={{ fontSize:'0.72rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{l}</span>
                      <span style={{ fontSize:'0.85rem', color:'var(--text-primary)', fontFamily: l==='License No.' ? 'monospace' : 'inherit', textAlign:'right', maxWidth:'60%' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <a href="/assets/fssai-certificate.pdf" target="_blank" rel="noreferrer"
                  className="btn btn-outline" style={{ width:'100%', justifyContent:'center', marginTop:'1.2rem', fontSize:'0.78rem' }}>
                  View Certificate ↗
                </a>
              </div>

              <div className="glass-card" style={{ borderColor:'var(--border-blue)' }}>
                <p style={{ fontSize:'0.68rem', color:'var(--blue)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.6rem' }}>GSTIN</p>
                <p style={{ fontFamily:'monospace', color:'var(--text-primary)', fontSize:'0.95rem', letterSpacing:'0.08em', margin:0 }}>23CANPC8799P1ZP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING QUOTE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', textAlign:'center', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ maxWidth:'700px', margin:'0 auto 1rem', fontWeight:300, lineHeight:1.25 }}>
            "We don't just sell water —<br />
            <em style={{ color:'var(--gold)' }}>we deliver a standard of purity."</em>
          </motion.h2>
          <div className="divider" />
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.3 }}
            style={{ fontSize:'0.88rem', color:'var(--text-muted)', marginTop:'1rem' }}>
            — Ankit Chouhan, Founder · Mahima Chilled Water
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PHOTO GALLERY
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div className="section-header" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)' }}>Gallery</p>
            <h2 style={{ marginTop:'0.5rem', fontWeight:300 }}>Inside <em>Healtho</em></h2>
            <div className="divider" />
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
                  <div style={{ padding:'2.5rem 1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', minHeight:'160px', justifyContent:'center' }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'rgba(0,180,216,0.06)', border:'1px solid var(--border-blue)', display:'grid', placeItems:'center', fontSize:'1.4rem' }}>{item.ph}</div>
                    <span style={{ fontSize:'0.68rem', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.15em' }}>{item.cat}</span>
                    <p style={{ fontSize:'0.82rem', margin:0, lineHeight:1.5 }}>{item.caption}</p>
                    <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', border:'1px dashed rgba(255,255,255,0.12)', padding:'0.3rem 0.8rem', borderRadius:'50px' }}>Photo coming soon</div>
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
            gap: 3rem !important;
          }
        }
      `}</style>
    </>
  )
}
