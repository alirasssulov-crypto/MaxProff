import { useNavigate } from 'react-router-dom'
import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { Slider } from '../../../shared/ui/Slider'
import { Button } from '../../../shared/ui/Button'
import { useLeadModal } from '../../../features/lead-modal/LeadModalProvider'
import { img } from '../../../shared/assets'

const promos = [
  { title: 'Новоселам', text: 'Специальная скидка для тех, кто переехал не более года назад', photo: img.familyMoving },
  { title: 'Молодожёнам', text: 'Специальная скидка c момента регистрации прошло не более года', photo: img.groomBlack },
  { title: 'Пенсионерам', text: 'Специальная скидка для наших дорогих', photo: img.mediumShot },
]

export function Promos() {
  const { open } = useLeadModal()
  const navigate = useNavigate()

  return (
    <section id="promos" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle title="Акции" />
        <Slider
          className="lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
          itemClassName="w-[82%] sm:w-[46%]"
          dotsClassName="lg:hidden"
        >
          {promos.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={p.photo}
                  alt={p.title}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 text-center">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="max-w-[240px] text-[11px] leading-snug text-neutral-600">{p.text}</p>
                  <Button size="sm" onClick={() => open(`Скидка: ${p.title}`)}>
                    Получить скидку
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </Slider>
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm" onClick={() => navigate('/promotions')}>
            Все акции
          </Button>
        </div>
      </Container>
    </section>
  )
}