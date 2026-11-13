export const phoneRegex = /^\+?[\d\s()-]{10,18}$/

export const formatPrice = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('ru-RU') : '0'

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))