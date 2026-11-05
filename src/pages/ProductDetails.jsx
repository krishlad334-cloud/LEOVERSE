import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getProducts } from '../services/api';
import { recordProductView } from '../services/productService';
import { trackProductView } from '../utils/analytics';
import ProductGallery from '../components/products/ProductGallery';
import ProductInfo from '../components/products/ProductInfo';
import ProductReviews from '../components/products/ProductReviews';
import RelatedProducts from '../components/products/RelatedProducts';
import RecentlyViewedSection from '../components/home/RecentlyViewedSection';
import Breadcrumb from '../components/common/Breadcrumb';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // Track analytics and record in recently viewed
    trackProductView(id);
    recordProductView(id);

    // Fetch product details
    getProductById(id)
      .then((data) => {
        setProduct(data);
        if (data) {
          recordProductView(data.id);
          getProducts({ department: data.department })
            .then((all) => {
              setRelatedProducts(all.filter((p) => p.id !== data.id).slice(0, 4));
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.error('Failed to load product', err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
        <p className="text-xs text-gray-500 uppercase tracking-widest">Loading garment details & media...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={AlertCircle}
          title="Product not found"
          description="The garment you are looking for may have been archived or moved."
          actionLabel="Return to Shop"
          actionTo="/products"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Shop All', to: '/products' },
    { label: product.department || 'Fashion', to: `/products?department=${encodeURIComponent(product.department || 'Men')}` },
    { label: product.category, to: `/category/${encodeURIComponent(product.categorySlug || 'casual-wear')}` },
    { label: product.name }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Main product display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4 pb-16">
        {/* Left: Gallery with Photos & Runway Videos */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images || []}
            imageMedia={product.imageMedia || []}
            videos={product.videos || []}
            productName={product.name}
            productId={product.id}
          />
        </div>

        {/* Right: Info, Price, Sizes, Stock Alert, Actions */}
        <div className="lg:col-span-5">
          <ProductInfo
            product={product}
            onOpenSizeGuide={() => setSizeGuideOpen(true)}
          />
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews product={product} />

      {/* Related Products Rail */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} title={`You May Also Appreciate in ${product.department || 'Atelier'}`} />
      )}

      {/* Recently Viewed Products */}
      <RecentlyViewedSection />

      {/* Size Guide Modal */}
      <Modal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        title="LEOVERSE Size Guide & Measurements"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6 text-xs text-[#242321] dark:text-[#F3EFE6]">
          <p className="text-[#77746E] dark:text-[#D1C9BE] leading-relaxed">
            All LEOVERSE garments are cut according to international tailored standards with room for natural body movement. Measurements below refer to body dimensions in inches.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#D8D2C8] dark:border-[#27272A]">
              <thead>
                <tr className="bg-[#EAE5DC]/60 dark:bg-[#1C1C22] uppercase tracking-wider text-[11px] font-semibold text-[#242321] dark:text-white">
                  <th className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">Size</th>
                  <th className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">Chest (in)</th>
                  <th className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">Waist (in)</th>
                  <th className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">Shoulder (in)</th>
                  <th className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D2C8] dark:divide-[#27272A]">
                <tr>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A] font-bold">S</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">36 - 38</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">30 - 32</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">17.5</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">33</td>
                </tr>
                <tr>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A] font-bold">M</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">39 - 41</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">32 - 34</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">18.2</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">34</td>
                </tr>
                <tr>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A] font-bold">L</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">42 - 44</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">34 - 36</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">19.0</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">35</td>
                </tr>
                <tr>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A] font-bold">XL</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">45 - 47</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">37 - 39</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">19.8</td>
                  <td className="p-3 border border-[#D8D2C8] dark:border-[#27272A]">36</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
