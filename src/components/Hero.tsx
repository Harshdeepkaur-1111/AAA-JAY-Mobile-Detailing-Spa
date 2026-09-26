import React from 'react';
import { Star, ShieldCheck, ArrowRight, Phone, Sparkles, Droplets, Zap, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenGmbModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenGmbModal }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16">
      {/* Background Hero Image with Automotive Tint & Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_detailing_spa_1790404750990.jpg"
          alt="AAA&JAY Mobile Car Detailing Spa in Orlando Florida"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
        />
        {/* Multi-layered dark gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/85 to-[#090d16]/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d16]/95 via-[#090d16]/75 to-transparent"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Zero-Pill Clean Editorial Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 Star Rated (202 Reviews)</span>
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <button
              onClick={onOpenGmbModal}
              className="text-slate-300 hover:text-white underline underline-offset-4 decoration-amber-500/60 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google My Business Verified</span>
            </button>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">Veranda Park, Orlando FL</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              Orlando&apos;s Elite{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Mobile Detailing Spa
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              We bring showroom perfection, hospital-grade steam extraction, and multi-stage paint correction directly to your home or office. Marvin and the team arrive with 100% onboard deionized water and power.
            </p>
          </div>

          {/* Key Value Highlights (Zero-Pill Minimal List) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Spot-Free Deionized Water</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Silent Onboard Generator</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>&ldquo;Show Room Ready&rdquo; Seats-Out Detail</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
            >
              <span>Book Your Spa Detail</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#packages"
              className="px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base border border-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>View Packages &amp; Pricing</span>
            </a>
          </div>

          {/* Quick Call Direct Bar */}
          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400">
            <span>Need same-day dispatch or custom fleet quote?</span>
            <a
              href={`tel:${BUSINESS_INFO.rawPhone}`}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Marvin at {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Trust Metrics Box (Desktop Lower Right) */}
      <div className="hidden xl:block absolute bottom-12 right-12 z-10 max-w-sm glass-panel p-5 rounded-2xl border border-white/10 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Google Maps Listing
            </span>
          </div>
          <span className="text-xs text-amber-400 font-bold">4.9 ★★★★★</span>
        </div>
        <div className="py-3 text-xs text-slate-300 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Verified Reviews:</span>
            <span className="font-semibold text-white">202 customer reviews</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Hub Location:</span>
            <span className="font-semibold text-white">Veranda Park, Orlando</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Service Coverage:</span>
            <span className="font-semibold text-white">Orlando &amp; 30-Mile Radius</span>
          </div>
        </div>
        <button
          onClick={onOpenGmbModal}
          className="w-full mt-1 py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Inspect Google Business Details</span>
        </button>
      </div>
    </section>
  );
};
