
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, PlayCircle, Heart, MessageCircle, Users, BookOpen } from 'lucide-react';
import { TODAY_PRAYER, UPCOMING_SERMONS } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

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

  return (
    <div className="space-y-6">
      {/* Hero / Prayer Status */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 font-medium">Next Prayer: Maghrib</p>
              <h1 className="text-4xl font-bold mt-1">{TODAY_PRAYER.maghrib}</h1>
              <p className="text-sm mt-2 opacity-90 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Time remaining: {timeLeft}
              </p>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm">Jakarta, ID</p>
              <p className="text-xs opacity-70">{TODAY_PRAYER.date}</p>
            </div>
          </div>
          <div className="mt-8 flex justify-between text-center divide-x divide-emerald-500/30">
            {Object.entries(TODAY_PRAYER).filter(([key]) => key !== 'date').map(([name, time]) => (
              <div key={name} className="flex-1 px-1">
                <p className="text-[10px] uppercase tracking-wider opacity-70">{name}</p>
                <p className="font-semibold text-sm md:text-base">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/mosques" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-2">
            <MapPin size={24} />
          </div>
          <span className="font-medium text-slate-700">Find Mosque</span>
        </Link>
        <Link to="/quran" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition">
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 mb-2">
            <BookOpen size={24} />
          </div>
          <span className="font-medium text-slate-700">Read Quran</span>
        </Link>
        <Link to="/donations" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition">
          <div className="bg-green-100 p-3 rounded-full text-green-600 mb-2">
            <Heart size={24} />
          </div>
          <span className="font-medium text-slate-700">Infaq</span>
        </Link>
        <Link to="/consultation" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600 mb-2">
            <MessageCircle size={24} />
          </div>
          <span className="font-medium text-slate-700">Ask Ustadz</span>
        </Link>
      </div>

      {/* Recommended Content */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Live Now</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {UPCOMING_SERMONS.filter(s => s.isLive).map(sermon => (
             <div key={sermon.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex">
               <div className="w-1/3 bg-slate-200 relative">
                  <img src={`https://picsum.photos/300/300?random=${sermon.id}`} alt="Sermon" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    LIVE
                  </div>
               </div>
               <div className="p-4 flex-1">
                 <h3 className="font-bold text-slate-800 line-clamp-1">{sermon.title}</h3>
                 <p className="text-sm text-slate-500 mt-1">{sermon.speaker}</p>
                 <p className="text-xs text-emerald-600 mt-2 flex items-center">
                   <MapPin size={12} className="mr-1" /> {sermon.mosqueName}
                 </p>
                 <div className="mt-3 flex items-center text-xs text-slate-400">
                    <span className="flex items-center"><Users size={12} className="mr-1" /> {sermon.viewers} watching</span>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;