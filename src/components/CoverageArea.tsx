import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, Droplets, Zap, Shield, Phone } from 'lucide-react';
import { SERVICE_AREAS, BUSINESS_INFO } from '../data/detailingData';

interface CoverageAreaProps {
  onOpenBooking: () => void;
}

export const CoverageArea: React.FC<CoverageAreaProps> = ({ onOpenBooking }) => {
  const [zipInput, setZipInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    tested: boolean;
    covered: boolean;
    primary: boolean;
    areaName?: string;
    zone?: string;
    eta?: string;
    hubDistance?: string;
  }>({
    tested: false,
    covered: false,
    primary: false
  });

  const handleZipCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    setIsChecking(true);
    try {
      const res = await fetch('/api/check-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode: cleanZip })
      });
      const data = await res.json();
      const match = SERVICE_AREAS.find((a) => a.zip === cleanZip);

      setCheckResult({
        tested: true,
        covered: data.covered,
        primary: data.zone?.includes('Primary') || !!match?.primary,
        areaName: match ? match.name : (data.covered ? 'Greater Orlando Metro' : undefined),
        zone: data.zone,
        eta: data.eta,
        hubDistance: data.hubDistance
      });
    } catch (err) {
      // Offline fallback
      const match = SERVICE_AREAS.find((a) => a.zip === cleanZip);
      setCheckResult({
        tested: true,
        covered: !!match || cleanZip.startsWith('328') || cleanZip.startsWith('347'),
        primary: match?.primary ?? true,
        areaName: match?.name || 'Orlando Area'
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section id="coverage" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Background gradient decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Information & Zip Checker */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Service Radius &amp; Mobile Dispatch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                Where We Detail in Greater Orlando
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Operating directly from our home base at Veranda Park (2121 S Hiawassee Rd, Orlando FL 32835), we travel within a 30-mile radius across Orange, Seminole, and Osceola counties.
              </p>
            </div>

            {/* Interactive Zip Code Checker */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Check Your Zip Code for Free Mobile Dispatch
              </label>

              <form onSubmit={handleZipCheck} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="Enter 5-digit zip code (e.g. 32835, 32819)"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Area</span>
                </button>
              </form>

              {/* Result Notification */}
              {checkResult.tested && (
                <div className="pt-2 animate-fadeIn">
                  {checkResult.covered ? (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          <strong>Service Confirmed!</strong> Zip code <strong>{zipInput}</strong> ({checkResult.areaName}) is in our active mobile detailing zone.
                        </span>
                      </div>
                      <button
                        onClick={onOpenBooking}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          Outside our standard online map. Call Marvin directly at <strong>{BUSINESS_INFO.phone}</strong> for custom extended travel booking.
                        </span>
                      </div>
                      <a
                        href={`tel:${BUSINESS_INFO.rawPhone}`}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shrink-0"
                      >
                        Call Now
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Self-Sufficient Van Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>Onboard Spot-Free Water</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Zero water hookups needed from your property. Deionized filtration for zero water spots.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Silent Generator</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Commercial inverter power generator powers our high-pressure extractors quietly.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Apartment &amp; Office Friendly</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Compliant with parking garage regulations in Veranda Park, Downtown, &amp; corporate parks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Service Towns & Visual Coverage Map */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-white text-sm">Key Central Florida Communities</h3>
                <span className="text-[11px] text-emerald-400 font-semibold">● Live Mobile Units</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                {SERVICE_AREAS.slice(0, 10).map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <div className="truncate">
                      <div className="font-medium text-white truncate">{area.name}</div>
                      <div className="text-[10px] text-slate-400">{area.zip}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hub Location Box */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-amber-300">Operational Hub</div>
                <div>{BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zip}</div>
                <div className="text-[11px] text-slate-400">Plus Code: {BUSINESS_INFO.plusCode}</div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Mobile Detailing at Your Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
