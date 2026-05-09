import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* Available real images + placeholder entries */
const ITEMS = [
  { id: 1, src: '/assets/bottle-hero.jpg',       cat: 'Product',  caption: 'Healtho 500ml — Crystal Clear Premium Alkaline Water' },
  { id: 2, src: '/assets/bottle-concepts-1.jpg', cat: 'Design',   caption: 'Luxury Label Concepts — Series A' },
  { id: 3, src: '/assets/bottle-concepts-2.jpg', cat: 'Design',   caption: 'Luxury Label Concepts — Series B' },
  /* Placeholder entries — replace src with real photos */
  { id: 4, src: null, ph: '🏭', cat: 'Factory',  caption: 'Purification Plant — RO Filtration Unit' },
  { id: 5, src: null, ph: '💧', cat: 'Source',   caption: 'Groundwater Source — Deep Aquifer' },
  { id: 6, src: null, ph: '🏆', cat: 'Factory',  caption: 'Quality Testing Lab' },
  { id: 7, src: null, ph: '🚚', cat: 'Delivery', caption: 'Fleet Ready — Same Day Delivery' },
  { id: 8, src: null, ph: '🎉', cat: 'Events',   caption: 'Corporate Event Supply — 500+ Bottles' },
  { id: 9, src: null, ph: '📦', cat: 'Product',  caption: '20L Bulk Jar — Dispenser Compatible' },
]

const CATS = ['All', 'Product', 'Design', 'Factory', 'Source', 'Delivery', 'Events']

export default function Gallery() {
  const [cat,        setCat]        = useState('All')
  const [lightbox,   setLightbox]   = useState(null)

  const filtered = cat === 'All' ? ITEMS : ITEMS.filter(i => i.cat === cat)

  const openLightbox = item => { if (item.src) setLightbox(item) }
  const closeLightbox = ()   => setLightbox(null)
  const prev = () => {
    const idx = ITEMS.findIndex(i => i.id === lightbox.id)
    const withSrc = ITEMS.filter(i => i.src)
    const cur = withSrc.findIndex(i => i.id === lightbox.id)
    setLightbox(withSrc[(cur - 1 + withSrc.length) % withSrc.length])
  }
  const next = () => {
    const withSrc = ITEMS.filter(i => i.src)
    const cur = withSrc.findIndex(i => i.id === lightbox.id)
    setLightbox(withSrc[(cur + 1) % withSrc.length])
  }

  return (
    <>
      {/* Page hero */}
      <section style={{
        minHeight: '45vh', display: 'flex', alignItems: 'flex-end',
        background: 'linear-gradient(135deg, #020810, #050D1A 50%, #0A1E38)',
        paddingBottom: '4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(0,180,216,0.07), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Photo Gallery
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ fontWeight: 300 }}>
            Inside<br /><em style={{ color: 'var(--blue)' }}>Healtho</em>
          </motion.h1>
          <div className="divider left" style={{ marginTop: '1.5rem' }} />
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ padding: '3rem 0 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', paddingBottom: '1.5rem' }}>
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: '50px',
                  fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  border: `1px solid ${cat === c ? 'var(--gold)' : 'var(--border-blue)'}`,
                  background: cat === c ? 'rgba(201,160,39,0.12)' : 'transparent',
                  color: cat === c ? 'var(--gold)' : 'var(--text-muted)',
                  transition: 'all 0.3s',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: '3rem 0 6rem', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{
            columns: '3 280px', columnGap: '1.2rem',
          }}>
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => openLightbox(item)}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: '1.2rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-gold)',
                    cursor: item.src ? 'zoom-in' : 'default',
                    position: 'relative',
                    background: item.src ? 'transparent' : 'var(--bg-card)',
                  }}
                >
                  {item.src ? (
                    <>
                      <img src={item.src} alt={item.caption} style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(5,13,26,0.9) 0%, transparent 50%)',
                        opacity: 0, transition: 'opacity 0.4s',
                        display: 'flex', alignItems: 'flex-end', padding: '1.2rem',
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                      >
                        <div>
                          <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>{item.cat}</span>
                          <p style={{ fontSize: '0.85rem', color: '#fff', margin: 0, lineHeight: 1.4 }}>{item.caption}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: '3rem 2rem', textAlign: 'center', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '3.5rem' }}>{item.ph}</div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{item.cat}</span>
                      <p style={{ fontSize: '0.85rem', margin: 0 }}>{item.caption}</p>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '50px' }}>
                        Photo coming soon
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              No items in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(2,8,16,0.96)', backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '860px', width: '100%' }}
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--border-gold)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}
              />
              <div style={{ padding: '1.2rem 0 0' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{lightbox.cat}</span>
                <p style={{ margin: '0.3rem 0 0', color: 'var(--text-primary)' }}>{lightbox.caption}</p>
              </div>
              {/* Close */}
              <button onClick={closeLightbox} style={{ position: 'absolute', top: '-16px', right: '-16px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(201,160,39,0.9)', border: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'grid', placeItems: 'center', color: '#000' }}>×</button>
              {/* Prev */}
              <button onClick={prev} style={{ position: 'absolute', left: '-56px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-gold)', cursor: 'pointer', color: 'var(--gold)', fontSize: '1.2rem' }}>‹</button>
              {/* Next */}
              <button onClick={next} style={{ position: 'absolute', right: '-56px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-gold)', cursor: 'pointer', color: 'var(--gold)', fontSize: '1.2rem' }}>›</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
