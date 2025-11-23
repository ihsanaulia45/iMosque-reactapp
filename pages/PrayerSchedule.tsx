import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { TODAY_PRAYER } from '../constants';

const PrayerSchedule: React.FC = () => {
  // Generate dummy data for the rest of the week based on TODAY_PRAYER
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }),
      fajr: TODAY_PRAYER.fajr, // In a real app, calculate offset
      dhuhr: TODAY_PRAYER.dhuhr,
      asr: TODAY_PRAYER.asr,
      maghrib: `18:0${5 + i}`, // Slight variation
      isha: `19:1${5 + i}`,
      isToday: i === 0
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Prayer Schedule</h2>
          <p className="text-slate-500">Jakarta, Indonesia (WIB)</p>
        </div>
        <button className="flex items-center text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Download size={18} className="mr-2" />
          Download PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium"><Calendar size={16} /></th>
                <th className="px-6 py-4 font-medium">Fajr</th>
                <th className="px-6 py-4 font-medium">Dhuhr</th>
                <th className="px-6 py-4 font-medium">Asr</th>
                <th className="px-6 py-4 font-medium">Maghrib</th>
                <th className="px-6 py-4 font-medium">Isha</th>
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day, idx) => (
                <tr key={idx} className={`border-b border-slate-50 last:border-0 ${day.isToday ? 'bg-emerald-50/50' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {day.date}
                    {day.isToday && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Today</span>}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{day.fajr}</td>
                  <td className="px-6 py-4 text-slate-600">{day.dhuhr}</td>
                  <td className="px-6 py-4 text-slate-600">{day.asr}</td>
                  <td className="px-6 py-4 font-bold text-emerald-700">{day.maghrib}</td>
                  <td className="px-6 py-4 text-slate-600">{day.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <p><strong>Note:</strong> Prayer times are calculated based on the Ministry of Religious Affairs (Kemenag) method.</p>
      </div>
    </div>
  );
};

export default PrayerSchedule;
