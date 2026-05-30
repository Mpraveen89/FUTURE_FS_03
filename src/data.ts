/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Therapist, Testimonial, GalleryItem } from './types';

// Let's import our custom-generated premium graphics
import heroSpaBanner from './assets/images/hero_athletic_banner_1779956511622.png';
import aboutTreatment from './assets/images/about_kinetic_reformer_1779956535849.png';
import vaultIceBath from './assets/images/vault_ice_bath_1779959471972.png';
import vaultLifting from './assets/images/vault_lifting_1779959493020.png';
import vaultSauna from './assets/images/vault_sauna_1779959509577.png';
import vaultKnurling from './assets/images/vault_knurling_1779959525877.png';
import vaultSprings from './assets/images/vault_springs_1779959542771.png';
import vaultSuite from './assets/images/vault_suite_1779959561590.png';

export { heroSpaBanner, aboutTreatment, vaultIceBath, vaultLifting, vaultSauna, vaultKnurling, vaultSprings, vaultSuite };

export const SERVICES: Service[] = [
  {
    id: 'str-1',
    name: 'Unilateral Mechanical Tension Audit',
    category: 'strength',
    duration: 75,
    price: 16000,
    description: 'An elite 1-on-1 muscle-biomechanics screening. Uses real-time velocity tracking and spinal-shear modeling to eliminate lifter joint limitations and map customized heavy barbell loading strategies.',
    benefits: ['Active bar-path velocity diagnostics', 'Spinal-shear core posture profiling', 'Targeted motor unit recruitment plan', 'Flawlessness under high absolute loads'],
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'str-2',
    name: 'Max-Effort Barbell & Posterior Chain Optimization',
    category: 'strength',
    duration: 60,
    price: 14500,
    description: 'Biomechanical coaching focusing exclusively on deadlift, squat, and bench press mechanics. Optimizes mechanical leverage, neural bracing, and hip-hinge torque parameterization for lifters.',
    benefits: ['Orthopedic leverage adjustments', 'High-tension abdominal bracing drills', 'Intra-abdominal pressure profiling', 'Targeted posterior chain hypertrophy'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pil-1',
    name: 'Articular Joint Decompression & Kinetic Pilates',
    category: 'pilates',
    duration: 75,
    price: 15000,
    description: 'High-tension spring Pilates on solid oak reformers, customized for tight, heavy lifters. Restores shoulder rotation, decompress rigid lumbar disks, and enhances athletic joint ranges.',
    benefits: ['Deep spine decompression sequences', 'Hip-girdle mobility expansions', 'Restores extreme absolute joint safety', 'Eccentric lengthening of tight muscles'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pil-2',
    name: 'Functional Range Conditioning (FRC) Hip & Shoulder Vault',
    category: 'pilates',
    duration: 60,
    price: 12500,
    description: 'Scientific joint capsule rotational audits and tissue loading. Reconditions connective tissues around knees, shoulders, and hips to prevent heavy lifting injuries and maximize lifting depth.',
    benefits: ['Connective tissue remodeling under load', 'Restores pristine FRC joint rotation', 'Hip-girdle deep active flexibility', 'Nervous system joint stabilization'],
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'rec-1',
    name: 'Sub-Zero Volcanic Contrast Cryo & Infrared Extreme',
    category: 'recovery',
    duration: 60,
    price: 10500,
    description: 'A scientifically calibrated metabolic contrast protocol. Private immersion in our extreme 3°C volcanic ice chamber coupled with high-temperature 95°C infrared eucalyptus sauna to spike growth hormone.',
    benefits: ['Drastic lymphatic venous pumping', 'Instant central nervous system reset', 'Accelerates muscle micro-tear repair', 'Spikes anabolic hormone outputs'],
    imageUrl: 'https://images.unsplash.com/photo-1583416750470-965b2f419955?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'rec-2',
    name: 'Clinical Deep-Tissue Tool Scraping & Somat-Release',
    category: 'recovery',
    duration: 75,
    price: 13500,
    description: 'Extreme athletic muscle therapy. Integrates deep-tissue Graston metal scraping, heavy percussive trigger mapping, and direct pressure to destroy rigid muscle adhesions and scar tissue.',
    benefits: ['Breaks down chronic scar tissue layers', 'Active percussive trigger mapping', 'Realigns knotted muscle fibers', 'Direct relief for tendonitis and tight joints'],
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cls-1',
    name: 'Heavy Atlas Stone & Sandbag Conditioning',
    category: 'classes',
    duration: 60,
    price: 9000,
    description: 'Semi-private strongman conditioning (limit 4 athletes) prioritizing Atlas stone lifts, sandbag carries, and high-tension core bracing sequences for brutal physical durability.',
    benefits: ['Raw unilateral carrying power', 'Increases back and core thickness', 'Small-group lifting competition', 'Power outputs metrics tracking'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cls-2',
    name: 'Anabolic Breathing & Autonomic Down-Regulation',
    category: 'classes',
    duration: 60,
    price: 8000,
    description: 'Autonomic breathe control for elite athletes to transition out of highly-stressed states into anabolic growth and fast recovery, utilizing high-density oxygen flows.',
    benefits: ['Triggers direct anabolic rest state', 'Diaphragmatic oxygen expansion', 'Lowers resting heart-rates instantly', 'Somatic soundscapes block distraction'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600'
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'ther-1',
    name: 'Devendra "The Anvil" Singh',
    role: 'Somatic Athletic Director',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    specialty: 'Biomechanics, Leverages & Neuromuscular Bracing',
    bio: 'PhD in Sports Kinesiology. Consultant for top Indian competitive lifters and Olympic prospects. Specializes in optimizing leverages under extreme loads to prevent joint wear.'
  },
  {
    id: 'ther-2',
    name: 'Dr. Priyanka Nair, M.PT',
    role: 'Clinical Strength Recovery Lead',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    specialty: 'Myofascial Metal Scraping & Thermal Contrasts',
    bio: 'Master of Physiotherapy. Specializes in myofascial scraping (Graston technique), active release therapy, and using metabolic sub-zero cryotherapy to rebuild torn elite athlete fibers.'
  },
  {
    id: 'ther-3',
    name: 'Rohan "The Hulk" Deshmukh',
    role: 'Conditioning & Kinetic Specialist',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434ee5b98?auto=format&fit=crop&q=80&w=300',
    specialty: 'Atlas Stones, Kettlebells & Respiratory Control',
    bio: 'Former competitive strongman. Expert in high-tension abdominal bracing, functional carry patterns, spinal safety, and restoring joint space for massive frames.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Vikram "The Mountain" Sen',
    role: 'National Powerlifting Champion (380kg Squat)',
    rating: 5,
    comment: 'The mechanical leverage audit was a game changer. I had chronic hip pinching that kept me off my heavy squats for months. Devendra adjusted my shin angles and femur rotation. Now I squatted pain-free and set a new personal record.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    date: 'May 12, 2026'
  },
  {
    id: 'test-2',
    name: 'Aarav Mehta',
    role: 'Competitive Classic Physique Athlete (Sheru Classic)',
    rating: 5,
    comment: 'Dr. Priyanka Nair is a recovery goddess. The clinical steel scraping and sub-zero ice contrast flush out all lactic buildups, maintaining muscle density while keeping my shoulders perfectly healthy through heavy benching.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    date: 'May 24, 2026'
  },
  {
    id: 'test-3',
    name: 'Priya Sharma',
    role: 'Hyrox National Strength Athlete',
    rating: 5,
    comment: 'Iron Obsidian Somatic is my raw power oasis. The handcrafted stone carry rigs, specialized joint rotations, and isolation chambers give you incredible focus. No crowded gym noise, just heavy steel and kinesiotherapy.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    date: 'May 27, 2026'
  }
];

export const FAQS = [
  {
    question: 'How early should I arrive before my scheduled maximum squat/deadlift audit?',
    answer: 'We request that you arrive 15 minutes before your booked time slot. This permits you to ingest our custom-mixed organic nitric-oxide and electrolyte pre-formulas, complete joint-capsule sensitivity profiles, and warm up in our soundproofed foam & barbell pre-zones.'
  },
  {
    question: 'Can I customize the resistance loading & mechanical parameters?',
    answer: 'Absolutely. Iron Obsidian operates on ultimate individualization. Upon entry, your neuromuscular specialist audits your movement patterns, and customizes every single mechanical load, training volume, and pacing parameter to match your skeletal limits.'
  },
  {
    question: 'What is your session rescheduling & cancellation policy?',
    answer: 'Because we operate on a strictly limited-occupancy basis, coaching resources are dedicated 1-on-1. Cancellations must be made at least 24 hours in advance, or they will be subject to a 50% reservation fee.'
  },
  {
    question: 'Do I need a high-level competitive powerlifting record to train here?',
    answer: 'No. While our facility is engineered specifically for serious lifters, bodybuilders, and strength enthusiasts, we train everyone who treats lifting as a serious kinesiologic craft. We prioritize performance mechanics, heavy recovery, and systemic joint health.'
  }
];

export const CORE_FEATURES = [
  {
    title: 'Biomechanical Lift & Joint Audit',
    description: 'We eliminate lifter pain. Every member receives precise joint capsule screens, femur/humerus relative leverage tracking, and high-load torque audits.',
    icon: 'Sparkles'
  },
  {
    title: 'Anabolic Polar & Thermal Contrast',
    description: 'Recover instantly. Immerse in our 3°C volcano ice plunge basins and 95°C solid-birch dry heat saunas to accelerate muscle protein synthesis.',
    icon: 'Leaf'
  },
  {
    title: 'University-Trained Strength Directors',
    description: 'No generic trainers. Every kinesiotherapist and coach holds elite university degrees, and specializes in orthopedic lifting adjustments and joint decompression.',
    icon: 'Award'
  },
  {
    title: 'Isolated Raw Iron Sanctuary',
    description: 'A completely silent, beautifully lit, limited-occupancy concrete haven. No crowded stations, commercial noise, or cell phone distractions. Direct alignment.',
    icon: 'ShieldCheck'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Somatic Extreme Cryo & Volcano Ice Bath',
    category: 'lounge',
    imageUrl: vaultIceBath
  },
  {
    id: 'gal-2',
    title: 'Precision Olympic Lifting & Heavy Calibrated Plates',
    category: 'treatment',
    imageUrl: vaultLifting
  },
  {
    id: 'gal-3',
    title: 'Deep Infrared 95°C Nordic Birch Heat Room',
    category: 'lounge',
    imageUrl: vaultSauna
  },
  {
    id: 'gal-4',
    title: 'Oxidized Solid Steel Barbell Gripping Details',
    category: 'details',
    imageUrl: vaultKnurling
  },
  {
    id: 'gal-5',
    title: 'Clinical Articular Joint Restricting Springs',
    category: 'details',
    imageUrl: vaultSprings
  },
  {
    id: 'gal-6',
    title: 'Isolated High-Tension Strength Conditioning Suite',
    category: 'treatment',
    imageUrl: vaultSuite
  }
];

