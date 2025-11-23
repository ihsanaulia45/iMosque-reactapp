
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Star, Compass, Loader2 } from 'lucide-react';
import { MOCK_MOSQUES } from '../constants';
import { Mosque } from '../types';

// --- MosqueController Logic ---
// Helper to calculate Haversine distance
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1)); // Round to 1 decimal
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
// -----------------------------

const MosqueFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mosques, setMosques] = useState<Mosque[]>(MOCK_MOSQUES);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);

  // Controller Action: SearchNearby
  const handleUseLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lng: longitude });
          
          // Update model data with calculated distances
          const updatedMosques = MOCK_MOSQUES.map(mosque => ({
            ...mosque,
            distance: calculateDistance(latitude, longitude, mosque.lat, mosque.lng)
          })).sort((a, b) => a.distance - b.distance); // Sort by nearest

          setMosques(updatedMosques);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not retrieve location. Please enable GPS permissions.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  };

  // View Filter Logic
  const filteredMosques = mosques.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nearby Mosques</h2>
          <p className="text-slate-500">Find the nearest place to pray based on your location.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
           {/* Location Trigger */}
           <button 
            onClick={handleUseLocation}
            disabled={loadingLocation}
            className="flex items-center justify-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-medium transition-colors border border-emerald-200"
          >
            {loadingLocation ? (
              <Loader2 size={18} className="animate-spin mr-2" />
            ) : (
              <Compass size={18} className="mr-2" />
            )}
            {userCoords ? 'Update Location' : 'Use My GPS'}
          </button>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or area..."
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* View Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMosques.map(mosque => (
          <div key={mosque.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="h-48 overflow-hidden relative">
               <img
                src={mosque.image}
                alt={mosque.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center shadow-sm">
                <Star size={12} className="text-yellow-400 mr-1 fill-yellow-400" />
                {mosque.rating}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">{mosque.name}</h3>
              <p className="text-slate-500 text-sm mt-1 flex items-start">
                <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                {mosque.address}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {mosque.facilities.slice(0, 3).map(fac => (
                  <span key={fac} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] uppercase font-semibold rounded-md border border-slate-200">
                    {fac}
                  </span>
                ))}
                {mosque.facilities.length > 3 && (
                  <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-semibold rounded-md border border-slate-200">
                    +{mosque.facilities.length - 3}
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className={`font-bold text-sm ${userCoords ? 'text-emerald-600' : 'text-slate-400'}`}>
                   {userCoords ? `${mosque.distance} km away` : 'Distance N/A'}
                </span>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${mosque.lat},${mosque.lng}`)}
                  className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Navigation size={16} className="mr-2" />
                  Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMosques.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p>No mosques found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MosqueFinder;
