import React from 'react'
import { formatDropDate } from '../../utils/drops'
import { getWhatsAppUrl } from '../../utils/whatsapp'
import Button from '../common/Button'

export const DropCard = ({ drop }) => {
  const message = [
    'Hello LEOVERSE,',
    '',
    `I saw "${drop.title}" on the daily edit and would like to know more.`,
    drop.category ? `Category: ${drop.category}` : '',
    drop.caption ? drop.caption : '',
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <article className="bg-[#FAF9F6] border border-[#D8D2C8]">
      {drop.video ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={drop.photos?.[0] || undefined}
          className="w-full aspect-[4/5] object-cover bg-[#242321]"
        >
          <source src={drop.video} />
        </video>
      ) : null}

      {drop.photos?.length > 0 && (
        <div className={`grid ${drop.photos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {drop.photos.map((photo) => (
            <img
              key={photo}
              src={photo}
              alt={drop.title}
              className="w-full aspect-[4/5] object-cover"
            />
          ))}
        </div>
      )}

      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#77746E]">
          <span>{formatDropDate(drop.createdAt)}</span>
          {drop.category ? <span>{drop.category}</span> : null}
        </div>
        <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#242321]">{drop.title}</h2>
        {drop.caption ? (
          <p className="text-sm leading-relaxed text-[#77746E]">{drop.caption}</p>
        ) : null}
        <Button href={getWhatsAppUrl({ message })} variant="primary" size="sm">
          Ask on WhatsApp
        </Button>
      </div>
    </article>
  )
}

export default DropCard
