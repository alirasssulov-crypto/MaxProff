import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal } from '../../shared/ui/Modal'
import { Button } from '../../shared/ui/Button'
import { delay, phoneRegex } from '../../shared/lib/validation'

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Введите имя (минимум 2 буквы)'),
  phone: z.string().trim().regex(phoneRegex, 'Введите корректный номер телефона'),
  agree: z.boolean().refine((v) => v, { message: 'Нужно согласие на обработку данных' }),
})
type LeadValues = z.infer<typeof leadSchema>

type Ctx = { open: (topic?: string) => void }
const LeadModalContext = createContext<Ctx | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useLeadModal() {
  const ctx = useContext(LeadModalContext)
  if (!ctx) throw new Error('useLeadModal must be used inside <LeadModalProvider>')
  return ctx
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [topic, setTopic] = useState('Оставить заявку')
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', phone: '', agree: true },
  })

  const open = useCallback((t?: string) => {
    setTopic(t ?? 'Оставить заявку')
    setDone(false)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    reset()
  }, [reset])

  const onSubmit = async (values: LeadValues) => {
    await delay(800) // ← тут будет реальный запрос на бэкенд
    console.log('LEAD', { ...values, topic })
    setDone(true)
    reset()
  }

  const value = useMemo(() => ({ open }), [open])
  const field =
    'w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30'

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <Modal open={isOpen} onClose={close}>
        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid size-16 animate-ring place-items-center rounded-full bg-brand text-3xl text-white">
              ✓
            </div>
            <h3 className="text-xl font-bold">Заявка отправлена</h3>
            <p className="mt-2 text-sm text-neutral-500">Перезвоним в течение 15 минут</p>
            <Button className="mt-6" onClick={close}>
              Закрыть
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <h3 className="pr-8 text-xl font-bold">{topic}</h3>
            <p className="text-sm text-neutral-500">Оставьте контакты — мы свяжемся и рассчитаем смету</p>

            <div>
              <input {...register('name')} placeholder="Ваше имя" autoComplete="name" className={field} />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register('phone')}
                type="tel"
                inputMode="tel"
                placeholder="+7 (___) ___-__-__"
                autoComplete="tel"
                className={field}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
            </div>
            <label className="flex cursor-pointer items-start gap-2 text-xs text-neutral-500">
              <input type="checkbox" {...register('agree')} className="mt-0.5 size-4 accent-brand" />
              Согласен на обработку персональных данных
            </label>
            {errors.agree && <p className="text-xs text-red-600">{errors.agree.message}</p>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
            </Button>
          </form>
        )}
      </Modal>
    </LeadModalContext.Provider>
  )
}
            