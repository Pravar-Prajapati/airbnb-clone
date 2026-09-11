'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { ListingPhoto } from '@/data/listing';

interface LightboxViewProps {
  photos: ListingPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxView: React.FC<LightboxViewProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col backdrop-blur-md select-none animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>

        {/* Counter */}
        <div className="text-sm font-medium tracking-wide text-white/90">
          <span className="font-bold text-white">{currentIndex + 1}</span>
          <span className="text-white/50 mx-1.5">/</span>
          <span className="text-white/70">{photos.length}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Save"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Nav Arrows */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-95 focus:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Main Image Container */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          <div className="relative w-full h-full max-h-[70vh]">
            <Image
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              fill
              priority
              sizes="100vw"
              className="object-contain transition-all duration-300"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-95 focus:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Info & Thumbnails Bar */}
      <div className="border-t border-white/10 bg-black/60 px-6 py-4 space-y-3 z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <div className="inline-block bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              {currentPhoto.category}
            </div>
            <p className="text-sm text-white/90 font-medium">{currentPhoto.caption}</p>
          </div>
          <div className="text-xs text-white/50">
            Use Left / Right arrow keys to navigate · Esc to exit
          </div>
        </div>

        {/* Thumbnails row */}
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => onNavigate(idx)}
              className={`relative w-14 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                idx === currentIndex
                  ? 'border-rose-500 scale-105 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={photo.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="60px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
