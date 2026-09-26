import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Sliders, ChevronLeft, ChevronRight } from 'lucide-react';

interface TransformationPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  imageAfter: string;
  beforeFilter: string;
}

const PRESETS: TransformationPreset[] = [
  {
    id: 'paint',
    title: 'Multi-Stage Paint Correction & Ceramic Shield',
    category: 'Exterior Paint Perfection',
    description: 'Eliminates 85%+ of spiderweb swirl marks, buffer trails, and sun haze to restore deep metallic depth and water-sheeting hydrophobic protection.',
    beforeLabel: 'BEFORE: Swirled & Oxidized Clear Coat',
    afterLabel: 'AFTER: AAA&JAY Mirror Ceramic Finish',
    imageAfter: '/src/assets/images/ceramic_beading_1790404786883.jpg',
    beforeFilter: 'grayscale(0.6) contrast(0.85) brightness(0.8) blur(0.5px)'
  },
  {
    id: 'headlight',
    title: 'Headlight Lens Optical Restoration',
    category: 'Safety & Clarity',
    description: 'Josh Jerry & Giovanni noted this in their reviews! Wet sanding and multi-stage compound clears away foggy UV oxidation for factory optical clarity.',
    beforeLabel: 'BEFORE: Cloudy & Yellowed Foggy Lens',
    afterLabel: 'AFTER: Restored Crystal Optical Finish',
    imageAfter: '/src/assets/images/headlight_restoration_1790404853524.jpg',
    beforeFilter: 'sepia(0.65) saturate(1.8) brightness(0.8) blur(1.5px)'
  },
  {
    id: 'interior',
    title: 'Show Room Ready Interior Spa & Leather Extraction',
    category: 'Interior Deep Sanitation',
    description: 'Hot-water enzyme shampooing on carpets, seats taken out for full perimeter extraction, and specialized leather lanolin conditioning.',
    beforeLabel: 'BEFORE: Stained Mats & Grimy Leather',
    afterLabel: 'AFTER: Showroom Spa Sanitized Perfection',
    imageAfter: '/src/assets/images/interior_spa_detail_1790404770476.jpg',
    beforeFilter: 'sepia(0.4) brightness(0.7) contrast(1.1) grayscale(0.3)'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activePreset, setActivePreset] = useState<TransformationPreset>(PRESETS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="transformations" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
          The Proof Is In The Finish
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
          Interactive Transformation Showcase
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Drag the center slider left and right to inspect the dramatic difference between neglected automotive wear and our signature AAA&amp;JAY Spa restoration.
        </p>
      </div>

      {/* Preset Selector Tabs (Functional Buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setActivePreset(preset);
              setSliderPosition(50);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activePreset.id === preset.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/5'
            }`}
          >
            {preset.category}
          </button>
        ))}
      </div>

      {/* Interactive Slider Container */}
      <div className="max-w-4xl mx-auto">
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize bg-slate-950"
        >
          {/* Layer 1: AFTER image (full width behind) */}
          <div className="absolute inset-0">
            <img
              src={activePreset.imageAfter}
              alt={activePreset.afterLabel}
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider backdrop-blur-md">
              {activePreset.afterLabel}
            </div>
          </div>

          {/* Layer 2: BEFORE image (clipped to sliderPosition width) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
              <img
                src={activePreset.imageAfter}
                alt={activePreset.beforeLabel}
                style={{ filter: activePreset.beforeFilter }}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              {/* Optional overlay texture to simulate realistic dirt / oxidation */}
              <div className="absolute inset-0 bg-amber-950/15 mix-blend-multiply"></div>
            </div>
            {/* Before Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider backdrop-blur-md">
              {activePreset.beforeLabel}
            </div>
          </div>

          {/* Draggable Divider Bar */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Center Handle Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
              <Sliders className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Helper hint on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-slate-300 flex items-center gap-1.5 pointer-events-none">
            <ChevronLeft className="w-3 h-3" />
            <span>Slide to compare Before &amp; After</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Current Transformation Description Box */}
        <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{activePreset.title}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {activePreset.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
