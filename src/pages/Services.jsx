import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { DropIcon, PHIcon, LayersIcon, ShieldIcon, AwardIcon, CheckIcon, WAIcon, ArrowRight, ZapIcon } from '../components/Icons'

const WA_NUMBER = '919109348483'

/* ── Inline icons for "who we serve" ───────────────────────── */
const HotelIcon  = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16"/><line x1="3" y1="21" x2="21" y2="21"/>
    <rect x="9" y="14" width="6" height="7"/><rect x="6" y="8" width="3" height="3"/><rect x="15" y="8" width="3" height="3"/>
  </svg>
)
const RestaurantIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><line x1="7" y1="11" x2="7" y2="22"/>
    <path d="M21 15a3 3 0 0 1-3 3h-1v4h-2v-4h-1a3 3 0 0 1-3-3V2h10v13z"/>
  </svg>
)
const OfficeIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
)
const EventIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const GymIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16"/><path d="M18 4v16"/><path d="M4 8h2"/><path d="M18 8h2"/><path d="M4 16h2"/><path d="M18 16h2"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
)
const SpaIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c-4.97 0-9-3.58-9-8 0-3 1.5-5.5 4-7 .5 1.5 1.5 3 3 4 .5-2 2-4 5-5 1 2 1 5-1 7 2-1 4-1 5.5.5C19.5 16 17 22 12 22z"/>
  </svg>
)
const WellnessIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const TurfIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const HospitalIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6"/><path d="M12 9v6"/>
  </svg>
)
const RetailIcon = ({ size=20, color='currentColor', sw=1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

/* ── Pincode lookup ─────────────────────────────────────────── */
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

/* ── WhatsApp message ───────────────────────────────────────── */
function buildCustomMsg(f, area) {
  return [
    'Hi Healtho! 👋 I am interested in custom label bottle services.',
    '',
    `*Business Name:* ${f.bizName || '—'}`,
    `*Business Type:* ${f.bizType || '—'}`,
    `*Contact Name:* ${f.name || '—'}`,
    `*Phone:* ${f.phone || '—'}`,
    `*Email:* ${f.email || '—'}`,
    `*Bottle Size:* ${f.size}`,
    `*Water Type:* ${f.waterType}`,
    `*Estimated Quantity:* ${f.qty || '—'}`,
    `*Delivery Pincode:* ${f.pincode || '—'}${area ? ` — ${area}` : ''}`,
    `*Customisation Requirements:* ${f.notes || '—'}`,
    '',
    'Please share details on end-to-end custom label services. Thank you!',
  ].filter(Boolean).join('\n')
}

/* ── Enquiry modal ─────────────────────────────────────────── */
function EnquiryModal({ onClose }) {
  const [form, setForm] = useState({ bizName:'', bizType:'Hotel', name:'', phone:'', email:'', size:'500 ml', waterType:'RO Water', qty:'', pincode:'', notes:'' })
  const [area, setArea]         = useState('')
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
    width:'100%', padding:'0.8rem 1rem',
    background:'rgba(10,30,56,0.7)', border:'1px solid rgba(0,180,216,0.2)',
    borderRadius:'8px', color:'var(--text-primary)', fontSize:'0.9rem',
    fontFamily:'var(--font-sans)', outline:'none', transition:'border-color 0.3s',
  }
  const lbl = { fontSize:'0.68rem', textTransform:'uppercase', letterSpacing:'0.14em', color:'var(--text-muted)', display:'block', marginBottom:'0.4rem' }
  const onF  = e => e.target.style.borderColor = 'var(--gold)'
  const onB  = e => e.target.style.borderColor = 'rgba(0,180,216,0.2)'

  const BIZ_TYPES = ['Hotel','Restaurant','Corporate Office','Hospital','Event Organiser','Retail Store','Gym / Fitness','Spa / Salon','Wellness Centre','Sports Turf','Other']

  const submit = e => {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildCustomMsg(form, area))}`, '_blank')
    onClose()
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(2,8,16,0.92)', backdropFilter:'blur(16px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <motion.div initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:20 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'2.5rem', maxWidth:'540px', width:'100%', maxHeight:'90vh', overflowY:'auto' }}>

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
          <div><label style={lbl}>Email</label><input type="email" style={inp} onFocus={onF} onBlur={onB} placeholder="you@example.com" value={form.email} onChange={s('email')} /></div>
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
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
            <div><label style={lbl}>Quantity (cartons)</label><input style={inp} onFocus={onF} onBlur={onB} placeholder="e.g. 50 cartons / month" value={form.qty} onChange={s('qty')} /></div>
            <div>
              <label style={lbl}>Delivery Pincode</label>
              <input style={inp} onFocus={onF} onBlur={onB} placeholder="e.g. 452001" maxLength={6} value={form.pincode} onChange={handlePincode} />
              {area && <p style={{ fontSize:'0.72rem', color:'var(--blue)', marginTop:'0.3rem' }}>📍 {area}</p>}
              {pinLoading && <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginTop:'0.3rem' }}>Looking up…</p>}
            </div>
          </div>
          <div>
            <label style={lbl}>Customisation Requirements</label>
            <textarea rows={3} style={{ ...inp, resize:'vertical', minHeight:'80px' }} onFocus={onF} onBlur={onB}
              placeholder="Logo colours, label design, special packaging, event details..."
              value={form.notes} onChange={s('notes')} />
          </div>
          <button type="submit" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', padding:'0.9rem', background:'#25D366', border:'none', borderRadius:'10px', color:'#fff', fontSize:'0.9rem', fontWeight:600, cursor:'pointer', transition:'opacity 0.2s', fontFamily:'var(--font-sans)' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            <WAIcon size={18} /> Send Enquiry via WhatsApp
          </button>
          <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', textAlign:'center', margin:0 }}>Opens WhatsApp with your enquiry pre-filled. No data stored.</p>
        </form>
      </motion.div>
    </motion.div>
  )
}

/* ── Data ───────────────────────────────────────────────────── */
const HOW_IT_WORKS = [
  { title: 'Choose Your Bottle Size', desc: 'Select from 250 ml, 500 ml, 750 ml, or 1 L based on your audience and usage.' },
  { title: 'Select Your Water Type',  desc: 'Opt for purified RO water (neutral, crisp) or premium Alkaline water (pH 8.5+, mineral-enhanced).' },
  { title: 'Select Order Quantity',   desc: 'Choose how many cartons you need — from small event batches to large recurring supply orders.' },
  { title: 'Share Your Design / Label', desc: 'Upload your logo and brand assets. Don\'t have a design? We can help you create one from scratch.' },
]

const BOTTLE_SIZES = [
  { size: '250 ml', desc: 'Single serve · Events & cafes',  tags: ['Events','Minibar','Café'] },
  { size: '500 ml', desc: 'Standard · Most popular choice', tags: ['Restaurant','Office','Retail'] },
  { size: '750 ml', desc: 'Premium · Table water',          tags: ['Fine dining','Hotels'] },
  { size: '1 L',    desc: 'Full litre · Meeting tables',    tags: ['Corporate','Conference'] },
]

const BATCH_SIZES = [
  { size: '250 ml', perCarton: 40, label: '40 bottles / carton' },
  { size: '500 ml', perCarton: 24, label: '24 bottles / carton' },
  { size: '750 ml', perCarton: 16, label: '16 bottles / carton' },
  { size: '1 L',    perCarton: 12, label: '12 bottles / carton' },
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
    desc: 'pH 8.5+ alkaline water with added minerals — calcium, magnesium — optimised for cellular hydration and energy.',
    tags: ['pH 8.5+','Mineral enhanced','Premium hydration'],
  },
]

const WHO_WE_SERVE = [
  { label: 'Hotels & Resorts',     desc: 'Branded table water for rooms, banquets, and F&B.', Icon: HotelIcon },
  { label: 'Restaurants & Cafes',  desc: 'Elevate your table with your own labelled water.',  Icon: RestaurantIcon },
  { label: 'Corporate Offices',    desc: 'Branded water for meetings, events, and daily use.', Icon: OfficeIcon },
  { label: 'Events & Weddings',    desc: 'Custom bottles as part of your event experience.',   Icon: EventIcon },
  { label: 'Hospitals & Clinics',  desc: 'Hygienic, certified water for patients and staff.',  Icon: HospitalIcon },
  { label: 'Retail Brands',        desc: 'Launch your own water brand under our OEM facility.', Icon: RetailIcon },
  { label: 'Gyms & Fitness',       desc: 'Keep members hydrated with your branded alkaline water.', Icon: GymIcon },
  { label: 'Spas & Salons',        desc: 'Deliver a premium experience with custom branded water.', Icon: SpaIcon },
  { label: 'Wellness Centres',     desc: 'Complement your wellness offering with mineral-rich water.', Icon: WellnessIcon },
  { label: 'Sports Turfs & Clubs', desc: 'Hydrate athletes and spectators with your branded water.', Icon: TurfIcon },
]

export default function Services() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — full height so text sits at bottom
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', display:'flex', alignItems:'flex-end',
        position:'relative', overflow:'hidden', paddingBottom:'6rem',
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
          <motion.button initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
            onClick={() => setShowModal(true)} className="btn btn-gold" style={{ gap:'0.6rem' }}>
            Start Your Enquiry <ArrowRight size={16} color="currentColor" />
          </motion.button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 4 tick points, vertical
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>The Process</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>How It <em>Works</em></h2>
          </motion.div>

          <div style={{ display:'flex', flexDirection:'column', gap:'0', maxWidth:'680px' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.title}
                initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ duration:0.55, delay:i*0.1 }}
                style={{ display:'flex', gap:'1.4rem', alignItems:'flex-start', padding:'1.4rem 0', borderBottom: i < HOW_IT_WORKS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                {/* Tick */}
                <div style={{ flexShrink:0, width:'36px', height:'36px', borderRadius:'50%', background:'rgba(201,160,39,0.1)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center', marginTop:'2px' }}>
                  <CheckIcon size={16} color="var(--gold)" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', color:'var(--text-primary)', marginBottom:'0.35rem', fontWeight:400 }}>{step.title}</h4>
                  <p style={{ fontSize:'0.86rem', lineHeight:1.7, margin:0, color:'var(--text-muted)' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTLE SIZES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Bottle Options</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>Four Sizes to <em>Choose From</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.2rem' }}>
            {BOTTLE_SIZES.map((item, i) => (
              <motion.div key={item.size}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ y:-4, transition:{ duration:0.25 } }}
                style={{ borderRadius:'18px', overflow:'hidden', border:'1px solid var(--border-gold)', background:'linear-gradient(160deg, rgba(10,30,56,0.85), rgba(5,13,26,0.9))' }}>
                <div style={{ position:'relative', padding:'2rem 1rem 0', display:'flex', alignItems:'flex-end', justifyContent:'center', minHeight:'160px', background:'radial-gradient(circle at 50% 80%, rgba(0,180,216,0.08), transparent 70%)' }}>
                  <img src="/assets/bottle-hero.jpeg" alt={item.size} style={{ height:'130px', objectFit:'contain', display:'block' }} />
                </div>
                <div style={{ padding:'1.2rem' }}>
                  <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.5rem', color:'var(--gold)', marginBottom:'0.2rem' }}>{item.size}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginBottom:'0.75rem', lineHeight:1.5 }}>{item.desc}</div>
                  <div style={{ display:'flex', gap:'0.3rem', flexWrap:'wrap' }}>
                    {item.tags.map(t => <span key={t} style={{ fontSize:'0.68rem', padding:'0.15rem 0.55rem', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'50px', color:'var(--blue)' }}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BATCH SIZES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'4rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', borderBottom:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Order Quantities</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', marginBottom:'0.4rem' }}>Batch Sizes <em>&amp; Carton Info</em></h2>
            <p style={{ fontSize:'0.88rem', color:'var(--text-muted)' }}>Orders are placed in cartons. Mix sizes as needed.</p>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', maxWidth:'800px' }}>
            {BATCH_SIZES.map(({ size, perCarton, label }, i) => (
              <motion.div key={size}
                initial={{ opacity:0, scale:0.94 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ duration:0.45, delay:i*0.08 }}
                style={{ textAlign:'center', padding:'1.4rem 1rem', background:'rgba(10,30,56,0.5)', borderRadius:'14px', border:'1px solid var(--border-gold)' }}>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.6rem', color:'var(--gold)', lineHeight:1, marginBottom:'0.4rem' }}>{size}</div>
                <div style={{ fontSize:'2rem', fontWeight:700, color:'var(--text-primary)', lineHeight:1, marginBottom:'0.3rem' }}>{perCarton}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', lineHeight:1.4 }}>{label}</div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginTop:'1.2rem' }}>
            * Minimum order quantity and custom batch arrangements available on request.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WATER TYPES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0' }}>
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
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:color === 'var(--gold)' ? 'rgba(201,160,39,0.08)' : 'rgba(0,180,216,0.08)', border:`1px solid ${color === 'var(--gold)' ? 'var(--border-gold)' : 'rgba(0,180,216,0.2)'}`, display:'grid', placeItems:'center', marginBottom:'1rem' }}>
                  <Icon size={24} color={color} strokeWidth={1.4} />
                </div>
                <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.4rem', marginBottom:'0.6rem' }}>{type}</h3>
                <p style={{ fontSize:'0.86rem', lineHeight:1.7, color:'var(--text-muted)', marginBottom:'1rem' }}>{desc}</p>
                <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                  {tags.map(t => <span key={t} style={{ fontSize:'0.74rem', padding:'0.2rem 0.65rem', border:`1px solid ${color === 'var(--gold)' ? 'var(--border-gold)' : 'rgba(0,180,216,0.2)'}`, borderRadius:'50px', color }}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHO WE SERVE — with icons
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Who We Serve</p>
            <h2 style={{ fontWeight:300, fontSize:'2rem', margin:0 }}>Built for <em>Every Business</em></h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1rem' }}>
            {WHO_WE_SERVE.map(({ label, desc, Icon }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.45, delay:i*0.05 }}
                style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1.2rem', background:'rgba(201,160,39,0.03)', borderRadius:'12px', border:'1px solid var(--border-gold)' }}>
                <div style={{ flexShrink:0, width:'38px', height:'38px', borderRadius:'10px', background:'rgba(201,160,39,0.08)', border:'1px solid var(--border-gold)', display:'grid', placeItems:'center' }}>
                  <Icon size={18} color="var(--gold)" sw={1.5} />
                </div>
                <div>
                  <div style={{ fontSize:'0.88rem', color:'var(--text-primary)', fontWeight:500, marginBottom:'0.25rem' }}>{label}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', lineHeight:1.55 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER — single button
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:'5rem 0', borderTop:'1px solid var(--border-gold)', textAlign:'center' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p style={{ fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>Ready to Start?</p>
            <h2 style={{ fontWeight:300, fontSize:'2.2rem', marginBottom:'1rem' }}>
              Let's Build Your <em style={{ color:'var(--blue)' }}>Brand Together</em>
            </h2>
            <div className="divider" />
            <p style={{ maxWidth:'460px', margin:'1.2rem auto 2rem', fontSize:'0.96rem', lineHeight:1.8, color:'var(--text-muted)' }}>
              Tell us your size, water type, quantity, and branding — we'll get back with a full quote on WhatsApp.
            </p>
            <button onClick={() => setShowModal(true)} className="btn btn-gold" style={{ gap:'0.6rem', fontSize:'1rem', padding:'0.9rem 2.4rem' }}>
              Start Your Enquiry <ArrowRight size={16} color="currentColor" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          section > .container > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
