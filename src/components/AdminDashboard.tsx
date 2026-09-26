import React, { useState, useEffect } from 'react';
import { 
  Calendar, Phone, MapPin, CheckCircle, Clock, Truck, ShieldCheck, 
  Trash2, RefreshCw, Search, Plus, X, DollarSign, Activity, Car, Sparkles, Filter
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface Booking {
  id: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'En Route' | 'In Progress' | 'Completed' | 'Cancelled';
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  packageName: string;
  price: number;
  addons: string[];
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  zipCode: string;
  specialNotes?: string;
  notes?: string;
}

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeJobs: 0,
    completedJobs: 0,
    avgOrderValue: 0
  });

  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [newBookingData, setNewBookingData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Orlando',
    zipCode: '32835',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '09:30 AM',
    vehicleMake: '',
    vehicleModel: '',
    packageName: 'Show Room Ready Signature Spa',
    price: 289,
    specialNotes: ''
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/bookings', window.location.origin);
      if (statusFilter !== 'All') url.searchParams.set('status', statusFilter);
      if (searchTerm) url.searchParams.set('search', searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }

      // Fetch metrics
      const metricsRes = await fetch('/api/admin/metrics');
      const metricsData = await metricsRes.json();
      if (metricsData.success) {
        setMetrics(metricsData.metrics);
      }
    } catch (err) {
      console.error('Failed to load backend bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to cancel and remove booking ${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBookingData,
          price: Number(newBookingData.price),
          vehicleType: 'sedan',
          addons: []
        })
      });
      if (res.ok) {
        setIsNewBookingModalOpen(false);
        setNewBookingData({
          fullName: '',
          phone: '',
          address: '',
          city: 'Orlando',
          zipCode: '32835',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '09:30 AM',
          vehicleMake: '',
          vehicleModel: '',
          packageName: 'Show Room Ready Signature Spa',
          price: 289,
          specialNotes: ''
        });
        fetchBookings();
      }
    } catch (err) {
      console.error('Failed to create manual booking:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'En Route':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Confirmed':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Pending':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14] text-slate-100 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Marvin&apos;s Dispatch &amp; Operations Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
              AAA&amp;JAY Mobile Detailing Spa — Live Operations
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Hub: 2121 S Hiawassee Rd, Veranda Park, Orlando FL · Active Backend Service
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewBookingModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Phone/Walk-in Booking</span>
            </button>

            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>

        {/* Real-Time Backend Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Pipeline Revenue</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              ${metrics.totalRevenue}
            </div>
            <div className="text-[11px] text-slate-400">
              Across {metrics.totalBookings} recorded bookings
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Dispatches</span>
              <Truck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-cyan-300">
              {metrics.activeJobs}
            </div>
            <div className="text-[11px] text-emerald-400">
              ● Mobile unit deployed in Orlando
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Completed Jobs</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400">
              {metrics.completedJobs}
            </div>
            <div className="text-[11px] text-slate-400">
              100% Customer satisfaction checked
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Average Ticket</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-amber-400">
              ${metrics.avgOrderValue}
            </div>
            <div className="text-[11px] text-slate-400">
              Show Room Ready &amp; Ceramic drive top value
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Confirmed', 'En Route', 'In Progress', 'Completed', 'Pending', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, phone, car..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500 w-48 sm:w-64"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {bookings.length} Bookings</span>
            <span>Live Sync with <code>/api/bookings</code></span>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl glass-panel border border-white/10 space-y-2">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">No bookings found for this filter</div>
              <p className="text-xs text-slate-500">Try changing your search term or select &quot;All&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  {/* Left: Customer & Vehicle info */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {booking.id}
                      </span>

                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>

                      <span className="text-xs text-slate-400">
                        Booked: {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        <span>{booking.fullName}</span>
                        <span className="text-xs font-normal text-slate-400">({booking.phone})</span>
                      </h3>
                      <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                        <Car className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-amber-300">
                          {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-white font-medium">{booking.packageName}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{booking.address}, {booking.city} {booking.zipCode}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{booking.preferredDate} at {booking.preferredTime}</span>
                      </div>
                    </div>

                    {booking.specialNotes && (
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] text-slate-300 italic">
                        <strong>Client Note:</strong> &ldquo;{booking.specialNotes}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Right: Price & Quick Action Status Buttons */}
                  <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/5">
                    <div className="text-left lg:text-right">
                      <div className="text-2xl font-bold font-display text-white">
                        ${booking.price}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {booking.addons?.length || 0} Add-on(s) included
                      </div>
                    </div>

                    {/* Status Changer Select & Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="En Route">En Route</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`tel:${booking.phone}`}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-white/10"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                        title="Cancel & Delete Booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Manual Booking Modal */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-display text-white">
                Add Walk-in or Phone Booking
              </h3>
              <button
                onClick={() => setIsNewBookingModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newBookingData.fullName}
                  onChange={(e) => setNewBookingData({ ...newBookingData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="(407) 555-0100"
                    value={newBookingData.phone}
                    onChange={(e) => setNewBookingData({ ...newBookingData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newBookingData.price}
                    onChange={(e) => setNewBookingData({ ...newBookingData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vehicle Make</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tesla"
                    value={newBookingData.vehicleMake}
                    onChange={(e) => setNewBookingData({ ...newBookingData, vehicleMake: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Model Y"
                    value={newBookingData.vehicleModel}
                    onChange={(e) => setNewBookingData({ ...newBookingData, vehicleModel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Address in Orlando</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2121 S Hiawassee Rd, Veranda Park"
                  value={newBookingData.address}
                  onChange={(e) => setNewBookingData({ ...newBookingData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newBookingData.preferredDate}
                    onChange={(e) => setNewBookingData({ ...newBookingData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time</label>
                  <select
                    value={newBookingData.preferredTime}
                    onChange={(e) => setNewBookingData({ ...newBookingData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Package</label>
                <select
                  value={newBookingData.packageName}
                  onChange={(e) => setNewBookingData({ ...newBookingData, packageName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                >
                  <option value="Show Room Ready Signature Spa">Show Room Ready Signature Spa ($289+)</option>
                  <option value="Full Interior & Exterior Detail">Full Interior &amp; Exterior Detail ($189+)</option>
                  <option value="Executive Interior Spa & Leather Care">Executive Interior Spa &amp; Leather Care ($159+)</option>
                  <option value="Ceramic Coating & Paint Correction">Ceramic Coating &amp; Paint Correction ($420+)</option>
                  <option value="Express Mobile Spa Wash & Gloss">Express Mobile Spa Wash &amp; Gloss ($89+)</option>
                  <option value="Commercial & Fleet Vehicle Detailing">Commercial &amp; Fleet Vehicle Detailing ($220+)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
