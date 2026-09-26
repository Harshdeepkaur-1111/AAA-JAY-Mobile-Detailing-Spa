import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data directory setup
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Initial seed bookings for Marvin (AAA&JAY Mobile Detailing Spa)
const INITIAL_BOOKINGS = [
  {
    id: 'AAA-9142',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: 'Completed',
    vehicleType: 'suv',
    vehicleMake: 'BMW',
    vehicleModel: 'X5 M Sport',
    vehicleYear: '2023',
    packageId: 'showroom-ready',
    packageName: 'Show Room Ready Signature Spa',
    price: 341,
    addons: ['headlight-restoration', 'odor-bomb'],
    preferredDate: '2026-09-24',
    preferredTime: '09:30 AM',
    fullName: 'David Sterling',
    phone: '(321) 402-8819',
    email: 'dsterling@orlandotech.io',
    address: '8803 Conroy Windermere Rd',
    city: 'Windermere',
    zipCode: '32836',
    specialNotes: 'Gate code #4491. Key in lockbox or I will be home.',
    notes: 'Completed full 2-stage polish and seats extraction. Customer left $50 cash tip.'
  },
  {
    id: 'AAA-8420',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Confirmed',
    vehicleType: 'sedan',
    vehicleMake: 'Porsche',
    vehicleModel: 'Taycan 4S',
    vehicleYear: '2024',
    packageId: 'ceramic-paint-shield',
    packageName: 'Ceramic Coating & Paint Correction',
    price: 420,
    addons: ['windshield-ceramic'],
    preferredDate: '2026-09-26',
    preferredTime: '09:30 AM',
    fullName: 'Elena Rostova',
    phone: '(407) 912-3044',
    email: 'elena.rostova@gmail.com',
    address: '2200 Veranda Park Dr, Unit 312',
    city: 'Orlando',
    zipCode: '32835',
    specialNotes: 'Please detail in the resident covered parking structure space #54.',
    notes: 'Confirmed by Marvin via SMS. Spot-free water onboard.'
  },
  {
    id: 'AAA-7309',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'En Route',
    vehicleType: 'truck',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150 Lightning Platinum',
    vehicleYear: '2023',
    packageId: 'full-interior-exterior',
    packageName: 'Full Interior & Exterior Detail',
    price: 255,
    addons: ['engine-bay-detail', 'pet-hair-removal'],
    preferredDate: '2026-09-26',
    preferredTime: '01:00 PM',
    fullName: 'Travis Coleman',
    phone: '(321) 880-9112',
    email: 'travis.c@colemanroofing.com',
    address: '7600 Sand Lake Rd',
    city: 'Dr. Phillips',
    zipCode: '32819',
    specialNotes: 'Dog hair in back passenger area. Commercial office parking lot.',
    notes: 'Marvin en route with mobile van.'
  },
  {
    id: 'AAA-6552',
    createdAt: new Date().toISOString(),
    status: 'Pending',
    vehicleType: 'suv',
    vehicleMake: 'Mercedes-Benz',
    vehicleModel: 'GLE 450',
    vehicleYear: '2022',
    packageId: 'executive-interior-spa',
    packageName: 'Executive Interior Spa & Leather Care',
    price: 188,
    addons: ['seat-extraction'],
    preferredDate: '2026-09-27',
    preferredTime: '09:30 AM',
    fullName: 'Monique Taylor',
    phone: '(407) 555-4321',
    email: 'mtaylor@orlandolaw.com',
    address: '1410 Celebration Ave',
    city: 'Celebration',
    zipCode: '34747',
    specialNotes: 'Kid spilled smoothie on rear middle seat. Needs deep extraction.',
    notes: 'Awaiting phone confirmation.'
  }
];

// Seed reviews
const INITIAL_REVIEWS = [
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

// Helper functions for persistent data
function getBookings() {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(INITIAL_BOOKINGS, null, 2));
      return INITIAL_BOOKINGS;
    }
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading bookings file:', err);
    return INITIAL_BOOKINGS;
  }
}

function saveBookings(bookings: any[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (err) {
    console.error('Error saving bookings file:', err);
  }
}

function getReviews() {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(INITIAL_REVIEWS, null, 2));
      return INITIAL_REVIEWS;
    }
    const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading reviews file:', err);
    return INITIAL_REVIEWS;
  }
}

