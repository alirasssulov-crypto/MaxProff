import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'solid', size = 'md', className = '', type = 'button', ...rest }: Props) {
  const base =
    'inline-flex cursor-pointer items-center justify-center rounded-md font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60'
  const sizes = size === 'sm' ? 'px-4 py-2 text-xs sm:text-sm' : 'px-6 py-3 text-sm sm:text-base'
  const variants =
    variant === 'solid'
      ? 'bg-brand text-white hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30'
      : 'border border-brand bg-transparent text-brand hover:bg-brand hover:text-white'
  return <button type={type} className={`${base} ${sizes} ${variants} ${className}`} {...rest} />
}