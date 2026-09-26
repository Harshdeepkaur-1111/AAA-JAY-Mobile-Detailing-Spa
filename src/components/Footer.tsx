import React from 'react';
import { Star, ShieldCheck, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenGmbModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenGmbModal }) => {
  return (
    <footer className="bg-[#060910] border-t border-white/10 text-slate-400 text-xs sm:text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-display font-bold text-slate-950 text-lg">
                A
              </div>
              <div className="font-display font-bold text-lg text-white">
                {BUSINESS_INFO.name}
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm max-w-sm">
              Orlando&apos;s 5-star mobile automotive spa. We deliver hospital-grade steam extraction, scratch-free hand washes, leather rejuvenation, and Show Room Ready vehicle overhauls directly to your driveway.
            </p>

            {/* Google Rating Verification Box */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1.5 max-w-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Google My Business Rating</span>
                <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {BUSINESS_INFO.rating} / 5.0
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                202 Verified Google Reviews · Black-Owned Small Business
              </div>
              <button
                onClick={onOpenGmbModal}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mt-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verify Google Maps Profile</span>
              </button>
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Show Room Ready Spa
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Full Interior &amp; Exterior
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Leather Steam Sanitization
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Headlight Lens Restoration
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Ceramic Paint Shield
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Fleet &amp; Commercial Vans
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas (Col 4) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Orlando Territory</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>MetroWest / Veranda Park (32835)</li>
              <li>Dr. Phillips &amp; Sand Lake (32819)</li>
              <li>Windermere &amp; Isleworth (32836)</li>
              <li>Winter Garden &amp; Ocoee (34787)</li>
              <li>Downtown Orlando &amp; Thornton Park</li>
              <li>Lake Nona &amp; Winter Park</li>
            </ul>
          </div>

          {/* Contact & Hours (Col 5) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact &amp; Location</h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{BUSINESS_INFO.address}</div>
                  <div>Orlando, FL 32835</div>
                  <div className="text-[11px] text-amber-300 font-mono mt-0.5">Plus Code: {BUSINESS_INFO.plusCode}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${BUSINESS_INFO.rawPhone}`} className="text-white hover:text-amber-400 font-semibold transition-colors">
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-[11px] text-slate-500">Call or Text Marvin</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Tue – Sat: 9:30 AM – 6:30 PM</div>
                  <div className="text-[11px] text-slate-500">Sun – Mon: By Appointment</div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Schedule Mobile Visit</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenGmbModal}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Google Maps Listing</span>
            </button>
            <span className="text-slate-700">·</span>
            <span>Mobile Detailing Orlando FL</span>
            <span className="text-slate-700">·</span>
            <span>Hand Wash &amp; Interior Extraction</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
