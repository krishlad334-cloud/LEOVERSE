import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

export const Wishlist = () => {
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const breadcrumbs = [{ label: 'Wishlist' }];

  const handleMoveToCart = (product) => {
    const size = product.sizes?.[0] || 'Standard';
    const color = typeof product.colors?.[0] === 'object' ? product.colors[0]?.name : (product.colors?.[0] || 'Standard');
    addToCart(product, size, color, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumb items={breadcrumbs} />
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save the garments you appreciate for later by clicking the heart icon on any product card."
          actionLabel="Discover Essentials"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8] dark:border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68962]">
            Private Curation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242321] dark:text-white mt-1">
            Saved Pieces ({wishlistProducts.length})
          </h1>
        </div>

        <Link
          to="/products"
          className="text-xs font-bold uppercase tracking-wider text-[#A68962] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Continue Discovering</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-[#FAF9F6] dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] bg-[#EAE5DC] dark:bg-[#202026] overflow-hidden">
              <Link to={`/product/${product.id}`} className="block w-full h-full">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-[#202026]/90 hover:bg-white dark:hover:bg-[#2A2A34] text-gray-500 hover:text-red-600 rounded-full transition-colors cursor-pointer shadow-sm"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#A68962] dark:text-[#C5A880]">
                  {product.brand || product.category}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="block text-base font-semibold text-[#242321] dark:text-white hover:text-[#A68962] dark:hover:text-[#C5A880] transition-colors mt-0.5 line-clamp-1"
                >
                  {product.name}
                </Link>
                <p className="text-sm font-bold text-[#242321] dark:text-white mt-1">
                  {formatPrice(product.sellingPrice ?? product.salePrice ?? product.price)}
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2 border-t border-[#D8D2C8] dark:border-[#27272A]">
                <Button
                  onClick={() => handleMoveToCart(product)}
                  variant="primary"
                  size="sm"
                  fullWidth
                  icon={ShoppingBag}
                  iconPosition="left"
                >
                  Move to Bag
                </Button>
                <Button
                  to={`/product/${product.id}`}
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
