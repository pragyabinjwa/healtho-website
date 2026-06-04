import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, AwardIcon, CheckIcon, WAIcon, ArrowRight, ZapIcon } from '../components/Icons'

const WA_NUMBER = '919109348483'

/* ── WhatsApp message builder ──────────────────────────────── */
function buildCustomMsg(f) {
  return [
    'Hi Healtho! 👋 I am interested in custom label bottle services.',
    '',
    `*Business Name:* ${f.bizName || '—'}`,
    `*Business Type:* ${f.bizType || '—'}`,
    `*Contact Name:* ${f.name || '—'}`,
    `*Phone:* ${f.phone || '—'}`,
    `*Bottle Size:* ${f.size}`,
    `*Water Type:* ${f.waterType}`,
    `*Estimated Quantity:* ${f.qty || '—'}`,
    `*Customisation Requirements:* ${f.notes || '—'}`,
    '',
    'Please share details on end-to-end custom label services. Thank you!',
  ].filter(Boolean).join('\n')
}

/* ── Enquiry modal ─────────────────────────────────────────── */
function EnquiryModal({ onClose }) {
  const [form, setForm] = useState({ bizName:'', bizType:'Hotel', name:'', phone:'', size:'500 ml', waterType:'RO Water', qty:'', notes:'' })
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

  const BIZ_TYPES = ['Hotel', 'Restaurant', 'Corporate Office', 'Hospital', 'Event Organiser', 'Retail Store', 'Other']

  const submit = e => {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildCustomMsg(form))}`, '_blank')
    onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(2,8,16,0.92)', backdropFilter:'blur(16px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <motion.div initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:20 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'2.5rem', maxWidth:'520px', width:'100%', maxHeight:'90vh', overflowY:'auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
          <div>
            <h3 style={{ color:'var(--gold)', fontFamily:'var(--font-serif)', marginBottom:'0.3rem' }}>Custom Label Enquiry</h3>
            <p style={{ fontSize:'0.82rem', margin:0 }}>Tell us what you need — we'll reach out on WhatsApp with a full quote.</p>
          </div>
          <button onClick={onClose} style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--text-muted)', cursor:'pointer', fontSize:'1.1rem', display:'grid', placeItems:'center' }}>×</button>
        </div>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div><label style={lbl}>Business Name</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="Hotel Sunrise" value={form.bizName} onChange={s('bizName')} /></div>
          <div>
            <label style={lbl}>Business Type</label>
            <select style={{ ...inp, cursor:'pointer', appearance:'none' }} value={form.bizType} onChange={s('bizType')} onFocus={onF} onBlur={onB}>
              {BIZ_TYPES.map(t => <option key={t} value={t} style={{ background:'#0A1E38' }}>{t}</option>)}
            </select>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
            <div><label style={lbl}>Contact Name *</label><input required style={inp} onFocus={onF} onBlur={onB} placeholder="Your name" value={form.name} onChange={s('name')} /></div>
            <div><label style={lbl}>Phone *</label><input required type="tel" style={inp} onFocus={onF} onBlur={onB} placeholder="+91 98765 43210" value={form.phone} onChange={s('phone')} /></div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
            <div>
              <label style={lbl}>Bottle Size</label>
              <select style={{ ...inp, cursor:'pointer', appearance:'none' }} value={form.size} onChange={s('size')} onFocus={onF} onBlur={onB}>
                {['250 ml','500 ml','750 ml','1 L'].map(sz => <option key={sz} value={sz} style={{ background:'#0A1E38' }}>{sz}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Water Type</label>
              <select style={{ ...inp, cursor:'pointer', appearance:'none' }} value={form.waterType} onChange={s('waterType')} onFocus={onF} onBlur={onB}>
                {['RO Water','Alkaline Water'].map(w => <option key={w} value={w} style={{ background:'#0A1E38' }}>{w}</option>)}
              </select>
            </div>
          </div>

          <div><label style={lbl}>Estimated Quantity</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="e.g. 1000 bottles / month" value={form.qty} onChange={s('qty')} /></div>
          <div>
            <label style={lbl}>Customisation Requirements</label>
            <textarea rows={3} style={{ ...inp, resize:'vertical', minHeight:'80px' }} onFocus={onF} onBlur={onB}
              placeholder="Logo colours, label design, special packaging, event details..."
              value={form.notes} onChange={s('notes')} />
          </div>

          <button type="submit" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', padding:'0.9rem', background:'#25D366', border:'none', borderRadius:'10px', color:'#fff', fontSize:'0.9rem', fontWeight:600, cursor:'pointer', transition:'opacity 0.2s', fontFamily:'var(--font-sans)' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            <WAIcon size={18} /> Send via WhatsApp
          </button>
          <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', textAlign:'center', margin:0 }}>Opens WhatsApp with your enquiry pre-filled. No data stored.</p>
        </form>
      </motion.div>
    </motion.div>
  )
}

/* ── Config options ────────────────────────────────────────── */
const BOTTLE_SIZES = [
  { size: '250 ml', desc: 'Single serve · Events & cafes', tags: ['Events','Minibar','Café'] },
  { size: '500 ml', desc: 'Standard · Most popular choice', tags: ['Restaurant','Office','Retail'] },
  { size: '750 ml', desc: 'Premium · Table water',         tags: ['Fine dining','Hotels'] },
  { size: '1 L',    desc: 'Full litre · Meeting tables',   tags: ['Corporate','Conference'] },
]

const WATER_TYPES = [
  {
    type: 'RO Water',
    Icon: DropIcon,
    color: 'var(--blue)',
    desc: 'Reverse osmosis purified water — crystal clear, zero TDS impurities, neutral pH. Ideal for everyday hydration.',
    tags: ['Neutral pH','Zero contaminants','Crisp & clean'],
  },
  {
    type: 'Alkaline Water',
    Icon: ZapIcon,
    color: 'var(--gold)',
    desc: 'pH 8.5+ alkaline water with added minerals — calcium, magnesium, and optimised for cellular hydration.',
    tags: ['pH 8.5+','Mineral enhanced','Premium hydration'],
  },
]

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Choose Your Bottle Size',
    desc: 'Select from four sizes — 250 ml, 500 ml, 750 ml, or 1 L — based on your usage and audience.',
    icon: <DropIcon size={20} color="var(--gold)" strokeWidth={1.5} />,
  },
  {
    num: '02',
    title: 'Select Your Water Type',
    desc: 'Opt for purified RO water (neutral, crisp) or premium Alkaline water (pH 8.5+, mineral-enhanced).',
    icon: <PHIcon size={20} color="var(--gold)" strokeWidth={1.5} />,
  },
  {
    num: '03',
    title: 'Decide Your Batch Quantity',
    desc: 'From small event batches to large recurring supply contracts — we scale with your needs.',
    icon: <LayersIcon size={20} color="var(--gold)" strokeWidth={1.5} />,
  },
  {
    num: '04',
    title: 'Submit Your Label & Design',
    desc: 'Share your logo, brand colours, and design preferences. We handle the rest — label printing and placement.',
    icon: <AwardIcon size={20} color="var(--gold)" strokeWidth={1.5} />,
  },
  {
    num: '05',
    title: 'Production & Quality Check',
    desc: 'Every bottle goes through our 7-layer RO process. FSSAI-certified quality, every batch.',
    icon: <ShieldIcon size={20} color="var(--gold)" strokeWidth={1.5} />,
  },
  {
    num: '06',
    title: 'Delivery to Your Door',
    desc: 'Packed, branded, and delivered on your schedule — directly to your venue, hotel, or office.',
    icon: <CheckIcon size={20} color="var(--gold)" strokeWidth={1.5} />,
  },
]

const WHO_WE_SERVE = [
  { label: 'Hotels & Resorts',      desc: 'Branded table water for rooms, banquets, and F&B.' },
  { label: 'Restaurants & Cafes',   desc: 'Elevate your table with your own labelled water.' },
  { label: 'Corporate Offices',     desc: 'Branded water for meetings, events, and daily use.' },
  { label: 'Events & Weddings',     desc: 'Custom bottles as part of your event experience.' },
  { label: 'Hospitals & Clinics',   desc: 'Hygienic, certified water for patients and staff.' },
  { label: 'Retail Brands',         desc: 'Launch your own water brand under our OEM facility.' },
]

export default function Services() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '65vh', display:'flex', alignItems:'flex-end',
        position:'relative', overflow:'hidden', paddingBottom:'5rem',
        background:'linear-gradient(160deg, #020810, #050D1A 35%, #0A1E38 65%, #051828)',
      }}>
        <WaveCanvas intensity={0.9} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
            style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>
            Custom Label Services
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }} style={{ fontWeight:300, maxWidth:'660px', marginBottom:'0.4rem' }}>
            Your Brand.
          </motion.h1>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.15 }} style={{ fontWeight:300, color:'var(--blue)', maxWidth:'660px', marginBottom:'1.8rem' }}>
            <em>Our Water.</em>
          </motion.h1>
          <div className="divider left" />
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.3 }}
            style={{ maxWidth:'540px', fontSize:'1rem', lineHeight:1.85, marginTop:'1.5rem', color:'var(--text-muted)', marginBottom:'2rem' }}>
            End-to-end custom-labelled water bottles for businesses. Choose your size, water type, batch quantity, and branding — we handle the rest.
          </motion.p>
          <motion.button
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
            onClick={() => setShowModal(true)} className="btn btn-gold" style={{ gap:'0.6rem' }}>
            Start Your Enquiry <ArrowRight size={16} color="currentColor" />
          </motion.button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 6 steps
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'3rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>The Process</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>How It <em>Works</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem' }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.55, delay:i*0.08 }}
                style={{ padding:'1.6rem', background:'rgba(10,30,56,0.5)', borderRadius:'16px', border:'1px solid var(--border-gold)', display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                <div style={{ flexShrink:0, width:'44px', height:'44px', borderRadius:'12px', background:'rgba(201,160,39,0.08)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center' }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontSize:'0.64rem', color:'var(--gold)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'0.3rem' }}>Step {step.num}</div>
                  <h4 style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', color:'var(--text-primary)', marginBottom:'0.4rem', fontWeight:400 }}>{step.title}</h4>
                  <p style={{ fontSize:'0.8rem', lineHeight:1.65, margin:0, color:'var(--text-muted)' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTLE SIZES — choose your size
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Bottle Options</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>Four Sizes to <em>Choose From</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1.2rem' }}>
            {BOTTLE_SIZES.map((item, i) => (
              <motion.div key={item.size}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ y:-4, transition:{ duration:0.25 } }}
                style={{ borderRadius:'18px', overflow:'hidden', border:'1px solid var(--border-gold)', background:'linear-gradient(160deg, rgba(10,30,56,0.85), rgba(5,13,26,0.9))' }}>
                {/* Visual */}
                <div style={{ position:'relative', padding:'2rem 1rem 0', display:'flex', alignItems:'flex-end', justifyContent:'center', minHeight:'180px', background:'radial-gradient(circle at 50% 80%, rgba(0,180,216,0.08), transparent 70%)' }}>
                  <img src="/assets/bottle-hero.jpg" alt={item.size}
                    style={{ height:'140px', objectFit:'contain', display:'block' }} />
                </div>
                {/* Info */}
                <div style={{ padding:'1.2rem' }}>
                  <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.5rem', color:'var(--gold)', marginBottom:'0.2rem' }}>{item.size}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginBottom:'0.75rem', lineHeight:1.5 }}>{item.desc}</div>
                  <div style={{ display:'flex', gap:'0.3rem', flexWrap:'wrap' }}>
                    {item.tags.map(t => (
                      <span key={t} style={{ fontSize:'0.68rem', padding:'0.15rem 0.55rem', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'50px', color:'var(--blue)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WATER TYPES — RO vs Alkaline
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', borderBottom:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Water Options</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>Two Types of <em>Water</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', maxWidth:'820px' }}>
            {WATER_TYPES.map(({ type, Icon, color, desc, tags }, i) => (
              <motion.div key={type}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.6, delay:i*0.12 }}
                style={{ padding:'2rem', background:'rgba(10,30,56,0.6)', borderRadius:'18px', border:`1px solid ${color === 'var(--gold)' ? 'var(--border-gold)' : 'rgba(0,180,216,0.2)'}` }}>
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:`${color === 'var(--gold)' ? 'rgba(201,160,39,0.08)' : 'rgba(0,180,216,0.08)'}`, border:`1px solid ${color === 'var(--gold)' ? 'var(--border-gold)' : 'rgba(0,180,216,0.2)'}`, display:'grid', placeItems:'center', marginBottom:'1rem' }}>
                  <Icon size={24} color={color} strokeWidth={1.4} />
                </div>
                <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.4rem', marginBottom:'0.6rem' }}>{type}</h3>
                <p style={{ fontSize:'0.86rem', lineHeight:1.7, color:'var(--text-muted)', marginBottom:'1rem' }}>{desc}</p>
                <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                  {tags.map(t => (
                    <span key={t} style={{ fontSize:'0.74rem', padding:'0.2rem 0.65rem', border:`1px solid ${color === 'var(--gold)' ? 'var(--border-gold)' : 'rgba(0,180,216,0.2)'}`, borderRadius:'50px', color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHO WE SERVE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Who We Serve</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>Built for <em>Every Business</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1rem', maxWidth:'960px' }}>
            {WHO_WE_SERVE.map(({ label, desc }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ duration:0.45, delay:i*0.06 }}
                style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1.2rem', background:'rgba(201,160,39,0.03)', borderRadius:'12px', border:'1px solid var(--border-gold)' }}>
                <div style={{ flexShrink:0, width:'8px', height:'8px', borderRadius:'50%', background:'var(--gold)', marginTop:'6px' }} />
                <div>
                  <div style={{ fontSize:'0.9rem', color:'var(--text-primary)', fontWeight:500, marginBottom:'0.25rem' }}>{label}</div>
                  <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', lineHeight:1.55 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', textAlign:'center' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>Ready to Start?</p>
            <h2 style={{ fontWeight:300, fontSize:'2.2rem', marginBottom:'1rem' }}>
              Let's Build Your <em style={{ color:'var(--blue)' }}>Brand Together</em>
            </h2>
            <div className="divider" />
            <p style={{ maxWidth:'480px', margin:'1.2rem auto 2rem', fontSize:'0.96rem', lineHeight:1.8, color:'var(--text-muted)' }}>
              Tell us your requirements — size, water type, quantity, and branding — and we'll get back to you with a full quote on WhatsApp.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => setShowModal(true)} className="btn btn-gold" style={{ gap:'0.6rem', fontSize:'1rem', padding:'0.9rem 2.2rem' }}>
                Start Your Enquiry <ArrowRight size={16} color="currentColor" />
              </button>
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi Healtho! I am interested in custom label bottle services. Please share details.')}`}
                target="_blank" rel="noreferrer"
                style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.9rem 2rem', background:'rgba(37,211,102,0.06)', border:'1px solid rgba(37,211,102,0.25)', borderRadius:'10px', color:'#25D366', fontSize:'0.92rem', fontWeight:500, transition:'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(37,211,102,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(37,211,102,0.06)'}>
                <WAIcon size={18} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          section > .container > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
