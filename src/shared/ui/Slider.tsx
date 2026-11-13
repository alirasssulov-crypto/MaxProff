import { Children, useCallback, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** классы контейнера: на десктопе можно превратить в grid (lg:grid lg:grid-cols-4 lg:overflow-visible) */
  className?: string
  /** ширина слайда на мобильном */
  itemClassName?: string
  /** на каких экранах прятать точки, напр. 'lg:hidden' */
  dotsClassName?: string
}

export function Slider({
  children,
  className = '',
  itemClassName = 'w-[85%] sm:w-[48%]',
  dotsClassName = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const items = Children.toArray(children)

  const step = useCallback(() => {
    const el = ref.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return 1
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)
  }, [])

  const onScroll = () => {
    const el = ref.current
    if (el) setIndex(Math.round(el.scrollLeft / step()))
  }

  const go = (i: number) => ref.current?.scrollTo({ left: i * step(), behavior: 'smooth' })

  return (
    <>
      <div
        ref={ref}
        onScroll={onScroll}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {items.map((item, i) => (
          <div key={i} className={`shrink-0 snap-start lg:w-auto ${itemClassName}`}>
            {item}
          </div>
        ))}
      </div>
      <div className={`mt-4 flex justify-center gap-2 ${dotsClassName}`}>
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Слайд ${i + 1}`}
            onClick={() => go(i)}
            className={`size-3 cursor-pointer rounded-full border border-navy transition-all ${
              i === index ? 'w-6 bg-navy' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </>
  )
}