'use client';

import React, { useState } from 'react';
import { listingData } from '@/data/listing';
import { ListingView } from '@/components/ListingView';
import { PhotoTourModal } from '@/components/PhotoTourModal';
import { LightboxModal } from '@/components/LightboxModal';

export type ViewState =
  | { type: 'main' }
  | { type: 'tour' }
  | { type: 'lightbox'; photoIndex: number };

export default function ListingPage() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'main' });
  const [previousView, setPreviousView] = useState<'main' | 'tour'>('main');

  const openLightbox = (photoIndex: number, from: 'main' | 'tour' = 'main') => {
    setPreviousView(from);
    setViewState({ type: 'lightbox', photoIndex });
  };

  const closeLightbox = () => {
    if (previousView === 'tour') {
      setViewState({ type: 'tour' });
    } else {
      setViewState({ type: 'main' });
    }
  };

  const navigateLightbox = (photoIndex: number) => {
    setViewState({ type: 'lightbox', photoIndex });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Conditionally render main content based on discriminated union ViewState */}
      {viewState.type === 'main' && (
        <>
          <ListingView
            listing={listingData}
            onOpenTour={() => setViewState({ type: 'tour' })}
            onOpenLightbox={(index) => openLightbox(index, 'main')}
          />

          {/* Desktop Airbnb Footer */}
          <footer className="mt-20 border-t border-zinc-200 bg-zinc-50/80 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-zinc-900">Support</h4>
                  <ul className="space-y-2 text-zinc-600">
                    <li><a href="#" className="hover:underline">Help Center</a></li>
                    <li><a href="#" className="hover:underline">AirCover</a></li>
                    <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
                    <li><a href="#" className="hover:underline">Disability support</a></li>
                    <li><a href="#" className="hover:underline">Cancellation options</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-zinc-900">Hosting</h4>
                  <ul className="space-y-2 text-zinc-600">
                    <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                    <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
                    <li><a href="#" className="hover:underline">Hosting resources</a></li>
                    <li><a href="#" className="hover:underline">Community forum</a></li>
                    <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-zinc-900">Airbnb</h4>
                  <ul className="space-y-2 text-zinc-600">
                    <li><a href="#" className="hover:underline">Newsroom</a></li>
                    <li><a href="#" className="hover:underline">New features</a></li>
                    <li><a href="#" className="hover:underline">Careers</a></li>
                    <li><a href="#" className="hover:underline">Investors</a></li>
                    <li><a href="#" className="hover:underline">Emergency stays</a></li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span>© 2026 Airbnb, Inc.</span>
                  <span>·</span>
                  <a href="#" className="hover:underline">Privacy</a>
                  <span>·</span>
                  <a href="#" className="hover:underline">Terms</a>
                  <span>·</span>
                  <a href="#" className="hover:underline">Sitemap</a>
                  <span>·</span>
                  <a href="#" className="hover:underline">Company details</a>
                </div>
                <div className="flex items-center gap-4 font-semibold text-zinc-800">
                  <span>English (US)</span>
                  <span>$ USD</span>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {viewState.type === 'tour' && (
        <PhotoTourModal
          title={listingData.title}
          photos={listingData.photos}
          onClose={() => setViewState({ type: 'main' })}
          onSelectPhoto={(photoIndex) => setViewState({ type: 'lightbox', photoIndex })}
        />
      )}

      {viewState.type === 'lightbox' && (
        <LightboxModal
          photos={listingData.photos}
          photoIndex={viewState.photoIndex}
          onClose={() => setViewState({ type: 'tour' })}
          onNavigate={(photoIndex) => setViewState({ type: 'lightbox', photoIndex })}
        />
      )}
    </div>
  );
}
