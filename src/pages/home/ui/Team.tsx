import { useState } from 'react'
import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { VideoCard } from '../../../shared/ui/VideoCard'
import { img } from '../../../shared/assets'

const roles = [
  { name: 'Маляр-штукатур', lead: 'Выравнивает и подготавливает поверхности', items: ['Штукатурка стен по маякам', 'Грунтовка стен и потолка', 'Шпатлёвка стен под обои', 'Окраска стен'] },
  { name: 'Прораб', lead: 'Организует и контролирует весь ход ремонта', items: ['Приёмка черновых материалов', 'Контроль сроков и смет', 'Проверка по 120 пунктам'] },
  { name: 'Сантехник', lead: 'Монтирует и обслуживает инженерные системы', items: ['Разводка водоснабжения', 'Установка сантехники', 'Монтаж отопления'] },
  { name: 'Плиточник', lead: 'Укладывает плитку и керамогранит', items: ['Укладка плитки в с/у', 'Затирка швов', 'Гидроизоляция'] },
  { name: 'Укладчик полов', lead: 'Монтирует напольные покрытия', items: ['Стяжка пола', 'Укладка ламината', 'Монтаж плинтуса'] },
  { name: 'Монтаж окон', lead: 'Устанавливает окна и откосы', items: ['Замер проёмов', 'Установка окон', 'Монтаж откосов'] },
  { name: 'Монтаж потолка', lead: 'Монтирует потолочные системы', items: ['Натяжные потолки', 'Гипсокартон', 'Установка светильников'] },
  { name: 'Сварщик', lead: 'Выполняет сварочные работы любой сложности', items: ['Сварка каркасов', 'Монтаж перегородок', 'Металлоконструкции'] },
]

export function Team() {
  const [i, setI] = useState(0)
  const r = roles[i]
  const go = (d: number) => setI((p) => (p + d + roles.length) % roles.length)

  return (
    <section id="team" className="bg-soft/60 py-12 lg:py-16">
      <Container>
        <SectionTitle title="Наша команда" />
        <Reveal>
          <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-neutral-300 [scrollbar-width:none]">
            {roles.map((x, idx) => (
              <button
                key={x.name}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`-mb-px cursor-pointer whitespace-nowrap border-b-2 px-3 py-2 text-xs font-bold transition sm:text-sm ${
                  idx === i ? 'border-brand text-brand' : 'border-transparent text-ink hover:text-brand'
                }`}
              >
                {x.name}
              </button>
            ))}
          </div>

          <div className="relative mt-6 grid items-center gap-6 sm:grid-cols-2 sm:px-12">
            <button onClick={() => go(-1)} aria-label="Назад" className="absolute left-0 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-2xl shadow transition hover:scale-110">‹</button>
            <button onClick={() => go(1)} aria-label="Вперёд" className="absolute right-0 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-2xl shadow transition hover:scale-110">›</button>

            <img key={`img-${i}`} src={img.fullLength} alt={r.name} className="mx-auto h-72 animate-swap object-contain sm:h-80" />
            <div key={`txt-${i}`} className="animate-swap px-8 text-sm sm:px-0">
              <p className="text-xs font-bold uppercase text-brand">Имя Фамилия</p>
              <h3 className="mt-1 text-lg font-bold">{r.name} {r.lead.toLowerCase()}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-neutral-600">
                {r.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {roles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Мастер ${idx + 1}`}
                className={`size-3 cursor-pointer rounded-full border border-navy transition-all ${idx === i ? 'w-6 bg-navy' : 'bg-white'}`}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

const masters = [img.frontViewYoung, img.frontView, img.frontViewYoung, img.frontView, img.frontViewYoung]

export function Masters() {
  const [i, setI] = useState(1)
  const n = masters.length
  const at = (d: number) => masters[(i + d + n) % n]
  const go = (d: number) => setI((p) => (p + d + n) % n)

  return (
    <section id="masters" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle title="Наши мастера в работе" />
        <Reveal>
          <div className="relative flex items-center justify-center gap-3 px-10 sm:gap-5">
            <button onClick={() => go(-1)} aria-label="Назад" className="absolute left-0 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-2xl shadow transition hover:scale-110">‹</button>
            <img src={at(-1)} alt="" className="hidden h-40 w-1/4 rounded-lg bg-slate-300 object-cover opacity-70 sm:block lg:h-56" />
            <img key={i} src={at(0)} alt="Мастер за работой" className="h-56 w-full animate-swap rounded-lg bg-slate-300 object-cover sm:h-72 sm:w-1/2 lg:h-80" />
            <img src={at(1)} alt="" className="hidden h-40 w-1/4 rounded-lg bg-slate-300 object-cover opacity-70 sm:block lg:h-56" />
            <button onClick={() => go(1)} aria-label="Вперёд" className="absolute right-0 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-2xl shadow transition hover:scale-110">›</button>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {masters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Фото ${idx + 1}`}
                className={`size-3 cursor-pointer rounded-full border border-navy transition-all ${idx === i ? 'w-6 bg-navy' : 'bg-white'}`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid items-center gap-6 rounded-lg bg-soft/60 p-4 sm:grid-cols-2">
            <VideoCard youtubeId="M7lc1UVf-VE" />
            <ul className="list-disc space-y-1 pl-5 text-xs text-neutral-600">
              <li>Обучение мастеров каждые 6 месяцев</li>
              <li>Свой полигон для обучения мастеров</li>
              <li>300 мастеров в штате</li>
              <li>Строгий подбор мастеров</li>
              <li>Все рабочие — граждане РФ</li>
              <li>Ведётся рейтинг мастеров согласно отзывам клиентов и прорабов</li>
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}