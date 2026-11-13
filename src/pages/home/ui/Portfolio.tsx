import { useMemo, useState } from 'react'
import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { Button } from '../../../shared/ui/Button'
import { useLeadModal } from '../../../features/lead-modal/LeadModalProvider'
import { img } from '../../../shared/assets'

const tabs = ['Капитальный', 'Косметический', 'Под ключ', 'Студия', 'Черновой'] as const
const areas = [55, 61, 72, 88, 106, 63, 41]
const gallery = [img.sofa, img.minhPham, img.sofa, img.minhPham, img.sofa]
const works = [
  'Штукатурка стен по маякам',
  'Грунтовка стен и потолка',
  'Монтаж натяжных потолков',
  'Шпатлёвка стен под обои',
  'Окраска стен',
  'Укладка плитки в с/у',
  'Прокладка электрики',
  'Установка планшетов и откосов',
]

export function Portfolio() {
  const { open } = useLeadModal()
  const [tab, setTab] = useState<(typeof tabs)[number]>('Капитальный')
  const [area, setArea] = useState(areas[0])
  const [photo, setPhoto] = useState(0)

  const info = useMemo(
    () => [
      ['Сумма:', `${(area * 4950).toLocaleString('ru-RU')} руб.`],
      ['Площадь:', `${Math.round(area * 0.8)} м2`],
      ['Срок:', `${40 + Math.round(area * 0.7)} дней`],
      ['Комнат:', area > 70 ? '3' : area > 50 ? '2' : '1'],
      ['Адрес:', 'Купина 18'],
    ],
    [area],
  )

  const prev = () => setPhoto((p) => (p - 1 + gallery.length) % gallery.length)
  const next = () => setPhoto((p) => (p + 1) % gallery.length)

  return (
    <section id="portfolio" className="bg-soft/60 py-12 lg:py-16">
      <Container>
        <SectionTitle title="Примеры наших работ" />

        <Reveal>
          <div role="tablist" className="flex gap-1 overflow-x-auto rounded-md bg-neutral-200 p-1 [scrollbar-width:none]">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`flex-1 cursor-pointer whitespace-nowrap rounded px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  tab === t ? 'bg-navy text-white shadow' : 'text-neutral-600 hover:bg-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {areas.map((a) => (
              <label key={a} className="flex cursor-pointer items-center gap-1.5 text-xs text-neutral-600">
                <input
                  type="radio"
                  name="portfolio-area"
                  checked={area === a}
                  onChange={() => setArea(a)}
                  className="accent-navy"
                />
                {a} м2
              </label>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div key={`${tab}-${area}`} className="mt-6 grid animate-swap gap-4 lg:grid-cols-[70px_1fr_300px]">
            <div className="order-2 flex gap-2 lg:order-1 lg:flex-col">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setPhoto(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={`aspect-square flex-1 cursor-pointer overflow-hidden rounded border-2 transition lg:flex-none ${
                    photo === i ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={g} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>

            <div className="relative order-1 overflow-hidden rounded-lg lg:order-2">
              <img key={photo} src={gallery[photo]} alt="Пример ремонта" className="aspect-video w-full animate-fade-in object-cover" />
              {(['‹', '›'] as const).map((ch, i) => (
                <button
                  key={ch}
                  onClick={i === 0 ? prev : next}
                  aria-label={i === 0 ? 'Назад' : 'Вперёд'}
                  className={`absolute top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-2xl shadow transition hover:scale-110 hover:bg-white ${
                    i === 0 ? 'left-3' : 'right-3'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

            <div className="order-3 rounded-lg bg-white p-4 text-xs shadow-sm">
              <dl className="space-y-2">
                {info.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-neutral-500">{k}</dt>
                    <dd className="font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 font-semibold">Перечень работ:</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-neutral-600">
                {works.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 text-center">
          <Button onClick={() => open(`Заявка по проекту: ${tab}, ${area} м2`)}>Оставить заявку</Button>
        </div>
      </Container>
    </section>
  )
}