import React from 'react';
import { Plane, Calendar, Star, CheckCircle } from 'lucide-react';
import { TRIP_PACKAGES } from '../constants';

const ReligiousTrip: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Hajj & Umrah Packages</h2>
        <p className="text-slate-500">Curated spiritual journeys from trusted travel agencies.</p>
      </div>

      <div className="space-y-6">
        {TRIP_PACKAGES.map(trip => (
          <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition">
             <div className="md:w-1/3 bg-slate-200 relative h-48 md:h-auto">
                <img src={`https://picsum.photos/600/400?random=${trip.id + 50}`} alt="Mecca" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                    {trip.type}
                </div>
             </div>
             <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-900">{trip.title}</h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-xs font-bold text-yellow-700">
                            <Star size={12} className="fill-yellow-500 text-yellow-500 mr-1" />
                            {trip.rating}
                        </div>
                    </div>
                    <p className="text-emerald-600 text-sm font-medium mt-1">{trip.agency}</p>

                    <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-slate-600">
                            <Calendar size={16} className="mr-2 text-slate-400" />
                            Duration: {trip.duration}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                            <CheckCircle size={16} className="mr-2 text-emerald-500" />
                            Visa Included
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                            <CheckCircle size={16} className="mr-2 text-emerald-500" />
                            5 Star Hotel near Haram
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                        <span className="text-xs text-slate-500 block">Starting from</span>
                        <span className="text-xl font-bold text-slate-900">Rp {trip.price.toLocaleString()}</span>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        View Details
                    </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReligiousTrip;
