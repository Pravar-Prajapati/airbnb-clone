'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  Check,
  KeyRound,
  MessageSquare,
  MapPin,
  Tag,
} from 'lucide-react';

export interface UserReview {
  id: string;
  name: string;
  avatar: string;
  tenure: string;
  rating: number;
  date: string;
  comment: string;
}

export const reviewsData: UserReview[] = [
  {
    id: 'rev-1',
    name: 'Amit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    tenure: '2 months on Airbnb',
    rating: 5,
    date: '1 week ago',
    comment:
      'Outstanding stay! The private jacuzzi on the balcony was an absolute dream after a day exploring Candolim. Mirashya Homes and the co-hosts were super responsive and made check-in seamless.',
  },
  {
    id: 'rev-2',
    name: 'Aheesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    tenure: '8 months on Airbnb',
    rating: 5,
    date: 'May 2026',
    comment:
      'Hands down one of the best Airbnbs in North Goa. Spotless cleanliness, ultra-fast 300 Mbps Wi-Fi for remote work, and the hot tub is pristine. Will definitely be returning soon!',
  },
  {
    id: 'rev-3',
    name: 'Samiksha',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tenure: '1 year on Airbnb',
    rating: 5,
    date: 'April 2026',
    comment:
      'Romantic, private, and exceptionally maintained. The attention to detail from the plush bed to the rainfall shower was 5-star resort quality. Sharath and the co-host team took great care of us.',
  },
  {
    id: 'rev-4',
    name: 'Vedant',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    tenure: '3 years on Airbnb',
    rating: 5,
    date: 'April 2026',
    comment:
      'The apartment is exactly as shown in the pictures—even better in person! Candolim beach is just minutes away, yet the property is quiet and peaceful. The jacuzzi was heated and ready to go.',
  },
  {
    id: 'rev-5',
    name: 'Vaibhav S',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    tenure: '5 months on Airbnb',
    rating: 5,
    date: 'March 2026',
    comment:
      'Incredible hospitality. The co-hosts responded to every query within minutes. The kitchen was well equipped, security was 24/7, and the overall vibe was serene. 10/10 recommendation!',
  },
  {
    id: 'rev-6',
    name: 'Mohd',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    tenure: '2 years on Airbnb',
    rating: 5,
    date: 'February 2026',
    comment:
      'Loved everything about this 1BHK. High speed internet, super cozy bed, ambient lighting on the terrace, and top tier cleanliness. Truly a guest favourite in Candolim.',
  },
];

const LargeLaurelBranchLeft = () => (
  <svg
    className="w-16 h-24 sm:w-20 sm:h-32 text-zinc-900 shrink-0"
    viewBox="0 0 48 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M38 6C30 14 20 28 18 46c-1 10 3 20 10 28" />
    <path d="M26 14c3-2 8-3 12-2-1 4-4 7-8 8" />
    <path d="M19 26c4-2 9-2 13 0-2 4-5 6-9 6" />
    <path d="M15 39c4-1 9 0 12 3-2 3-5 5-9 4" />
    <path d="M15 52c4 0 8 2 10 5-3 2-6 3-9 2" />
    <path d="M18 64c3 1 6 4 7 7-3 1-6 1-8-1" />
  </svg>
);

const LargeLaurelBranchRight = () => (
  <svg
    className="w-16 h-24 sm:w-20 sm:h-32 text-zinc-900 shrink-0 -scale-x-100"
    viewBox="0 0 48 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M38 6C30 14 20 28 18 46c-1 10 3 20 10 28" />
    <path d="M26 14c3-2 8-3 12-2-1 4-4 7-8 8" />
    <path d="M19 26c4-2 9-2 13 0-2 4-5 6-9 6" />
    <path d="M15 39c4-1 9 0 12 3-2 3-5 5-9 4" />
    <path d="M15 52c4 0 8 2 10 5-3 2-6 3-9 2" />
    <path d="M18 64c3 1 6 4 7 7-3 1-6 1-8-1" />
  </svg>
);

const SprayBottleIcon = () => (
  <svg
    className="w-8 h-8 text-zinc-800"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2h4" />
    <path d="M12 2v4" />
    <path d="M9 6h6a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V7a1 1 0 0 1 1-1Z" />
    <path d="M10 12v9a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9" />
    <path d="M6 7l-2 2" />
    <path d="M5 11l-2 1" />
  </svg>
);

