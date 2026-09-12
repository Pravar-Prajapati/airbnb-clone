'use client';

import React, { useState, useEffect } from 'react';
import { ListingData } from '@/data/listing';

export type TabType = 'photos' | 'amenities' | 'reviews' | 'location';

export interface SubNavProps {
  listing?: ListingData;
  onReserveClick?: () => void;
  onTabClick?: (tab: TabType) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
  guests?: number;
}

export const SubNav: React.FC<SubNavProps> = ({
  listing,
  onReserveClick,
  onTabClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('photos');

  const tabs: { id: TabType; label: string; elementId: string }[] = [
    { id: 'photos', label: 'Photos', elementId: 'photos' },
    { id: 'amenities', label: 'Amenities', elementId: 'amenities' },
    { id: 'reviews', label: 'Reviews', elementId: 'reviews' },
    { id: 'location', label: 'Location', elementId: 'location' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollPosition = scrollY + 160;

      const locationEl =
        document.getElementById('location') || document.getElementById('location-section');
      const reviewsEl =
        document.getElementById('reviews') || document.getElementById('reviews-section');
      const amenitiesEl =
        document.getElementById('amenities') || document.getElementById('amenities-section');

      if (locationEl && scrollPosition >= locationEl.offsetTop) {
        setActiveTab('location');
      } else if (reviewsEl && scrollPosition >= reviewsEl.offsetTop) {
        setActiveTab('reviews');
      } else if (amenitiesEl && scrollPosition >= amenitiesEl.offsetTop) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: TabType, elementId: string) => {
    setActiveTab(tabId);
    onTabClick?.(tabId);

    if (tabId === 'photos') {
      const element =
        document.getElementById('photos') || document.getElementById('photos-section');
      if (element) {
        const yOffset = -90;
        const y = Math.max(0, element.getBoundingClientRect().top + window.pageYOffset + yOffset);
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element =
      document.getElementById(elementId) || document.getElementById(`${elementId}-section`);
    if (element) {
      const yOffset = -90;
      const y = Math.max(0, element.getBoundingClientRect().top + window.pageYOffset + yOffset);
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleReserve = () => {
    if (onReserveClick) {
      onReserveClick();
      return;
    }
    const reserveCard =
      document.getElementById('reservation-card') ||
      document.getElementById('reservation-widget');
    if (reserveCard) {
      reserveCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalPrice = listing?.pricing?.displayPriceText || '₹28,499 for 5 nights';
  const ratingSummary = listing
    ? `★ ${listing.rating} · ${listing.reviewCount} reviews`
    : '★ 4.95 · 19 reviews';

  return (
    <div
      data-testid="sub-nav-container"
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Side: Navigation Tabs with Active Indicator */}
        <nav
          className="flex items-center gap-6 sm:gap-8 h-full"
          aria-label="Listing navigation tabs"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.elementId)}
                className={`h-full flex items-center px-1 text-sm transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-b-2 border-black font-semibold text-zinc-900'
                    : 'border-b-2 border-transparent font-medium text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Price, Rating Summary & Primary Pink Reserve Button inside sticky header on desktop */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6">
          <div className="text-right" data-testid="price-summary">
            <div className="text-sm sm:text-base font-semibold text-zinc-900 leading-tight">
              {totalPrice}
              <span className="sr-only"> · {ratingSummary}</span>
            </div>
            <div className="text-xs text-zinc-600 font-medium flex items-center justify-end gap-1 mt-0.5">
              <span>{ratingSummary}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReserve}
            className="bg-[#E51D53] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#D70466] transition-colors active:scale-95 text-sm sm:text-base whitespace-nowrap cursor-pointer shadow-sm"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export { SubNav as NavigationHeader };
export default SubNav;
