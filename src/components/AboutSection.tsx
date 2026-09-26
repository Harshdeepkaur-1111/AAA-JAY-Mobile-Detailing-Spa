import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';
import interiorSpaImg from '../assets/images/interior_spa_detail_1790404770476.jpg';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image Collage / Visual Proof */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={interiorSpaImg}
              alt="AAA&JAY Mobile Detailing Spa Interior Craftsmanship"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            {/* Overlay Quote Badge */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-xs text-slate-300">
              <p className="italic text-slate-200">
                &ldquo;You can tell Marvin takes genuine pride in his work. He arrives on time and goes beyond what ordinary car washes even attempt.&rdquo;
              </p>
              <div className="mt-1 font-semibold text-amber-400">— Verified Orlando Google Review</div>
            </div>
          </div>

          {/* Decorative Stat Card */}
          <div className="absolute -top-4 -right-4 p-4 rounded-xl glass-panel-amber border border-amber-500/40 shadow-xl hidden sm:block">
            <div className="text-2xl font-bold font-display text-white">4.9 ★</div>
            <div className="text-[11px] text-amber-300/90 font-medium">200+ Verified Customers</div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Meet Marvin &amp; The Detailing Spa Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
              Why We Call It a &ldquo;Detailing Spa&rdquo;
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Most automated drive-throughs and budget car washes use scratchy nylon brushes, recycled salty water, and harsh acid cleaners that strip clear coats and ruin delicate leather.
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            At <strong>AAA&amp;JAY Mobile Detailing Spa</strong>, founded and led by Marvin in Orlando, Florida, we treat your vehicle with the precision of a high-end spa. Whether performing our signature <em>&ldquo;Show Room Ready&rdquo;</em> overhaul—where we unbolt seats to shampoo carpets from wall to wall—or restoring cloudy headlight lenses with optical polish, our team delivers dealership-exceeding transformations.
          </p>

          {/* Pillars of AAA&JAY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">100% Hand Wash &amp; Paint Safe</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Two-bucket swirl-free wash method, microfiber towels, and pH-neutral foam shampoos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Hospital-Grade Steam Sanitization</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  210°F commercial steam kills 99.9% of bacteria, allergens, and odors embedded in vents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Locally Owned &amp; Operated</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proud black-owned small business based at Veranda Park in Orlando, FL.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Satisfaction Inspection</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  You inspect the car with Marvin before any payment is made. Zero compromises.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Reserve Marvin for Your Vehicle
            </button>

            <a
              href={`tel:${BUSINESS_INFO.rawPhone}`}
              className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Direct Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
