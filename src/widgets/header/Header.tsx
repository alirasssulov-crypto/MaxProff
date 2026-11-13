import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../shared/ui/Button'
import { useLeadModal } from '../../features/lead-modal/LeadModalProvider'

const nav = [
  { label: 'Цены', to: '/#prices' },
  { label: 'Услуги', to: '/#how' },
  { label: 'Портфолио', to: '/#portfolio' },
  { label: 'Акции', to: '/#promos' },
  { label: 'Преимущества', to: '/#advantages' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакты', to: '/#contacts' },
]

const menus = [
  { title: 'Ремонт квартир', items: ['Черновой', 'Косметический', 'Капитальный', 'Элитный', 'В новостройках', 'Студия', 'Вторичное жильё'] },
  { title: 'Дизайн интерьера', items: ['Дизайн кухни', 'Дизайн спальни', 'Дизайн гостиной', 'Дизайн детской', 'Дизайн санузла', 'Дизайн коридора', 'Дизайн балкона'] },
  { title: 'Ремонт комнат', items: ['Кухни', 'Спальни', 'Гостиная', 'Детские', 'Санузлы', 'Коридоры', 'Балконы'] },
  { title: 'Дома и коттеджи', items: ['Ремонт дома', 'Ремонт коттеджа', 'Отделка под ключ'] },
  { title: 'Прочие услуги', items: ['Электрика', 'Сантехника', 'Натяжные потолки', 'Клининг после ремонта'] },
]

function Logo() {
  return (
    <Link to="/" className="text-2xl font-extrabold tracking-tight" aria-label="MaxProff — на главную">
      <span className="text-navy">Max</span>
      <span className="text-brand">Proff</span>
    </Link>
  )
}

export function Header() {
  const { open } = useLeadModal()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-neutral-200'
      }`}
    >
      <div className="mx-auto w-full max-w-310 px-4 sm:px-6">
        {/* верхняя строка */}
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Основная навигация">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="relative text-sm font-medium text-ink transition hover:text-brand after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right leading-tight">
              <a href="tel:+72332222222" className="text-sm font-bold transition hover:text-brand">
                +7 (233) 222-22-22
              </a>
              <p className="text-[11px] text-neutral-500">08:00 - 22:00, без выходных</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => open('Заказать звонок')}>
              Заказать звонок
            </Button>
          </div>

          {/* мобильная кнопка */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button size="sm" onClick={() => open('Заказать звонок')} aria-label="Заказать звонок">
              ✆
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              className="grid size-10 cursor-pointer place-items-center rounded-md hover:bg-soft"
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-ink transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* вторая строка с выпадающими меню (десктоп) */}
        <div className="hidden border-t border-neutral-200 lg:block">
          <ul className="flex items-center justify-between">
            {menus.map((m) => (
              <li key={m.title} className="group relative">
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 py-3 text-xs font-bold transition group-hover:text-brand group-focus-within:text-brand"
                >
                  {m.title}
                  <span className="text-[9px] transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">▾</span>
                </button>
                <ul className="invisible absolute left-0 top-full z-10 w-56 translate-y-2 rounded-b-md border border-neutral-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {m.items.map((it) => (
                    <li key={it}>
                      <Link to="/#prices" className="block px-4 py-2 text-xs transition hover:bg-soft hover:text-brand">
                        {it}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* мобильное меню */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-xl space-y-6 px-4 py-6">
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} onClick={close} className="rounded-md px-3 py-3 text-base font-semibold transition hover:bg-soft hover:text-brand">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="divide-y divide-neutral-200 rounded-md border border-neutral-200">
            {menus.map((m) => (
              <details key={m.title} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
                  {m.title}
                  <span className="text-xs transition-transform group-open:rotate-180">▾</span>
                </summary>
                <ul className="bg-soft/60 px-4 py-2">
                  {m.items.map((it) => (
                    <li key={it}>
                      <Link to="/#prices" onClick={close} className="block py-2 text-sm text-neutral-600 hover:text-brand">
                        {it}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <div className="space-y-3 text-center">
            <a href="tel:+72332222222" className="block text-lg font-bold">
              +7 (233) 222-22-22
            </a>
            <p className="text-xs text-neutral-500">08:00 - 22:00, без выходных</p>
            <Button
              className="w-full"
              onClick={() => {
                close()
                open('Заказать звонок')
              }}
            >
              Заказать звонок
              </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
              