import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Star, ShieldCheck, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenGmbModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenGmbModal, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar for Google Verification & Quick Call */}
      <aside aria-label="Announcement" className="bg-[#080c14] border-b border-white/5 py-2 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">Serving Greater Orlando &amp; Central FL</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <button
              onClick={onOpenGmbModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Google My Business Listing (4.9★ / 202 Reviews)</span>
            </button>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline">Veranda Park, Orlando</span>
            </div>
            <span className="text-slate-600">·</span>
            <a
              href={`tel:${BUSINESS_INFO.rawPhone}`}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/40 py-3'
            : 'bg-[#090d16]/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-display font-extrabold text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-2">
                <span>AAA&amp;JAY</span>
                <span className="text-xs font-semibold text-amber-400 tracking-wider font-sans uppercase">
                  Mobile Spa
                </span>
              </div>
              <div className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
                Premier Auto Detailing · Orlando, FL
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#packages" className="hover:text-amber-400 transition-colors">
              Packages &amp; Pricing
            </a>
            <a href="#transformations" className="hover:text-amber-400 transition-colors">
              Before &amp; After
            </a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>Reviews</span>
              <span className="flex items-center text-xs text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold ml-0.5">4.9</span>
              </span>
            </a>
            <a href="#coverage" className="hover:text-amber-400 transition-colors">
              Service Area
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About Marvin
            </a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="text-xs text-amber-400/90 hover:text-amber-300 px-2.5 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/50 bg-amber-500/5 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Marvin's Dispatch Operations"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Owner Dispatch</span>
            </button>

            <button
              onClick={onOpenGmbModal}
              className="text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>GMB Verified</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#090d16]/98 backdrop-blur-xl px-4 py-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 text-base font-medium text-slate-200">
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Packages &amp; Pricing
              </a>
              <a
                href="#transformations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Before &amp; After Results
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>Google Reviews</span>
                <span className="text-amber-400 text-sm font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  4.9 (202)
                </span>
              </a>
              <a
                href="#coverage"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Orlando Service Areas
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                About Marvin &amp; The Team
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                FAQ
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Open Owner Dispatch &amp; Operations Center</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGmbModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-amber-500/30 text-amber-300 text-sm font-medium hover:bg-amber-500/10 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify Google My Business Profile</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Detailing Appointment</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Marvin: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
