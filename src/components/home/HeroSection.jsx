import React, { useRef, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce silent continuous autoplay across all browsers
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback - resume on first user interaction if browser restricted
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', handleInteraction);
          window.removeEventListener('touchstart', handleInteraction);
        };
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
      });
    }

    // Keep video continuously playing when visitor switches back to the tab
    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#242321] text-[#FAF9F6] overflow-hidden min-h-[85vh] sm:min-h-[90vh] lg:min-h-[95vh] flex items-center select-none border-b border-[#D8D2C8]/30">
      {/* Background Animated Cinematic Men's Fashion Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#242321]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          poster="/images/banners/hero-casual.jpg"
          className="w-full h-full object-cover object-center contrast-[1.04] brightness-[0.88] saturate-[0.92] transition-opacity duration-700"
        >
          <source src="/videos/hero-fashion-male.webm" type="video/webm" />
          <source src="/videos/hero-fashion-male.mp4" type="video/mp4" />
          {/* Static fallback poster image */}
          <img
            src="/images/banners/hero-casual.jpg"
            alt="LEOVERSE Men's Fashion Campaign Fallback"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Theme-Matched Luxury Overlays in LEOVERSE Signature Charcoal #242321 */}
        {/* 1. Overall warm tint blend harmonizing the video with brand tones */}
        <div className="absolute inset-0 bg-[#242321]/55" />
        {/* 2. Vertical gradient integrating navbar above and ticker below */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#242321] via-[#242321]/40 to-[#242321]/60" />
        {/* 3. Horizontal gradient ensuring high-contrast readability for editorial text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#242321]/90 via-[#242321]/50 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 w-full">
        <div className="max-w-2xl text-[#FAF9F6] space-y-5 sm:space-y-6">
          {/* Campaign Category Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF9F6]/10 backdrop-blur-md border border-[#D8D2C8]/30 text-[#EAE5DC] text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#DCD5CA]" />
            <span>SS26 Men's Collection • Atelier Edition</span>
          </div>

          {/* LEOVERSE Brand Name & Main Campaign Headline */}
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#DCD5CA] block">
              LEOVERSE ATELIER
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-[0.03em] uppercase leading-[0.94] drop-shadow-lg text-[#FAF9F6]">
              STEP INTO <br />
              THE LEOVERSE.
            </h1>
          </div>

          {/* Short Tagline */}
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#EAE5DC] font-normal drop-shadow-md">
            Everyday Essentials. Elevated.
          </p>

          {/* Editorial Description */}
          <p className="text-xs sm:text-base text-[#DCD5CA]/90 font-light max-w-lg leading-relaxed drop-shadow-sm">
            Curated menswear designed with understated luxury, architectural draping, and heavyweight natural textiles. Built for effortless movement and considered everyday style.
          </p>

          {/* One Elegant "EXPLORE COLLECTION" Button */}
          <div className="pt-3 sm:pt-4">
            <Button
              to="/shop"
              variant="lightOutline"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-[#FAF9F6] text-[#242321] hover:bg-[#EAE5DC] border-[#FAF9F6] shadow-xl px-8 py-4 font-semibold tracking-[0.16em] text-xs uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              EXPLORE COLLECTION
            </Button>
          </div>

          {/* Key Men's Apparel Highlights */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-[11px] text-[#DCD5CA]/80 uppercase tracking-wider">
            <span>• 100% Menswear</span>
            <span>• Shirts & Trousers</span>
            <span>• Jackets & Streetwear</span>
            <span>• Tailored Natural Cottons</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
