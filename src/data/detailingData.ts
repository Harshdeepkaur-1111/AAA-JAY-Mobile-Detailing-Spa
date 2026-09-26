import { DetailingPackage, GoogleReview, ServiceAddon, VehicleOption } from '../types';

export const BUSINESS_INFO = {
  name: 'AAA&JAY MOBILE DETAILING SPA',
  shortName: 'AAA&JAY Mobile Detailing',
  tagline: 'Orlando\'s Premier 5-Star Mobile Car Detailing Spa',
  rating: 4.9,
  reviewCount: 202,
  phone: '+1 (321) 890-7736',
  rawPhone: '+13218907736',
  address: '2121 S Hiawassee Rd, Floor 1 · Veranda Park',
  city: 'Orlando',
  state: 'FL',
  zip: '32835',
  country: 'United States',
  plusCode: 'GG9C+4M Orlando, Florida, USA',
  gmbUrl: 'https://maps.google.com/?q=AAA%26JAY+MOBILE+DETAILING+SPA+2121+S+Hiawassee+Rd+Orlando+FL+32835',
  hours: 'Tue – Sat: 9:30 AM – 6:30 PM (Sun – Mon by appointment)',
  owner: 'Marvin',
  serviceType: '100% Mobile — We Come To Your Home or Office',
  equipment: 'Fully self-contained mobile detailing unit with onboard spot-free deionized water and silent power generator'
};

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'sedan',
    label: 'Sedan / Coupe',
    sublabel: 'Standard 2 or 4-door cars',
    multiplier: 1.0,
    iconName: 'Car'
  },
  {
    id: 'suv',
    label: 'Mid-Size SUV / Crossover',
    sublabel: '2-row compact & mid-size SUVs',
    multiplier: 1.18,
    iconName: 'CarFront'
  },
  {
    id: 'truck',
    label: 'Truck / Large 3-Row SUV',
    sublabel: 'Pickups, Suburbans, Expeditions',
    multiplier: 1.35,
    iconName: 'Truck'
  },
  {
    id: 'van',
    label: 'Van / Commercial / Exotic',
    sublabel: 'Sprinters, Minivans & Specialty',
    multiplier: 1.55,
    iconName: 'Bus'
  }
];

