import React, { useState } from 'react';
import { Check, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { DETAILING_PACKAGES, VEHICLE_OPTIONS } from '../data/detailingData';
import { VehicleType } from '../types';

interface ServicePackagesProps {
  onSelectPackage: (packageId: string, vehicleType: VehicleType) => void;
}

export const ServicePackages: React.FC<ServicePackagesProps> = ({ onSelectPackage }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('sedan');

  const currentVehicleOption = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  const calculatePrice = (basePrice: number) => {
    return Math.round(basePrice * currentVehicleOption.multiplier);
  };

  return (
    <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Transparent Mobile Pricing · No Hidden Surcharges
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
          Signature Detailing Spa Packages
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Choose your vehicle category below to view instant, accurate pricing. Every service includes spot-free water, eco-safe premium foam, and hand-delivered craftsmanship directly to your location.
        </p>

        {/* Interactive Vehicle Size Selector (Functional Buttons) */}
        <div className="pt-6">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 gap-1.5 shadow-xl">
            {VEHICLE_OPTIONS.map((option) => {
              const isSelected = selectedVehicle === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedVehicle(option.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-bold">{option.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                    {option.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {DETAILING_PACKAGES.map((pkg) => {
          const price = calculatePrice(pkg.basePrice);
          const isShowroom = pkg.id === 'showroom-ready';

          return (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                isShowroom
                  ? 'glass-panel-amber glow-amber border-2 border-amber-500/50 p-7 lg:-translate-y-2'
                  : 'glass-panel p-7 hover:border-white/20'
              }`}
            >
              {/* Flagship Badge if applicable */}
              {pkg.badge && (
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <div className="flex items-center gap-1.5">
                    {isShowroom ? <Sparkles className="w-4 h-4 text-amber-400" /> : <ShieldCheck className="w-4 h-4 text-cyan-400" />}
                    <span>{pkg.badge}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-[11px] normal-case">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.estimatedTime}</span>
                  </div>
                </div>
              )}

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                  {pkg.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-white/10 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-400">
                    / for {currentVehicleOption.label.split('/')[0]}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Ideal For & CTA */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="text-[11px] text-slate-400 italic">
                  <strong className="text-slate-300 not-italic">Ideal for:</strong> {pkg.idealFor}
                </div>

                <button
                  onClick={() => onSelectPackage(pkg.id, selectedVehicle)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    isShowroom
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                  }`}
                >
                  <span>Select &amp; Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
