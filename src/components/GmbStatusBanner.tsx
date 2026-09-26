import React from 'react';
import { Star, ShieldCheck, MapPin, Phone, Clock, ExternalLink, CheckCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface GmbStatusBannerProps {
  onOpenGmbModal: () => void;
}

export const GmbStatusBanner: React.FC<GmbStatusBannerProps> = ({ onOpenGmbModal }) => {
  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 shadow-2xl bg-gradient-to-r from-slate-900/95 via-[#0e1626]/95 to-slate-900/95 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Google Verification Status */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Google My Business Profile Verified · 100% Authentic Listing</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {BUSINESS_INFO.name}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white ml-1">4.9 / 5.0</span>
              </div>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-medium">{BUSINESS_INFO.reviewCount} Reviews</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Orlando, Florida</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
              Confirmed on Google Maps: Operating from Veranda Park (Orlando FL 32835) with mobile dispatch units throughout Central Florida. Top-rated for leather seat restoration, interior steam shampooing, headlight recovery, and showroom detailing.
            </p>
          </div>

          {/* Right: Quick Location Info & Google Button */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch lg:items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
            <div className="space-y-1 text-xs text-slate-300 pr-2">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{BUSINESS_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300/90 font-mono text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Plus Code: {BUSINESS_INFO.plusCode}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 sm:pt-0">
              <button
                onClick={onOpenGmbModal}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>View GMB Details</span>
              </button>

              <a
                href={BUSINESS_INFO.gmbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
