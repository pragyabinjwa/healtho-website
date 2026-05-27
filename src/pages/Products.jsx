import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, AwardIcon, ZapIcon, CheckIcon, WAIcon, ArrowRight } from '../components/Icons'

const WA_NUMBER = '919109348483'

const SIZES = ['200 ml', '500 ml', '750 ml', '1 L']

/* ── WhatsApp message builders ─────────────────────────────── */
function buildBulkMsg(f) {
  return [
    'Hi Healtho! 👋 I would like to get a quote for bulk bottled water.',
    '',
    `*Name:* ${f.name || '—'}`,
    `*Phone:* ${f.phone || '—'}`,
    `*Bottle Size:* ${f.size}`,
    `*Quantity Required:* ${f.qty || '—'}`,
    `*Delivery Location:* ${f.location || '—'}`,
    f.notes ? `*Additional Notes:* ${f.notes}` : '',
    '',
    'Please share pricing and availability. Thank you!',
  ].filter(Boolean).join('\n')
}

function buildCustomMsg(f) {
  return [
    'Hi Healtho! 👋 I am interested in custom label bottle services.',
    '',
    `*Business Name:* ${f.bizName || '—'}`,
    `*Business Type:* ${f.bizType || '—'}`,
    `*Contact Name:* ${f.name || '—'}`,
    `*Phone:* ${f.phone || '—'}`,
    `*Bottle Size:* ${f.size}`,
    `*Estimated Quantity:* ${f.qty || '—'}`,
    `*Customisation Requirements:* ${f.notes || '—'}`,
    '',
    'Please share details on end-to-end custom label services. Thank you!',
  ].filter(Boolean).join('\n')
}

