import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { fetchDrops } from '../../utils/drops'
import DropCard from '../daily/DropCard'

export const DailyDrops = () => {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    let active = true
    fetchDrops()
      .then((items) => {
        if (active) setDrops(items.slice(0, 3))
      })
      .catch(() => {
        if (active) setDrops([])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="bg-[#F7F5F0] border-b border-[#D8D2C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#77746E]">
              Added by the studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
              New cloth, photographed today.
            </h2>
            <p className="text-sm text-[#77746E] leading-relaxed">
              Fresh photographs and short films of the clothes. Everyone visiting the site sees the same edit.
            </p>
          </div>
          <Link
            to="/daily"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#242321] hover:text-[#77746E]"
          >
            View the daily edit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {drops.length === 0 ? (
          <div className="border border-dashed border-[#D8D2C8] bg-[#FAF9F6] px-6 py-12 text-center">
            <p className="text-sm text-[#77746E]">
              The first daily piece will appear here as soon as the studio publishes a photo or video.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drops.map((drop) => (
              <DropCard key={drop.id} drop={drop} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default DailyDrops
