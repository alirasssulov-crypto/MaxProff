import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { Slider } from '../../../shared/ui/Slider'
import { Button } from '../../../shared/ui/Button'
import { useLeadModal } from '../../../features/lead-modal/LeadModalProvider'
import { img } from '../../../shared/assets'

const plans = [
  {
    name: 'Косметический',
    days: 'от 5 дней',
    desc: 'Такой тип ремонта подойдёт для тех, чтобы освежить ремонт в квартире: заменить покрытия стен и потолка без предварительной подготовки.',
    groups: [
      { title: 'Демонтаж:', items: ['Демонтаж старых покрытий', 'Демонтаж старой электрики'] },
      { title: 'Черновые работы:', items: ['Грунтовка стен и пола'] },
    ],
    old: 'от 3 245 руб/м2',
    price: 'от 2 450 руб/м2',
  },
  {
    name: 'Капитальный',
    days: 'от 14 дней',
    desc: 'Такой тип ремонта подойдёт, если требуется перепланировка квартиры, замена коммуникаций, стяжка пола, штукатурка стен.',
    groups: [
      { title: 'Демонтаж:', items: ['Демонтаж старых покрытий', 'Демонтаж старой электрики'] },
      { title: 'Черновые работы:', items: ['Грунтовка стен и пола', 'Шпатлёвка и штукатурка стен'] },
    ],
    old: 'от 6 445 руб/м2',
    price: 'от 4 950 руб/м2',
  },
  {
    name: 'Под ключ',
    days: 'от 11 дней',
    desc: 'Ремонт класса «евро» — полный цикл работ с материалами, чистовой отделкой и вывозом строительного мусора.',
    groups: [
      { title: 'Демонтаж:', items: ['Демонтаж старых покрытий', 'Демонтаж дверей'] },
      { title: 'Черновые работы:', items: ['Грунтовка стен и пола', 'Штукатурка стен'] },
    ],
    old: 'от 6 465 руб/м2',
    price: 'от 5 450 руб/м2',
  },
  {
    name: 'Дизайнерский',
    days: 'от 20 дней',
    desc: 'Эксклюзивный ремонт по индивидуальному дизайн-проекту с авторским надзором и подбором материалов.',
    groups: [
      { title: 'Демонтаж:', items: ['Демонтаж старых покрытий', 'Демонтаж старой электрики'] },
      { title: 'Черновые работы:', items: ['Грунтовка стен и пола', 'Монтаж натяжных потолков'] },
    ],
    old: 'от 9 800 руб/м2',
    price: 'от 7 500 руб/м2',
  },
]

export function Prices() {
  const { open } = useLeadModal()

  return (
    <section id="prices" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle title="Цены на ремонт" />
        <Slider
          className="lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible"
          itemClassName="w-[82%] sm:w-[46%]"
          dotsClassName="lg:hidden"
        >
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <header className="flex items-center gap-3 bg-slate-200/70 p-3">
                  <img src={img.elipses} alt="" className="size-11 rounded-full object-cover" />
                  <div>
                    <h3 className="text-sm font-bold uppercase text-brand">{p.name}</h3>
                    <p className="text-xs font-semibold text-neutral-600">{p.days}</p>
                  </div>
                </header>
                <div className="flex flex-1 flex-col p-4">
                  <p className="border-b border-neutral-300 pb-3 text-[11px] leading-relaxed text-neutral-500">{p.desc}</p>
                  <div className="mt-3 flex-1 space-y-2 text-[11px]">
                    {p.groups.map((g) => (
                      <div key={g.title}>
                        <p className="font-bold">{g.title}</p>
                        <ul className="mt-1 space-y-0.5 text-neutral-600">
                          {g.items.map((it) => (
                            <li key={it}>
                              <span className="mr-1 text-brand">✓</span>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-neutral-300 pt-3 text-center text-xs">
                    <p className="font-semibold">Список работ ↓</p>
                    <p className="mt-1">
                      <span className="text-neutral-400 line-through">{p.old}</span>{' '}
                      <span className="font-bold text-brand">{p.price}</span>
                    </p>
                    <Button size="sm" className="mt-3 w-full" onClick={() => open(`Смета: ${p.name} ремонт`)}>
                      Получить смету
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </Slider>
      </Container>
    </section>
  )
}