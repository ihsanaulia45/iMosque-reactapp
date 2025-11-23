import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MosqueFinder from './pages/MosqueFinder';
import PrayerSchedule from './pages/PrayerSchedule';
import Consultation from './pages/Consultation';
import LiveStream from './pages/LiveStream';
import Donation from './pages/Donation';
import Taaruf from './pages/Taaruf';
import ReligiousTrip from './pages/ReligiousTrip';
import Quran from './pages/Quran';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 md:pb-0">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mosques" element={<MosqueFinder />} />
            <Route path="/schedule" element={<PrayerSchedule />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/live" element={<LiveStream />} />
            <Route path="/donations" element={<Donation />} />
            <Route path="/taaruf" element={<Taaruf />} />
            <Route path="/trips" element={<ReligiousTrip />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;