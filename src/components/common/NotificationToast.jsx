import React from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CheckCircle2, Heart } from 'lucide-react';

export const NotificationToast = () => {
  const { notification: cartNotification } = useCart();
  const { notification: wishlistNotification } = useWishlist();

  if (!cartNotification && !wishlistNotification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none animate-fadeIn">
      {cartNotification && (
        <div className="bg-[#252522] text-[#FAF9F6] border border-[#383733] shadow-xl p-4 flex items-center gap-3 pointer-events-auto">
          <CheckCircle2 className="w-5 h-5 text-[#EAE5DC] shrink-0" />
          <p className="text-xs uppercase tracking-wider font-medium">
            {typeof cartNotification === 'object' ? cartNotification.message : cartNotification}
          </p>
        </div>
      )}
      {wishlistNotification && (
        <div className="bg-[#FAF9F6] text-[#242321] border border-[#D8D2C8] shadow-xl p-4 flex items-center gap-3 pointer-events-auto">
          <Heart className="w-5 h-5 text-[#9B7D72] fill-[#9B7D72] shrink-0" />
          <p className="text-xs uppercase tracking-wider font-medium">
            {typeof wishlistNotification === 'object' ? wishlistNotification.message : wishlistNotification}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationToast;
