import { Container, Reveal, SectionTitle } from '../../../shared/ui/primitives'
import { Slider } from '../../../shared/ui/Slider'
import { VideoCard } from '../../../shared/ui/VideoCard'

// ⚠️ Замени ID на свои ролики с YouTube
const VIDEO_ID = 'M7lc1UVf-VE'

export function Reviews() {
  const reviews = [1, 2, 3, 4]
  return (
    <section id="reviews" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle title="Отзывы" />
        <Slider
          className="lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible"
          itemClassName="w-[90%] sm:w-[60%]"
          dotsClassName="lg:hidden"
        >
          {reviews.map((r) => (
            <Reveal key={r} delay={r * 60}>
              <VideoCard
                youtubeId={VIDEO_ID}
                title="2х комнатная квартира"
                address="Москва, р-н Фили-Давыдково, Малая Филёвская улица, 68"
              />
            </Reveal>
          ))}
        </Slider>
      </Container>
    </section>
  )
}

export function Youtube() {
  return (
    <section id="youtube" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionTitle title="Наш you-tube канал" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <VideoCard youtubeId={VIDEO_ID} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}