export const ReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);

  const filterPills = [
    { label: 'Comfort', count: 6 },
    { label: 'Accuracy', count: 5 },
    { label: 'Hot tub', count: 5 },
    { label: 'Condition', count: 4 },
    { label: 'Hospitality', count: 8 },
    { label: 'Cleanliness', count: 4 },
    { label: 'Amenities', count: 2 },
  ];

  return (
    <section id="reviews" className="py-12 border-t border-zinc-200 space-y-10">
      {/* 1. Header Banner: Center-aligned massive 4.95 flanked by dark laurel wreaths */}
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex items-center justify-center gap-4 sm:gap-6 select-none">
          <LargeLaurelBranchLeft />
          <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-zinc-900 tracking-tighter">
            4.95
          </span>
          <LargeLaurelBranchRight />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mt-1">
          Guest favourite
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 max-w-lg leading-relaxed">
          This home is a guest favourite based on ratings, reviews and reliability ·{' '}
          <button
            type="button"
            className="font-semibold underline text-zinc-900 hover:text-zinc-700 cursor-pointer"
          >
            How reviews work
          </button>
        </p>
      </div>

      {/* 2. Sub-Rating Columns (7-Column Breakdown) */}
      <div className="border-y border-zinc-200 py-6 overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 min-w-[700px] lg:min-w-0">
          {/* Column 1: Overall rating horizontal rating bar distribution chart */}
          <div className="pr-4 py-2 sm:py-0 flex flex-col justify-between">
            <div className="text-sm font-semibold text-zinc-900">Overall rating</div>
            <div className="space-y-1.5 my-auto pt-2">
              {[
                { star: 5, width: '92%' },
                { star: 4, width: '8%' },
                { star: 3, width: '0%' },
                { star: 2, width: '0%' },
                { star: 1, width: '0%' },
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                  <span className="w-2">{row.star}</span>
                  <div className="flex-1 h-1 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                      style={{ width: row.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Cleanliness (5.0, spray bottle icon) */}
          <div className="px-4 py-2 sm:py-0 flex flex-col justify-between">
            <div className="text-sm font-semibold text-zinc-900">Cleanliness</div>
            <div className="text-lg font-bold text-zinc-900">5.0</div>
            <div className="pt-2 text-zinc-800">
              <SprayBottleIcon />
            </div>
          </div>

          {/* Column 3: Accuracy (5.0, checkmark icon) */}
          <div className="px-4 py-2 sm:py-0 flex flex-col justify-between">
            <div className="text-sm font-semibold text-zinc-900">Accuracy</div>
            <div className="text-lg font-bold text-zinc-900">5.0</div>
            <div className="pt-2 text-zinc-800">
              <div className="w-8 h-8 rounded-full border-2 border-zinc-800 flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Column 4: Check-in (5.0, key icon) */}
          <div className="px-4 py-2 sm:py-0 flex flex-col justify-between">
            <div className="text-sm font-semibold text-zinc-900">Check-in</div>
            <div className="text-lg font-bold text-zinc-900">5.0</div>
            <div className="pt-2 text-zinc-800">
              <KeyRound className="w-8 h-8 stroke-[1.8]" />
            </div>
          </div>

          {/* Column 5: Communication (5.0, speech bubble icon) */}
          <div className="px-4 py-2 sm:py-0 flex flex-col justify-between">
            <div className="text-sm font-semibold text-zinc-900">Communication</div>
            <div className="text-lg font-bold text-zinc-900">5.0</div>
            <div className="pt-2 text-zinc-800">
              <MessageSquare className="w-8 h-8 stroke-[1.8]" />
            </div>
          </div>

          {/* Column 6: Location (4.8, map icon) */}
          <div className="px-4 py-2 sm:py-0 flex flex-col justify-between">
            <div className="text-sm font-semibold text-zinc-900">Location</div>
            <div className="text-lg font-bold text-zinc-900">4.8</div>
            <div className="pt-2 text-zinc-800">
              <MapPin className="w-8 h-8 stroke-[1.8]" />
            </div>
          </div>

          {/* Column 7: Value (4.8, price tag icon) */}
          <div className="pl-4 py-2 sm:py-0 flex flex-col justify-between border-r-0">
            <div className="text-sm font-semibold text-zinc-900">Value</div>
            <div className="text-lg font-bold text-zinc-900">4.8</div>
            <div className="pt-2 text-zinc-800">
              <Tag className="w-8 h-8 stroke-[1.8]" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {filterPills.map((pill) => {
          const isSelected = activeFilter === pill.label;
          return (
            <button
              key={pill.label}
              type="button"
              onClick={() => setActiveFilter(isSelected ? null : pill.label)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
              }`}
            >
              <span>{pill.label}</span>
              <span className={`text-[11px] ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {pill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. User Reviews Grid: 2-column grid featuring individual user review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-2">
        {reviewsData.map((review) => (
          <article key={review.id} className="space-y-3">
            {/* User header */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 shrink-0 shadow-xs">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-zinc-900 leading-tight">
                  {review.name}
                </h3>
                <p className="text-xs text-zinc-500">{review.tenure}</p>
              </div>
            </div>

            {/* Rating & Date */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
              <div className="flex items-center gap-0.5 text-zinc-900">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                ))}
              </div>
              <span>·</span>
              <span>{review.date}</span>
            </div>

            {/* Review content */}
            <p className="text-sm text-zinc-700 leading-relaxed">
              {review.comment}
            </p>
          </article>
        ))}
      </div>

      {/* Bottom Action Button: 'Show all 19 reviews' */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="border border-zinc-900 text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100 font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm sm:text-base cursor-pointer shadow-xs"
        >
          Show all 19 reviews
        </button>
      </div>

      {/* Reviews Modal for 'Show all 19 reviews' */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-black text-black" />
                <span className="font-bold text-xl text-zinc-900">4.95 · 19 reviews</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500 hover:text-zinc-900 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 divide-y divide-zinc-100">
              {reviewsData.concat(reviewsData.slice(0, 3)).map((item, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-zinc-900">{item.name}</div>
                      <div className="text-xs text-zinc-500">{item.tenure} · {item.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
