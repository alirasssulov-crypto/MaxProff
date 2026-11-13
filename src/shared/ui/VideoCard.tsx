import { useState } from 'react'

type Props = {
  youtubeId: string
  title?: string
  address?: string
  className?: string
}

export function VideoCard({ youtubeId, title, address, className = '' }: Props) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={className}>
      <div className="relative aspect-video overflow-hidden rounded-md bg-neutral-800">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title ?? 'Видео'}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Смотреть видео"
            className="group absolute inset-0 grid cursor-pointer place-items-center"
          >
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
            />
            <span className="relative grid size-14 place-items-center rounded-full bg-red-600 transition group-hover:scale-110 sm:size-16">
              <span className="ml-1 border-y-8 border-l-14 border-y-transparent border-l-white" />
            </span>
          </button>
        )}
      </div>
      {title && (
        <div className="mt-2 text-xs">
          <p className="font-bold">
            <span className="text-brand">КАПИТАЛЬНЫЙ РЕМОНТ</span> <span className="text-ink">{title}</span>
          </p>
          {address && <p className="mt-1 text-neutral-500">📍 {address}</p>}
        </div>
      )}
    </div>
  )
}