'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { ListingPhoto } from '@/data/listing';

interface LightboxModalProps {
  photos: ListingPhoto[];
  photoIndex: number;
  onClose: () => void; // Returns to 'tour'
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  photoIndex,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = photos[photoIndex] || photos[0];

  const handlePrev = useCallback(() => {
    onNavigate((photoIndex - 1 + photos.length) % photos.length);
  }, [photoIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((photoIndex + 1) % photos.length);
  }, [photoIndex, photos.length, onNavigate]);

  // Window event listeners for ArrowLeft, ArrowRight, and Escape (Escape returns to 'tour')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose(); // Returns to 'tour'
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col backdrop-blur-md select-none overflow-hidden">
      {/* 1. Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all focus:outline-none active:scale-95"
          aria-label="Close lightbox and return to tour"
        >
          <X className="w-4 h-4" />
          <span>Back to Tour</span>
        </button>

        {/* Photo Counter */}
        <div className="text-sm font-medium tracking-wide text-white/90">
          <span className="font-bold text-white text-base">{photoIndex + 1}</span>
          <span className="text-white/40 mx-2">/</span>
          <span className="text-white/70">{photos.length}</span>
        </div>

        <div className="flex items-center gap-2">
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

      {/* 2. Centered High-Res Photo with Left/Right Navigation Arrows & Framer Motion transitions */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Left Navigation Arrow */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-30 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md shadow-lg focus:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Center High-Res Photo with Framer Motion Scale and Opacity Transitions */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full h-full max-h-[72vh] flex items-center justify-center"
            >
              <Image
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Navigation Arrow */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-30 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md shadow-lg focus:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* 3. Bottom Information and Thumbnail Bar */}
      <div className="border-t border-white/10 bg-black/70 px-6 py-4 space-y-3 z-20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <div className="inline-block bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              {currentPhoto.category}
            </div>
            <p className="text-sm text-white/90 font-medium">{currentPhoto.caption}</p>
          </div>
          <div className="text-xs text-white/50 whitespace-nowrap">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">Esc</kbd> to return to tour · Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">→</kbd> to navigate
          </div>
        </div>

        {/* Interactive Thumbnail Strip */}
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => onNavigate(idx)}
              className={`relative w-14 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                idx === photoIndex
                  ? 'border-rose-500 scale-105 opacity-100'
                  : 'border-transparent opacity-40 hover:opacity-75'
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
