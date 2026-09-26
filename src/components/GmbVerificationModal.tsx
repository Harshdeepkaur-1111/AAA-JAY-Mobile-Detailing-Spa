import React from 'react';
import { MapPin, Star, Phone, Clock, ExternalLink, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface GmbVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GmbVerificationModal: React.FC<GmbVerificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0f172a] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Google Colors & Verified Badge */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            <ShieldCheck className="w-4 h-4" />
            Verified Google Business Profile
          </div>
          
          <h2 className="text-2xl font-bold text-white font-display">
            {BUSINESS_INFO.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{BUSINESS_INFO.rating}</span>
            </div>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300 underline underline-offset-4 decoration-amber-500/50">
              {BUSINESS_INFO.reviewCount} Verified Google Reviews
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Car Detailing Service</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Verification Status Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold text-emerald-300">Google My Business Status: 100% Active &amp; Verified</span>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Yes! This business is officially registered and active on Google Maps &amp; Google Search as a premier mobile car detailing spa in Orlando, FL with over 200 authentic five-star customer reviews.
              </p>
            </div>
          </div>

          {/* Business Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Physical Hub &amp; Address</div>
                  <div className="text-slate-300 mt-0.5">{BUSINESS_INFO.address}</div>
                  <div className="text-slate-400 text-xs mt-1">{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zip}</div>
                  <div className="text-xs text-amber-300/80 mt-1.5 font-mono">Plus Code: {BUSINESS_INFO.plusCode}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-white/5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Operating Hours</div>
                  <div className="text-slate-300 mt-0.5">{BUSINESS_INFO.hours}</div>
                  <div className="text-xs text-emerald-400 mt-1">● Mobile dispatch across Greater Orlando</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Direct Phone Contact</div>
                  <a 
                    href={`tel:${BUSINESS_INFO.rawPhone}`} 
                    className="text-amber-400 font-semibold text-base hover:underline block mt-0.5"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-xs text-slate-400 mt-1">Direct contact with Marvin (Owner &amp; Lead Detailer)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="font-medium text-white mb-1">Key Google Tags</div>
                <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
                  <span>leather seat cleaning</span>
                  <span className="text-slate-600">·</span>
                  <span>interior detailing</span>
                  <span className="text-slate-600">·</span>
                  <span>mobile detailing</span>
                  <span className="text-slate-600">·</span>
                  <span>mobile car wash</span>
                  <span className="text-slate-600">·</span>
                  <span>headlight restoration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Review Quote Preview */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Google Maps Review Highlight</div>
            <p className="text-slate-200 italic text-sm">
              &ldquo;Great experience with AAA&amp;JAY Mobile Detailing Spa. They showed up on time and did an amazing job on my car. The attention to detail was impressive and the vehicle looked brand new when they finished. Very professional and easy to work with.&rdquo;
            </p>
            <div className="text-xs text-slate-400 font-medium">
              — Giovanni Lombardi (Local Guide · 82 reviews · 6 photos)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={BUSINESS_INFO.gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              Open Live Google Maps Listing
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
