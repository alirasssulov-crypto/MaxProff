import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from './ui/Hero'
import { Prices } from './ui/Prices'
import { Portfolio } from './ui/Portfolio'
import { Promos } from './ui/Promos'
import { HowWeWork, Warehouse } from './ui/Process'
import { Quality, Advantages } from './ui/Quality'
import { Reviews, Youtube } from './ui/Media'
import { Team, Masters } from './ui/Team'
import { Suppliers, Faq } from './ui/Suppliers'

export function HomePage() {
  const { hash } = useLocation()

  // якоря из Header: /#prices, /#portfolio, /#promos, /#advantages ...
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <>
      <Hero />
      <Prices />
      <Portfolio />
      <Promos />
      <HowWeWork />
      <Warehouse />
      <Quality />
      <Advantages />
      <Reviews />
      <Team />
      <Masters />
      <Youtube />
      <Suppliers />
      <Faq />
    </>
  )
}