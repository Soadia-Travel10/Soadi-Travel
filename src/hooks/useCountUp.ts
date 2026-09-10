import { useState, useEffect, useRef } from 'react'

export function useCountUp(to: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const startTime = performance.now()
            const animate = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              setCount(Math.floor(progress * to))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(to)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  return { count, ref }
}