export const DETAILING_PACKAGES: DetailingPackage[] = [
  {
    id: 'showroom-ready',
    name: 'Show Room Ready Signature Spa',
    tagline: 'Our Masterpiece — Vehicle Stripped Down & Fully Restored',
    badge: 'Most Requested',
    basePrice: 289,
    estimatedTime: '4.0 - 5.5 Hours',
    popular: true,
    features: [
      'Interior seats taken out for 100% deep carpet extraction & shampoo',
      'Full roof headliner steam shampoo & sanitized stain lift',
      'Trunk & spare tire compartment deep vacuum and shampoo',
      'Full exterior 2-stage machine buffing, compound & high-gloss carnauba wax',
      'Scratch & swirl minimization paint treatment',
      'Immaculate wheel detailing (clean behind rim faces & inner barrel)',
      'Dual optical headlight restoration & UV sealant',
      'Full engine bay deep degrease, steam & dressing',
      'Air conditioning vent steam sterilization & luxury fragrance infusion',
      'Door jambs, hinges, weatherstripping & fuel door detail'
    ],
    idealFor: 'Cars needing showroom transformation, pre-sale prep, or annual complete overhaul'
  },
  {
    id: 'full-interior-exterior',
    name: 'Full Interior & Exterior Detail',
    tagline: 'Complete bumper-to-bumper deep sanitation and gloss wash',
    badge: 'Best Value',
    basePrice: 189,
    estimatedTime: '2.5 - 3.5 Hours',
    popular: false,
    features: [
      'Touchless foam pre-soak & 2-bucket hand wash with pH-neutral soap',
      'Clay bar decontamination on exterior clear coat',
      'Tire & wheel deep scrub with non-acid cleaner & ceramic tire dressing',
      'Full interior deep vacuuming including hard-to-reach crevices',
      'Shampoo seats & floor mats with hot-water enzyme extractor',
      'Wipe down and UV conditioning on dash, console & door panels',
      'Door jambs cleaned and wiped dry',
      'Streak-free optical glass cleaning inside and outside',
      'Exterior protective spray sealant (30-day hydrophobic gloss)'
    ],
    idealFor: 'Regular seasonal deep cleans and maintaining spotless aesthetics'
  },
  {
    id: 'executive-interior-spa',
    name: 'Executive Interior Spa & Leather Care',
    tagline: 'Hospital-grade steam sanitation & leather restoration',
    badge: 'Interior Specialist',
    basePrice: 159,
    estimatedTime: '2.0 - 3.0 Hours',
    popular: false,
    features: [
      'Comprehensive high-power vacuuming (trunk included)',
      'Hot water extraction on all upholstery & carpets',
      'Specialized stubborn stain treatment (coffee, grease, food spills)',
      'Deep leather steam clean, gentle brush agitation & pH balancing',
      'Premium lanolin & ceramic leather conditioner application',
      'Steamed air vents & antibacterial ozone odor mist',
      'Pet hair & dander removal (light to moderate)',
      'UV-blocking interior matte dressing (non-greasy, factory finish)',
      'Crystal-clear interior glass & touchscreen smudge removal'
    ],
    idealFor: 'Vehicles with spilled drinks, dirty leather, pet odor, or dust build-up'
  },
  {
    id: 'ceramic-paint-shield',
    name: 'Ceramic Coating & Paint Correction',
    tagline: 'Permanent glass-like gloss & 9H hydrophobic barrier',
    badge: 'Paint Perfection',
    basePrice: 420,
    estimatedTime: '5.0 - 7.0 Hours',
    popular: false,
    features: [
      'Multi-stage foam de-greaser & iron fallout chemical decontamination',
      'Synthetic clay towel decontamination on all painted panels & glass',
      'Single or dual-stage machine paint polish to remove 80-90% swirl marks',
      'Surface prep solvent wipe-down to ensure pure bonding',
      'Professional ceramic coating application (paint, plastics, headlights)',
      'Extreme water beading and self-cleaning hydrophobic properties',
      'UV fade and Florida sun oxidation protection',
      'Windshield rain-repellent hydrophobic treatment included',
      'Wheels ceramic coated for easy brake dust washing'
    ],
    idealFor: 'Enthusiasts, new luxury vehicles, and dark paint needing swirl removal'
  },
  {
    id: 'express-spa-wash',
    name: 'Express Mobile Spa Wash & Gloss',
    tagline: 'Quick precision maintenance wash at your convenience',
    basePrice: 89,
    estimatedTime: '1.0 - 1.5 Hours',
    popular: false,
    features: [
      'Gentle hand foam bath & spot-free deionized water rinse',
      'Tires cleaned, dressed, and rims wiped down',
      'Ultra-plush microfiber hand towel dry',
      'Fast cabin vacuum (mats & seats)',
      'Quick interior wipe-down of dashboard and center console',
      'Exterior windows cleaned crystal clear',
      'Fresh air interior scent'
    ],
    idealFor: 'Bi-weekly or monthly touch-ups for vehicles in good condition'
  },
  {
    id: 'commercial-fleet-detail',
    name: 'Commercial & Fleet Vehicle Detailing',
    tagline: 'Heavy-duty commercial vans, trucks & fleet haulers',
    badge: 'Fleet Specialists',
    basePrice: 220,
    estimatedTime: '3.0 - 4.5 Hours',
    popular: false,
    features: [
      'Heavy degreasing of road grime, bugs, and industrial fallout',
      'Pressure wash chassis and wheel arches',
      'Cab interior deep sanitation (steering wheel, levers, seats)',
      'Commercial carpet and vinyl floor scrub & high-power extraction',
      'Step bars, mirrors, and large rear cargo bays washed',
      'Odor elimination treatment for work trucks',
      'Volume fleet discount available for multiple company vehicles'
    ],
    idealFor: 'Service vans, contractor trucks, delivery fleets, and limos'
  }
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'headlight-restoration',
    name: 'Headlight Lens Optical Restoration',
    price: 65,
    description: 'Multi-stage wet sanding, compound, polish & ceramic UV clear coat sealant',
    duration: '+45 mins'
  },
  {
    id: 'engine-bay-detail',
    name: 'Engine Bay Deep Steam & Dressing',
    price: 55,
    description: 'Gentle degreasing, steam cleaning, and satin plastic/rubber protective dressing',
    duration: '+35 mins'
  },
  {
    id: 'pet-hair-removal',
    name: 'Heavy Pet Hair & Dander Extraction',
    price: 45,
    description: 'Specialized rubber brushes, pneumatic air-blowers & deep weave extraction',
    duration: '+40 mins'
  },
  {
    id: 'odor-bomb',
    name: 'Ozone Odor Bomb & Smoke Neutralizer',
    price: 60,
    description: 'Hospital-grade molecular ozone treatment destroying bacteria, smoke & mold spores',
    duration: '+30 mins'
  },
  {
    id: 'windshield-ceramic',
    name: 'Windshield Hydrophobic Ceramic Rain Guard',
    price: 40,
    description: 'Extreme rain-shedding coating for safety during intense Florida downpours',
    duration: '+20 mins'
  },
  {
    id: 'seat-extraction',
    name: 'Additional Hot Water Seat Shampoo',
    price: 50,
    description: 'Extra deep stain extraction for heavily soiled or child-seat stained fabrics',
    duration: '+30 mins'
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Giovanni Lombardi',
    badge: 'Local Guide · 82 reviews · 6 photos',
    rating: 5,
    date: '5 months ago',
    content: 'Great experience with AAA&JAY Mobile Detailing Spa. They showed up on time and did an amazing job on my car. The attention to detail was impressive and the vehicle looked brand new when they finished. Very professional and easy to work with. Highly recommend their services.',
    tags: ['mobile detailing', 'interior detailing'],
    avatarColor: 'bg-emerald-600',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Deborah Han',
    badge: '5 reviews · 4 photos',
    rating: 5,
    date: '4 years ago',
    content: 'Can\'t recommend AAA&JAY enough! My car looks and feels brand new. Marvin and his friend were extremely friendly and professional, and the work done on my car is way beyond my expectations. My seats had many stubborn stains from spilling and they completely vanished! Will definitely hire again.',
    tags: ['leather seat cleaning', 'interior detailing'],
    avatarColor: 'bg-amber-600',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Josh Jerry',
    badge: 'Local Guide · 35 reviews · 2 photos',
    rating: 5,
    date: '7 months ago',
    content: 'Great work and big thanks to Marvin. He arrived on a weekend due to scheduling issues during the week. He was on time and already working on a headlight restoration before I realized he was here. He did an excellent job on the headlights and the car looks incredible.',
    tags: ['headlight restoration', 'mobile detailing'],
    avatarColor: 'bg-blue-600',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Marcus Vance',
    badge: 'Verified Customer · Orlando, FL',
    rating: 5,
    date: '3 months ago',
    content: 'Great prices, great service, and a black-owned small business right here in Orlando. You can tell Marvin takes immense pride in his craft. Booked the Show Room Ready package for my wife\'s SUV and it was cleaner than when we bought it.',
    tags: ['mobile detailing', 'mobile car wash'],
    avatarColor: 'bg-indigo-600',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Kendra S.',
    badge: 'Veranda Park Resident · 12 reviews',
    rating: 5,
    date: '2 months ago',
    content: 'Extremely professional and high quality car wash and interior cleaning. Came right to my condo parking in Veranda Park. No hassle with hoses or cords—they have everything completely self-contained. The leather seats look supple and soft again.',
    tags: ['leather seat cleaning', 'mobile car wash'],
    avatarColor: 'bg-rose-600',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Carlos Delgado',
    badge: 'Local Guide · 48 reviews',
    rating: 5,
    date: '1 month ago',
    content: 'Good pricing for quality work — and you can tell they take pride in their work. Hand washed, bug removal, clay bar, and mirror shine paint. Marvin communicated every step of the way. 10/10 recommend!',
    tags: ['mobile detailing', 'mobile car wash'],
    avatarColor: 'bg-teal-600',
    verified: true
  }
];

