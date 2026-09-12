export type PhotoCategory =
  | 'Living room 1'
  | 'Living room 2'
  | 'Bedroom'
  | 'Full bathroom'
  | 'Gym'
  | 'Exterior'
  | 'Pool';

export interface ListingPhoto {
  id: string;
  url: string;
  caption: string;
  category: PhotoCategory;
}

export interface CoHost {
  name: string;
  photo: string;
  avatar?: string;
}

export interface HostInfo {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  rating: number;
  reviewsCount: number;
  reviewCount?: number;
  bio: string;
  responseRate: string;
  responseTime: string;
  badgeText: string;
  coHosts?: CoHost[];
}

export interface ListingHighlight {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PricingDetails {
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  currency: string;
  currencySymbol: string;
  displayPrice?: number;
  mainDisplayPrice?: number | string;
  displayPriceText?: string;
  totalForStay?: number;
  stayNights?: number;
  weeklyDiscountPercent?: number;
}

export interface AmenityItem {
  name: string;
  icon: string;
  highlighted?: boolean;
}

export interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

export interface ListingData {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  isGuestFavorite: boolean;
  guestCapacity: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  capacity?: string;
  propertyType: string;
  host: HostInfo;
  coHosts: CoHost[];
  highlights: ListingHighlight[];
  pricing: PricingDetails;
  photos: ListingPhoto[];
  description: string;
  amenities: AmenityCategory[];
}

export const listingData: ListingData = {
  id: "listing-mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  location: "Candolim, India",
  city: "Candolim",
  state: "Goa",
  country: "India",
  rating: 4.95,
  reviewCount: 19,
  reviewsCount: 19,
  isGuestFavorite: true,
  guestCapacity: 3,
  bedroomCount: 1,
  bedCount: 1,
  bathroomCount: 1,
  capacity: "3 guests · 1 bedroom · 1 bed · 1 bathroom",
  propertyType: "Entire serviced apartment",
  
  host: {
    name: "Mirashya Homes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    isSuperhost: true,
    yearsHosting: 2,
    rating: 4.68,
    reviewsCount: 1463,
    reviewCount: 1463,
    badgeText: "Superhost",
    bio: "Mirashya Homes is dedicated to curating intimate, romantic escapes in the most picturesque corners of North Goa. We believe luxury is found in the smallest thoughtful touches.",
    responseRate: "100%",
    responseTime: "within an hour",
    coHosts: [
      {
        name: "Sharath",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Aman Dev Pahwa",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Maria Karen Priyanka",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Simran",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Pallavi",
        photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Sanyukta",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Shruti",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Amisha",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },

  coHosts: [
    {
      name: "Sharath",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Aman Dev Pahwa",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Maria Karen Priyanka",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Simran",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Pallavi",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sanyukta",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Shruti",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Amisha",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
  ],

  highlights: [
    {
      id: "highlight-jacuzzi",
      icon: "Sparkles",
      title: "Private outdoor jacuzzi",
      description: "Unwind under the Goan stars in your secluded, temperature-regulated hydromassage jacuzzi.",
    },
    {
      id: "highlight-workspace",
      icon: "Wifi",
      title: "Fast Wi-Fi & dedicated workspace",
      description: "Seamless 300 Mbps fiber optic connection with an ergonomic work desk for remote professionals.",
    },
    {
      id: "highlight-checkin",
      icon: "KeyRound",
      title: "Self check-in",
      description: "Easy, contactless entry with smart digital door lock for maximum convenience and privacy.",
    },
    {
      id: "highlight-location",
      icon: "MapPin",
      title: "Prime Candolim coastal location",
      description: "95% of recent guests gave the location a 5-star rating, just minutes from tranquil Candolim beach.",
    },
  ],

  pricing: {
    pricePerNight: 5699,
    cleaningFee: 0,
    serviceFee: 0,
    currency: "INR",
    currencySymbol: "₹",
    displayPrice: 28499,
    mainDisplayPrice: 28499,
    totalForStay: 28499,
    stayNights: 5,
    displayPriceText: "₹28,499 for 5 nights",
    weeklyDiscountPercent: 10,
  },

  photos: [
    {
      id: "photo-living-1-a",
      category: "Living room 1",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      caption: "Spacious sun-drenched living room with Scandinavian oak accents and plush custom seating.",
    },
    {
      id: "photo-living-1-b",
      category: "Living room 1",
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      caption: "Architectural lounge featuring curated ceramics, designer coffee table, and warm ambient light.",
    },
    {
      id: "photo-living-2-a",
      category: "Living room 2",
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      caption: "Intimate reading lounge corner with high-definition smart TV and acoustic warm wood panels.",
    },
    {
      id: "photo-living-2-b",
      category: "Living room 2",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      caption: "Glass sliding doors connecting the interior salon directly out to the breezy garden patio.",
    },
    {
      id: "photo-bedroom-a",
      category: "Bedroom",
      url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
      caption: "Romantic master bedroom suite with king-size memory foam mattress and 400-thread Egyptian cotton.",
    },
    {
      id: "photo-bedroom-b",
      category: "Bedroom",
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
      caption: "Ambient cove lighting and bedside smart switches for tailored romantic mood setting.",
    },
    {
      id: "photo-bathroom-a",
      category: "Full bathroom",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      caption: "Italian marble bathroom with rainfall shower, backlit vanity mirror, and premium toiletries.",
    },
    {
      id: "photo-bathroom-b",
      category: "Full bathroom",
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
      caption: "Deep heated jacuzzi tub with aromatic bath salts and custom whirlpool jets.",
    },
    {
      id: "photo-gym-a",
      category: "Gym",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
      caption: "Fully-equipped community fitness studio with modern treadmills, kettlebells, and yoga mats.",
    },
    {
      id: "photo-exterior-a",
      category: "Exterior",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      caption: "Boutique gated enclave surrounded by manicured tropical gardens and swaying Goan palms.",
    },
    {
      id: "photo-exterior-b",
      category: "Exterior",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      caption: "Private balcony view bathed in golden evening light with breezy coastal winds.",
    },
    {
      id: "photo-pool-a",
      category: "Pool",
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80",
      caption: "Crystal turquoise swimming pool and sun loungers for peaceful daytime unwinding.",
    },
  ],

  description:
    "Welcome to Mirashya UG10, an exquisite boutique sanctuary nestled in the serene coastal haven of Candolim, North Goa. Designed specifically for couples seeking a blend of high-end aesthetics, quiet seclusion, and indulgent relaxation.\n\nStep out onto your private balcony terrace to experience your very own private heated jacuzzi, framed by lush tropical foliage and ambient starlight. Inside, enjoy a thoughtfully appointed 1BHK featuring bespoke designer furnishings, a king-size plush bed, a dedicated 300 Mbps workspace, and an open-concept living lounge.\n\nWhether you are savoring morning espresso on the private patio, working seamlessly remotely, or taking an evening stroll down to the golden sands of Candolim Beach, this stay delivers an unforgettable luxury getaway.",

  amenities: [
    {
      category: "Bathroom & Spa",
      items: [
        { name: "Private outdoor jacuzzi", icon: "Sparkles", highlighted: true },
        { name: "Rainfall shower", icon: "ShowerHead", highlighted: true },
        { name: "Hair dryer", icon: "Wind" },
        { name: "Luxury toiletries & bath salts", icon: "HeartHandshake" },
        { name: "Hot water 24/7", icon: "Flame" },
      ],
    },
    {
      category: "Bedroom & Laundry",
      items: [
        { name: "King size bed", icon: "BedDouble", highlighted: true },
        { name: "Egyptian cotton bed linen", icon: "Layers" },
        { name: "Blackout curtains", icon: "SunDim" },
        { name: "In-unit washer & dryer", icon: "Shirt" },
        { name: "Iron & ironing board", icon: "Check" },
      ],
    },
    {
      category: "Entertainment & Connectivity",
      items: [
        { name: "Fast Wi-Fi – 300 Mbps", icon: "Wifi", highlighted: true },
        { name: "55\" 4K Smart TV with Netflix/Prime", icon: "Tv" },
        { name: "Bluetooth sound system", icon: "Speaker" },
        { name: "Dedicated ergonomic workspace", icon: "Laptop", highlighted: true },
      ],
    },
    {
      category: "Kitchen & Dining",
      items: [
        { name: "Modern induction kitchenette", icon: "Utensils" },
        { name: "Nespresso coffee maker", icon: "Coffee" },
        { name: "Refrigerator & freezer", icon: "Refrigerator" },
        { name: "Microwave & toaster", icon: "Microwave" },
        { name: "Wine glasses & cocktail shaker", icon: "Wine" },
      ],
    },
    {
      category: "Outdoor & Wellness",
      items: [
        { name: "Shared resort swimming pool", icon: "Waves", highlighted: true },
        { name: "Access to residential gym", icon: "Dumbbell" },
        { name: "Private patio / balcony", icon: "Trees" },
        { name: "Free dedicated parking on premises", icon: "Car" },
      ],
    },
    {
      category: "Safety & Security",
      items: [
        { name: "Smart lock self check-in", icon: "Lock" },
        { name: "24/7 gated security & CCTV outside", icon: "ShieldCheck" },
        { name: "Smoke alarm & carbon monoxide alarm", icon: "Bell" },
        { name: "First aid kit", icon: "Cross" },
      ],
    },
  ],
};
