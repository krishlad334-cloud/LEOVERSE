import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BrandTicker from '../components/home/BrandTicker';
import CategorySection from '../components/home/CategorySection';
import NewArrivals from '../components/home/NewArrivals';
import BestsellersSection from '../components/home/BestsellersSection';
import SeasonalCollections from '../components/home/SeasonalCollections';
import OccasionCollections from '../components/home/OccasionCollections';
import TrendingStyles from '../components/home/TrendingStyles';
import SpecialOffers from '../components/home/SpecialOffers';
import BrandStory from '../components/home/BrandStory';
import NewsletterSection from '../components/home/NewsletterSection';
import BrandBenefits from '../components/home/BrandBenefits';

export const Home = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section: Premium men's fashion banner with stylish male model, strong headline & Shop Now */}
      <HeroSection />

      {/* 2. Announcement Ticker / Value Bar */}
      <BrandTicker />

      {/* 3. Shop by Category: Display the 11 main men's clothing categories */}
      <CategorySection />

      {/* 4. New Arrivals: Showcase the latest men's clothing products */}
      <NewArrivals />

      {/* 5. Bestsellers: Highlight popular men's products */}
      <BestsellersSection />

      {/* 6. Seasonal Collections: Feature summer, winter, beach, and travel clothing */}
      <SeasonalCollections />

      {/* 7. Occasion-Based Collections: Showcase formal, wedding, party, sports, and casual clothing */}
      <OccasionCollections />

      {/* 8. Trending Styles: Modern streetwear and popular men's fashion */}
      <TrendingStyles />

      {/* 9. Special Offers: Promote discounts, limited-time offers, and seasonal sales */}
      <SpecialOffers />

      {/* 10. Brand Story: Introduce LEOVERSE and its men's fashion identity */}
      <BrandStory />

      {/* 11. Newsletter Subscription: Allow customers to subscribe for new arrivals and exclusive offers */}
      <NewsletterSection />

      {/* 12. Benefits: Free delivery, 30-day exchanges, small-batch craftsmanship */}
      <BrandBenefits />
    </div>
  );
};

export default Home;
