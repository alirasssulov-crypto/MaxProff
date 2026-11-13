import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../shared/ui/Button'
import { delay, formatPrice, phoneRegex } from '../../shared/lib/validation'

const RATES = { cosmetic: 2450, capital: 4950, turnkey: 5450, design: 7500 } as const
const BASE_DAYS = { cosmetic: 10, capital: 24, turnkey: 20, design: 30 } as const

const schema = z.object({
  type: z.enum(['cosmetic', 'capital', 'turnkey', 'design']),
  realty: z.enum(['new', 'secondary']),
  rooms: z.enum(['1', '2', '3', '4']),
  area: z.number().min(20).max(150),
  phone: z.string().trim().regex(phoneRegex, 'Введите корректный номер телефона'),
})
type Values = z.infer<typeof schema>

const TYPES: { v: Values['type']; label: string }[] = [
  { v: 'cosmetic', label: 'Косметический' },
  { v: 'capital', label: 'Капитальный' },
  { v: 'turnkey', label: 'Под ключ' },
  { v: 'design', label: 'Дизайнерский' },
]

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold text-ink sm:text-sm">{title}</legend>
      <div className="flex flex-wrap gap-x-5 gap-y-2">{children}</div>
    </fieldset>
  )
}

function Option({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600 transition hover:text-ink sm:text-sm">
      <input type="radio" className="size-4 accent-navy" {...props} />
      {label}
    </label>
  )
}

export function Calculator() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'cosmetic', realty: 'new', rooms: '1', area: 55, phone: '' },
  })

  const [type, realty, rooms, area] = watch(['type', 'realty', 'rooms', 'area'])

  const calc = useMemo(() => {
    const a = Number.isFinite(area) ? area : 0
    const total = Math.round(
      a * RATES[type] * (realty === 'secondary' ? 1.12 : 1) * (1 + (Number(rooms) - 1) * 0.03),
    )
    return {
      total,
      discount: Math.round(total * 0.1),
      days: BASE_DAYS[type] + Math.round(a / 5),
    }
  }, [type, realty, rooms, area])

  const onSubmit = async (values: Values) => {
    await delay(800) // ← запрос на бэкенд
    console.log('CALC LEAD', { ...values, ...calc })
    setSent(true)
    reset({ ...values, phone: '' })
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-xl bg-white/95 p-5 shadow-xl backdrop-blur sm:p-6"
    >
      <h2 className="text-sm font-bold uppercase text-ink sm:text-base">Рассчитайте стоимость ремонта</h2>

      <Group title="Вид ремонта:">
        {TYPES.map((t) => (
          <Option key={t.v} value={t.v} label={t.label} {...register('type')} />
        ))}
      </Group>

      <Group title="Тип вашей недвижимости:">
        <Option value="new" label="Новостройка" {...register('realty')} />
        <Option value="secondary" label="Вторичное жилье" {...register('realty')} />
      </Group>

      <Group title="Количество комнат:">
        {(['1', '2', '3', '4'] as const).map((r) => (
          <Option key={r} value={r} label={r} {...register('rooms')} />
        ))}
      </Group>

      <div>
        <div className="flex items-center justify-between text-xs font-semibold sm:text-sm">
          <span>Площадь, м2:</span>
          <span className="rounded bg-navy px-2 py-0.5 text-white tabular-nums">{area || 0}</span>
        </div>
        <input
          type="range"
          min={20}
          max={150}
          step={1}
          {...register('area', { valueAsNumber: true })}
          className="mt-2 w-full cursor-pointer accent-navy"
        />
        <div className="flex justify-between text-[10px] text-neutral-400">
          <span>20</span>
          <span>150</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-md bg-soft p-3 text-xs">
        <div>
          <p className="text-neutral-500">Срок ремонта:</p>
          <p className="mt-0.5 text-sm font-bold">до {calc.days} дней</p>
        </div>
        <div>
          <p className="text-neutral-500">Скидка составляет:</p>
          <p key={calc.discount} className="mt-0.5 animate-swap text-sm font-bold text-brand">
            {formatPrice(calc.discount)} руб
          </p>
        </div>
        <div className="col-span-2 border-t border-neutral-300 pt-2">
          <span className="text-neutral-500">Ориентировочная стоимость: </span>
          <span key={calc.total} className="inline-block animate-swap text-base font-bold">
            {formatPrice(calc.total)} руб
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="calc-phone" className="text-xs font-semibold sm:text-sm">
          Введите номер телефона
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="calc-phone"
            type="tel"
            inputMode="tel"
            placeholder="+7"
            {...register('phone')}
            className="min-w-0 flex-1 rounded-md border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
          <Button type="submit" disabled={isSubmitting} className="px-5 sm:px-8">
            {isSubmitting ? '…' : 'Заказать'}
          </Button>
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        {sent && (
          <p className="mt-2 animate-swap rounded bg-brand/10 px-3 py-2 text-xs font-medium text-brand-dark">
            ✓ Заявка принята, мы скоро перезвоним
          </p>
        )}
      </div>
    </form>
  )
}