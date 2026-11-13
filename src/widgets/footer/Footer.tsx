import { Link } from 'react-router-dom'
import { Button } from '../../shared/ui/Button'
import { useLeadModal } from '../../features/lead-modal/LeadModalProvider'

const services = ['Квартиры', 'Комнаты', 'Дизайн интерьера', 'Дома и коттеджи', 'Офисы', 'Инженерные системы', 'Потолки и полы']

const links = [
  { label: 'Портфолио', to: '/#portfolio' },
  { label: 'Стоимость', to: '/#prices' },
  { label: 'Акции', to: '/#promos' },
  { label: 'О компании', to: '/#advantages' },
  { label: 'Отзывы', to: '/#reviews' },
  { label: 'Статьи', to: '/blog' },
  { label: 'Контакты', to: '/#contacts' },
]

const socials = [
  { label: 'VK', href: 'https://vk.com' },
  { label: 'TG', href: 'https://t.me' },
  { label: 'WA', href: 'https://wa.me/72332222222' },
  { label: 'YT', href: 'https://youtube.com' },
]

export function Footer() {
  const { open } = useLeadModal()

  return (
    <footer id="contacts" className="scroll-mt-24">
      {/* зелёная полоса */}
      <div className="bg-brand">
        <div className="mx-auto flex w-full max-w-310 flex-col items-start gap-4 px-4 py-5 text-white sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold">Нужна консультация?</p>
            <p className="mt-1 max-w-xl text-xs text-white/90">
              Подробно расскажем о наших услугах, видах работ и готовых проектах, рассчитаем стоимость и подготовим индивидуальное предложение!
            </p>
          </div>
          <button
            type="button"
            onClick={() => open('Нужна консультация?')}
            className="shrink-0 cursor-pointer rounded-md border border-white px-6 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-brand active:scale-[0.97]"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* тёмная часть */}
      <div className="bg-[#1b2038] text-white">
        <div className="mx-auto grid w-full max-w-310 gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div>
            <Link to="/" className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Max</span>
              <span className="text-brand">Proff</span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/60">
              Ремонт квартир, домов и офисов в Москве и МО. Фиксированная смета, договор и гарантия 3 года.
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-white/30 text-[11px] font-bold transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-brand">Наши услуги</h3>
            <ul className="space-y-2 text-xs text-white/80">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/#prices" className="transition hover:text-brand">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-brand">Навигация</h3>
            <ul className="space-y-2 text-xs text-white/80">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-xs text-white/80">
            <h3 className="mb-3 text-sm font-bold text-brand">Контакты</h3>
            <a href="tel:+72332222222" className="block text-base font-bold text-white transition hover:text-brand">
              +7 (233) 222-22-22
            </a>
            <p>08:00 - 22:00, без выходных</p>
            <a href="mailto:info@maxproff.ru" className="block transition hover:text-brand">
              info@maxproff.ru
            </a>
            <p>Москва, ул. Купина, 18</p>
            <Button size="sm" onClick={() => open('Заказать звонок')}>
              Заказать звонок
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-310 flex-col gap-2 px-4 py-4 text-[11px] text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between">
            <p>© 2026 MaxProff. Все права защищены</p>
            <Link to="/privacy" className="transition hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link to="/sitemap" className="transition hover:text-white">
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}