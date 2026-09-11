'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, Share2, Heart, Eye } from 'lucide-react';
import { ListingPhoto, PhotoCategory } from '@/data/listing';

interface PhotoTourViewProps {
  title: string;
  photos: ListingPhoto[];
  onBack: () => void;
  onSelectPhoto: (index: number) => void;
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

export const PhotoTourView: React.FC<PhotoTourViewProps> = ({
  title,
  photos,
  onBack,
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

  // Group photos by category
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(`section-${category.replace(/\s+/g, '-').toLowerCase()}`);
      if (element) {
        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none"
              aria-label="Back to listing"
            >
              <ChevronLeft className="w-6 h-6 text-zinc-800" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-zinc-900 line-clamp-1">
                Photo Tour · {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
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

        {/* Sticky Category Navigation Strip */}
        <div className="border-t border-zinc-100 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2">
            <button
              onClick={() => scrollToCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              All photos ({photos.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = photosByCategory[cat]?.length || 0;
              return (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Tour Gallery */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {CATEGORIES.map((category) => {
          const categoryItems = photosByCategory[category];
          if (!categoryItems || categoryItems.length === 0) return null;

          return (
            <section
              key={category}
              id={`section-${category.replace(/\s+/g, '-').toLowerCase()}`}
              className="space-y-6 scroll-mt-36"
            >
              {/* Category Header */}
              <div className="border-b border-zinc-200 pb-3 flex items-baseline justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    {category}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {categoryItems.length} {categoryItems.length === 1 ? 'photo' : 'photos'} in this space
                  </p>
                </div>
              </div>

              {/* Photos Grid for this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryItems.map(({ photo, originalIndex }) => (
                  <div
                    key={photo.id}
                    onClick={() => onSelectPhoto(originalIndex)}
                    className="group relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={photo.url}
                        alt={photo.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white/90 text-zinc-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                          <Eye className="w-3.5 h-3.5 text-zinc-700" />
                          <span>View Fullscreen</span>
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="p-4 bg-white space-y-1">
                      <p className="text-sm font-medium text-zinc-800 leading-snug">
                        {photo.caption}
                      </p>
                      <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
                        {photo.category} · Photo #{originalIndex + 1}
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
