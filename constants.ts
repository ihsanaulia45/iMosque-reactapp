
import { Mosque, PrayerTime, Sermon, DonationCampaign, TripPackage, UserProfile, DonationTransaction, Surah, Ayah } from './types';

export const MOCK_MOSQUES: Mosque[] = [
  {
    id: '1',
    name: 'Masjid Istiqlal',
    address: 'Jl. Taman Wijaya Kusuma, Jakarta Pusat',
    distance: 0, // Will be calculated
    lat: -6.1702,
    lng: 106.8314,
    facilities: ['AC', 'Parking', 'TPA', 'Wheelchair Access', 'Library', 'Garden'],
    image: 'https://picsum.photos/800/600?random=1',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Masjid Al-Azhar',
    address: 'Jl. Sisingamangaraja, Kebayoran Baru',
    distance: 0,
    lat: -6.2350,
    lng: 106.7990,
    facilities: ['AC', 'Large Hall', 'School', 'Clinic'],
    image: 'https://picsum.photos/800/600?random=2',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Masjid Sunda Kelapa',
    address: 'Jl. Taman Sunda Kelapa, Menteng',
    distance: 0,
    lat: -6.2018,
    lng: 106.8335,
    facilities: ['AC', 'Market', 'Hall'],
    image: 'https://picsum.photos/800/600?random=3',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Masjid Pondok Indah',
    address: 'Jl. Sultan Iskandar Muda, Pondok Indah',
    distance: 0,
    lat: -6.2655,
    lng: 106.7844,
    facilities: ['AC', 'Parking', 'Ballroom'],
    image: 'https://picsum.photos/800/600?random=4',
    rating: 4.8,
  }
];

export const TODAY_PRAYER: PrayerTime = {
  date: new Date().toLocaleDateString(),
  fajr: '04:30',
  dhuhr: '11:55',
  asr: '15:15',
  maghrib: '18:05',
  isha: '19:15',
};

export const HIJRI_DATE = "12 Ramadan 1445H";

export const DAILY_QUOTE = {
  textAr: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
  translation: "For indeed, with hardship [will be] ease.",
  source: "Surah Ash-Sharh (94:5)"
};

export const UPCOMING_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'The Importance of Patience',
    speaker: 'Ustadz Hanan Attaki',
    mosqueName: 'Masjid Al-Falah',
    date: 'Today, 18:30',
    isLive: true,
    viewers: 1240,
  },
  {
    id: '2',
    title: 'Fiqh of Transaction',
    speaker: 'Ustadz Abdul Somad',
    mosqueName: 'Masjid Raya',
    date: 'Tomorrow, 05:00',
    isLive: false,
    viewers: 0,
  },
];

export const DONATION_CAMPAIGNS: DonationCampaign[] = [
  {
    id: '1',
    title: 'Renovation of Masjid Roof',
    mosqueName: 'Masjid Al-Falah',
    targetAmount: 50000000,
    currentAmount: 12500000,
    category: 'Sadaqah',
  },
  {
    id: '2',
    title: 'Ramadan Iftar Packages',
    mosqueName: 'Yayasan Peduli',
    targetAmount: 10000000,
    currentAmount: 8500000,
    category: 'Infaq',
  },
  {
    id: '3',
    title: 'Orphan Scholarship Fund',
    mosqueName: 'Masjid Raya Bani Umar',
    targetAmount: 100000000,
    currentAmount: 45000000,
    category: 'Zakat',
  }
];

export const MOCK_DONATION_HISTORY: DonationTransaction[] = [
  {
    id: 'TX-1001',
    campaignTitle: 'Renovation of Masjid Roof',
    amount: 50000,
    date: '2023-10-15',
    status: 'Success'
  },
  {
    id: 'TX-1002',
    campaignTitle: 'Ramadan Iftar Packages',
    amount: 100000,
    date: '2023-11-02',
    status: 'Success'
  }
];

export const TAARUF_PROFILES: UserProfile[] = [
  {
    id: '1',
    name: 'Abdullah',
    age: 28,
    profession: 'Software Engineer',
    bio: 'Seeking a pious partner to memorize Quran together.',
    image: 'https://picsum.photos/200/200?random=10',
  },
  {
    id: '2',
    name: 'Fatimah',
    age: 25,
    profession: 'Doctor',
    bio: 'Loves charity work and reading Islamic history.',
    image: 'https://picsum.photos/200/200?random=11',
  },
];

export const TRIP_PACKAGES: TripPackage[] = [
  {
    id: '1',
    title: 'Umrah Executive 9 Days',
    type: 'Umrah',
    price: 32000000,
    duration: '9 Days',
    agency: 'Berkah Travel',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Halal Tour Turkey',
    type: 'Tour',
    price: 18000000,
    duration: '7 Days',
    agency: 'Jannah Trips',
    rating: 4.6,
  },
];

// --- Quran Data ---

export const MOCK_SURAHS: Surah[] = [
  { number: 1, nameAr: 'الفاتحة', nameEn: 'Al-Fatiha', meaning: 'The Opener', versesCount: 7, type: 'Meccan' },
  { number: 2, nameAr: 'البقرة', nameEn: 'Al-Baqarah', meaning: 'The Cow', versesCount: 286, type: 'Medinan' },
  { number: 3, nameAr: 'آل عمران', nameEn: 'Ali Imran', meaning: 'Family of Imran', versesCount: 200, type: 'Medinan' },
  { number: 4, nameAr: 'النساء', nameEn: 'An-Nisa', meaning: 'The Women', versesCount: 176, type: 'Medinan' },
  { number: 5, nameAr: 'المائدة', nameEn: 'Al-Ma\'idah', meaning: 'The Table Spread', versesCount: 120, type: 'Medinan' },
  { number: 6, nameAr: 'الأنعام', nameEn: 'Al-An\'am', meaning: 'The Cattle', versesCount: 165, type: 'Meccan' },
  { number: 18, nameAr: 'الكهف', nameEn: 'Al-Kahf', meaning: 'The Cave', versesCount: 110, type: 'Meccan' },
  { number: 36, nameAr: 'يس', nameEn: 'Ya-Sin', meaning: 'Ya Sin', versesCount: 83, type: 'Meccan' },
  { number: 67, nameAr: 'الملك', nameEn: 'Al-Mulk', meaning: 'The Sovereignty', versesCount: 30, type: 'Meccan' },
];

export const MOCK_AYAHS_AL_FATIHA: Ayah[] = [
  {
    number: 1,
    textAr: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    textEn: 'Bismillahir-Rahmanir-Rahim',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
  },
  {
    number: 2,
    textAr: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    textEn: 'Al-hamdu lillahi rabbil-alamin',
    translation: '[All] praise is [due] to Allah, Lord of the worlds -'
  },
  {
    number: 3,
    textAr: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    textEn: 'Ar-rahmanir-rahim',
    translation: 'The Entirely Merciful, the Especially Merciful,'
  },
  {
    number: 4,
    textAr: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
    textEn: 'Maliki yawmid-din',
    translation: 'Sovereign of the Day of Recompense.'
  },
  {
    number: 5,
    textAr: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    textEn: 'Iyyaka na\'budu wa iyyaka nasta\'in',
    translation: 'It is You we worship and You we ask for help.'
  },
  {
    number: 6,
    textAr: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
    textEn: 'Ihdinas-siratal-mustaqim',
    translation: 'Guide us to the straight path -'
  },
  {
    number: 7,
    textAr: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
    textEn: 'Siratal-ladhina an\'amta \'alayhim ghayril-maghdubi \'alayhim walad-dallin',
    translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.'
  }
];