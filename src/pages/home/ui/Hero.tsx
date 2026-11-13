import { Container, Reveal } from '../../../shared/ui/primitives'
import { Calculator } from '../../../features/calculator/Calculator'
import { img } from '../../../shared/assets'

const benefits = [
  { icon: img.cooperation, text: 'Оплата по факту приемки работ' },
  { icon: img.consent, text: 'Замер и составление сметы БЕСПЛАТНО' },
  { icon: img.builder, text: 'Выезд сметчика' },
  { icon: img.guarantee, text: 'Гарантия 3 года' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <img
        src={img.sofa}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-30 lg:w-[72%] lg:opacity-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent lg:via-white/60" />

      <Container className="relative grid items-center gap-8 py-8 lg:grid-cols-[1fr_430px] lg:py-14">
        <div>
          <Reveal>
            <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-5xl">
              Ремонт квартир
              <br />в Москве и МО
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 flex flex-wrap items-center gap-2 text-2xl font-bold sm:text-3xl">
              от
              <span className="animate-ring rounded-md bg-brand px-3 py-0.5 text-white">2450</span>
              руб/м2
            </p>
          </Reveal>
          <div className="mt-8 grid max-w-md grid-cols-2 gap-x-4 gap-y-6">
            {benefits.map((b, i) => (
              <Reveal key={b.text} delay={250 + i * 100}>
                <div className="group flex flex-col gap-2">
                  <img
                    src={b.icon}
                    alt=""
                    className="size-12 object-contain transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:size-14"
                  />
                  <p className="text-xs font-bold leading-snug sm:text-sm">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="right" delay={200}>
          <Calculator />
        </Reveal>
      </Container>
    </section>
  )
}