export const SERVICE_AREAS = [
  { name: 'MetroWest / Veranda Park', zip: '32835', primary: true, note: 'Home Hub (0 min)' },
  { name: 'Dr. Phillips & Sand Lake', zip: '32819', primary: true, note: 'Primary Zone' },
  { name: 'Windermere & Isleworth', zip: '32836', primary: true, note: 'Primary Zone' },
  { name: 'Winter Garden', zip: '34787', primary: true, note: 'Primary Zone' },
  { name: 'Ocoee', zip: '34761', primary: true, note: 'Primary Zone' },
  { name: 'Downtown Orlando / Thornton Park', zip: '32801', primary: true, note: 'Primary Zone' },
  { name: 'Winter Park', zip: '32789', primary: true, note: 'Primary Zone' },
  { name: 'Lake Nona / Medical City', zip: '32827', primary: true, note: 'Primary Zone' },
  { name: 'Kissimmee / Hunters Creek', zip: '34741', primary: true, note: 'Primary Zone' },
  { name: 'Clermont', zip: '34711', primary: false, note: 'Extended Zone' },
  { name: 'Altamonte Springs', zip: '32701', primary: false, note: 'Extended Zone' },
  { name: 'Apopka', zip: '32703', primary: false, note: 'Extended Zone' }
];

