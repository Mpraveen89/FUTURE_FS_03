/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  category: 'strength' | 'pilates' | 'recovery' | 'classes';
  duration: number; // in minutes
  price: number;
  description: string;
  benefits: string[];
  imageUrl: string;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  rating: number;
  imageUrl: string;
  specialty: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  imageUrl: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'treatment' | 'lounge' | 'details' | 'all';
  imageUrl: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  therapistId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  specialRequests?: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
