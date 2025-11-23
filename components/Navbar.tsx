import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, Calendar, MessageCircle, Heart, Video, Users, Plane, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 text-xs md:text-sm md:flex-row md:space-y-0 md:space-x-2 md:px-4 md:py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'text-emerald-600 bg-emerald-50 md:bg-emerald-100 font-semibold'
        : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-50'
    }`;

  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/mosques', icon: <MapPin size={20} />, label: 'Mosques' },
    { to: '/schedule', icon: <Calendar size={20} />, label: 'Prayer' },
    { to: '/quran', icon: <BookOpen size={20} />, label: 'Quran' },
    { to: '/consultation', icon: <MessageCircle size={20} />, label: 'Ask' },
    { to: '/donations', icon: <Heart size={20} />, label: 'Infaq' },
    { to: '/live', icon: <Video size={20} />, label: 'Live' },
    { to: '/taaruf', icon: <Users size={20} />, label: 'Taaruf' },
    { to: '/trips', icon: <Plane size={20} />, label: 'Trips' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
            iM
          </div>
          <span className="text-xl font-bold text-slate-800">iMosque</span>
        </div>
        <nav className="flex space-x-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50 px-2 pb-safe overflow-x-auto scrollbar-hide">
        <div className="flex justify-between items-center h-16 min-w-max px-2 space-x-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={`${linkClass({isActive: location.hash === `#${item.to}`})} !w-auto px-3`}>
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;