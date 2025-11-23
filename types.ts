
// Model Definitions

export interface Mosque {
  id: string;
  name: string;
  address: string;
  distance: number; // in km (calculated dynamically or default)
  lat: number;      // Latitude
  lng: number;      // Longitude
  facilities: string[];
  image: string;
  rating: number;
}

export interface PrayerTime {
  date: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  mosqueName: string;
  date: string;
  isLive: boolean;
  viewers: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  profession: string;
  sect?: string; // e.g., Sunni, etc (optional/generic)
  bio: string;
  image: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  mosqueName: string;
  category: 'Zakat' | 'Infaq' | 'Sadaqah' | 'Waqf';
}

export interface DonationTransaction {
  id: string;
  campaignTitle: string;
  amount: number;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
}

export interface TripPackage {
  id: string;
  title: string;
  type: 'Umrah' | 'Hajj' | 'Tour';
  price: number;
  duration: string;
  agency: string;
  rating: number;
}

export enum ChatType {
  AI = 'AI',
  HUMAN = 'HUMAN'
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'ustadz';
  text: string;
  timestamp: Date;
}

export interface Surah {
  number: number;
  nameAr: string;
  nameEn: string;
  meaning: string;
  versesCount: number;
  type: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  textAr: string;
  textEn: string; // Transliteration or Translation
  translation: string;
}