export type VehicleType = 'sedan' | 'suv' | 'truck' | 'van';

export interface VehicleOption {
  id: VehicleType;
  label: string;
  sublabel: string;
  multiplier: number;
  iconName: string;
}

export interface DetailingPackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  basePrice: number;
  estimatedTime: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
  image?: string;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  badge: string;
  rating: number;
  date: string;
  content: string;
  tags: string[];
  avatarColor: string;
  verified: boolean;
}

export interface BookingFormData {
  vehicleType: VehicleType;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  packageId: string;
  addons: string[];
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  specialNotes: string;
}
