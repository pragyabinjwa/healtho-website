import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, AwardIcon, CheckIcon, WAIcon, ArrowRight } from '../components/Icons'

const WA_NUMBER = '919109348483'

/* ── WhatsApp message builder ──────────────────────────────── */
function buildMsg(f) {
  return [
    'Hi Healtho! 👋 I would like to get a quote for Healtho Alkaline Water (1L).',
    '',
    `*Name:* ${f.name || '—'}`,
    `*Phone:* ${f.phone || '—'}`,
    `*Quantity Required:* ${f.qty || '—'}`,
    `*Delivery Location:* ${f.location || '—'}`,
    f.notes ? `*Additional Notes:* ${f.notes}` : '',
    '',
    'Please share pricing and availability. Thank you!',
  ].filter(Boolean).join('\n')
}

/* ── Quote modal ───────────────────────────────────────────── */
function QuoteModal({ onClose }) {
  const [form, setForm] = useState({ name:'', phone:'', qty:'', location:'', notes:'' })
  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

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
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMsg(form))}`, '_blank')
    onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(2,8,16,0.92)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)', borderRadius: '20px', padding: '2.5rem', maxWidth: '480px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', marginBottom: '0.3rem' }}>Get a Quote</h3>
            <p style={{ fontSize: '0.82rem', margin: 0 }}>Healtho Alkaline Water · 1 L — Fill in your details, we'll reach out on WhatsApp.</p>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem', display: 'grid', placeItems: 'center' }}>×</button>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div><label style={lbl}>Your Name *</label><input required style={inp} onFocus={onF} onBlur={onB} placeholder="Rahul Sharma" value={form.name} onChange={s('name')} /></div>
            <div><label style={lbl}>Phone *</label><input required type="tel" style={inp} onFocus={onF} onBlur={onB} placeholder="+91 98765 43210" value={form.phone} onChange={s('phone')} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div><label style={lbl}>Quantity</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="e.g. 200 bottles" value={form.qty} onChange={s('qty')} /></div>
            <div><label style={lbl}>Delivery Location</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="City / Area" value={form.location} onChange={s('location')} /></div>
          </div>
          <div>
            <label style={lbl}>Additional Notes</label>
            <textarea rows={3} style={{ ...inp, resize: 'vertical', minHeight: '80px' }} onFocus={onF} onBlur={onB}
              placeholder="Frequency, event date, special requirements..."
              value={form.notes} onChange={s('notes')} />
          </div>
          <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.9rem', background: '#25D366', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s', fontFamily: 'var(--font-sans)' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            <WAIcon size={18} /> Send via WhatsApp
          </button>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>Opens WhatsApp with your enquiry pre-filled.</p>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.5rem' }}>
            <r.Icon size={22} color={active === i ? r.color : 'var(--text-muted)'} strokeWidth={1.4} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: active === i ? 'var(--text-primary)' : 'var(--text-muted)', transition: 'color 0.5s', margin: 0 }}>
              {r.title}
            </h3>
          </div>
          <p style={{ maxWidth: '480px', lineHeight: 1.7, margin: 0, fontSize: '0.82rem' }}>{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Product specs ─────────────────────────────────────────── */
const SPECS = [
  { Icon: PHIcon,     label: 'pH Level',     value: '8.5 – 9.0',   note: 'Alkaline' },
  { Icon: DropIcon,   label: 'Volume',        value: '1 Litre',     note: 'Glass bottle' },
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
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(0,180,216,0.18), transparent 70%)', borderRadius: '50%', filter: 'blur(32px)', pointerEvents: 'none' }} />
          <motion.img
            src="/assets/bottle-hero.jpg"
            alt="Healtho Alkaline Water 1L"
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.4,0,0.2,1] }}
            style={{ height: '78vh', maxHeight: '640px', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 40px 80px rgba(0,180,216,0.28)) drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}
          />
        </div>

        {/* Text — left */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '520px' }}>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
              style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>
              Healtho — Our Hero Product
            </motion.p>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.2 }}
              style={{ fontWeight:300, marginBottom:'0.4rem' }}>
              Healtho Alkaline
            </motion.h1>
            <motion.h2 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.35 }}
              style={{ fontWeight:300, color:'var(--blue)', marginBottom:'1.5rem', fontSize:'clamp(1.3rem,2.8vw,2rem)' }}>
              <em>Packaged Drinking Water</em>
            </motion.h2>

            {/* Key highlights */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.5 }}
              style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginBottom:'1.8rem' }}>
              {[
                '1 Litre premium glass bottle',
                '7-layer in-house RO filtration',
                'pH 8.5+ · Mineral enhanced',
                'FSSAI certified · BPA free',
              ].map(line => (
                <div key={line} style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                  <CheckIcon size={14} color="var(--gold)" strokeWidth={2.5} />
                  <span style={{ fontSize:'0.9rem', color:'var(--text-muted)' }}>{line}</span>
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
          PRODUCT SPECS — quick visual
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            {SPECS.map(({ Icon, label, value, note }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.06 }}
                style={{ textAlign:'center', padding:'1.2rem 1rem', background:'rgba(10,30,56,0.5)', borderRadius:'12px', border:'1px solid var(--border-gold)' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:'rgba(201,160,39,0.08)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center', margin:'0 auto 0.7rem' }}>
                  <Icon size={18} color="var(--gold)" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.25rem' }}>{label}</div>
                <div style={{ fontSize:'0.98rem', color:'var(--text-primary)', fontFamily:'var(--font-serif)', fontWeight:400 }}>{value}</div>
                <div style={{ fontSize:'0.7rem', color:'var(--blue)', marginTop:'0.15rem' }}>{note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5 REASONS TO CHOOSE HEALTHO
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7 }}
                style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.7rem' }}>Why Healtho?</p>
                <h2 style={{ fontWeight:300 }}>Five Reasons<br /><em>to Choose Healtho</em></h2>
              </motion.div>
              <ScrollReasons />

              <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
                style={{ marginTop:'2.5rem' }}>
                <button onClick={() => setShowModal(true)} className="btn btn-gold" style={{ gap:'0.6rem' }}>
                  Get a Quote <ArrowRight size={15} color="currentColor" />
                </button>
              </motion.div>
            </div>

            {/* Sticky bottle visual */}
            <div style={{ position: 'sticky', top: '120px', alignSelf: 'start' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-gold)', background: 'rgba(10,30,56,0.6)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(0,180,216,0.10), transparent 70%)', pointerEvents: 'none' }} />
                <img src="/assets/bottle-hero.jpg" alt="Healtho 1L" style={{ width: '100%', display: 'block', maxHeight: '460px', objectFit: 'contain', padding: '2rem' }} />
              </div>
              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.02 }}
                className="btn btn-gold"
                style={{ width:'100%', justifyContent:'center', marginTop:'1rem', gap:'0.5rem' }}>
                Get a Quote <ArrowRight size={15} color="currentColor" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 2fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
