import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, ExternalLink, ThumbsUp, MessageSquare, PenTool } from 'lucide-react';
import { GOOGLE_REVIEWS, BUSINESS_INFO } from '../data/detailingData';
import { WriteReviewModal } from './WriteReviewModal';
import { GoogleReview } from '../types';

interface ReviewsSectionProps {
  onOpenGmbModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenGmbModal }) => {
  const [activeTag, setActiveTag] = useState<string>('all');
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const fetchLiveReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setReviews(data.data);
      }
    } catch (err) {
      console.warn('Using local reviews snapshot:', err);
    }
  };

  useEffect(() => {
    fetchLiveReviews();
  }, []);

  const availableTags = [
    { id: 'all', label: `All Reviews (${reviews.length})` },
    { id: 'leather seat cleaning', label: 'Leather Seat Cleaning' },
    { id: 'interior detailing', label: 'Interior Detailing' },
    { id: 'mobile detailing', label: 'Mobile Detailing' },
    { id: 'mobile car wash', label: 'Mobile Car Wash' },
    { id: 'headlight restoration', label: 'Headlight Restoration' }
  ];

  const filteredReviews = activeTag === 'all'
    ? reviews
    : reviews.filter((r) => r.tags?.some((t) => t.toLowerCase().includes(activeTag.toLowerCase())));

  return (
    <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Real Orlando Customer Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Verified 4.9★ Google Reputation
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Over 200 Central Florida vehicle owners trust Marvin and AAA&amp;JAY Mobile Detailing Spa. Here is what real clients share about their experiences on Google Maps.
          </p>
        </div>

        {/* Rating Scorecard Box */}
        <div className="flex items-center gap-5 p-5 rounded-2xl bg-slate-900/90 border border-white/10 shrink-0">
          <div className="text-center pr-4 border-r border-white/10">
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-amber-400 leading-none">
              4.9
            </div>
            <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">202 Reviews</div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 text-slate-400">5</span>
              <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-400 w-[96%] rounded-full"></div>
              </div>
              <span className="text-[11px] text-slate-400">96%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 text-slate-400">4</span>
              <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-400/70 w-[3%] rounded-full"></div>
              </div>
              <span className="text-[11px] text-slate-400">3%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 text-slate-400">3</span>
              <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-slate-600 w-[1%] rounded-full"></div>
              </div>
              <span className="text-[11px] text-slate-400">1%</span>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenGmbModal}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verify on Google Maps</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Category Filter Controls (Functional Buttons) */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {availableTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTag === tag.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/5'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-2xl glass-panel flex flex-col justify-between hover:border-white/20 transition-all space-y-4"
          >
            <div className="space-y-3">
              {/* Reviewer Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${review.avatarColor} text-white font-bold flex items-center justify-center font-display text-sm`}>
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{review.author}</h4>
                    <div className="text-[11px] text-slate-400">{review.badge}</div>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{review.content}&rdquo;
              </p>
            </div>

            {/* Zero-Pill Minimal Metadata Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span>{review.date}</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400 font-medium">Verified Client</span>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <ThumbsUp className="w-3 h-3 text-slate-500" />
                <span>Helpful</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Call to Action */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#101726] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Had your vehicle detailed by Marvin?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Help our local Orlando small business grow by leaving your honest rating on Google.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-md shadow-amber-500/20 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PenTool className="w-4 h-4" />
            <span>Write a Review Now</span>
          </button>

          <a
            href={BUSINESS_INFO.gmbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors border border-white/10 flex items-center gap-2 shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Google Maps</span>
          </a>
        </div>
      </div>

      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onReviewSubmitted={fetchLiveReviews}
      />
    </section>
  );
};
