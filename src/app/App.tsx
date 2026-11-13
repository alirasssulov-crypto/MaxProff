import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import { LeadModalProvider } from '../features/lead-modal/LeadModalProvider'
import { HomePage } from '../pages/home/HomePage'
// ⚠️ Поправь пути/названия экспортов под свои widgets
import { Header } from '../widgets/header'
import { Footer } from '../widgets/footer'

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function Stub({ title }: { title: string }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-neutral-500">Страница в разработке</p>
      <Link to="/" className="rounded-md bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark">
        На главную
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LeadModalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="promotions" element={<Stub title="Все акции" />} />
            <Route path="*" element={<Stub title="Страница не найдена" />} />
          </Route>
        </Routes>
      </LeadModalProvider>
    </BrowserRouter>
  )
}