'use client';

import React from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';

interface NavbarProps {
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 text-rose-500 hover:opacity-90 transition-opacity focus:outline-none"
          aria-label="Airbnb Home"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.502-3.42 7.806-7.79 7.806-2.525 0-4.836-1.127-6.71-3.14l-1-1.115-1 1.115c-1.874 2.013-4.185 3.14-6.71 3.14-4.37 0-7.79-3.304-7.79-7.806 0-1.228.324-2.427.96-3.711l.156-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C9.537 1.963 10.992 1 13 1h3zm0 2h-3c-1.298 0-2.312.636-3.414 2.599l-.497.954C7.165 10.339 3.06 18.94 2.1 21.18l-.125.28c-.53 1.059-.775 1.996-.775 2.934 0 3.37 2.473 5.806 5.79 5.806 1.988 0 3.843-.889 5.37-2.523l1.64-1.83 1.64 1.83c1.527 1.634 3.382 2.523 5.37 2.523 3.317 0 5.79-2.436 5.79-5.806 0-.938-.245-1.875-.775-2.934l-.125-.28c-.96-2.24-5.065-10.841-6.989-14.627l-.497-.954C18.312 3.636 17.298 3 16 3zm0 13c2.761 0 5 2.239 5 5 0 2.455-1.782 4.498-4.12 4.938l-.38.052-.5.01c-2.761 0-5-2.239-5-5 0-2.455 1.782-4.498 4.12-4.938l.38-.052.5-.01zm0 2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
          </svg>
          <span className="font-bold text-xl tracking-tight text-rose-500">airbnb</span>
        </button>

        {/* Center Search Pill */}
        <div className="hidden md:flex items-center border border-zinc-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer divide-x divide-zinc-200 text-sm font-medium text-zinc-800">
          <button className="px-3 hover:text-black focus:outline-none">Anywhere</button>
          <button className="px-3 hover:text-black focus:outline-none">Any week</button>
          <div className="pl-3 pr-1 flex items-center gap-3">
            <span className="text-zinc-500 font-normal">Add guests</span>
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-2">
          <button className="text-sm font-semibold text-zinc-800 hover:bg-zinc-100 py-2.5 px-3.5 rounded-full transition-colors hidden sm:block">
            Airbnb your home
          </button>
          <button
            className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-700 transition-colors"
            aria-label="Language and currency"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Profile Pill */}
          <button className="flex items-center gap-3 border border-zinc-300 rounded-full p-2 pl-3 hover:shadow-md transition-shadow focus:outline-none">
            <Menu className="w-4 h-4 text-zinc-600" />
            <div className="w-8 h-8 rounded-full bg-zinc-600 text-white flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 fill-current text-zinc-300" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
