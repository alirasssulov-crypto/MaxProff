import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { img } from '../../../shared/assets'

const steps = [
  { icon: img.builder, text: 'Бесплатный выезд замерщика' },
  { icon: img.consent, text: 'Смета в день обращения' },
  { icon: img.contract, text: 'Договор' },
  { icon: img.officialDocuments, text: 'Накладные на материалы' },
  { icon: img.cctv, text: 'Контроль: фотоотчёт или видеонаблюдение' },
  { icon: img.certificate, text: 'Акт выполненных работ' },
  { icon: img.cooperation, text: 'Акт приёмки работ по договору' },
  { icon: img.guarantee, text: 'Гарантия на выполненные работы' },
]

export function HowWeWork() {
  return (
    <section id="how" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle
          title="Как мы работаем"
          subtitle="Вам понятен каждый этап: фиксированные сроки и цены, предоставляем все документы: накладные, гарантии, акты. Вы будете уверены в результате."
        />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
          {steps.map((s, i) => (
            <Reveal key={s.text} delay={i * 70}>
              <li className="group flex flex-col items-center gap-3 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-soft transition duration-300 group-hover:bg-brand/15">
                  <img src={s.icon} alt="" className="size-12 object-contain transition duration-300 group-hover:scale-110" />
                </span>
                <span className="text-[11px] font-semibold leading-snug">{s.text}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

const warehouse = [
  { icon: img.officialDocuments2, text: 'Прямой договор с поставщиками' },
  { icon: img.delivery, text: 'Доставка и подъём в квартиру' },
  { icon: img.brick, text: '300 тонн черновых и чистовых материалов' },
  { icon: img.carpet, text: '250 видов обоев, 25 видов ламината, 50 видов плитки и плинтуса' },
  { icon: img.brochure, text: 'Выезд специалиста с каталогом материалов' },
]

export function Warehouse() {
  return (
    <section id="warehouse" className="bg-soft/60 py-12 lg:py-16">
      <Container>
        <SectionTitle title="Свой склад и шоурум материалов наших партнеров в Москве" />
        <Reveal>
          <ul className="grid grid-cols-2 gap-4 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-3 lg:grid-cols-5">
            {warehouse.map((w) => (
              <li key={w.text} className="flex items-center gap-3 text-xs font-medium">
                <img src={w.icon} alt="" className="size-9 shrink-0 object-contain" />
                {w.text}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[img.multiColor, img.pileTextiles].map((src, i) => (
            <Reveal key={src} delay={i * 150} direction={i ? 'right' : 'left'}>
              <div className="group overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt="Материалы"
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}