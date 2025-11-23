
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users, BookOpen, Quote, CheckCircle2, Circle, ArrowRight, Heart } from 'lucide-react';
import { TODAY_PRAYER, UPCOMING_SERMONS, DONATION_CAMPAIGNS, HIJRI_DATE, DAILY_QUOTE } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [trackedPrayers, setTrackedPrayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simple mock countdown to Maghrib for demonstration
    const calculateTimeLeft = () => {
      const now = new Date();
      // Mock target time: today at 18:05
      const target = new Date();
      target.setHours(18, 5, 0);

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Now');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const togglePrayer = (prayerName: string) => {
    setTrackedPrayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(prayerName)) {
        newSet.delete(prayerName);
      } else {
        newSet.add(prayerName);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Hero / Prayer Status */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-emerald-400 opacity-20 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-block bg-emerald-500/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-400/30 mb-2">
                 {HIJRI_DATE}
              </div>
              <p className="text-emerald-100 font-medium text-sm">Next Prayer: Maghrib</p>
              <h1 className="text-5xl font-bold mt-1 tracking-tight">{TODAY_PRAYER.maghrib}</h1>
              <p className="text-sm mt-2 opacity-90 flex items-center bg-black/10 w-fit px-2 py-1 rounded-lg">
                <Clock className="w-4 h-4 mr-1.5" />
                Time remaining: {timeLeft}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-emerald-100 font-medium">Jakarta, ID</p>
              <p className="text-xs opacity-70">{TODAY_PRAYER.date}</p>
            </div>
          </div>
          
          <div className="flex justify-between text-center divide-x divide-emerald-500/30 bg-black/10 rounded-xl p-3 backdrop-blur-sm">
            {Object.entries(TODAY_PRAYER).filter(([key]) => key !== 'date').map(([name, time]) => (
              <div key={name} className="flex-1 px-1">
                <p className="text-[10px] uppercase tracking-wider opacity-70 mb-1">{name}</p>
                <p className="font-semibold text-sm">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracker & Quick Actions Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
         {/* Prayer Tracker - New Feature */}
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center">
              <CheckCircle2 size={18} className="mr-2 text-emerald-600" />
              Daily Tracker
            </h3>
            <div className="space-y-3">
              {Object.keys(TODAY_PRAYER).filter(k => k !== 'date').map((prayer) => (
                <div 
                  key={prayer} 
                  onClick={() => togglePrayer(prayer)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${trackedPrayers.has(prayer) ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                >
                  <span className="capitalize text-sm font-medium text-slate-700">{prayer}</span>
                  {trackedPrayers.has(prayer) ? (
                    <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-100" />
                  ) : (
                    <Circle size={20} className="text-slate-300" />
                  )}
                </div>
              ))}
            </div>
         </div>

         {/* Quick Actions */}
         <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="/mosques" className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center justify-center hover:bg-blue-50 transition group">
              <div className="bg-white p-3 rounded-full text-blue-600 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Mosques</span>
            </Link>
            <Link to="/quran" className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center hover:bg-emerald-50 transition group">
              <div className="bg-white p-3 rounded-full text-emerald-600 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Al-Quran</span>
            </Link>
            <Link to="/donations" className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex flex-col items-center justify-center hover:bg-amber-50 transition group">
              <div className="bg-white p-3 rounded-full text-amber-600 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Heart size={24} />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Infaq</span>
            </Link>
            <Link to="/consultation" className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 flex flex-col items-center justify-center hover:bg-purple-50 transition group">
              <div className="bg-white p-3 rounded-full text-purple-600 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Ask Ustadz</span>
            </Link>
         </div>
      </div>

      {/* Featured Campaigns Slider */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-lg font-bold text-slate-900">Support Our Community</h2>
          <Link to="/donations" className="text-emerald-600 text-sm font-medium hover:underline">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {DONATION_CAMPAIGNS.map((campaign) => (
             <div key={campaign.id} className="min-w-[280px] bg-white rounded-xl p-4 border border-slate-100 shadow-sm snap-center">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{campaign.category}</span>
                  <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <Heart size={14} className="fill-current" />
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 line-clamp-1 mb-1">{campaign.title}</h4>
                <p className="text-xs text-slate-500 mb-3">{campaign.mosqueName}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                   <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-medium">
                   <span className="text-slate-400">Raised</span>
                   <span className="text-emerald-700">Rp {campaign.currentAmount.toLocaleString()}</span>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Daily Quote & Live Section Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Quote - New Feature */}
        <section className="bg-amber-50 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center border border-amber-100">
           <Quote className="absolute top-4 left-4 text-amber-200 w-12 h-12" />
           <div className="relative z-10 text-center">
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Verse of the Day</h3>
              <p className="font-arabic text-2xl text-slate-800 mb-3 leading-loose">{DAILY_QUOTE.textAr}</p>
              <p className="text-slate-600 italic font-medium mb-2">"{DAILY_QUOTE.translation}"</p>
              <p className="text-xs text-slate-400 font-semibold">{DAILY_QUOTE.source}</p>
           </div>
        </section>

        {/* Live Now */}
        <section>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-bold text-slate-900">Live Kajian</h2>
             <Link to="/live" className="text-emerald-600 text-sm font-medium hover:underline flex items-center">
               View All <ArrowRight size={14} className="ml-1" />
             </Link>
          </div>
          <div className="space-y-3">
            {UPCOMING_SERMONS.slice(0, 2).map(sermon => (
               <div key={sermon.id} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex gap-3 items-center">
                 <div className="relative w-20 h-20 flex-shrink-0">
                    <img src={`https://picsum.photos/200/200?random=${sermon.id}`} alt="Thumb" className="w-full h-full object-cover rounded-lg" />
                    {sermon.isLive && (
                      <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
                    )}
                 </div>
                 <div className="flex-1 min-w-0">
                   <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{sermon.title}</h3>
                   <p className="text-xs text-slate-500 mt-0.5">{sermon.speaker}</p>
                   <div className="flex items-center text-[10px] text-slate-400 mt-2">
                      <MapPin size={10} className="mr-1" />
                      <span className="truncate">{sermon.mosqueName}</span>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
