'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Share2,
  Heart,
  Grid,
  Star,
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
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  Check,
} from 'lucide-react';
import { ListingData } from '@/data/listing';

interface ListingViewProps {
  listing: ListingData;
  onOpenTour: () => void;
  onOpenLightbox?: (photoIndex: number) => void;
}

export const ListingView: React.FC<ListingViewProps> = ({
  listing,
  onOpenTour,
  onOpenLightbox,
}) => {
  // Share & Save States
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Offer Banner States
  const [isOfferVisible, setIsOfferVisible] = useState<boolean>(true);
  const [isDiscountApplied, setIsDiscountApplied] = useState<boolean>(false);

  // Dynamic Date Range States (Default: 5 nights in October 2026)
  const [checkInDate, setCheckInDate] = useState<Date>(new Date(2026, 9, 14)); // Oct 14, 2026
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(2026, 9, 19)); // Oct 19, 2026
  const [selectingStep, setSelectingStep] = useState<'checkin' | 'checkout'>('checkin');
  const [calendarMonth, setCalendarMonth] = useState<number>(9); // October (0-indexed: 9)
  const [calendarYear, setCalendarYear] = useState<number>(2026);

  // UI expand states
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  // Guest count in reservation card
  const [guests, setGuests] = useState<number>(2);

  // Calculate dynamic nights
  const nightCount = Math.max(
    1,
    Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Dynamic pricing calculation
  const basePrice = listing.pricing.pricePerNight * nightCount;
  const discountAmount = isDiscountApplied ? Math.round(basePrice * 0.1) : 0;
  const cleaningFee = listing.pricing.cleaningFee;
  const serviceFee = listing.pricing.serviceFee;
  const totalPrice = basePrice - discountAmount + cleaningFee + serviceFee;

  // Handle Share copy
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Calendar helpers
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(calendarYear, calendarMonth, day);

    if (selectingStep === 'checkin') {
      setCheckInDate(clickedDate);
      // Auto-set checkout to the next day if checkout is before or equal to checkin
      if (clickedDate >= checkOutDate) {
        const nextDay = new Date(clickedDate);
        nextDay.setDate(clickedDate.getDate() + 2);
        setCheckOutDate(nextDay);
      }
      setSelectingStep('checkout');
    } else {
      if (clickedDate <= checkInDate) {
        // If clicked earlier than check-in, make it the new check-in
        setCheckInDate(clickedDate);
        setSelectingStep('checkout');
      } else {
        setCheckOutDate(clickedDate);
        setSelectingStep('checkin');
      }
    }
  };

  const isDateSelected = (day: number) => {
    const d = new Date(calendarYear, calendarMonth, day);
    const time = d.getTime();
    return time === checkInDate.getTime() || time === checkOutDate.getTime();
  };

  const isDateInRange = (day: number) => {
    const d = new Date(calendarYear, calendarMonth, day);
    const time = d.getTime();
    return time > checkInDate.getTime() && time < checkOutDate.getTime();
  };

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  // Amenity Icons map
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

  const heroPhotos = listing.photos.slice(0, 5);

  return (
    <div className="relative min-h-screen bg-white">
      {/* 1. Header: Sticky Top Bar (backdrop-blur-md) with search bar, 'Share', and 'Save' actions */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 text-rose-500 cursor-pointer flex-shrink-0">
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.502-3.42 7.806-7.79 7.806-2.525 0-4.836-1.127-6.71-3.14l-1-1.115-1 1.115c-1.874 2.013-4.185 3.14-6.71 3.14-4.37 0-7.79-3.304-7.79-7.806 0-1.228.324-2.427.96-3.711l.156-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C9.537 1.963 10.992 1 13 1h3zm0 2h-3c-1.298 0-2.312.636-3.414 2.599l-.497.954C7.165 10.339 3.06 18.94 2.1 21.18l-.125.28c-.53 1.059-.775 1.996-.775 2.934 0 3.37 2.473 5.806 5.79 5.806 1.988 0 3.843-.889 5.37-2.523l1.64-1.83 1.64 1.83c1.527 1.634 3.382 2.523 5.37 2.523 3.317 0 5.79-2.436 5.79-5.806 0-.938-.245-1.875-.775-2.934l-.125-.28c-.96-2.24-5.065-10.841-6.989-14.627l-.497-.954C18.312 3.636 17.298 3 16 3zm0 13c2.761 0 5 2.239 5 5 0 2.455-1.782 4.498-4.12 4.938l-.38.052-.5.01c-2.761 0-5-2.239-5-5 0-2.455 1.782-4.498 4.12-4.938l.38-.052.5-.01zm0 2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
            </svg>
            <span className="font-bold text-xl tracking-tight text-rose-500 hidden sm:inline">
              airbnb
            </span>
          </div>

          {/* Search Bar in Header */}
          <div className="flex items-center border border-zinc-300 rounded-full py-2 px-3 sm:px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer divide-x divide-zinc-200 text-xs sm:text-sm font-medium text-zinc-800">
            <button className="px-2 sm:px-3 hover:text-black focus:outline-none">
              Candolim, Goa
            </button>
            <button className="px-2 sm:px-3 hover:text-black focus:outline-none">
              {checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
              {checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </button>
            <div className="pl-2 sm:pl-3 pr-1 flex items-center gap-2">
              <span className="text-zinc-500 font-normal hidden md:inline">
                {guests} guest{guests > 1 ? 's' : ''}
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors">
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Share and Save Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-lg transition-colors"
              title="Save listing"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-zinc-800'
                }`}
              />
              <span className="hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Listing View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Title & Location Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            {listing.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
            <div className="flex items-center gap-1 font-semibold text-zinc-900">
              <Star className="w-4 h-4 fill-black text-black" />
              <span>{listing.rating}</span>
            </div>
            <span>·</span>
            <span className="underline font-semibold text-zinc-900">{listing.reviewCount} reviews</span>
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

        {/* 2. Hero Photo Grid: Standard 5-photo grid layout. 1 large photo on left (50% width), 4 stacked in 2x2 grid on right. Container rounded-2xl */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[2/1] max-h-[500px] grid grid-cols-4 grid-rows-2 gap-2 bg-zinc-100">
          {/* Left Large Photo (50% width = col-span-2, row-span-2) */}
          {heroPhotos[0] && (
            <div
              onClick={() => onOpenLightbox?.(0)}
              className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden group"
            >
              <Image
                src={heroPhotos[0].url}
                alt={heroPhotos[0].caption}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          )}

          {/* Right 4 Stacked Photos (2x2 Grid) */}
          {heroPhotos.slice(1, 5).map((photo, index) => {
            const actualIndex = index + 1;
            return (
              <div
                key={photo.id}
                onClick={() => onOpenLightbox?.(actualIndex)}
                className="relative col-span-1 row-span-1 cursor-pointer overflow-hidden group"
              >
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            );
          })}

          {/* 3. Overlay Button: 'Show all photos' button at the bottom right of the hero grid that sets view state to 'tour' */}
          <button
            onClick={onOpenTour}
            className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-zinc-200 backdrop-blur-md active:scale-95 z-10"
          >
            <Grid className="w-4 h-4 text-zinc-800" />
            <span>Show all photos</span>
          </button>
        </div>

        {/* 4. Main Body: 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info & Avatar */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                  Entire condominium hosted by {listing.host.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-zinc-600 text-sm mt-1">
                  <span>{listing.guestCapacity} guests</span>
                  <span>·</span>
                  <span>{listing.bedroomCount} bedroom</span>
                  <span>·</span>
                  <span>{listing.bedCount} bed</span>
                  <span>·</span>
                  <span>{listing.bathroomCount} bath</span>
                </div>
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-zinc-200 flex-shrink-0 shadow-sm">
                <Image
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Key Highlights with Lucide Icons */}
            <div className="space-y-5 pb-6 border-b border-zinc-200">
              {listing.highlights.map((highlight) => (
                <div key={highlight.id} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 flex-shrink-0">
                    {highlightIcons[highlight.icon] || <Sparkles className="w-6 h-6 text-zinc-800" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-zinc-900">{highlight.title}</h3>
                    <p className="text-sm text-zinc-500 mt-0.5">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="pb-6 border-b border-zinc-200 space-y-3">
              <h3 className="text-xl font-semibold text-zinc-900">About this space</h3>
              <div
                className={`text-zinc-700 leading-relaxed space-y-3 text-base ${
                  !isDescriptionExpanded ? 'line-clamp-4' : ''
                }`}
              >
                {listing.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-zinc-900 font-semibold underline hover:text-zinc-700 text-sm"
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>

            {/* Amenities List with Icons (Lucide React) */}
            <div className="pb-6 border-b border-zinc-200 space-y-5">
              <h3 className="text-xl font-semibold text-zinc-900">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {listing.amenities
                  .flatMap((cat) => cat.items)
                  .slice(0, 10)
                  .map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3.5 text-zinc-800">
                      {amenityIcons[amenity.icon] || <Check className="w-5 h-5 text-zinc-700" />}
                      <span className="text-sm sm:text-base font-medium">{amenity.name}</span>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-2 border border-zinc-800 text-zinc-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-sm"
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

            {/* Dynamic Date Range Selector */}
            <div className="pb-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {nightCount} night{nightCount > 1 ? 's' : ''} in Candolim
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                    {checkInDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    –{' '}
                    {checkOutDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const defaultIn = new Date(2026, 9, 14);
                    const defaultOut = new Date(2026, 9, 19);
                    setCheckInDate(defaultIn);
                    setCheckOutDate(defaultOut);
                  }}
                  className="text-xs text-zinc-600 underline font-semibold hover:text-zinc-900"
                >
                  Reset dates
                </button>
              </div>

              {/* Interactive Month Calendar */}
              <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-sm space-y-4 max-w-lg">
                {/* Month header & navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-700" />
                  </button>

                  <div className="font-bold text-zinc-900 text-sm">
                    {monthNames[calendarMonth]} {calendarYear}
                  </div>

                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4 text-zinc-700" />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 text-center text-xs font-semibold text-zinc-400">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty cells before start of month */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-9" />
                  ))}

                  {/* Month days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const selected = isDateSelected(day);
                    const inRange = isDateInRange(day);

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={`h-9 w-full rounded-full text-xs font-medium transition-all flex items-center justify-center ${
                          selected
                            ? 'bg-zinc-900 text-white font-bold shadow-sm'
                            : inRange
                            ? 'bg-zinc-100 text-zinc-900 rounded-none'
                            : 'hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-400" />
                    Click dates to dynamically adjust stay duration
                  </span>
                  <span className="font-medium text-rose-500">
                    {selectingStep === 'checkin' ? 'Select check-in' : 'Select checkout'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Card displaying calculated night count, service fees, dynamic pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl space-y-5">
              {/* Header with price and rating */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-zinc-900">
                    {listing.pricing.currencySymbol}{listing.pricing.pricePerNight}
                  </span>
                  <span className="text-zinc-500 text-sm ml-1">/ night</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span className="font-semibold text-zinc-900">{listing.rating}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500 underline font-medium">
                    {listing.reviewCount} reviews
                  </span>
                </div>
              </div>

              {/* Date & Guests Selection Box */}
              <div className="border border-zinc-300 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-2 border-b border-zinc-300 divide-x divide-zinc-300">
                  <div className="p-3">
                    <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                      CHECK-IN
                    </div>
                    <div className="text-zinc-800 text-xs font-semibold mt-0.5">
                      {checkInDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                      CHECKOUT
                    </div>
                    <div className="text-zinc-800 text-xs font-semibold mt-0.5">
                      {checkOutDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                      GUESTS
                    </div>
                    <div className="text-zinc-800 text-xs font-medium mt-0.5">
                      {guests} guest{guests > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 hover:border-zinc-800"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(2, guests + 1))}
                      disabled={guests >= 2}
                      className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 hover:border-zinc-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                type="button"
                className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-base bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:brightness-105 active:scale-[0.99] transition-all shadow-md shadow-rose-500/20"
              >
                Reserve
              </button>

              <p className="text-center text-xs text-zinc-500">
                You won&apos;t be charged yet
              </p>

              {/* Dynamic Pricing Breakdown based on nights selected */}
              <div className="space-y-3 pt-3 border-t border-zinc-100 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span className="underline">
                    {listing.pricing.currencySymbol}{listing.pricing.pricePerNight} x {nightCount} night{nightCount > 1 ? 's' : ''}
                  </span>
                  <span>{listing.pricing.currencySymbol}{basePrice}</span>
                </div>

                {isDiscountApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      10% promotional discount
                    </span>
                    <span>-{listing.pricing.currencySymbol}{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600">
                  <span className="underline">Cleaning fee</span>
                  <span>{listing.pricing.currencySymbol}{cleaningFee}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span className="underline">Airbnb service fee</span>
                  <span>{listing.pricing.currencySymbol}{serviceFee}</span>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex justify-between font-bold text-base text-zinc-900">
                  <span>Total before taxes</span>
                  <span className="text-rose-600">{listing.pricing.currencySymbol}{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Offer Banner: Dismissable floating banner fixed at bottom right ('Get 10% off your next stay') */}
      {isOfferVisible && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm bg-zinc-900/95 text-white rounded-2xl p-4 shadow-2xl border border-zinc-800 backdrop-blur-md flex items-start gap-3.5 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Special Promo</span>
              <button
                onClick={() => setIsOfferVisible(false)}
                className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                aria-label="Dismiss offer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-snug">
              Get 10% off your next stay at Miraahya Luxury Stays!
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setIsDiscountApplied(!isDiscountApplied)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  isDiscountApplied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {isDiscountApplied ? '✓ 10% Applied' : 'Claim 10% Off'}
              </button>
              <button
                onClick={() => setIsOfferVisible(false)}
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
