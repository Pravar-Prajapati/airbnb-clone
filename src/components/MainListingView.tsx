'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  Share2,
  Heart,
  Grid,
  Award,
  Sparkles,
  Wifi,
  KeyRound,
  MapPin,
  BedDouble,
  ShowerHead,
  Tv,
  Waves,
  Dumbbell,
  Car,
  Lock,
  Compass,
  Check,
} from 'lucide-react';
import { ListingData } from '@/data/listing';
import { ReservationCard } from './ReservationCard';

interface MainListingViewProps {
  listing: ListingData;
  onOpenTour: () => void;
  onOpenLightbox: (photoIndex: number) => void;
}

export const MainListingView: React.FC<MainListingViewProps> = ({
  listing,
  onOpenTour,
  onOpenLightbox,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isExpandedDesc, setIsExpandedDesc] = useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Preview icons mapping for amenities
  const amenityIcons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-zinc-700" />,
    ShowerHead: <ShowerHead className="w-5 h-5 text-zinc-700" />,
    BedDouble: <BedDouble className="w-5 h-5 text-zinc-700" />,
    Wifi: <Wifi className="w-5 h-5 text-zinc-700" />,
    Tv: <Tv className="w-5 h-5 text-zinc-700" />,
    Waves: <Waves className="w-5 h-5 text-zinc-700" />,
    Dumbbell: <Dumbbell className="w-5 h-5 text-zinc-700" />,
    Car: <Car className="w-5 h-5 text-zinc-700" />,
    Lock: <Lock className="w-5 h-5 text-zinc-700" />,
  };

  const highlightIcons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-6 h-6 text-zinc-800" />,
    Wifi: <Wifi className="w-6 h-6 text-zinc-800" />,
    KeyRound: <KeyRound className="w-6 h-6 text-zinc-800" />,
    MapPin: <MapPin className="w-6 h-6 text-zinc-800" />,
  };

  // First 5 photos for the hero grid
  const heroPhotos = listing.photos.slice(0, 5);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Title & Header Actions */}
      <div className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            {listing.title}
          </h1>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleShare}
              className="relative flex items-center gap-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
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
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Subtitle location & rating info */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
          <div className="flex items-center gap-1 font-semibold text-zinc-900">
            <Star className="w-4 h-4 fill-black text-black" />
            <span>{listing.rating}</span>
          </div>
          <span>·</span>
          <button
            onClick={() => {
              const revEl = document.getElementById('reviews-section');
              revEl?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="underline font-semibold text-zinc-900 hover:text-zinc-700"
          >
            {listing.reviewCount} reviews
          </button>
          <span>·</span>
          {listing.host.isSuperhost && (
            <>
              <span className="flex items-center gap-1 text-zinc-900 font-medium">
                <Award className="w-4 h-4 text-rose-500 fill-rose-100" />
                Superhost
              </span>
              <span>·</span>
            </>
          )}
          <span className="underline font-medium text-zinc-800">{listing.location}</span>
        </div>
      </div>

      {/* Classic 5-Photo Hero Grid */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[2/1] max-h-[520px] grid grid-cols-4 grid-rows-2 gap-2 bg-zinc-200">
        {/* Main Photo (Left 2 cols, 2 rows) */}
        {heroPhotos[0] && (
          <div
            onClick={() => onOpenLightbox(0)}
            className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden group"
          >
            <Image
              src={heroPhotos[0].url}
              alt={heroPhotos[0].caption}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.98] group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}

        {/* 4 Supporting Photos (Right 2 cols, 2 rows) */}
        {heroPhotos.slice(1, 5).map((photo, index) => {
          const actualIndex = index + 1;
          return (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(actualIndex)}
              className="relative col-span-1 row-span-1 cursor-pointer overflow-hidden group"
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.98] group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          );
        })}

        {/* View Tour & Show all photos floating button */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={onOpenTour}
            className="bg-white/90 hover:bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-zinc-200 backdrop-blur-sm active:scale-95"
          >
            <Compass className="w-4 h-4 text-rose-500" />
            <span>Room Tour</span>
          </button>
          <button
            onClick={() => onOpenLightbox(0)}
            className="bg-white/90 hover:bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-zinc-200 backdrop-blur-sm active:scale-95"
          >
            <Grid className="w-4 h-4" />
            <span>Show all {listing.photos.length} photos</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        {/* Left Column (Content & Specs) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property Header & Basic Specs */}
          <div className="pb-6 border-b border-zinc-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
              {listing.propertyType} hosted by {listing.host.name}
            </h2>
            <ol className="flex flex-wrap items-center gap-2 text-zinc-600 text-sm mt-1">
              <li>{listing.guestCapacity} guests</li>
              <li>·</li>
              <li>{listing.bedroomCount} bedroom</li>
              <li>·</li>
              <li>{listing.bedCount} bed</li>
              <li>·</li>
              <li>{listing.bathroomCount} bath</li>
            </ol>
          </div>

          {/* Guest Favorite Badge Box */}
          {listing.isGuestFavorite && (
            <div className="border border-zinc-200 rounded-2xl p-6 flex items-center justify-between shadow-sm bg-gradient-to-r from-amber-50/40 via-white to-rose-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-900">Guest favorite</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-sm">
                    One of the most loved homes on Airbnb based on ratings, reviews, and reliability
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <div className="text-xl font-extrabold text-zinc-900">{listing.rating}</div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <div className="border-l border-zinc-200 pl-6">
                  <div className="text-xl font-extrabold text-zinc-900">{listing.reviewCount}</div>
                  <div className="text-xs text-zinc-500 underline font-medium">Reviews</div>
                </div>
              </div>
            </div>
          )}

          {/* Host Info Summary */}
          <div className="flex items-center gap-4 pb-6 border-b border-zinc-200">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-zinc-200">
              <Image
                src={listing.host.avatar}
                alt={listing.host.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-base text-zinc-900">
                Hosted by {listing.host.name}
              </div>
              <div className="text-sm text-zinc-500">
                Superhost · {listing.host.yearsHosting} years hosting · Responds {listing.host.responseTime}
              </div>
            </div>
          </div>

          {/* Listing Highlights */}
          <div className="space-y-6 pb-6 border-b border-zinc-200">
            {listing.highlights.map((highlight) => (
              <div key={highlight.id} className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                  {highlightIcons[highlight.icon] || <Sparkles className="w-5 h-5 text-zinc-800" />}
                </div>
                <div>
                  <h3 className="font-semibold text-base text-zinc-900">{highlight.title}</h3>
                  <p className="text-sm text-zinc-500 mt-0.5">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Listing Description */}
          <div className="pb-6 border-b border-zinc-200 space-y-4">
            <h3 className="text-xl font-semibold text-zinc-900">About this space</h3>
            <div
              className={`text-zinc-700 leading-relaxed space-y-4 text-base ${
                !isExpandedDesc ? 'line-clamp-4' : ''
              }`}
            >
              {listing.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <button
              onClick={() => setIsExpandedDesc(!isExpandedDesc)}
              className="text-zinc-900 font-semibold underline hover:text-zinc-700 text-sm"
            >
              {isExpandedDesc ? 'Show less' : 'Show more'}
            </button>
          </div>

          {/* Where you'll sleep */}
          <div className="pb-6 border-b border-zinc-200 space-y-4">
            <h3 className="text-xl font-semibold text-zinc-900">Where you&apos;ll sleep</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-zinc-200 rounded-2xl p-5 space-y-3 hover:border-zinc-300 transition-colors">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100">
                  <Image
                    src={listing.photos.find((p) => p.category === 'Bedroom')?.url || listing.photos[4].url}
                    alt="Master Bedroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-semibold">
                    <BedDouble className="w-5 h-5 text-zinc-700" />
                    <span>Bedroom 1</span>
                  </div>
                  <p className="text-sm text-zinc-500">1 king bed with plush memory foam</p>
                </div>
              </div>
            </div>
          </div>

          {/* What this place offers (Amenities) */}
          <div className="pb-6 border-b border-zinc-200 space-y-5">
            <h3 className="text-xl font-semibold text-zinc-900">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {listing.amenities
                .flatMap((cat) => cat.items)
                .slice(0, 10)
                .map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 text-zinc-800">
                    {amenityIcons[amenity.icon] || <Check className="w-5 h-5 text-zinc-700" />}
                    <span className="text-base">{amenity.name}</span>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="mt-4 border border-zinc-900 text-zinc-900 font-semibold px-6 py-3 rounded-xl hover:bg-zinc-50 transition-colors text-sm"
            >
              {showAllAmenities ? 'Hide amenities' : 'Show all 24 amenities'}
            </button>

            {showAllAmenities && (
              <div className="mt-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-6 animate-in fade-in">
                {listing.amenities.map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="font-semibold text-zinc-900 border-b border-zinc-200 pb-2">
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-3 text-sm text-zinc-700">
                          {amenityIcons[item.icon] || <Check className="w-4 h-4 text-zinc-500" />}
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location details */}
          <div className="space-y-4 pb-6">
            <h3 className="text-xl font-semibold text-zinc-900">Where you&apos;ll be</h3>
            <p className="text-sm text-zinc-600">
              Candolim, Goa, India · Close to pristine beaches, tranquil sunset bars, and fine seafood dining.
            </p>
            <div className="relative h-64 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="z-10 text-center space-y-2 p-6">
                <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6 fill-current" />
                </div>
                <div className="font-bold text-zinc-900 text-base">Candolim Coastal Belt</div>
                <div className="text-xs text-zinc-500 max-w-sm">
                  Exact location provided after booking. Minutes from Candolim Beach and Aguada Fort.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Reservation Widget) */}
        <div className="lg:col-span-1">
          <ReservationCard
            pricing={listing.pricing}
            rating={listing.rating}
            reviewCount={listing.reviewCount}
          />
        </div>
      </div>
    </main>
  );
};
