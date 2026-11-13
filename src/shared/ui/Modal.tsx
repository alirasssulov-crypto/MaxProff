import { useEffect, type ReactNode } from 'react'

type Props = { open: boolean; onClose: () => void; children: ReactNode }

export function Modal({ open, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
      className="fixed inset-0 z-100 flex animate-fade-in items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-md animate-pop rounded-xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 grid size-9 cursor-pointer place-items-center rounded-full text-2xl leading-none text-neutral-400 transition hover:bg-soft hover:text-ink"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}