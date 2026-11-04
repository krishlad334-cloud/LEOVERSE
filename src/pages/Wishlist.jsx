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
    addToCart(product, product.sizes?.[0] || 'Standard', product.colors?.[0]?.name || 'Standard', 1);
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
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-8 border-b border-[#D8D2C8] dark:border-[#27272A]">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321] dark:text-white">
          Saved Pieces
        </h1>
        <p className="text-xs text-[#77746E] dark:text-gray-400 mt-1">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved in your private curation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-[#FAF9F6] dark:bg-[#18181C] border border-[#D8D2C8] dark:border-[#27272A] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] bg-[#EAE5DC] dark:bg-[#202026] overflow-hidden">
              <Link to={`/product/${product.id}`} className="block w-full h-full">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-104"
                />
              </Link>

              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-[#FAF9F6]/90 dark:bg-[#202026]/90 hover:bg-[#FAF9F6] dark:hover:bg-[#2A2A34] text-[#77746E] dark:text-gray-300 hover:text-red-600 rounded-full transition-colors cursor-pointer"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-[#77746E] dark:text-gray-400">
                  {product.category}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="block text-base font-medium text-[#242321] dark:text-white hover:text-[#A68962] dark:hover:text-[#C5A880] transition-colors mt-0.5"
                >
                  {product.name}
                </Link>
                <p className="text-sm font-semibold text-[#242321] dark:text-white mt-1">
                  {formatPrice(product.salePrice ?? product.price)}
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
