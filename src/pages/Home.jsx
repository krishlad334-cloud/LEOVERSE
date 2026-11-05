import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BrandTicker from '../components/home/BrandTicker';
import CategorySection from '../components/home/CategorySection';
import TrendingStyles from '../components/home/TrendingStyles';
import FeaturedBrands from '../components/home/FeaturedBrands';
import NewArrivals from '../components/home/NewArrivals';
import BestsellersSection from '../components/home/BestsellersSection';
import SeasonalCollections from '../components/home/SeasonalCollections';
import OccasionCollections from '../components/home/OccasionCollections';
import SpecialOffers from '../components/home/SpecialOffers';
import RecentlyViewedSection from '../components/home/RecentlyViewedSection';
import BrandStory from '../components/home/BrandStory';
import NewsletterSection from '../components/home/NewsletterSection';
import BrandBenefits from '../components/home/BrandBenefits';

export const Home = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Carousel: Full-width promotional banners with pause-on-hover */}
      <HeroSection />

      {/* 2. Announcement Ticker / Value Bar */}
      <BrandTicker />

      {/* 3. Shop by Category: Visual category circular cards */}
      <CategorySection />

      {/* 4. Trending Collections */}
      <TrendingStyles />

      {/* 5. Featured Fashion Houses & Brands */}
      <FeaturedBrands />

      {/* 6. New Arrivals: Latest garment drops */}
      <NewArrivals />

      {/* 7. Bestsellers: Customer favorite silhouettes */}
      <BestsellersSection />

      {/* 8. Seasonal Collections: Summer, winter, beach, travel */}
      <SeasonalCollections />

      {/* 9. Occasion-Based Collections: Formal, wedding, party, casual */}
      <OccasionCollections />

      {/* 10. Special Offers: Copyable promotional codes & private sale markdowns */}
      <SpecialOffers />

      {/* 11. Recently Viewed Products (Session / LocalStorage tracking) */}
      <RecentlyViewedSection />

      {/* 12. Brand Story: Atelier philosophy and heritage */}
      <BrandStory />

      {/* 13. Newsletter Subscription */}
      <NewsletterSection />

      {/* 14. Brand Benefits: Free shipping, 30-day returns, concierge guarantee */}
      <BrandBenefits />
    </div>
  );
};

export default Home;
