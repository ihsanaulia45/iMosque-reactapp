import React from 'react';
import { TAARUF_PROFILES } from '../constants';
import { ShieldCheck, MessageCircle } from 'lucide-react';

const Taaruf: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl text-center">
         <ShieldCheck size={48} className="mx-auto text-purple-600 mb-3" />
         <h2 className="text-2xl font-bold text-purple-900">Islamic Ta'aruf</h2>
         <p className="text-purple-700 text-sm max-w-xl mx-auto mt-2">
            A safe, monitored environment to find your soulmate according to Sharia principles. No dating, just serious intentions for marriage.
         </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TAARUF_PROFILES.map(profile => (
            <div key={profile.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className="p-6 flex flex-col items-center border-b border-slate-50">
                    <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900">{profile.name}, {profile.age}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{profile.profession}</p>
                </div>
                <div className="p-6 flex-1">
                    <p className="text-slate-600 text-sm italic text-center">"{profile.bio}"</p>
                </div>
                <div className="p-4 bg-slate-50 grid grid-cols-2 gap-2">
                    <button className="py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                        View CV
                    </button>
                    <button className="py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 flex items-center justify-center">
                        <MessageCircle size={16} className="mr-2" />
                        Send Interest
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Taaruf;