export const FAQS = [
  {
    q: 'Do I need to supply water or an electrical outlet at my location?',
    a: 'No! AAA&JAY Mobile Detailing Spa is 100% self-sufficient. Our custom mobile detailing van carries an onboard 100-gallon deionized spot-free water tank and an ultra-quiet commercial generator. We can detail your vehicle in your residential driveway, office parking garage, apartment lot, or worksite.'
  },
  {
    q: 'What is included in the signature "Show Room Ready" package?',
    a: 'Show Room Ready is our flagship overhaul. We carefully remove the seats to access every square inch of carpet, perform hot water shampoo and extraction, clean the headliner, engine bay, execute a 2-stage exterior machine buff & wax to minimize scratches, detail wheels front and back, and restore cloudy headlights.'
  },
  {
    q: 'How long does a typical detailing appointment take?',
    a: 'An Express Spa wash takes about 1 to 1.5 hours. Full Interior & Exterior details take 2.5 to 3.5 hours. Our Show Room Ready overhaul takes 4 to 5.5 hours depending on vehicle size, pet hair, or stain severity. We never rush quality.'
  },
  {
    q: 'How do I pay, and is a deposit required?',
    a: 'We accept all major credit/debit cards, Apple Pay, Cash, and Zelle upon completion of the service. For standard bookings, you pay when the vehicle is completed and you have inspected Marvin\'s work.'
  },
  {
    q: 'What areas in Central Florida do you travel to?',
    a: 'Based in Veranda Park (Orlando FL 32835), we service MetroWest, Dr. Phillips, Windermere, Winter Garden, Ocoee, Downtown Orlando, Winter Park, Lake Nona, Kissimmee, and surrounding Central Florida communities within a 30-mile radius.'
  },
  {
    q: 'Can you remove tough stains, pet hair, and smoke odors?',
    a: 'Absolutely. We use commercial enzyme shampoos, pneumatic agitation tools, and hospital-grade ozone generators specifically designed to lift deep set-in stains and permanently eradicate smoke and organic pet odors.'
  }
];
