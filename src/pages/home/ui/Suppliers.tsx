import { useState } from 'react'
import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { Button } from '../../../shared/ui/Button'
import { useLeadModal } from '../../../features/lead-modal/LeadModalProvider'
import { img } from '../../../shared/assets'

const logos = [
  { src: img.knauf, alt: 'Knauf' },
  { src: img.rehau, alt: 'Rehau' },
  { src: img.roca, alt: 'Roca' },
  { src: img.rasch, alt: 'Rasch' },
  { src: img.grohe, alt: 'Grohe' },
  { src: img.cersanit, alt: 'Cersanit' },
]

export function Suppliers() {
  const { open } = useLeadModal()
  return (
    <section id="suppliers" className="relative overflow-hidden bg-white py-12 lg:py-16">
      <img src={img.minhPham} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-white/30" />
      <Container className="relative">
        <Reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">Только лучшие поставщики</h2>
          <p className="mt-2 max-w-md text-xs text-neutral-600">
            В нашей работе мы используем самые качественные и проверенные годами материалы
          </p>
        </Reveal>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[380px_1fr]">
          <Reveal direction="left">
            <div className="rounded-lg bg-white/90 p-5 shadow-md">
              <p className="text-xs text-neutral-600">Получите бесплатный сертификат на чистовые материалы номиналом</p>
              <p className="mt-2 text-3xl font-extrabold">
                <span className="rounded bg-navy px-3 py-1 text-white">30 000</span>{' '}
                <span className="text-xs font-normal">руб.</span>
              </p>
              <Button size="sm" className="mt-4" onClick={() => open('Сертификат на 30 000 руб.')}>
                Оставить заявку
              </Button>
            </div>
          </Reveal>
          <ul className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3">
            {logos.map((l, i) => (
              <Reveal key={l.alt} delay={i * 80}>
                <li className="flex justify-center">
                  <img src={l.src} alt={l.alt} loading="lazy" className="h-10 object-contain transition duration-300 hover:scale-110 sm:h-14" />
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

const faq = [
  ['Сколько лет работает компания?', 'Мы работаем на рынке ремонта более 10 лет и сдали более 5 000 объектов.'],
  ['Сколько человек работает в «МаксПрофф»?', 'В штате более 300 мастеров, 20 прорабов, инженеры и сметчики.'],
  ['Можно ли приехать к вам, что бы познакомиться?', 'Конечно! Будем рады видеть Вас в офисе по адресу.'],
  ['Какие гарантии дает компания и на какие работы они распространяются?', 'Гарантия 3 года на все виды выполненных работ, она прописана в договоре.'],
  ['Заключается ли договор?', 'Да, договор заключается до начала работ, смета в нём фиксируется.'],
  ['Когда готовы приступить к работе?', 'Обычно в течение 3–5 дней после подписания договора.'],
  ['Кто закупает материал?', 'Материалы закупаем мы по оптовым ценам или вы — по желанию, с нашим контролем.'],
]

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(2)

  return (
    <section id="faq" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle title="Вопросы и ответы" subtitle="Знаем, о чем вы думаете прямо сейчас" />
        <Reveal>
          <ul className="mx-auto max-w-3xl divide-y divide-neutral-200">
            {faq.map(([q, a], i) => {
              const isOpen = openIdx === i
              return (
                <li key={q}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={`flex w-full cursor-pointer items-center gap-3 py-4 text-left text-sm font-medium transition hover:text-brand ${
                      isOpen ? 'text-brand' : ''
                      }`}
                  >
                    <span className={`grid size-5 shrink-0 place-items-center text-lg leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                    {q}
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="mb-4 rounded bg-soft px-4 py-3 text-xs text-neutral-600">{a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}