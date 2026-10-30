import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products';
import ProductGallery from '../components/products/ProductGallery';
import ProductInfo from '../components/products/ProductInfo';
import ProductReviews from '../components/products/ProductReviews';
import RelatedProducts from '../components/products/RelatedProducts';
import Breadcrumb from '../components/common/Breadcrumb';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { AlertCircle } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Find matching product
  const product = useMemo(() => {
    return productsData.find((p) => p.id === id);
  }, [id]);

  // Related products from same category or fallback
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.isBestSeller))
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={AlertCircle}
          title="Product not found"
          description="The garment you are looking for may have been archived or moved."
          actionLabel="Return to Shop"
          actionTo="/shop"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Shop', to: '/shop' },
    { label: product.category, to: `/shop?category=${product.categorySlug}` },
    { label: product.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Main product display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4 pb-16">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-5">
          <ProductInfo
            product={product}
            onOpenSizeGuide={() => setSizeGuideOpen(true)}
          />
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews product={product} />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} title="You May Also Appreciate" />

      {/* Size Guide Modal */}
      <Modal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        title="LEOVERSE Size Guide & Measurements"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6 text-xs text-[#242321]">
          <p className="text-[#77746E] leading-relaxed">
            All LEOVERSE garments are cut according to international tailored standards with room for natural body movement. Measurements below refer to body dimensions in inches.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#D8D2C8]">
              <thead>
                <tr className="bg-[#EAE5DC]/60 uppercase tracking-wider text-[11px] font-semibold text-[#242321]">
                  <th className="p-3 border border-[#D8D2C8]">Size</th>
                  <th className="p-3 border border-[#D8D2C8]">Chest (in)</th>
                  <th className="p-3 border border-[#D8D2C8]">Waist (in)</th>
                  <th className="p-3 border border-[#D8D2C8]">Shoulder (in)</th>
                  <th className="p-3 border border-[#D8D2C8]">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D2C8]">
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">XS (36)</td>
                  <td className="p-3 border border-[#D8D2C8]">34 - 36</td>
                  <td className="p-3 border border-[#D8D2C8]">28 - 30</td>
                  <td className="p-3 border border-[#D8D2C8]">17.0</td>
                  <td className="p-3 border border-[#D8D2C8]">32.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">S (38)</td>
                  <td className="p-3 border border-[#D8D2C8]">37 - 39</td>
                  <td className="p-3 border border-[#D8D2C8]">30 - 32</td>
                  <td className="p-3 border border-[#D8D2C8]">17.5</td>
                  <td className="p-3 border border-[#D8D2C8]">33.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">M (40)</td>
                  <td className="p-3 border border-[#D8D2C8]">40 - 42</td>
                  <td className="p-3 border border-[#D8D2C8]">32 - 34</td>
                  <td className="p-3 border border-[#D8D2C8]">18.2</td>
                  <td className="p-3 border border-[#D8D2C8]">34.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">L (42)</td>
                  <td className="p-3 border border-[#D8D2C8]">43 - 45</td>
                  <td className="p-3 border border-[#D8D2C8]">34 - 36</td>
                  <td className="p-3 border border-[#D8D2C8]">19.0</td>
                  <td className="p-3 border border-[#D8D2C8]">35.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">XL (44)</td>
                  <td className="p-3 border border-[#D8D2C8]">46 - 48</td>
                  <td className="p-3 border border-[#D8D2C8]">38 - 40</td>
                  <td className="p-3 border border-[#D8D2C8]">19.8</td>
                  <td className="p-3 border border-[#D8D2C8]">36.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#EAE5DC]/40 p-4 border border-[#D8D2C8] space-y-1">
            <span className="font-semibold uppercase tracking-wider block">Fit Advice:</span>
            <p className="text-[#77746E]">
              If you fall between sizes or prefer an unhurried, relaxed drape, we recommend choosing one size up.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
