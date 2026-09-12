'use client';

import React, { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { PricingDetails } from '@/data/listing';

interface ReservationCardProps {
  pricing: PricingDetails;
  rating: number;
  reviewCount: number;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  pricing,
  rating,
  reviewCount,
}) => {
  const [nights, setNights] = useState<number>(5);
  const [guests, setGuests] = useState<number>(2);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState<boolean>(false);

  const basePrice = pricing.pricePerNight * nights;
  const total = basePrice + pricing.cleaningFee + pricing.serviceFee;

  return (
    <div className="sticky top-28 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header with price and rating */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-zinc-900">
            {pricing.currencySymbol}{pricing.pricePerNight}
          </span>
          <span className="text-zinc-500 text-sm ml-1">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-black text-black" />
          <span className="font-semibold text-zinc-900">{rating}</span>
          <span className="text-zinc-400">·</span>
          <button className="text-zinc-500 underline font-medium hover:text-zinc-800">
            {reviewCount} reviews
          </button>
        </div>
      </div>

      {/* Date & Guests Selection Grid */}
      <div className="border border-zinc-300 rounded-xl overflow-hidden text-xs">
        <div className="grid grid-cols-2 border-b border-zinc-300 divide-x divide-zinc-300">
          <div className="p-3">
            <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">CHECK-IN</div>
            <div className="text-zinc-700 text-sm font-medium mt-0.5">Oct 14, 2026</div>
          </div>
          <div className="p-3">
            <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">CHECKOUT</div>
            <div className="text-zinc-700 text-sm font-medium mt-0.5">Oct 19, 2026</div>
          </div>
        </div>

        {/* Guests selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
          >
            <div>
              <div className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">GUESTS</div>
              <div className="text-zinc-700 text-sm font-medium mt-0.5">
                {guests} guest{guests > 1 ? 's' : ''}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${isGuestDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isGuestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-xl shadow-lg p-4 z-20 space-y-3 mt-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-zinc-800 text-sm">Adults</div>
                  <div className="text-xs text-zinc-500">Age 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 hover:border-zinc-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(3, guests + 1))}
                    disabled={guests >= 3}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 hover:border-zinc-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                This property has a maximum capacity of 3 guests.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nights controller (interactive helper) */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-500">
        <span>Trip length:</span>
        <div className="flex gap-1.5">
          {[2, 3, 5, 7].map((n) => (
            <button
              key={n}
              onClick={() => setNights(n)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                nights === n
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {n}n
            </button>
          ))}
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

      {/* Pricing Breakdown */}
      <div className="space-y-3 pt-3 border-t border-zinc-100 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span className="underline">
            {pricing.currencySymbol}{pricing.pricePerNight} x {nights} nights
          </span>
          <span>{pricing.currencySymbol}{basePrice}</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span className="underline">Cleaning fee</span>
          <span>{pricing.currencySymbol}{pricing.cleaningFee}</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span className="underline">Airbnb service fee</span>
          <span>{pricing.currencySymbol}{pricing.serviceFee}</span>
        </div>

        <div className="pt-3 border-t border-zinc-200 flex justify-between font-bold text-base text-zinc-900">
          <span>Total before taxes</span>
          <span>{pricing.currencySymbol}{total}</span>
        </div>
      </div>
    </div>
  );
};
