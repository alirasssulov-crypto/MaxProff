import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { img } from '../../../shared/assets'

const levels = [
  ['Главный инженер', 'Наблюдает за работой в режиме реального времени. Проверяет поставщиков материалов и оборудования.'],
  ['Отдел технического контроля', 'Проверяет качество работ на всех объектах и решает спорные ситуации.'],
  ['Видео и фото контроль', 'Онлайн-контроль хода ремонта 24/7.'],
  ['Начальник участка', 'Оценивает соответствие процесса ремонта условиям договора по срокам и стоимости.'],
  ['Прораб', 'Приезжает на объект 4–5 раз в неделю, контролирует работу мастеров. Проверяет каждый этап по 120 пунктам соответствия.'],
]

export function Quality() {
  return (
    <section id="quality" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle
          title="Многоуровневый контроль качества"
          subtitle="Ремонтируем квартиры без дефектов благодаря многоуровневому контролю качества"
        />
        <div className="grid items-center gap-8 lg:grid-cols-[420px_1fr]">
          <Reveal direction="left">
            <img src={img.industrialService} alt="Инженеры контроля качества" loading="lazy" className="mx-auto w-full max-w-md" />
          </Reveal>
          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <li>
                  <p className="text-lg font-bold text-brand">
                    {String(i + 1).padStart(2, '0')}
                    <span className="ml-2 text-sm text-ink">{t}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

const advantages = [
  { icon: img.contract, t: 'Работа без предоплаты', d: 'Мы не берём предоплату. Вы платите за каждый этап работ после подписания акта.' },
  { icon: img.officialDocuments, t: 'Стоимость ремонта не меняется', d: 'Прозрачный бюджет. Итоговая смета фиксируется в договоре.' },
  { icon: img.builder, t: 'Мастера-славяне с опытом от 5 лет', d: 'В штате 250 мастеров, 20 прорабов с опытом работы от 8 лет.' },
  { icon: img.guarantee, t: 'За нами не переделывают', d: 'Качество работ для нас в приоритете. Даём гарантию на все виды работ.' },
]

export function Advantages() {
  return (
    <section id="advantages" className="bg-soft/60 py-12 lg:py-16">
      <Container>
        <SectionTitle title="Наши преимущества" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.t} delay={i * 100}>
              <li className="h-full rounded-lg bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <img src={a.icon} alt="" className="size-10 object-contain" />
                <h3 className="mt-3 text-sm font-bold">{a.t}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{a.d}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}