import React from 'react'
import { Link } from 'react-router-dom'

// Default to a coffee image to better match promotions (fallback)
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=60&auto=format&fit=crop'

export default function PromoBanner({ id, title, subtitle, price, image }) {
  return (
    <Link to={`/promo/${id}`} className="block">
      <div className="rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transform hover:-translate-y-1 transition-all">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/3 h-36 md:h-auto bg-slate-100 flex items-center justify-center overflow-hidden">
            <img src={image || DEFAULT_IMAGE} alt={title} className="w-full h-full object-cover" />
          </div>

          <div className="p-4 md:flex-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{title}</div>
                {subtitle && <div className="text-xs opacity-90 mt-1">{subtitle}</div>}
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Promo</div>
                <div className="text-xl font-bold">Rp {price.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
