import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, AwardIcon, CheckIcon, WAIcon, ArrowRight } from '../components/Icons'

const WA_NUMBER = '919109348483'

/* ── Pincode → area lookup ─────────────────────────────────── */
async function lookupPincode(pin) {
  if (!/^\d{6}$/.test(pin)) return ''
  try {
    const res  = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
    const data = await res.json()
    if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
      const po = data[0].PostOffice[0]
      return `${po.Name}, ${po.District}, ${po.State}`
    }
  } catch {}
  return ''
}

/* ── WhatsApp message builder ──────────────────────────────── */
function buildMsg(f, area) {
  return [
    'Hi Healtho! 👋 I would like to get a quote for Healtho Alkaline Water (1L).',
    '',
    `*Name:* ${f.name || '—'}`,
    `*Email:* ${f.email || '—'}`,
    `*Phone:* ${f.phone || '—'}`,
    `*Quantity Required:* ${f.qty || '—'}`,
    `*Delivery Pincode:* ${f.pincode || '—'}${area ? ` — ${area}` : ''}`,
    f.notes ? `*Additional Notes:* ${f.notes}` : '',
    '',
    'Please share pricing and availability. Thank you!',
  ].filter(Boolean).join('\n')
}

/* ── Quote modal ───────────────────────────────────────────── */
function QuoteModal({ onClose }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', qty:'', pincode:'', notes:'' })
  const [area, setArea] = useState('')
  const [pinLoading, setPinLoading] = useState(false)
  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handlePincode = async (e) => {
    const pin = e.target.value
    setForm(f => ({ ...f, pincode: pin }))
    if (pin.length === 6) {
      setPinLoading(true)
      const found = await lookupPincode(pin)
      setArea(found)
      setPinLoading(false)
    } else {
      setArea('')
    }
  }

  const inp = {
    width: '100%', padding: '0.8rem 1rem',
    background: 'rgba(10,30,56,0.7)', border: '1px solid rgba(0,180,216,0.2)',
    borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)', outline: 'none', transition: 'border-color 0.3s',
  }
  const lbl = { fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }
  const onF = e => e.target.style.borderColor = 'var(--gold)'
  const onB = e => e.target.style.borderColor = 'rgba(0,180,216,0.2)'

  const submit = e => {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMsg(form, area))}`, '_blank')
    onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(2,8,16,0.92)', backdropFilter:'blur(16px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <motion.div initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:20 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'2.5rem', maxWidth:'500px', width:'100%', maxHeight:'90vh', overflowY:'auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
          <div>
            <h3 style={{ color:'var(--gold)', fontFamily:'var(--font-serif)', marginBottom:'0.3rem' }}>Get a Quote</h3>
            <p style={{ fontSize:'0.82rem', margin:0 }}>Healtho Alkaline Water · 1L — We'll reach out on WhatsApp.</p>
          </div>
          <button onClick={onClose} style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--text-muted)', cursor:'pointer', fontSize:'1.1rem', display:'grid', placeItems:'center' }}>×</button>
        </div>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
            <div><label style={lbl}>Your Name *</label><input required style={inp} onFocus={onF} onBlur={onB} placeholder="Rahul Sharma" value={form.name} onChange={s('name')} /></div>
            <div><label style={lbl}>Phone *</label><input required type="tel" style={inp} onFocus={onF} onBlur={onB} placeholder="+91 98765 43210" value={form.phone} onChange={s('phone')} /></div>
          </div>
          <div><label style={lbl}>Email</label><input type="email" style={inp} onFocus={onF} onBlur={onB} placeholder="you@example.com" value={form.email} onChange={s('email')} /></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
            <div><label style={lbl}>Quantity</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="e.g. 200 bottles" value={form.qty} onChange={s('qty')} /></div>
            <div>
              <label style={lbl}>Delivery Pincode</label>
              <input style={inp} onFocus={onF} onBlur={onB} placeholder="e.g. 452001" maxLength={6} value={form.pincode} onChange={handlePincode} />
              {area && <p style={{ fontSize:'0.72rem', color:'var(--blue)', marginTop:'0.3rem' }}>📍 {area}</p>}
              {pinLoading && <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginTop:'0.3rem' }}>Looking up…</p>}
            </div>
          </div>
          <div>
            <label style={lbl}>Additional Notes</label>
            <textarea rows={3} style={{ ...inp, resize:'vertical', minHeight:'80px' }} onFocus={onF} onBlur={onB}
              placeholder="Frequency, event date, special requirements..."
              value={form.notes} onChange={s('notes')} />
          </div>
          <button type="submit" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', padding:'0.9rem', background:'#25D366', border:'none', borderRadius:'10px', color:'#fff', fontSize:'0.9rem', fontWeight:600, cursor:'pointer', transition:'opacity 0.2s', fontFamily:'var(--font-sans)' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            <WAIcon size={18} /> Send via WhatsApp
          </button>
          <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', textAlign:'center', margin:0 }}>Opens WhatsApp with your enquiry pre-filled.</p>
        </form>
      </motion.div>
    </motion.div>
  )
}

/* ── Scroll-highlight reasons ──────────────────────────────── */
const REASONS = [
  { Icon: LayersIcon, title: '7-Layer In-House Filtration', desc: '7-stage RO purification in our own licensed facility — from raw groundwater to crystal-clear alkaline water.', color: 'var(--blue)' },
  { Icon: PHIcon,     title: 'pH 8.5+ Alkaline Balance',    desc: 'Calibrated to 8.5–9.0 to support optimal cellular hydration and neutralise dietary acidity.', color: 'var(--blue)' },
  { Icon: DropIcon,   title: 'Mineral-Enhanced',             desc: 'Calcium and magnesium re-added post-RO for natural taste and real nutritional value.', color: 'var(--gold)' },
  { Icon: ShieldIcon, title: 'BPA Free · Food-Grade',        desc: 'Certified food-grade PET packaging — zero bisphenol A, zero heavy metals, zero compromise.', color: 'var(--gold)' },
  { Icon: AwardIcon,  title: 'FSSAI Certified',              desc: 'Government-licensed facility, independently tested. Our certification is public and verifiable.', color: 'var(--blue)' },
]

function ScrollReasons() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(parseInt(entry.target.dataset.idx))
      })
    }, { threshold: 0.55, rootMargin: '-20% 0px -20% 0px' })
    itemRefs.current.forEach(r => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      {REASONS.map((r, i) => (
        <div key={r.title} ref={el => itemRefs.current[i] = el} data-idx={i}
          style={{
            padding: '1.8rem 0 1.8rem 2rem',
            borderLeft: `3px solid ${active === i ? r.color : 'rgba(255,255,255,0.07)'}`,
            opacity: active === i ? 1 : 0.28,
            transition: 'opacity 0.5s ease, border-color 0.5s ease',
          }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.9rem', marginBottom:'0.5rem' }}>
            <r.Icon size={22} color={active === i ? r.color : 'var(--text-muted)'} strokeWidth={1.4} />
            <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', color:active === i ? 'var(--text-primary)' : 'var(--text-muted)', transition:'color 0.5s', margin:0 }}>
              {r.title}
            </h3>
          </div>
          <p style={{ maxWidth:'480px', lineHeight:1.7, margin:0, fontSize:'0.82rem' }}>{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Product specs ─────────────────────────────────────────── */
const SPECS = [
  { Icon: PHIcon,     label: 'pH Level',     value: '8.5 – 9.0',   note: 'Alkaline' },
  { Icon: DropIcon,   label: 'Volume',        value: '1 Litre',     note: 'Packaged bottle' },
  { Icon: LayersIcon, label: 'Filtration',    value: '7-Layer RO',  note: 'In-house plant' },
  { Icon: ShieldIcon, label: 'Packaging',     value: 'BPA Free',    note: 'Food-grade' },
  { Icon: AwardIcon,  label: 'Certification', value: 'FSSAI',       note: 'Govt licensed' },
  { Icon: DropIcon,   label: 'Minerals',      value: 'Ca²⁺ · Mg²⁺', note: 'Enhanced' },
]

export default function Products() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — full-bleed image, dark text on left
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Full-bleed background image — bottle shifted right */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src="/assets/bottle-hero.jpeg" alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'70% center', display:'block' }} />
          {/* Gradient: left side bright+light for text, fades to transparent right */}
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(to right, rgba(248,251,255,0.94) 0%, rgba(248,251,255,0.85) 28%, rgba(248,251,255,0.50) 50%, rgba(248,251,255,0.05) 70%, transparent 100%)',
          }} />
        </div>

        {/* Text — left side, dark colours so visible on light bg */}
        <div className="container" style={{ position:'relative', zIndex:2, paddingTop:'80px' }}>
          <div style={{ maxWidth: '500px' }}>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
              style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#0A4080', marginBottom:'0.8rem', fontWeight:600 }}>
              Healtho — Packaged Drinking Water
            </motion.p>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.2 }}
              style={{ fontWeight:300, marginBottom:'0.4rem', color:'#05101F' }}>
              Healtho Alkaline
            </motion.h1>
            <motion.h2 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.35 }}
              style={{ fontWeight:300, color:'#0B3D91', marginBottom:'1.5rem', fontSize:'clamp(1.3rem,2.8vw,2rem)' }}>
              <em>Premium Drinking Water</em>
            </motion.h2>

            {/* Highlights */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.5 }}
              style={{ display:'flex', flexDirection:'column', gap:'0.55rem', marginBottom:'2rem' }}>
              {[
                '1 Litre packaged bottle',
                '7-layer in-house RO filtration',
                'pH 8.5+ · Mineral enhanced',
                'FSSAI certified · BPA free',
              ].map(line => (
                <div key={line} style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                  <CheckIcon size={14} color="#0B5EA8" strokeWidth={2.5} />
                  <span style={{ fontSize:'0.95rem', color:'#1A2D4A', fontWeight:500 }}>{line}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.7 }}>
              <button onClick={() => setShowModal(true)} className="btn btn-gold" style={{ gap:'0.6rem', fontSize:'1rem', padding:'0.85rem 2rem' }}>
                Get a Quote <ArrowRight size={16} color="currentColor" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRODUCT SPECS — all in one line, bigger icons
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'3.5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', borderBottom:'1px solid var(--border-gold)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'0.9rem' }}>
            {SPECS.map(({ Icon, label, value, note }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.06 }}
                style={{ textAlign:'center', padding:'1.4rem 0.8rem', background:'rgba(10,30,56,0.5)', borderRadius:'14px', border:'1px solid var(--border-gold)' }}>
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'rgba(201,160,39,0.08)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center', margin:'0 auto 0.8rem' }}>
                  <Icon size={26} color="var(--gold)" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize:'0.64rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.3rem' }}>{label}</div>
                <div style={{ fontSize:'0.92rem', color:'var(--text-primary)', fontFamily:'var(--font-serif)' }}>{value}</div>
                <div style={{ fontSize:'0.68rem', color:'var(--blue)', marginTop:'0.15rem' }}>{note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5 REASONS TO CHOOSE HEALTHO
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'5rem', alignItems:'start' }}>
            <div>
              <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7 }}
                style={{ marginBottom:'2rem' }}>
                <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.7rem' }}>Why Healtho?</p>
                <h2 style={{ fontWeight:300 }}>Five Reasons<br /><em>to Choose Healtho</em></h2>
              </motion.div>
              <ScrollReasons />
            </div>

            {/* Sticky bottle — no CTA below */}
            <div style={{ position:'sticky', top:'120px', alignSelf:'start' }}>
              <div style={{ position:'relative', borderRadius:'20px', overflow:'hidden', border:'1px solid var(--border-gold)', background:'rgba(10,30,56,0.6)' }}>
                <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 30%, rgba(0,180,216,0.10), transparent 70%)', pointerEvents:'none' }} />
                <img src="/assets/bottle-hero.jpeg" alt="Healtho 1L" style={{ width:'100%', display:'block', maxHeight:'460px', objectFit:'contain', padding:'2rem' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .hero-bottle { display: none !important; }
        }
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 2fr 1fr"] { grid-template-columns: 1fr !important; }
          section > .container > div[style*="grid-template-columns: repeat(6"] { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 560px) {
          section > .container > div[style*="grid-template-columns: repeat(6"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}
