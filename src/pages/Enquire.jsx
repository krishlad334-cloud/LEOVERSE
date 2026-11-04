import React from 'react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { useCart } from '../context/CartContext'
import Button from '../components/common/Button'
import Breadcrumb from '../components/common/Breadcrumb'

export const Enquire = () => {
  const { cartItems } = useCart()
  const lines = cartItems.map(
    (item) => `• ${item.name} — ${item.selectedColor} / ${item.selectedSize} × ${item.quantity}`
  )
  const message = [
    'Hello LEOVERSE,',
    '',
    'I would like to ask about these pieces. I understand payment is not taken on the website.',
    '',
    ...(lines.length ? lines : ['I am browsing the daily edit and the collection.']),
  ].join('\n')

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-20">
      <Breadcrumb items={[{ label: 'Enquire' }]} />
      <h1 className="text-3xl font-medium tracking-tight text-[#242321]">
        Ask the studio on WhatsApp.
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#77746E]">
        LEOVERSE does not take card, UPI, or cash payments on this website. Share the pieces you like and the studio will reply with size, cloth, and availability.
      </p>
      <div className="mt-8 space-y-3">
        <Button href={getWhatsAppUrl({ message })} variant="primary" fullWidth>
          Continue on WhatsApp
        </Button>
        <Link
          to="/daily"
          className="block text-center text-xs uppercase tracking-[0.14em] text-[#77746E] hover:text-[#242321]"
        >
          Back to the daily edit
        </Link>
      </div>
    </div>
  )
}

export default Enquire
