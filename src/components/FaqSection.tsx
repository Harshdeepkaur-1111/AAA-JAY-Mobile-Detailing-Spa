import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/detailingData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Frequently Asked Questions
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Got questions about our mobile setup, water requirements, or booking process? Here are the answers.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-slate-900/90 border-amber-500/30 shadow-lg'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="font-bold text-white text-base sm:text-lg">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions prompt */}
      <div className="mt-10 p-6 rounded-2xl bg-slate-900/50 border border-white/5 text-center space-y-3">
        <p className="text-sm text-slate-300">
          Have a unique vehicle, boat, RV, or custom request not answered above?
        </p>
        <a
          href={`tel:${BUSINESS_INFO.rawPhone}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs sm:text-sm transition-colors border border-amber-500/20"
        >
          <Phone className="w-4 h-4" />
          <span>Call or Text Marvin Directly: {BUSINESS_INFO.phone}</span>
        </a>
      </div>
    </section>
  );
};
