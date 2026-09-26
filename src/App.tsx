import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GmbStatusBanner } from './components/GmbStatusBanner';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicePackages } from './components/ServicePackages';
import { ReviewsSection } from './components/ReviewsSection';
import { CoverageArea } from './components/CoverageArea';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GmbVerificationModal } from './components/GmbVerificationModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from './data/detailingData';
import { VehicleType } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGmbModalOpen, setIsGmbModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('showroom-ready');
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>('sedan');

  const handleOpenBooking = (packageId?: string, vehicleType?: VehicleType) => {
    if (packageId) setSelectedPackageId(packageId);
    if (vehicleType) setSelectedVehicleType(vehicleType);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenGmbModal={() => setIsGmbModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenGmbModal={() => setIsGmbModalOpen(true)}
        />

        {/* Google My Business Verification & Showcase Banner */}
        <GmbStatusBanner
          onOpenGmbModal={() => setIsGmbModalOpen(true)}
        />

        {/* Interactive Before & After Transformation Slider */}
        <BeforeAfterSlider />

        {/* Service Packages & Vehicle Pricing Calculator */}
        <ServicePackages
          onSelectPackage={(pkgId, vehicle) => handleOpenBooking(pkgId, vehicle)}
        />

        {/* Verified Google Reviews Showcase */}
        <ReviewsSection
          onOpenGmbModal={() => setIsGmbModalOpen(true)}
        />

        {/* Service Radius & Orlando Coverage Zip Checker */}
        <CoverageArea
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* About Marvin & Philosophy */}
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenGmbModal={() => setIsGmbModalOpen(true)}
      />

      {/* Floating Bottom Quick Action Bar for Mobile Viewports */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#090d16]/95 backdrop-blur-lg border-t border-white/10 flex items-center gap-2">
        <a
          href={`tel:${BUSINESS_INFO.rawPhone}`}
          className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Marvin</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex-[1.5] py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Detailing</span>
        </button>
      </div>

      {/* Interactive Booking & Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={selectedPackageId}
        initialVehicleType={selectedVehicleType}
      />

      {/* Google My Business Verification Modal */}
      <GmbVerificationModal
        isOpen={isGmbModalOpen}
        onClose={() => setIsGmbModalOpen(false)}
      />

      {/* Marvin's Dispatch & Operations Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
