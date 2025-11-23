import React from 'react';
import { Users, Play } from 'lucide-react';
import { UPCOMING_SERMONS } from '../constants';

const LiveStream: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
        <h2 className="text-2xl font-bold text-slate-900">Live Kajian</h2>
      </div>

      {/* Main Feature Stream */}
      <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative group">
        <img src="https://picsum.photos/1200/600?random=stream" alt="Main Stream" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
             <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all transform hover:scale-110">
                <Play size={32} className="ml-1 fill-current" />
             </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">LIVE NOW</span>
            <h1 className="text-2xl font-bold">Explanation of Surah Al-Kahf</h1>
            <p className="text-slate-300 mt-1">Ustadz Hanan Attaki • Masjid Al-Latif</p>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mt-8">Upcoming & Recent</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {UPCOMING_SERMONS.map((sermon) => (
            <div key={sermon.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
                <div className="relative aspect-video bg-slate-200">
                    <img src={`https://picsum.photos/400/225?random=${sermon.id + 10}`} alt={sermon.title} className="w-full h-full object-cover" />
                    {sermon.isLive && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                            LIVE
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h4 className="font-bold text-slate-900 line-clamp-1">{sermon.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{sermon.speaker}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                         <span>{sermon.date}</span>
                         {sermon.isLive ? (
                            <span className="flex items-center text-red-500 font-medium"><Users size={12} className="mr-1" /> {sermon.viewers} watching</span>
                         ) : (
                             <span>Scheduled</span>
                         )}
                    </div>
                </div>
            </div>
        ))}
        {/* Fillers */}
        {[1,2,3].map(i => (
             <div key={`filler-${i}`} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition opacity-70">
                <div className="relative aspect-video bg-slate-200">
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <Play size={32} />
                     </div>
                </div>
                <div className="p-4">
                    <h4 className="font-bold text-slate-900">Recorded Sermon Archive #{i}</h4>
                    <p className="text-sm text-slate-500 mt-1">Ustadz Fulan</p>
                    <div className="mt-4 text-xs text-slate-400">
                         <span>2 days ago</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStream;
