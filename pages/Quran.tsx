
import React, { useState } from 'react';
import { Search, BookOpen, ChevronLeft, PlayCircle, PauseCircle, Info } from 'lucide-react';
import { MOCK_SURAHS, MOCK_AYAHS_AL_FATIHA } from '../constants';
import { Surah, Ayah } from '../types';

const Quran: React.FC = () => {
  // Controller State
  const [view, setView] = useState<'LIST' | 'DETAIL'>('LIST');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false); // Mock audio state

  // Controller Action: Filter Surahs
  const filteredSurahs = MOCK_SURAHS.filter(
    (s) =>
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameAr.includes(searchQuery) ||
      s.number.toString().includes(searchQuery)
  );

  // Controller Action: Select Surah
  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    setView('DETAIL');
    window.scrollTo(0, 0);
  };

  // Controller Action: Back to List
  const handleBack = () => {
    setView('LIST');
    setSelectedSurah(null);
    setIsPlaying(false);
  };

  // Helper to toggle mock audio
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // --- Views ---

  // Sub-View: Surah List
  const renderList = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
         <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
         <div className="relative z-10">
            <div className="flex items-center mb-4">
                <BookOpen className="mr-2" />
                <span className="font-medium opacity-90">Al-Quran Al-Kareem</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Read & Listen</h1>
            <p className="text-emerald-50 opacity-90">"The best of you are those who learn the Quran and teach it."</p>
         </div>
      </div>

      <div className="sticky top-2 z-20 bg-slate-50 pt-2 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Surah (e.g., Yasin, 36)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSurahs.map((surah) => (
          <div
            key={surah.number}
            onClick={() => handleSelectSurah(surah)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">{surah.number}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{surah.nameEn}</h3>
                <p className="text-xs text-slate-500">{surah.meaning} • {surah.versesCount} Ayahs</p>
              </div>
            </div>
            <div className="text-right">
               <span className="block font-arabic text-xl text-emerald-700 font-semibold">{surah.nameAr}</span>
               <span className="text-[10px] text-slate-400 uppercase border border-slate-100 px-1 rounded">{surah.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Sub-View: Surah Detail
  const renderDetail = () => {
    if (!selectedSurah) return null;

    // In a real app, we would fetch verses based on selectedSurah.number
    // For demo, we use Al-Fatiha data if selected, otherwise placeholder
    const ayahs = selectedSurah.number === 1 ? MOCK_AYAHS_AL_FATIHA : [];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-20 md:top-24 z-30">
          <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="text-slate-600" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">{selectedSurah.nameEn}</h2>
            <p className="text-xs text-slate-500">{selectedSurah.type} • {selectedSurah.versesCount} Ayahs</p>
          </div>
          <button onClick={toggleAudio} className={`p-2 rounded-full transition-colors ${isPlaying ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:bg-slate-50'}`}>
             {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
          </button>
        </div>

        {/* Bismillah */}
        <div className="flex justify-center py-6">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/27/Basmala.svg" 
                alt="Bismillah" 
                className="h-12 md:h-16 opacity-80"
            />
        </div>

        {/* Verses List */}
        <div className="space-y-2">
          {ayahs.length > 0 ? (
            ayahs.map((ayah) => (
              <div key={ayah.number} className="bg-white p-6 rounded-xl border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs font-medium flex items-center justify-center flex-shrink-0 mt-1">
                        {ayah.number}
                    </div>
                    <div className="text-right flex-1 pl-8">
                        <p className="font-arabic text-3xl md:text-4xl leading-[2.5] text-slate-800 font-medium dir-rtl">
                            {ayah.textAr}
                        </p>
                    </div>
                </div>
                <div className="pl-0 md:pl-12 space-y-2">
                    <p className="text-emerald-700 font-medium text-sm">{ayah.textEn}</p>
                    <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-slate-200 pl-3">
                        {ayah.translation}
                    </p>
                </div>
                <div className="mt-4 flex gap-3 justify-end border-t border-dashed border-slate-100 pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Action buttons placeholder */}
                    <button className="text-slate-400 hover:text-emerald-600"><PlayCircle size={16} /></button>
                    <button className="text-slate-400 hover:text-emerald-600"><Info size={16} /></button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-100 border-dashed">
                <BookOpen size={48} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Verse data for {selectedSurah.nameEn} is not available in this demo.</p>
                <button onClick={() => handleSelectSurah(MOCK_SURAHS[0])} className="mt-4 text-emerald-600 text-sm font-medium hover:underline">
                    Try Surah Al-Fatiha
                </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto min-h-[80vh]">
      {view === 'LIST' ? renderList() : renderDetail()}
    </div>
  );
};

export default Quran;
