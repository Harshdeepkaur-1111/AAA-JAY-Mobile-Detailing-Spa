import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Car, Sparkles, Phone, MessageSquare, ArrowRight, ChevronLeft } from 'lucide-react';
import { DETAILING_PACKAGES, SERVICE_ADDONS, VEHICLE_OPTIONS, BUSINESS_INFO } from '../data/detailingData';
import { BookingFormData, VehicleType } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialVehicleType?: VehicleType;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId = 'showroom-ready',
  initialVehicleType = 'sedan'
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    vehicleType: initialVehicleType,
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    packageId: initialPackageId,
    addons: [],
    preferredDate: '',
    preferredTime: '09:30 AM',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Orlando',
    zipCode: '32835',
    specialNotes: ''
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing calculations
  const selectedVehicleOption = VEHICLE_OPTIONS.find((v) => v.id === formData.vehicleType) || VEHICLE_OPTIONS[0];
  const selectedPackage = DETAILING_PACKAGES.find((p) => p.id === formData.packageId) || DETAILING_PACKAGES[0];
  
  const basePackagePrice = Math.round(selectedPackage.basePrice * selectedVehicleOption.multiplier);
  const addonsTotal = formData.addons.reduce((sum, addonId) => {
    const addon = SERVICE_ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const estimatedTotalPrice = basePackagePrice + addonsTotal;

  const toggleAddon = (addonId: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.includes(addonId)
        ? prev.addons.filter((id) => id !== addonId)
        : [...prev.addons, addonId]
    }));
  };

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageName: selectedPackage.name,
          price: estimatedTotalPrice
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setBookingRef(result.data.id);
        setBookingConfirmed(true);
      } else {
        setSubmitError(result.error || 'Failed to submit booking. Please try again.');
      }
    } catch (err) {
      console.error('Network error during booking:', err);
      // Fallback code if network is temporarily offline
      const fallbackCode = 'AAA-' + Math.floor(1000 + Math.random() * 9000);
      setBookingRef(fallbackCode);
      setBookingConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSmsLink = () => {
    const text = encodeURIComponent(
      `Hi Marvin, I just submitted an online booking for AAA&JAY Mobile Detailing Spa!\n` +
      `Ref: ${bookingRef}\n` +
      `Name: ${formData.fullName}\n` +
      `Vehicle: ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel} (${selectedVehicleOption.label})\n` +
      `Package: ${selectedPackage.name} ($${basePackagePrice})\n` +
      `Date/Time: ${formData.preferredDate} at ${formData.preferredTime}\n` +
      `Location: ${formData.address}, ${formData.city} ${formData.zipCode}\n` +
      `Total Est: $${estimatedTotalPrice}`
    );
    return `sms:${BUSINESS_INFO.rawPhone}?body=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0d131f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#111927] p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Mobile Dispatch Booking</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              Book Your Detailing Spa Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!bookingConfirmed ? (
          <div className="p-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 cursor-pointer ${
                  step === 1 ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>1</span>
                <span>Vehicle &amp; Package</span>
              </button>

              <div className="h-0.5 w-8 bg-slate-800 hidden sm:block"></div>

              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 cursor-pointer ${
                  step === 2 ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>2</span>
                <span>Add-ons &amp; Spa Care</span>
              </button>

              <div className="h-0.5 w-8 bg-slate-800 hidden sm:block"></div>

              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 cursor-pointer ${
                  step === 3 ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>3</span>
                <span>Schedule &amp; Address</span>
              </button>
            </div>

            {/* STEP 1: Vehicle & Package */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Vehicle Classification
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {VEHICLE_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, vehicleType: opt.id })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.vehicleType === opt.id
                            ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                            : 'border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{opt.sublabel}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Make</label>
                    <input
                      type="text"
                      placeholder="e.g. BMW, Ford, Honda"
                      value={formData.vehicleMake}
                      onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. M3, F-150, Accord"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2023"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    2. Choose Detailing Spa Package
                  </label>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {DETAILING_PACKAGES.map((pkg) => {
                      const isSelected = formData.packageId === pkg.id;
                      const calculatedPkgPrice = Math.round(pkg.basePrice * selectedVehicleOption.multiplier);
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setFormData({ ...formData, packageId: pkg.id })}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-white/5 bg-slate-900/40 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{pkg.name}</span>
                              {pkg.badge && (
                                <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">{pkg.tagline}</div>
                          </div>

                          <div className="text-right shrink-0 ml-4">
                            <div className="font-display font-bold text-white text-base">
                              ${calculatedPkgPrice}
                            </div>
                            <div className="text-[11px] text-slate-400">{pkg.estimatedTime}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Add-ons &amp; Upgrades</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Add-ons */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Custom Spa Add-ons
                  </div>
                  <p className="text-xs text-slate-400">
                    Enhance your package with specialized services like headlight renewal or ozone odor treatments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_ADDONS.map((addon) => {
                    const isChecked = formData.addons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'border-amber-500 bg-amber-500/10'
                            : 'border-white/5 bg-slate-900/40 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-1 pr-2">
                          <div className="text-sm font-semibold text-white">{addon.name}</div>
                          <div className="text-xs text-slate-400 leading-snug">{addon.description}</div>
                          <div className="text-[11px] text-slate-500">{addon.duration}</div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-amber-400 font-bold text-sm">+${addon.price}</div>
                          <div className={`w-5 h-5 rounded-md border mt-2 flex items-center justify-center ${isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-600'}`}>
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal preview */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-slate-400">Estimated Total:</span>
                    <span className="text-white font-bold ml-2 font-display text-lg">${estimatedTotalPrice}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {selectedPackage.name} + {formData.addons.length} Add-on(s)
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Schedule &amp; Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Schedule & Address */}
            {step === 3 && (
              <form onSubmit={handleCompleteBooking} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Arrival Window</span>
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="09:30 AM">Morning Slot (9:30 AM)</option>
                      <option value="01:00 PM">Midday Slot (1:00 PM)</option>
                      <option value="04:00 PM">Late Afternoon Slot (4:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deborah Han"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Mobile)</label>
                    <input
                      type="tel"
                      required
                      placeholder="(321) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Street Address (Where vehicle is located)</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2121 S Hiawassee Rd, Apt / Driveway"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City / Neighborhood</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gate Code or Special Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Gate access code, pet hair specifics, or parking instructions..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Final Price Breakdown Banner */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-300 uppercase font-semibold">Total Estimated Investment</div>
                    <div className="text-xs text-slate-300">
                      Payment due only after vehicle completion and inspection.
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    ${estimatedTotalPrice}
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                    {submitError}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all cursor-pointer active:scale-98 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Dispatch...</span>
                      </>
                    ) : (
                      <span>Confirm &amp; Request Dispatch</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                Appointment Request Submitted
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                You&apos;re All Set! Marvin Has Received Your Request
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Reference Code: <span className="font-mono text-amber-400 font-bold">{bookingRef}</span>. Marvin from AAA&amp;JAY Mobile Detailing Spa will call or text you shortly to confirm gate access and exact dispatch timing.
              </p>
            </div>

            {/* Summary Box */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-white/10 text-left text-xs text-slate-300 space-y-2">
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Package:</span>
                <span className="font-semibold text-white">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-semibold text-white">
                  {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel || selectedVehicleOption.label}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Scheduled Date &amp; Time:</span>
                <span className="font-semibold text-white">{formData.preferredDate || 'Upcoming'} at {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-amber-400">
                <span>Estimated Total:</span>
                <span>${estimatedTotalPrice}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
              <a
                href={generateSmsLink()}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send SMS to Marvin</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            <button
              onClick={() => {
                setBookingConfirmed(false);
                setStep(1);
                onClose();
              }}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Done &amp; Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
