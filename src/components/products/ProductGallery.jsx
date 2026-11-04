import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Eye,
  Video as VideoIcon,
  Image as ImageIcon
} from 'lucide-react';
import { trackImageView, trackVideoPlay, trackVideoWatchDuration } from '../../utils/analytics';

export const ProductGallery = ({
  images = [],
  imageMedia = [],
  videos = [],
  productName = 'Product',
  productId = ''
}) => {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' or 'video'
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);

  // Custom Video Player state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const watchSecondsRef = useRef(0);
  const watchTimerRef = useRef(null);

  // Track initial image view on mount
  useEffect(() => {
    if (images.length > 0 && productId) {
      const mediaId = imageMedia[selectedImage]?.id || `img-${productId}-${selectedImage}`;
      trackImageView(productId, mediaId);
    }
  }, [selectedImage, productId]);

  const handleSelectImage = (index) => {
    setSelectedImage(index);
    setActiveTab('photos');
    if (productId) {
      const mediaId = imageMedia[index]?.id || `img-${productId}-${index}`;
      trackImageView(productId, mediaId);
    }
  };

  // Switch to video tab
  const handleSelectVideoTab = (vidIndex = 0) => {
    setSelectedVideo(vidIndex);
    setActiveTab('video');
  };

  // Video playback tracking
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        // Track video play event in SQLite database!
        const curVideo = videos[selectedVideo];
        if (productId && curVideo) {
          trackVideoPlay(productId, curVideo.id || `vid-${productId}-${selectedVideo}`);
        }
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = (e.target.value / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Send watch duration event
    const curVideo = videos[selectedVideo];
    if (productId && curVideo && watchSecondsRef.current > 0) {
      trackVideoWatchDuration(productId, curVideo.id || `vid-${productId}-${selectedVideo}`, watchSecondsRef.current);
      watchSecondsRef.current = 0;
    }
  };

  // Accumulate watch duration while playing
  useEffect(() => {
    if (isPlaying) {
      watchTimerRef.current = setInterval(() => {
        watchSecondsRef.current += 1;
      }, 1000);
    } else {
      clearInterval(watchTimerRef.current);
      if (watchSecondsRef.current > 0) {
        const curVideo = videos[selectedVideo];
        if (productId && curVideo) {
          trackVideoWatchDuration(productId, curVideo.id || `vid-${productId}-${selectedVideo}`, watchSecondsRef.current);
        }
        watchSecondsRef.current = 0;
      }
    }
    return () => clearInterval(watchTimerRef.current);
  }, [isPlaying, productId, selectedVideo]);

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentVideo = videos[selectedVideo] || null;

  return (
    <div className="flex flex-col space-y-4">
      {/* Top Media Switcher (Photos vs Runway Video) */}
      <div className="flex items-center space-x-2 pb-1 border-b border-[#E5E0D6]">
        <button
          type="button"
          onClick={() => setActiveTab('photos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-[#1E1E1E] text-white shadow-sm'
              : 'bg-[#EAE5DC]/60 text-gray-700 hover:bg-[#EAE5DC]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Photos ({images.length})</span>
        </button>

        {videos.length > 0 && (
          <button
            type="button"
            onClick={() => handleSelectVideoTab(0)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer ${
              activeTab === 'video'
                ? 'bg-pink-600 text-white shadow-sm ring-2 ring-pink-400/40'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <Play className="w-3 h-3 fill-current" />
            <span>Watch Runway Video</span>
          </button>
        )}
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails Sidebar */}
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20 pb-2 md:pb-0">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectImage(index)}
              className={`aspect-[4/5] w-16 md:w-20 bg-[#EAE5DC]/60 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeTab === 'photos' && selectedImage === index
                  ? 'border-[#1E1E1E] opacity-100 ring-2 ring-[#1E1E1E]/20 scale-102'
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

          {/* Video Thumbnail Button */}
          {videos.map((vid, vIdx) => (
            <button
              key={`vid-${vIdx}`}
              type="button"
              onClick={() => handleSelectVideoTab(vIdx)}
              className={`aspect-[4/5] w-16 md:w-20 bg-black rounded-lg overflow-hidden border-2 relative transition-all cursor-pointer ${
                activeTab === 'video' && selectedVideo === vIdx
                  ? 'border-pink-600 ring-2 ring-pink-500/30 opacity-100'
                  : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={vid.thumbnailUrl || images[0]}
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center shadow">
                  <Play className="w-3 h-3 fill-white translate-x-0.2" />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 text-white px-1 rounded font-bold uppercase">
                Video
              </span>
            </button>
          ))}
        </div>

        {/* Main Display Area (Photo or Video Player) */}
        <div className="flex-1 aspect-[4/5] bg-[#EAE5DC]/50 rounded-2xl overflow-hidden relative group border border-[#E5E0D6]">
          {activeTab === 'photos' ? (
            <div className="w-full h-full relative overflow-hidden group">
              <img
                src={images[selectedImage] || images[0]}
                alt={productName}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] flex items-center space-x-1.5 font-medium">
                <Eye className="w-3 h-3 text-[#C5A880]" />
                <span>Viewing photo {selectedImage + 1} of {images.length}</span>
              </div>
            </div>
          ) : (
            /* Custom Runway Video Player with Controls */
            <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={currentVideo?.url || '/videos/hero-fashion-male.mp4'}
                poster={currentVideo?.thumbnailUrl || images[0]}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Big Center Play Overlay Button if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-pink-600/90 hover:bg-pink-600 text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 cursor-pointer z-20"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-white translate-x-1" />
                </button>
              )}

              {/* Video Badge */}
              <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center space-x-2 text-[11px] text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>LEOVERSE Runway Motion</span>
              </div>

              {/* Custom Bottom Playback Controls Bar */}
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col space-y-2 text-white">
                {/* Scrubber Progress Bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress || 0}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:h-2 transition-all"
                />

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 hover:text-pink-400 transition cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1 hover:text-pink-400 transition cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-[11px] font-mono text-gray-300">
                      {formatTime(currentTime)} / {formatTime(duration || 18)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-1 hover:text-pink-400 transition cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
