import React, { useState } from 'react';

export const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-[#EAE5DC] flex items-center justify-center text-[#77746E]">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20 pb-2 md:pb-0">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`aspect-[4/5] w-16 md:w-20 bg-[#EAE5DC]/60 overflow-hidden border transition-all cursor-pointer ${
                selectedImage === index
                  ? 'border-[#242321] opacity-100 ring-1 ring-[#242321]'
                  : 'border-transparent opacity-65 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 aspect-[4/5] bg-[#EAE5DC]/50 overflow-hidden relative group">
        <img
          src={images[selectedImage] || images[0]}
          alt={productName}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
