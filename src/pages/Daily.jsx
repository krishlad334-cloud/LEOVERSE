import React, { useEffect, useState } from 'react'
import { fetchDrops } from '../utils/drops'
import DropCard from '../components/daily/DropCard'
import Breadcrumb from '../components/common/Breadcrumb'

export const Daily = () => {
  const [drops, setDrops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchDrops()
      .then((items) => {
        if (active) setDrops(items)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      <Breadcrumb items={[{ label: 'Daily Edit' }]} />
      <div className="max-w-2xl mb-10 space-y-3">
        <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#77746E]">
          LEOVERSE Daily
        </span>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#242321]">
          Photographs and films of the clothes.
        </h1>
        <p className="text-sm sm:text-base text-[#77746E] leading-relaxed">
          New pieces are published from the studio and shown here for every visitor. There is no payment on this website. Ask about a piece on WhatsApp.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#77746E]">Loading the latest edit…</p>
      ) : drops.length === 0 ? (
        <div className="border border-[#D8D2C8] bg-[#FAF9F6] px-6 py-16 text-center">
          <p className="text-sm text-[#77746E]">Nothing has been published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {drops.map((drop) => (
            <DropCard key={drop.id} drop={drop} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Daily
