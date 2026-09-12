'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Heart,
  Grid,
  Star,
  Award,
  Sparkles,
  Wifi,
  KeyRound,
  MapPin,
  Bed,
  BedDouble,
  Flag,
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
  Home,
  Shield,
} from 'lucide-react';
import { NavigationHeader } from './NavigationHeader';
import { ReviewsSection } from './ReviewsSection';
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
  const [checkInDate, setCheckInDate] = useState<Date>(new Date(2026, 9, 18)); // Oct 18, 2026
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(2026, 9, 23)); // Oct 23, 2026
  const [selectingStep, setSelectingStep] = useState<'checkin' | 'checkout'>('checkin');
  const [calendarMonth, setCalendarMonth] = useState<number>(9); // October (0-indexed: 9)
  const [calendarYear, setCalendarYear] = useState<number>(2026);

  // UI expand states
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  const [isNeighbourhoodExpanded, setIsNeighbourhoodExpanded] = useState<boolean>(false);

  // Nearby stays pagination
  const [nearbyPage, setNearbyPage] = useState<number>(1);

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

  const bedrooms = [
    {
      id: 1,
      title: 'Bedroom 1',
      beds: '1 king bed',
    },
    {
      id: 2,
      title: 'Bedroom 2',
      beds: '1 double bed',
    },
  ];

  const heroPhotos = listing.photos.slice(0, 5);

  return (
    <div className="relative min-h-screen bg-white">
      {/* 1. Header: Sticky Top Bar (backdrop-blur-md) with search bar, 'Share', and 'Save' actions */}
      <NavigationHeader
        listing={listing}
        onShare={handleShare}
        onSave={() => setIsSaved(!isSaved)}
        isSaved={isSaved}
        copiedLink={copiedLink}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
      />

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
        <div id="photos" className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[2/1] max-h-[500px] grid grid-cols-4 grid-rows-2 gap-2 bg-zinc-100">
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
            {/* Guest Favourite Badge: full-width border container above host details */}
            <div className="w-full border border-zinc-200 rounded-2xl p-5 sm:p-6 bg-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                <div className="flex items-center gap-2 select-none">
                  {/* Laurel wreath left */}
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-900 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 3C5.5 6 4.5 10 5 14c.5 4 2.5 7 5 9M5 7c1.5 0 3-.5 4-1.5M4 12c1.8 0 3.2-.8 4.2-2M5 17c1.8 0 3.5-.8 4.5-2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-bold text-lg sm:text-xl text-zinc-900 tracking-tight">
                    Guest favourite
                  </span>
                  {/* Laurel wreath right */}
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-900 -scale-x-100 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 3C5.5 6 4.5 10 5 14c.5 4 2.5 7 5 9M5 7c1.5 0 3-.5 4-1.5M4 12c1.8 0 3.2-.8 4.2-2M5 17c1.8 0 3.5-.8 4.5-2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="hidden sm:inline text-zinc-300 font-light text-xl">·</span>
                <p className="text-zinc-600 text-xs sm:text-sm font-medium max-w-sm sm:max-w-none pt-0.5">
                  One of the most loved homes on Airbnb, according to guests
                </p>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 divide-x divide-zinc-200 shrink-0">
                <div className="text-center sm:text-right">
                  <div className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center justify-center sm:justify-end gap-1">
                    <span>4.95</span>
                    <span className="text-xs text-zinc-900 tracking-tighter">★★★★★</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-medium">Rating</div>
                </div>

                <div className="text-center sm:text-right pl-6 sm:pl-8">
                  <div className="text-lg sm:text-xl font-bold text-zinc-900 underline cursor-pointer">
                    19
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-medium underline cursor-pointer">
                    Reviews
                  </div>
                </div>
              </div>
            </div>

            {/* Host Info & Avatar */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                  {listing.propertyType} hosted by {listing.host.name}
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
            <div id="amenities" className="pb-6 border-b border-zinc-200 space-y-5">
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
                    const defaultIn = new Date(2026, 9, 18);
                    const defaultOut = new Date(2026, 9, 23);
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

            {/* Meet Your Host Section */}
            <div id="host" className="pt-8 pb-4 border-t border-zinc-200 space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900">Meet your Host</h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Host Card: Styled white rounded box with dark green circular logo, red verified checkmark badge, 1,463 reviews, 4.68 rating, 2 Years hosting */}
                <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-[0_6px_24px_rgba(0,0,0,0.08)] border border-zinc-200/90 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    {/* Dark green circular logo for "Mirashya Homes" with red verified checkmark badge */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-[#134E2A] text-white flex flex-col items-center justify-center shadow-md select-none border-2 border-[#0B3B1C]">
                          <span className="font-serif font-bold text-2xl tracking-wider text-emerald-100">
                            MH
                          </span>
                          <span className="text-[8px] uppercase tracking-widest text-emerald-200 font-medium">
                            Mirashya
                          </span>
                        </div>
                        {/* Red verified checkmark badge */}
                        <div
                          className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#E51D53] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"
                          title="Verified Host"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>

                      <h3 className="mt-3 font-bold text-lg text-zinc-900 text-center">
                        Mirashya Homes
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-semibold text-zinc-600 mt-0.5">
                        <Award className="w-3.5 h-3.5 text-[#E51D53]" />
                        <span>Superhost</span>
                      </div>
                    </div>

                    {/* Stats inside Left Host Card */}
                    <div className="flex flex-col space-y-3 text-right">
                      <div>
                        <div className="text-xl font-bold text-zinc-900">1,463</div>
                        <div className="text-[11px] text-zinc-500 font-medium">Reviews</div>
                      </div>
                      <div className="border-t border-zinc-100 pt-2">
                        <div className="text-xl font-bold text-zinc-900 flex items-center justify-end gap-1">
                          <span>4.68</span>
                          <Star className="w-3.5 h-3.5 fill-black text-black" />
                        </div>
                        <div className="text-[11px] text-zinc-500 font-medium">Rating</div>
                      </div>
                      <div className="border-t border-zinc-100 pt-2">
                        <div className="text-xl font-bold text-zinc-900">2</div>
                        <div className="text-[11px] text-zinc-500 font-medium">Years hosting</div>
                      </div>
                    </div>
                  </div>

                  {/* Superhost statement */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-600 leading-relaxed">
                    Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                  </div>
                </div>

                {/* Right Side: 3-column co-hosts grid + Host details + Message host button */}
                <div className="md:col-span-7 space-y-6">
                  {/* Co-hosts 3-column grid displaying round avatars and names for all 8 co-hosts */}
                  <div>
                    <h3 className="font-semibold text-base text-zinc-900 mb-1">
                      Co-hosts ({listing.coHosts.length})
                    </h3>
                    <p className="text-xs text-zinc-500 mb-3">
                      Mirashya Homes works with experienced co-hosts to ensure 24/7 guest support:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {listing.coHosts.map((cohost, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-50/80 border border-zinc-100 hover:bg-zinc-100/90 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 shrink-0 shadow-xs">
                            <Image
                              src={cohost.photo || cohost.avatar || ''}
                              alt={cohost.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-semibold text-zinc-800 leading-tight">
                            {cohost.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Host details */}
                  <div className="pt-4 border-t border-zinc-200 space-y-2">
                    <h4 className="font-semibold text-sm text-zinc-900">Host details</h4>
                    <div className="text-sm text-zinc-700 space-y-1">
                      <div>
                        <span className="text-zinc-500">Response rate: </span>
                        <span className="font-medium text-zinc-900">
                          {listing.host.responseRate || '100%'}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Responds: </span>
                        <span className="font-medium text-zinc-900">
                          {listing.host.responseTime || 'within an hour'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Light grey "Message host" button */}
                  <div>
                    <button
                      type="button"
                      className="bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-colors text-sm border border-zinc-200 shadow-xs cursor-pointer"
                    >
                      Message host
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Card displaying calculated night count, service fees, dynamic pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-3.5">
              {/* Floating Offer Banner: positioned directly above the booking card */}
              {isOfferVisible && (
                <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-md flex items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#E51D53] flex items-center justify-center shrink-0">
                      <Tag className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-zinc-900 leading-snug">
                      Get 10% off your next stay. <span className="underline text-zinc-500 cursor-pointer text-xs">Terms apply</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsDiscountApplied(!isDiscountApplied)}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                        isDiscountApplied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E51D53] hover:bg-[#D70466] text-white shadow-xs'
                      }`}
                    >
                      {isDiscountApplied ? 'Claimed' : 'Claim'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOfferVisible(false)}
                      className="p-1 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                      aria-label="Dismiss offer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Booking Card */}
              <div id="reservation-card" className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl space-y-5">
                {/* Top Price Header: Display "₹28,499 for 5 nights" */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-zinc-900">
                      ₹28,499
                    </span>
                    <span className="text-zinc-600 text-sm ml-1.5 font-medium">for 5 nights</span>
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

                {/* Date & Guest Grid: split box with "CHECK-IN" (10/18/2026), "CHECKOUT" (10/23/2026), and a "GUESTS" selector ("2 guests") */}
                <div className="border border-zinc-300 rounded-xl overflow-hidden text-xs">
                  <div className="grid grid-cols-2 border-b border-zinc-300 divide-x divide-zinc-300">
                    <div className="p-3">
                      <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                        CHECK-IN
                      </div>
                      <div className="text-zinc-800 text-xs font-semibold mt-0.5">
                        {checkInDate.toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
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
                          month: '2-digit',
                          day: '2-digit',
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
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                        className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 hover:border-zinc-800 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(listing.guestCapacity, guests + 1))}
                        disabled={guests >= listing.guestCapacity}
                        className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 hover:border-zinc-800 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cancellation Box: light grey container below date selection with text "Free cancellation before 17 October" */}
                <div className="bg-[#F7F7F7] border border-zinc-200/80 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-zinc-800">
                  <CalendarIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span className="font-semibold text-zinc-900">
                    Free cancellation before 17 October
                  </span>
                </div>

                {/* Primary Button: Full-width #E51D53 pill button labeled "Reserve" with subtext "You won't be charged yet" */}
                <div>
                  <button
                    type="button"
                    className="w-full py-3.5 px-6 rounded-full text-white font-semibold text-base bg-[#E51D53] hover:bg-[#D70466] active:scale-[0.99] transition-all shadow-md shadow-rose-500/15 cursor-pointer"
                  >
                    Reserve
                  </button>

                  <p className="text-center text-xs text-zinc-500 mt-2">
                    You won&apos;t be charged yet
                  </p>
                </div>

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

        {/* 5. Where you'll sleep Section */}
        <section id="where-youll-sleep" className="py-12 border-t border-zinc-200">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900">
            Where you&apos;ll sleep
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bedrooms.map((room) => (
              <div
                key={room.id}
                className="border border-gray-300 rounded-xl p-6 shadow-sm bg-white"
              >
                <Bed className="w-6 h-6 text-zinc-900 mb-4" />
                <h3 className="font-semibold text-base text-zinc-900 mb-1">
                  {room.title}
                </h3>
                <p className="text-sm text-zinc-600">{room.beds}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Top Rating Summary & Reviews Section */}
        <ReviewsSection />

        {/* Report this listing */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold underline cursor-pointer text-gray-800 hover:text-black my-8"
        >
          <Flag className="w-4 h-4" />
          <span>Report this listing</span>
        </button>

        {/* 7. Where you'll be & Neighbourhood Highlights Section */}
        <section id="location" className="py-12 border-t border-zinc-200 space-y-8">
          {/* Map Header */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Where you&apos;ll be
            </h2>
            <p className="text-base text-zinc-600 font-medium">
              Candolim, Goa, India
            </p>
          </div>

          {/* Map Container */}
          <div className="h-[400px] w-full rounded-2xl relative overflow-hidden bg-[#e5eef0] border border-zinc-200 shadow-sm select-none">
            {/* Styled Map Background */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Land Base */}
              <rect width="1000" height="500" fill="#f4f3f0" />
              {/* Coastal Arabian Sea on West / Left */}
              <path
                d="M0,0 L260,0 C280,120 220,240 270,360 C300,430 250,500 240,500 L0,500 Z"
                fill="#cad2d3"
              />
              {/* Nerul Creek / River */}
              <path
                d="M260,320 Q400,310 520,380 T800,420"
                stroke="#cad2d3"
                strokeWidth="24"
                fill="none"
                strokeLinecap="round"
              />
              {/* Green Parks / Tropical Zones */}
              <path d="M340,60 Q420,40 450,110 T390,180 Z" fill="#d8e8c8" opacity="0.8" />
              <path d="M600,80 Q700,50 720,140 T580,200 Z" fill="#d8e8c8" opacity="0.7" />
              <path d="M300,380 Q380,360 420,430 T320,480 Z" fill="#d8e8c8" opacity="0.75" />

              {/* Major Highway / Road Network */}
              <path
                d="M270,0 L290,160 L310,290 L330,500"
                stroke="#ffffff"
                strokeWidth="10"
                fill="none"
              />
              <path
                d="M270,0 L290,160 L310,290 L330,500"
                stroke="#ffeb99"
                strokeWidth="6"
                fill="none"
              />
              <path
                d="M290,160 L600,140 L850,220"
                stroke="#ffffff"
                strokeWidth="9"
                fill="none"
              />
              <path
                d="M290,160 L600,140 L850,220"
                stroke="#fed478"
                strokeWidth="5"
                fill="none"
              />

              {/* Secondary Street Grids */}
              <g stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.95">
                <path d="M300,90 L600,70" />
                <path d="M310,210 L580,220" />
                <path d="M320,280 L750,260" />
                <path d="M420,60 L440,320" />
                <path d="M520,70 L530,340" />
                <path d="M640,140 L650,420" />
                <path d="M720,180 L730,480" />
              </g>

              {/* Geographical Labels */}
              <text x="60" y="240" fill="#758285" fontSize="18" fontWeight="600" letterSpacing="3">
                ARABIAN SEA
              </text>
              <text x="210" y="110" fill="#788082" fontSize="13" fontWeight="500">
                Candolim Beach
              </text>
              <text x="230" y="440" fill="#788082" fontSize="13" fontWeight="500">
                Sinquerim Fort
              </text>
              <text x="440" y="180" fill="#697477" fontSize="14" fontWeight="600">
                Candolim
              </text>
              <text x="680" y="280" fill="#788082" fontSize="13" fontWeight="500">
                Nerul
              </text>
            </svg>

            {/* Approximate Area Glow Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-rose-500/10 border-2 border-rose-500/30 animate-pulse pointer-events-none" />

            {/* Map Pin: Circular dark house icon pin in center of map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center">
                <Home className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
            </div>

            {/* Map Controls: Search icon at top-left corner */}
            <div className="absolute top-4 left-4 z-10">
              <button
                type="button"
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-zinc-800 hover:bg-zinc-50 border border-zinc-200/80 cursor-pointer transition-colors"
                aria-label="Search map"
              >
                <Search className="w-4 h-4 text-zinc-700" />
              </button>
            </div>

            {/* Map Controls: White circular zoom controls (+ and -) at top-right corner */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                type="button"
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-zinc-800 hover:bg-zinc-50 border border-zinc-200/80 font-bold text-lg cursor-pointer transition-colors select-none"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-zinc-800 hover:bg-zinc-50 border border-zinc-200/80 font-bold text-lg cursor-pointer transition-colors select-none"
                aria-label="Zoom out"
              >
                −
              </button>
            </div>
          </div>

          {/* Subtext below map */}
          <p className="text-sm font-semibold text-zinc-900">
            Exact location will be provided after booking.
          </p>

          {/* Neighbourhood Highlights */}
          <div className="pt-6 border-t border-zinc-200 space-y-3">
            <h3 className="text-xl font-bold text-zinc-900">
              Neighbourhood highlights
            </h3>
            <p className="text-base text-zinc-700 leading-relaxed max-w-3xl">
              Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
            </p>
            <div>
              <button
                type="button"
                onClick={() => setIsNeighbourhoodExpanded(!isNeighbourhoodExpanded)}
                className="font-semibold underline text-zinc-900 hover:text-zinc-700 text-sm sm:text-base cursor-pointer inline-flex items-center gap-1"
              >
                <span>{isNeighbourhoodExpanded ? 'Show less' : 'Show more >'}</span>
              </button>
            </div>

            {isNeighbourhoodExpanded && (
              <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3 text-sm text-zinc-700 animate-in fade-in">
                <p>
                  Candolim Beach is renowned for its warm golden sands, lively shacks, and water sports. The immediate neighborhood features trendy beach clubs, local Goan bakeries, seafood shacks, and high-end dining spots—all within short walking distance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <div className="font-semibold text-zinc-900">Candolim Beach</div>
                    <div className="text-xs text-zinc-500 mt-0.5">5 mins walk (450m)</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <div className="font-semibold text-zinc-900">Aguada Fort & Lighthouse</div>
                    <div className="text-xs text-zinc-500 mt-0.5">8 mins drive (3.2 km)</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200">
                    <div className="font-semibold text-zinc-900">Cafés & Nightlife</div>
                    <div className="text-xs text-zinc-500 mt-0.5">3 mins walk along Main Rd</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 8. Things to Know Section */}
        <section className="py-12 border-t border-zinc-200 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Things to know
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Column 1: Cancellation policy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-5 h-5 text-zinc-900" />
                <h3 className="font-semibold text-base text-zinc-900">Cancellation policy</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. Review this host&apos;s full policy for details.
              </p>
              <div>
                <button
                  type="button"
                  className="font-semibold underline text-zinc-900 hover:text-zinc-700 text-sm cursor-pointer"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Column 2: House rules */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Search className="w-5 h-5 text-zinc-900" />
                <h3 className="font-semibold text-base text-zinc-900">House rules</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>Check-in after 2:00 pm</li>
                <li>Checkout before 11:00 am</li>
                <li>3 guests maximum</li>
              </ul>
              <div>
                <button
                  type="button"
                  className="font-semibold underline text-zinc-900 hover:text-zinc-700 text-sm cursor-pointer"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Column 3: Safety & property */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-zinc-900" />
                <h3 className="font-semibold text-base text-zinc-900">Safety & property</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>Carbon monoxide alarm not reported</li>
                <li>Smoke alarm not reported</li>
                <li>Exterior security cameras on property</li>
              </ul>
              <div>
                <button
                  type="button"
                  className="font-semibold underline text-zinc-900 hover:text-zinc-700 text-sm cursor-pointer"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 9. More Stays Nearby Carousel */}
        <section className="py-12 border-t border-zinc-200 space-y-6">
          {/* Section Header: Left-aligned title, Right-aligned pagination control */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              More stays nearby
            </h2>

            {/* Pagination Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-700 select-none">
                {nearbyPage} / 2
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setNearbyPage(Math.max(1, nearbyPage - 1))}
                  disabled={nearbyPage === 1}
                  className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4 text-zinc-700" />
                </button>
                <button
                  type="button"
                  onClick={() => setNearbyPage(Math.min(2, nearbyPage + 1))}
                  disabled={nearbyPage === 2}
                  className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid Layout: 5 horizontal property cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              // Page 1
              [
                {
                  id: 'stay-1',
                  title: 'Beautiful Studio with a view to die for',
                  image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹23,600',
                  rating: '4.91',
                },
                {
                  id: 'stay-2',
                  title: 'NAQAB - 1bhk with private pool',
                  image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹42,218',
                  rating: '4.95',
                },
                {
                  id: 'stay-3',
                  title: 'Luxury Villa with Tropical Garden',
                  image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹44,506',
                  rating: '4.98',
                },
                {
                  id: 'stay-4',
                  title: 'Candolim Luxe Plunge Pool Suite',
                  image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹28,500',
                  rating: '4.93',
                },
                {
                  id: 'stay-5',
                  title: 'Sunset Palms 1BHK with Jacuzzi',
                  image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹31,200',
                  rating: '4.96',
                },
              ],
              // Page 2
              [
                {
                  id: 'stay-6',
                  title: 'Coastal Chic Jacuzzi Studio',
                  image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹26,400',
                  rating: '4.92',
                },
                {
                  id: 'stay-7',
                  title: 'The Emerald Palm Resort Villa',
                  image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹48,900',
                  rating: '4.97',
                },
                {
                  id: 'stay-8',
                  title: 'Serene Goan Heritage 1BHK',
                  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹19,800',
                  rating: '4.89',
                },
                {
                  id: 'stay-9',
                  title: 'Azure Sky Penthouse with Terrace',
                  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹37,500',
                  rating: '4.94',
                },
                {
                  id: 'stay-10',
                  title: 'Boutique Poolside Haven',
                  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
                  location: 'Candolim, Goa',
                  price: '₹24,900',
                  rating: '4.90',
                },
              ],
            ][nearbyPage - 1].map((stay) => (
              <div
                key={stay.id}
                className="group cursor-pointer space-y-2.5 hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Rounded image thumbnail */}
                <div className="relative rounded-2xl overflow-hidden h-48 w-full bg-zinc-100 shadow-xs">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white text-zinc-800 transition-colors">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>

                {/* Card details */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-semibold text-sm text-zinc-900 line-clamp-1 group-hover:underline">
                      {stay.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-black text-black" />
                      <span>{stay.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500">{stay.location}</p>

                  <div className="pt-0.5">
                    <span className="font-bold text-sm text-zinc-900">{stay.price}</span>
                    <span className="text-xs text-zinc-600 font-normal"> / night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
