import { useEffect, useRef } from 'react'

export default function WaveCanvas({ intensity = 1, style = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const layers = [
      { amp: 45 * intensity, freq: 0.006, speed: 0.65,  yRatio: 0.70, alpha: 0.20, color: '0,180,216' },
      { amp: 30 * intensity, freq: 0.011, speed: 1.0,   yRatio: 0.76, alpha: 0.14, color: '0,119,182' },
      { amp: 20 * intensity, freq: 0.017, speed: 0.45,  yRatio: 0.82, alpha: 0.10, color: '0,180,216' },
      { amp: 55 * intensity, freq: 0.004, speed: 0.30,  yRatio: 0.63, alpha: 0.07, color: '11,61,145' },
    ]

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)
      layers.forEach(({ amp, freq, speed, yRatio, alpha, color }) => {
        ctx.beginPath()
        ctx.moveTo(0, H)
        for (let x = 0; x <= W; x += 4) {
          const y = H * yRatio
            + Math.sin(x * freq + t * speed) * amp
            + Math.sin(x * freq * 1.8 + t * speed * 0.7) * (amp * 0.35)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        const g = ctx.createLinearGradient(0, H * yRatio - amp, 0, H)
        g.addColorStop(0, `rgba(${color},${alpha})`)
        g.addColorStop(1, `rgba(${color},0)`)
        ctx.fillStyle = g; ctx.fill()
      })
      t += 0.016
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  )
}