function saveReviews(reviews: any[]) {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
  } catch (err) {
    console.error('Error saving reviews file:', err);
  }
}

function getInquiries() {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveInquiries(inquiries: any[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  } catch (err) {
    console.error('Error saving inquiries file:', err);
  }
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// 1. Health check & business identity
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    business: 'AAA&JAY MOBILE DETAILING SPA',
    city: 'Orlando, FL',
    serverTime: new Date().toISOString(),
    gmbVerified: true,
    rating: 4.9,
    reviews: 202
  });
});

// 2. GET all bookings (with optional status filtering)
app.get('/api/bookings', (req: Request, res: Response) => {
  const { status, search } = req.query;
  let bookings = getBookings();

  if (status && status !== 'All') {
    bookings = bookings.filter((b: any) => b.status?.toLowerCase() === (status as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    bookings = bookings.filter((b: any) =>
      b.fullName?.toLowerCase().includes(q) ||
      b.phone?.includes(q) ||
      b.id?.toLowerCase().includes(q) ||
      b.vehicleModel?.toLowerCase().includes(q) ||
      b.vehicleMake?.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q)
    );
  }

  // Sort latest first
  bookings.sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  res.json({ success: true, count: bookings.length, data: bookings });
});

// 3. POST create new booking
app.post('/api/bookings', (req: Request, res: Response) => {
  const {
    vehicleType,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    packageId,
    packageName,
    price,
    addons,
    preferredDate,
    preferredTime,
    fullName,
    phone,
    email,
    address,
    city,
    zipCode,
    specialNotes
  } = req.body;

  if (!fullName || !phone || !address || !preferredDate) {
    return res.status(400).json({
      success: false,
      error: 'Missing required booking details (Name, Phone, Address, Preferred Date)'
    });
  }

  const bookings = getBookings();
  const newId = `AAA-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    vehicleType: vehicleType || 'sedan',
    vehicleMake: vehicleMake || 'Vehicle',
    vehicleModel: vehicleModel || '',
    vehicleYear: vehicleYear || '',
    packageId: packageId || 'showroom-ready',
    packageName: packageName || 'Show Room Ready Signature Spa',
    price: Number(price) || 289,
    addons: Array.isArray(addons) ? addons : [],
    preferredDate,
    preferredTime: preferredTime || '09:30 AM',
    fullName,
    phone,
    email: email || '',
    address,
    city: city || 'Orlando',
    zipCode: zipCode || '32835',
    specialNotes: specialNotes || '',
    notes: 'Online booking confirmed. Auto-assigned to Marvin mobile dispatch.'
  };

  bookings.unshift(newBooking);
  saveBookings(bookings);

  console.log(`[AAA&JAY Backend] New mobile detailing booking received: ${newId} for ${fullName} in ${city} FL`);

  res.status(201).json({
    success: true,
    message: 'Booking created and confirmed successfully',
    data: newBooking
  });
});

// 4. PATCH update booking status or notes (Admin Dispatch)
app.patch('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes, preferredDate, preferredTime } = req.body;

  const bookings = getBookings();
  const index = bookings.findIndex((b: any) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  if (status) bookings[index].status = status;
  if (notes !== undefined) bookings[index].notes = notes;
  if (preferredDate) bookings[index].preferredDate = preferredDate;
  if (preferredTime) bookings[index].preferredTime = preferredTime;

  saveBookings(bookings);

  res.json({
    success: true,
    message: `Booking ${id} updated`,
    data: bookings[index]
  });
});

// 5. DELETE cancel booking
app.delete('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let bookings = getBookings();
  const existing = bookings.find((b: any) => b.id === id);

  if (!existing) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  bookings = bookings.filter((b: any) => b.id !== id);
  saveBookings(bookings);

  res.json({ success: true, message: `Booking ${id} cancelled successfully` });
});

// 6. GET Admin stats / metrics
app.get('/api/admin/metrics', (req: Request, res: Response) => {
  const bookings = getBookings();
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (Number(b.price) || 0), 0);
  const activeJobs = bookings.filter((b: any) => ['Pending', 'Confirmed', 'En Route', 'In Progress'].includes(b.status)).length;
  const completedJobs = bookings.filter((b: any) => b.status === 'Completed').length;
  const avgOrderValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

  res.json({
    success: true,
    metrics: {
      totalBookings,
      totalRevenue,
      activeJobs,
      completedJobs,
      avgOrderValue,
      serviceLocation: 'Orlando, FL (Veranda Park)',
      vanStatus: 'Active & Dispatched',
      waterTankLevel: '95% Deionized Pure Water'
    }
  });
});

// 7. GET reviews
app.get('/api/reviews', (req: Request, res: Response) => {
  const { tag } = req.query;
  let reviews = getReviews();

  if (tag && tag !== 'all') {
    reviews = reviews.filter((r: any) => r.tags?.includes(tag as string));
  }

  res.json({
    success: true,
    total: reviews.length,
    averageRating: 4.9,
    gmbReviewCount: 202,
    data: reviews
  });
});

// 8. POST create customer review
app.post('/api/reviews', (req: Request, res: Response) => {
  const { author, rating, content, tags } = req.body;

  if (!author || !rating || !content) {
    return res.status(400).json({ success: false, error: 'Author, rating, and review text are required' });
  }

  const reviews = getReviews();
  const colors = ['bg-emerald-600', 'bg-blue-600', 'bg-amber-600', 'bg-purple-600', 'bg-rose-600', 'bg-teal-600'];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  const newReview = {
    id: `rev-${Date.now()}`,
    author,
    badge: 'Verified Orlando Client · Direct Website Review',
    rating: Math.min(5, Math.max(1, Number(rating))),
    date: 'Just now',
    content,
    tags: Array.isArray(tags) && tags.length > 0 ? tags : ['mobile detailing'],
    avatarColor,
    verified: true
  };

  reviews.unshift(newReview);
  saveReviews(reviews);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your review has been posted.',
    data: newReview
  });
});

// 9. POST Zip code service checker API
app.post('/api/check-zip', (req: Request, res: Response) => {
  const { zipCode } = req.body;
  if (!zipCode) {
    return res.status(400).json({ success: false, error: 'Zip code is required' });
  }

  const cleanZip = String(zipCode).trim();
  const primaryZips = ['32835', '32819', '32836', '34787', '34761', '32801', '32789', '32827', '34741'];
  const extendedZips = ['34711', '32701', '32703', '32825', '32828', '34747'];

  if (primaryZips.includes(cleanZip)) {
    return res.json({
      success: true,
      covered: true,
      zone: 'Primary Hub Zone',
      travelFee: 0,
      eta: 'Immediate / Next-Day Dispatch',
      hubDistance: 'Under 15 miles from Veranda Park'
    });
  } else if (extendedZips.includes(cleanZip) || cleanZip.startsWith('328') || cleanZip.startsWith('347') || cleanZip.startsWith('327')) {
    return res.json({
      success: true,
      covered: true,
      zone: 'Greater Orlando Extended Zone',
      travelFee: 0,
      eta: 'Scheduled Mobile Dispatch',
      hubDistance: '15 - 30 miles from Veranda Park'
    });
  } else {
    return res.json({
      success: true,
      covered: false,
      zone: 'Outside Regular Radius',
      message: 'Outside standard automated dispatch. Call Marvin for special travel accommodations.'
    });
  }
});

// 10. POST contact message
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, phone, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and phone are required' });
  }

  const inquiries = getInquiries();
  const newInquiry = {
    id: `INQ-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name,
    phone,
    message: message || '',
    status: 'Unread'
  };

  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  res.status(201).json({
    success: true,
    message: 'Message delivered to Marvin',
    data: newInquiry
  });
});

// -------------------------------------------------------------
// VITE MIDDLEWARE (DEV) OR STATIC FILES (PROD)
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('[AAA&JAY Backend] Vite dev middleware attached');
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
    console.log('[AAA&JAY Backend] Serving static build from dist');
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`✨ AAA&JAY MOBILE DETAILING SPA FULL-STACK SERVER`);
    console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
    console.log(`📍 Hub: 2121 S Hiawassee Rd, Orlando, FL 32835`);
    console.log(`⭐ Google Rating: 4.9 (202 Verified Reviews)`);
    console.log(`=======================================================`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export default app;