/* ── Quote modal ───────────────────────────────────────────── */
function QuoteModal({ type, onClose }) {
  const initBulk   = { name:'', phone:'', size:'500 ml', qty:'', location:'', notes:'' }
  const initCustom = { bizName:'', bizType:'Hotel', name:'', phone:'', size:'500 ml', qty:'', notes:'' }
  const [form, setForm] = useState(type === 'bulk' ? initBulk : initCustom)
  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const inp = {
    width: '100%', padding: '0.8rem 1rem',
    background: 'rgba(10,30,56,0.7)', border: '1px solid rgba(0,180,216,0.2)',
    borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)', outline: 'none',
    transition: 'border-color 0.3s',
  }
  const lbl = { fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }
  const onF = e => e.target.style.borderColor = 'var(--gold)'
  const onB = e => e.target.style.borderColor = 'rgba(0,180,216,0.2)'

  const submit = e => {
    e.preventDefault()
    const msg = type === 'bulk' ? buildBulkMsg(form) : buildCustomMsg(form)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    onClose()
  }

  const BIZ_TYPES = ['Hotel', 'Restaurant', 'Corporate Office', 'Hospital', 'Event Organiser', 'Retail Store', 'Other']

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(2,8,16,0.92)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)', borderRadius: '20px', padding: '2.5rem', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', marginBottom: '0.3rem' }}>
              {type === 'bulk' ? 'Get a Bulk Quote' : 'Custom Label Enquiry'}
            </h3>
            <p style={{ fontSize: '0.82rem', margin: 0 }}>We'll draft a WhatsApp message for you — just send it!</p>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem', display: 'grid', placeItems: 'center' }}>×</button>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {type === 'custom' && (
            <>
              <div><label style={lbl}>Business Name</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="Hotel Sunrise" value={form.bizName} onChange={s('bizName')} /></div>
              <div>
                <label style={lbl}>Business Type</label>
                <select style={{ ...inp, cursor: 'pointer', appearance: 'none' }} value={form.bizType} onChange={s('bizType')} onFocus={onF} onBlur={onB}>
                  {BIZ_TYPES.map(t => <option key={t} value={t} style={{ background: '#0A1E38' }}>{t}</option>)}
                </select>
              </div>
            </>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div><label style={lbl}>Your Name *</label><input required style={inp} onFocus={onF} onBlur={onB} placeholder="Rahul Sharma" value={form.name} onChange={s('name')} /></div>
            <div><label style={lbl}>Phone *</label><input required type="tel" style={inp} onFocus={onF} onBlur={onB} placeholder="+91 98765 43210" value={form.phone} onChange={s('phone')} /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div>
              <label style={lbl}>Bottle Size</label>
              <select style={{ ...inp, cursor: 'pointer', appearance: 'none' }} value={form.size} onChange={s('size')} onFocus={onF} onBlur={onB}>
                {SIZES.map(sz => <option key={sz} value={sz} style={{ background: '#0A1E38' }}>{sz}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Quantity</label><input style={inp} onFocus={onF} onBlur={onB} placeholder={type==='bulk'?'e.g. 500 bottles':'e.g. 1000 bottles'} value={form.qty} onChange={s('qty')} /></div>
          </div>

          {type === 'bulk' && (
            <div><label style={lbl}>Delivery Location</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="City / Address" value={form.location} onChange={s('location')} /></div>
          )}

          <div>
            <label style={lbl}>{type === 'bulk' ? 'Additional Notes' : 'Customisation Requirements'}</label>
            <textarea rows={3} style={{ ...inp, resize: 'vertical', minHeight: '80px' }} onFocus={onF} onBlur={onB}
              placeholder={type === 'bulk' ? 'Frequency, recurring order, event date...' : 'Logo colours, label design, special packaging...'}
              value={form.notes} onChange={s('notes')} />
          </div>

          <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.9rem', background: '#25D366', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s', fontFamily: 'var(--font-sans)' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            <WAIcon size={18} /> Send via WhatsApp
          </button>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>Opens WhatsApp with your message pre-filled. No data stored on our side.</p>
        </form>
      </motion.div>
    </motion.div>
  )
}

/* ── Scroll-highlight features ─────────────────────────────── */
const SCROLL_FEATURES = [
  { Icon: LayersIcon, title: '7-Layer Filtration Technology',  desc: 'In-house 7-stage purification — from raw groundwater to crystal-clear alkaline water with zero contaminants.', color: 'var(--blue)' },
  { Icon: PHIcon,     title: 'pH 8.5+ Alkaline Balance',       desc: 'Calibrated to 8.5–9.0, supporting optimal cellular hydration and neutralising dietary acidity.', color: 'var(--blue)' },
  { Icon: DropIcon,   title: 'Mineral-Enhanced Formulation',   desc: 'Calcium and magnesium re-added post-RO at health-optimal concentrations — natural taste, real nutrition.', color: 'var(--gold)' },
  { Icon: ShieldIcon, title: 'BPA Free · Food-Grade Packaging', desc: 'Certified food-grade PET plastic. Zero bisphenol A, zero heavy metals, zero compromise.', color: 'var(--gold)' },
  { Icon: AwardIcon,  title: 'FSSAI Licensed & Tested',         desc: 'Government-licensed facility, independently tested across 50+ parameters. Credentials public and verifiable.', color: 'var(--blue)' },
]

function ScrollFeatures() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.idx)
          setActive(idx)
        }
      })
    }, { threshold: 0.55, rootMargin: '-20% 0px -20% 0px' })

    itemRefs.current.forEach(r => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {SCROLL_FEATURES.map((f, i) => (
        <div key={f.title} ref={el => itemRefs.current[i] = el} data-idx={i}
          style={{
            padding: '2rem 0 2rem 2rem',
            borderLeft: `3px solid ${active === i ? f.color : 'rgba(255,255,255,0.07)'}`,
            opacity: active === i ? 1 : 0.28,
            transition: 'opacity 0.5s ease, border-color 0.5s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.5rem' }}>
            <f.Icon size={22} color={active === i ? f.color : 'var(--text-muted)'} strokeWidth={1.4} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: active === i ? 'var(--text-primary)' : 'var(--text-muted)', transition: 'color 0.5s', margin: 0 }}>
              {f.title}
            </h3>
          </div>
          <p style={{ maxWidth: '500px', lineHeight: 1.7, margin: 0, fontSize: '0.82rem' }}>{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Alkaline benefits ─────────────────────────────────────── */
const BENEFITS = [
  { icon: <ZapIcon size={16} color="var(--gold)" />, text: 'Superior hydration and faster absorption' },
  { icon: <PHIcon  size={16} color="var(--gold)" />, text: 'Supports optimal body pH balance' },
  { icon: <DropIcon size={16} color="var(--gold)" />, text: 'Antioxidant-rich, low ORP water' },
  { icon: <ShieldIcon size={16} color="var(--gold)" />, text: 'Gentler on digestive system' },
  { icon: <ZapIcon size={16} color="var(--gold)" />, text: 'Enhanced electrolyte balance' },
  { icon: <AwardIcon size={16} color="var(--gold)" />, text: 'Supports bone density and health' },
]

export default function Products() {
  const [modal, setModal] = useState(null)

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 120% 70% at 50% 100%, rgba(0,180,216,0.09), transparent 60%), linear-gradient(155deg, #020810, #050D1A 40%, #0A1E38)',
      }}>
        <WaveCanvas intensity={1.4} />

        {/* Bottle — right */}
        <div style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(0,180,216,0.18), transparent 70%)', borderRadius: '50%', filter: 'blur(32px)', pointerEvents: 'none' }} />
          <motion.img
            src="/assets/bottle-hero.jpg"
            alt="Healtho Premium"
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.4,0,0.2,1] }}
            style={{ height: '80vh', maxHeight: '660px', objectFit: 'contain', position: 'relative', zIndex: 1, mixBlendMode: 'multiply', filter: 'brightness(1.35) saturate(1.1) drop-shadow(0 30px 70px rgba(0,0,0,0.5))' }}
          />
        </div>

        {/* Text — left */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '540px' }}>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
              style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>
              Healtho — Premium Alkaline Water
            </motion.p>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.2 }} style={{ fontWeight:300, marginBottom:'0.5rem' }}>
              The Healtho
            </motion.h1>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.35 }} style={{ fontWeight:300, color:'var(--blue)', marginBottom:'1.6rem' }}>
              <em>Collection</em>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.5 }}
              style={{ fontSize:'0.96rem', lineHeight:1.85, color:'var(--text-muted)', marginBottom:'0.7rem' }}>
              Packaged drinking water through 7-layer in-house filtration — alkaline, mineral-enhanced, FSSAI certified.
            </motion.p>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.6 }}
              style={{ fontSize:'0.9rem', lineHeight:1.75, color:'var(--text-muted)', marginBottom:'2rem' }}>
              Available in four sizes for retail and bulk, or fully custom-labelled for your brand.
            </motion.p>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.72 }}
              style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap' }}>
              <button onClick={() => setModal('bulk')} className="btn btn-gold">Packaged Water Quote</button>
              <button onClick={() => setModal('custom')} className="btn btn-outline">Custom Labels Enquiry</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TWO OFFERINGS — CLEAR OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ textAlign:'center', marginBottom:'2.2rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Our Services</p>
            <h2 style={{ fontWeight:300, fontSize:'1.8rem', margin:0 }}>Two Ways We <em>Serve You</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', maxWidth:'840px', margin:'0 auto' }}>
            {/* Service 1 */}
            <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
              className="glass-card" style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'rgba(0,180,216,0.08)', border:'1px solid rgba(0,180,216,0.2)', display:'grid', placeItems:'center', marginBottom:'1rem' }}>
                <DropIcon size={26} color="var(--blue)" strokeWidth={1.4} />
              </div>
              <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.3rem', marginBottom:'0.75rem' }}>Packaged Drinking Water</h3>
              <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'0.9rem' }}>
                {SIZES.map(s => (
                  <span key={s} style={{ fontSize:'0.76rem', padding:'0.2rem 0.65rem', border:'1px solid rgba(0,180,216,0.25)', borderRadius:'50px', color:'var(--blue)' }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize:'0.84rem', lineHeight:1.65, marginBottom:'1.4rem', color:'var(--text-muted)' }}>
                Premium alkaline water in four sizes. Bulk orders, recurring supply, and event catering — same purity, every bottle.
              </p>
              <button onClick={() => setModal('bulk')} className="btn btn-gold" style={{ width:'100%', justifyContent:'center' }}>
                Get a Quote <ArrowRight size={15} color="currentColor" />
              </button>
            </motion.div>

            {/* Service 2 */}
            <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.12 }}
              className="glass-card" style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', borderColor:'var(--border-gold)' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'rgba(201,160,39,0.08)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center', marginBottom:'1rem' }}>
                <AwardIcon size={26} color="var(--gold)" strokeWidth={1.4} />
              </div>
              <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.3rem', marginBottom:'0.75rem' }}>Custom Label Services</h3>
              <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'0.9rem' }}>
                {['Hotels','Restaurants','Corporate','Events'].map(t => (
                  <span key={t} style={{ fontSize:'0.76rem', padding:'0.2rem 0.65rem', border:'1px solid var(--border-gold)', borderRadius:'50px', color:'var(--gold)' }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize:'0.84rem', lineHeight:1.65, marginBottom:'1.4rem', color:'var(--text-muted)' }}>
                Your brand. Our water. End-to-end white-label solutions — logo, label design, packaging, and delivery.
              </p>
              <button onClick={() => setModal('custom')} className="btn btn-outline" style={{ width:'100%', justifyContent:'center', borderColor:'var(--gold)', color:'var(--gold)' }}>
                Enquire Now <ArrowRight size={15} color="currentColor" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ALKALINE BENEFITS — compact
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.4rem' }}>Why Alkaline?</p>
            <h3 style={{ fontWeight:300, fontSize:'1.4rem', margin:0 }}>Benefits of <em>Alkaline Water</em></h3>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem', maxWidth: '900px' }}>
            {BENEFITS.map(({ icon, text }, i) => (
              <motion.div key={text} initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.05 }}
                style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.75rem 1rem', background:'rgba(201,160,39,0.04)', borderRadius:'8px', border:'1px solid var(--border-gold)' }}>
                {icon}
                <span style={{ fontSize:'0.84rem', color:'var(--text-muted)' }}>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BUSINESS OFFERINGS — detailed cards
      ══════════════════════════════════════════════════════ */}
      <section className="section" style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', borderBottom:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div className="section-header" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)' }}>Offerings</p>
            <h2 style={{ marginTop:'0.5rem', fontWeight:300 }}>Let's Talk<br /><em>Business</em></h2>
            <div className="divider" />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Offering 1 */}
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
              style={{ background:'rgba(10,30,56,0.7)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'2.5rem', display:'flex', flexDirection:'column' }}>
              <div style={{ marginBottom:'1.5rem' }}>
                <p style={{ fontSize:'0.68rem', color:'var(--gold)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.5rem' }}>Offering 01</p>
                <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.8rem', marginBottom:'0.75rem' }}>Healtho Bottled Water</h3>
                <p style={{ fontSize:'0.9rem', lineHeight:1.75 }}>Premium alkaline water in four standard sizes. Orders accepted in bulk — cases, pallets, and recurring supply contracts.</p>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem', marginBottom:'1.5rem' }}>
                {SIZES.map(sz => (
                  <div key={sz} style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.6rem 0.9rem', background:'rgba(0,180,216,0.04)', borderRadius:'10px', border:'1px solid rgba(0,180,216,0.15)' }}>
                    <img src="/assets/bottle-hero.jpg" alt={sz} style={{ height:'44px', objectFit:'contain', opacity:0.8, mixBlendMode:'multiply', filter:'brightness(1.3)' }} />
                    <div>
                      <div style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', color:'var(--text-primary)' }}>{sz}</div>
                      <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Alkaline</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
                {['Bulk orders','Recurring supply','Event catering','Same-day dispatch'].map(t => (
                  <span key={t} style={{ display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.76rem', color:'var(--text-muted)', background:'rgba(255,255,255,0.04)', padding:'0.25rem 0.65rem', borderRadius:'50px', border:'1px solid rgba(255,255,255,0.08)' }}>
                    <CheckIcon size={11} color="var(--blue)" strokeWidth={2.5} />{t}
                  </span>
                ))}
              </div>

              <button onClick={() => setModal('bulk')} className="btn btn-gold" style={{ justifyContent:'center', marginTop:'auto' }}>
                Get a Quote <ArrowRight size={16} color="currentColor" />
              </button>
            </motion.div>

            {/* Offering 2 */}
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.15 }}
              style={{ background:'rgba(201,160,39,0.04)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'2.5rem', display:'flex', flexDirection:'column' }}>
              <div style={{ marginBottom:'1.5rem' }}>
                <p style={{ fontSize:'0.68rem', color:'var(--gold)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.5rem' }}>Offering 02</p>
                <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.8rem', marginBottom:'0.75rem' }}>Custom Label Services</h3>
                <p style={{ fontSize:'0.9rem', lineHeight:1.75 }}>Your brand. Our water. End-to-end white-label solutions for hotels, restaurants, corporate events, and businesses.</p>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'0.7rem', marginBottom:'1.5rem' }}>
                {[
                  ['Label & Bottle Design','Your brand identity — logo, colours, typography — printed on premium labels.'],
                  ['Purification & Filtration','The same 7-layer quality process. Your name on a glass of pure water.'],
                  ['Packaging & Branding','Custom packaging, branded cases, and event-ready presentation.'],
                  ['Delivery & Logistics','Reliable supply with flexible delivery schedules, directly to your venue.'],
                ].map(([h, t]) => (
                  <div key={h} style={{ display:'flex', gap:'0.8rem', alignItems:'flex-start', padding:'0.8rem', background:'rgba(10,30,56,0.5)', borderRadius:'10px', border:'1px solid rgba(201,160,39,0.1)' }}>
                    <CheckIcon size={15} color="var(--gold)" strokeWidth={2.5} style={{ flexShrink:0, marginTop:'2px' }} />
                    <div>
                      <div style={{ fontSize:'0.86rem', color:'var(--text-primary)', fontWeight:500, marginBottom:'0.12rem' }}>{h}</div>
                      <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', lineHeight:1.5 }}>{t}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setModal('custom')} className="btn btn-gold" style={{ justifyContent:'center', marginTop:'auto', background:'linear-gradient(135deg,var(--gold),var(--gold-light))' }}>
                Customize Now <ArrowRight size={16} color="currentColor" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5 REASONS TO CHOOSE HEALTHO — compact
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7 }}
                style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.7rem' }}>What's Inside Every Bottle</p>
                <h2 style={{ fontWeight:300 }}>Five Reasons<br /><em>to Choose Healtho</em></h2>
              </motion.div>
              <ScrollFeatures />
            </div>

            {/* Sticky bottle visual */}
            <div style={{ position: 'sticky', top: '120px', alignSelf: 'start' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-gold)', background: 'rgba(10,30,56,0.6)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(0,180,216,0.10), transparent 70%)', pointerEvents: 'none' }} />
                <img src="/assets/bottle-hero.jpg" alt="Healtho" style={{ width: '100%', display: 'block', maxHeight: '460px', objectFit: 'contain', padding: '2rem', mixBlendMode: 'multiply', filter: 'brightness(1.4) saturate(1.1)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && <QuoteModal type={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 2fr 1fr"] { grid-template-columns: 1fr !important; }
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
