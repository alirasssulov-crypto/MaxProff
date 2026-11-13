import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-310 px-4 sm:px-6 ${className}`}>{children}</div>
}

type RevealProps = {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const hidden =
    direction === 'left' ? '-translate-x-8' : direction === 'right' ? 'translate-x-8' : 'translate-y-8'

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'translate-x-0 translate-y-0 opacity-100' : hidden
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-8 max-w-3xl text-center lg:mb-12">
      <h2 className="text-2xl font-bold leading-tight text-ink sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-neutral-500 sm:text-base">{subtitle}</p>}
    </Reveal>
  )
}