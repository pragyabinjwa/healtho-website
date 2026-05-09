import { useState } from 'react'
import { motion } from 'framer-motion'
import WaveCanvas from '../components/WaveCanvas'
import { WAIcon } from '../components/Icons'

const WA_NUMBER = '919109348483'
const EMAIL     = 'healthoalkalinewater@gmail.com'
const ADDRESS   = '1 Abhinav Nagar, Near Teen Imli Square, Ring Road, Madhya Pradesh 452001'
const MAP_EMBED = 'https://maps.google.com/maps?q=1+Abhinav+Nagar+Near+Teen+Imli+Square+Ring+Road+Indore+Madhya+Pradesh+452001+India&output=embed&z=15'

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent]   = useState(false)

  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const buildMsg = () => [
    'Hi Healtho! 👋',
    '',
    `*Name:* ${form.name}`,
    `*Email:* ${form.email || '—'}`,
    `*Phone:* ${form.phone}`,
    form.message ? `\n*Message:*\n${form.message}` : '',
  ].filter(Boolean).join('\n')

  const submit = e => {
    e.preventDefault()
    setSent(true)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMsg())}`, '_blank')
  }

  const inp = {
    width: '100%', padding: '0.9rem 1.1rem',
    background: 'rgba(10,30,56,0.65)', border: '1px solid rgba(0,180,216,0.2)',
    borderRadius: '10px', color: 'var(--text-primary)', fontSize: '0.95rem',
    fontFamily: 'var(--font-sans)', outline: 'none', transition: 'border-color 0.3s',
  }
  const lbl = { fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.45rem' }
  const onF  = e => e.target.style.borderColor = 'var(--gold)'
  const onB  = e => e.target.style.borderColor = 'rgba(0,180,216,0.2)'

  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '45vh', display: 'flex', alignItems: 'flex-end',
        position: 'relative', overflow: 'hidden', paddingBottom: '4rem',
        background: 'linear-gradient(155deg, #020810, #050D1A 40%, #0A1E38)',
      }}>
        <WaveCanvas intensity={0.8} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
            style={{ fontSize:'0.72rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.8rem' }}>
            Get In Touch
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }} style={{ fontWeight:300 }}>
            Let's <em style={{ color:'var(--gold)' }}>Connect</em>
          </motion.h1>
          <div className="divider left" style={{ marginTop:'1.5rem' }} />
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.3 }}
            style={{ maxWidth:'460px', fontSize:'1rem', lineHeight:1.85, marginTop:'1.5rem', color:'var(--text-muted)' }}>
            Place an order, ask about custom labels, or just say hello. We respond fast — usually within the hour.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'4rem', alignItems:'start' }}>

            {/* Left: Map + contact info */}
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.85 }}>
              {/* Map */}
              <div style={{ borderRadius:'20px', overflow:'hidden', border:'1px solid var(--border-gold)', marginBottom:'2rem', boxShadow:'0 20px 60px rgba(0,0,0,0.4)' }}>
                <iframe
                  src={MAP_EMBED}
                  title="Healtho Location"
                  width="100%" height="340"
                  style={{ border:0, display:'block', filter:'invert(92%) hue-rotate(180deg) saturate(0.85) brightness(0.85)' }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Info */}
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[
                  { label:'Address', value: ADDRESS, href: null },
                  { label:'Email',   value: EMAIL,   href: `mailto:${EMAIL}` },
                  { label:'WhatsApp',value: '+91 91093 48483', href:`https://wa.me/${WA_NUMBER}` },
                ].map(({ label, value, href }) => (
                  <div key={label} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1rem 1.2rem', background:'rgba(10,30,56,0.5)', borderRadius:'12px', border:'1px solid var(--border-gold)' }}>
                    <div style={{ flexShrink:0, width:'6px', height:'6px', borderRadius:'50%', background:'var(--gold)', marginTop:'8px' }} />
                    <div>
                      <div style={{ fontSize:'0.68rem', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'0.2rem' }}>{label}</div>
                      {href
                        ? <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" style={{ fontSize:'0.9rem', color:'var(--text-primary)', lineHeight:1.6 }}>{value}</a>
                        : <span style={{ fontSize:'0.9rem', color:'var(--text-primary)', lineHeight:1.6 }}>{value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.85 }}>
              <div className="glass-card" style={{ padding:'2.5rem' }}>
                {!sent ? (
                  <>
                    <h3 style={{ fontFamily:'var(--font-serif)', color:'var(--gold)', marginBottom:'0.4rem' }}>Send a Message</h3>
                    <p style={{ fontSize:'0.84rem', marginBottom:'2rem' }}>
                      Fill in your details — we'll open WhatsApp with your message ready to send.
                    </p>

                    <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
                      <div>
                        <label style={lbl}>Your Name *</label>
                        <input required placeholder="Rahul Sharma" style={inp} onFocus={onF} onBlur={onB} value={form.name} onChange={s('name')} />
                      </div>
                      <div>
                        <label style={lbl}>Email</label>
                        <input type="email" placeholder="rahul@example.com" style={inp} onFocus={onF} onBlur={onB} value={form.email} onChange={s('email')} />
                      </div>
                      <div>
                        <label style={lbl}>Phone Number *</label>
                        <input required type="tel" placeholder="+91 98765 43210" style={inp} onFocus={onF} onBlur={onB} value={form.phone} onChange={s('phone')} />
                      </div>
                      <div>
                        <label style={lbl}>Message (optional)</label>
                        <textarea rows={3} placeholder="Tell us what you need..." style={{ ...inp, resize:'vertical', minHeight:'90px' }} onFocus={onF} onBlur={onB} value={form.message} onChange={s('message')} />
                      </div>

                      <button type="submit" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', padding:'1rem', background:'#25D366', border:'none', borderRadius:'10px', color:'#fff', fontSize:'0.92rem', fontWeight:600, cursor:'pointer', fontFamily:'var(--font-sans)', transition:'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                        <WAIcon size={18} /> Contact Us on WhatsApp
                      </button>

                      <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', textAlign:'center', margin:0 }}>
                        Opens WhatsApp with your message pre-filled. No data stored.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', padding:'2rem 0' }}>
                    <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.3)', display:'grid', placeItems:'center', margin:'0 auto 1.2rem' }}>
                      <WAIcon size={28} />
                    </div>
                    <h3 style={{ color:'var(--gold)', marginBottom:'0.75rem' }}>WhatsApp Opened!</h3>
                    <p style={{ marginBottom:'1.5rem' }}>Your message is pre-filled. Just hit Send — we reply fast.</p>
                    <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another</button>
                  </motion.div>
                )}
              </div>

              {/* Quick WhatsApp */}
              <motion.a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi Healtho! I would like to know more about your products.')}`}
                target="_blank" rel="noreferrer"
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.7rem', marginTop:'1rem', padding:'1rem', background:'rgba(37,211,102,0.06)', border:'1px solid rgba(37,211,102,0.2)', borderRadius:'12px', color:'#25D366', fontSize:'0.88rem', fontWeight:500, transition:'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(37,211,102,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(37,211,102,0.06)'}>
                <WAIcon size={18} /> Quick message on WhatsApp
              </motion.a>
            </motion.div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          section > .container > div[style*="grid-template-columns: 1.1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          iframe { height: 260px !important; }
        }
      `}</style>
    </>
  )
}
