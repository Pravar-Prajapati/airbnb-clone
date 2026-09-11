'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, Share2, Heart, Eye } from 'lucide-react';
import { ListingPhoto, PhotoCategory } from '@/data/listing';

interface PhotoTourModalProps {
  title: string;
  photos: ListingPhoto[];
  onClose: () => void;
  onSelectPhoto: (photoIndex: number) => void;
}

const CATEGORIES: PhotoCategory[] = [
  'Living room 1',
  'Living room 2',
  'Bedroom',
  'Full bathroom',
  'Gym',
  'Exterior',
  'Pool',
];

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  title,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Group photos by room category
  const photosByCategory: Record<PhotoCategory, { photo: ListingPhoto; originalIndex: number }[]> = {
    'Living room 1': [],
    'Living room 2': [],
    'Bedroom': [],
    'Full bathroom': [],
    'Gym': [],
    'Exterior': [],
    'Pool': [],
  };

  photos.forEach((photo, index) => {
    if (photosByCategory[photo.category]) {
      photosByCategory[photo.category].push({ photo, originalIndex: index });
    }
  });

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      const container = document.getElementById('photo-tour-container');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const sectionId = `tour-section-${category.replace(/\s+/g, '-').toLowerCase()}`;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div
      id="photo-tour-container"
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* 1. Top Header with Back Button to exit to 'main' */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none"
              aria-label="Back to main listing"
            >
              <ChevronLeft className="w-6 h-6 text-zinc-800" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-zinc-900 line-clamp-1">
                Photo tour · {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-zinc-800'
                }`}
              />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* 2. Sticky Top Navigation Pill Tabs for room categories */}
        <div className="border-t border-zinc-100 overflow-x-auto scrollbar-none py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
            <button
              onClick={() => scrollToCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              All rooms ({photos.length})
            </button>
            {CATEGORIES.map((category) => {
              const count = photosByCategory[category]?.length || 0;
              return (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. Photo Blocks Grouped by Room with Descriptive Tags */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {CATEGORIES.map((category) => {
          const categoryPhotos = photosByCategory[category];
          if (!categoryPhotos || categoryPhotos.length === 0) return null;

          return (
            <section
              key={category}
              id={`tour-section-${category.replace(/\s+/g, '-').toLowerCase()}`}
              className="space-y-6 scroll-mt-36"
            >
              {/* Room Section Header */}
              <div className="border-b border-zinc-200 pb-3 flex items-baseline justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    {category}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {categoryPhotos.length} {categoryPhotos.length === 1 ? 'photo' : 'photos'} of this space
                  </p>
                </div>
              </div>

              {/* Room Photo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryPhotos.map(({ photo, originalIndex }) => (
                  <div
                    key={photo.id}
                    onClick={() => onSelectPhoto(originalIndex)}
                    className="group relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                      <Image
                        src={photo.url}
                        alt={photo.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white/95 text-zinc-900 text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-all">
                          <Eye className="w-3.5 h-3.5 text-zinc-800" />
                          <span>View Fullscreen</span>
                        </div>
                      </div>

                      {/* Tag pill on photo corner */}
                      <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                        {photo.category}
                      </div>
                    </div>

                    {/* Descriptive Details */}
                    <div className="p-4 bg-white space-y-1.5 flex-1 flex flex-col justify-between">
                      <p className="text-sm font-medium text-zinc-800 leading-snug">
                        {photo.caption}
                      </p>
                      <div className="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-zinc-100">
                        <span>Photo {originalIndex + 1} of {photos.length}</span>
                        <span className="text-rose-600 font-semibold group-hover:underline">
                          Open Lightbox →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};
