import React, { useState, useMemo, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';
import { Tutor } from '../../types';
import {
  MapPin,
  Navigation,
  ShieldCheck,
  Star,
  BookOpen,
  Calendar,
  X,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { NairaText, NairaSign } from '../../utils/currency';

interface TutorMapLocatorProps {
  tutors: Tutor[];
  onSelectTutorForBooking: (tutor: Tutor) => void;
  onOpenChat: (tutorId: string) => void;
  onViewProfile?: (tutor: Tutor) => void;
}

// Nigerian Education Hubs
const NIGERIAN_HUBS = [
  { name: 'All Nigeria', center: { lat: 9.0820, lng: 8.6753 }, zoom: 6 },
  { name: 'Lagos', center: { lat: 6.5244, lng: 3.3792 }, zoom: 11 },
  { name: 'Abuja (FCT)', center: { lat: 9.0765, lng: 7.3986 }, zoom: 11 },
  { name: 'Ibadan (Oyo)', center: { lat: 7.3775, lng: 3.9470 }, zoom: 11 },
  { name: 'Port Harcourt', center: { lat: 4.8156, lng: 7.0498 }, zoom: 12 },
  { name: 'Enugu', center: { lat: 6.4584, lng: 7.5464 }, zoom: 12 },
  { name: 'Kano', center: { lat: 12.0022, lng: 8.5920 }, zoom: 11 },
];

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const TutorMapLocator: React.FC<TutorMapLocatorProps> = ({
  tutors,
  onSelectTutorForBooking,
  onOpenChat,
  onViewProfile
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const [selectedHub, setSelectedHub] = useState(NIGERIAN_HUBS[0]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(100);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');

  // Handle Geolocation
  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
      return;
    }

    setLocationStatus('Locating your position in Nigeria...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(coords);
        setLocationStatus('GPS Located! Showing closest home tutors.');
      },
      (_err) => {
        // Fallback to Lagos center
        setUserLocation({ lat: 6.5244, lng: 3.3792 });
        setLocationStatus('Defaulted to Lagos hub (GPS permission denied or timeout).');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  // Filter tutors by subject and distance if location detected
  const filteredTutors = useMemo(() => {
    return tutors.filter((t) => {
      const matchSubject =
        selectedSubjectFilter === 'All' || t.subjects.includes(selectedSubjectFilter);

      if (!userLocation) return matchSubject;

      const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, t.lat, t.lng);
      return matchSubject && dist <= maxDistanceKm;
    });
  }, [tutors, selectedSubjectFilter, userLocation, maxDistanceKm]);

  // Unique subjects for filter
  const subjects = useMemo(() => {
    const set = new Set<string>();
    tutors.forEach((t) => t.subjects.forEach((s) => set.add(s)));
    return ['All', ...Array.from(set)];
  }, [tutors]);

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Live Verified Tutor Map</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-800">
              {filteredTutors.length} Available
            </span>
          </div>

          <button
            onClick={handleDetectLocation}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Navigation className="w-3 h-3" />
            <span>Find Tutors Near Me</span>
          </button>
        </div>

        {locationStatus && (
          <p className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-900">
            {locationStatus}
          </p>
        )}

        {/* State / Hub Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {NIGERIAN_HUBS.map((hub) => (
            <button
              key={hub.name}
              onClick={() => {
                setSelectedHub(hub);
                setSelectedTutor(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedHub.name === hub.name
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {hub.name}
            </button>
          ))}
        </div>

        {/* Subject & Radius Filter */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Subjects' : s}
              </option>
            ))}
          </select>

          {userLocation && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto">
              <span>Radius:</span>
              <select
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value={15}>Within 15 km</option>
                <option value={30}>Within 30 km</option>
                <option value={50}>Within 50 km</option>
                <option value={100}>Within 100 km</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950 shadow-inner">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId="DEMO_MAP_ID"
            center={selectedHub.center}
            zoom={selectedHub.zoom}
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full"
          >
            {/* User Location Marker if available */}
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="relative flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-pulse" />
                  <div className="w-8 h-8 rounded-full bg-blue-500/30 absolute" />
                </div>
              </AdvancedMarker>
            )}

            {/* Verified Tutors Markers */}
            {filteredTutors.map((tutor) => {
              const isSelected = selectedTutor?.id === tutor.id;
              const dist = userLocation
                ? calculateDistanceKm(userLocation.lat, userLocation.lng, tutor.lat, tutor.lng)
                : null;

              return (
                <AdvancedMarker
                  key={tutor.id}
                  position={{ lat: tutor.lat, lng: tutor.lng }}
                  onClick={() => setSelectedTutor(tutor)}
                >
                  <Pin
                    background={isSelected ? '#10B981' : '#047857'}
                    borderColor="#ffffff"
                    glyphColor="#ffffff"
                    scale={isSelected ? 1.2 : 1.0}
                  />
                </AdvancedMarker>
              );
            })}

            {/* Selected Tutor InfoWindow */}
            {selectedTutor && (
              <InfoWindow
                position={{ lat: selectedTutor.lat, lng: selectedTutor.lng }}
                onCloseClick={() => setSelectedTutor(null)}
              >
                <div className="p-1 max-w-[220px] text-slate-900 font-sans">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedTutor.avatarUrl}
                      alt={selectedTutor.name}
                      className="w-8 h-8 rounded-full object-cover bg-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate leading-tight">
                        {selectedTutor.name}
                      </h4>
                      <p className="text-[10px] text-slate-600 truncate">{selectedTutor.location}</p>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-700">
                      <NairaText amount={selectedTutor.hourlyRateNaira} />/hr
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      {selectedTutor.rating}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectTutorForBooking(selectedTutor)}
                    className="mt-2 w-full py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold text-center transition-colors cursor-pointer"
                  >
                    Book Home Lesson
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        {/* Selected Tutor Drawer Card Overlay */}
        {selectedTutor && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-3 shadow-xl z-20 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedTutor.avatarUrl}
                  alt={selectedTutor.name}
                  className="w-11 h-11 rounded-xl bg-slate-800 object-cover ring-1 ring-emerald-500/50"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white">{selectedTutor.name}</h4>
                    {selectedTutor.isNinVerified && (
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800 font-semibold">
                        NIN Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {selectedTutor.location}, {selectedTutor.state}
                    {userLocation && (
                      <span className="text-emerald-400 font-bold ml-1">
                        · {calculateDistanceKm(userLocation.lat, userLocation.lng, selectedTutor.lat, selectedTutor.lng)} km away
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTutor(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1">
              {selectedTutor.subjects.map((sub, i) => (
                <span
                  key={i}
                  className="text-[9px] bg-slate-950 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800"
                >
                  {sub}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-xs font-bold text-emerald-400">
                <NairaText amount={selectedTutor.hourlyRateNaira} /> / hr
              </span>
              <div className="flex items-center gap-1.5">
                {onViewProfile && (
                  <button
                    onClick={() => onViewProfile(selectedTutor)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
                  >
                    Profile
                  </button>
                )}
                <button
                  onClick={() => onOpenChat(selectedTutor.id)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
                >
                  Chat
                </button>
                <button
                  onClick={() => onSelectTutorForBooking(selectedTutor)}
                  className="px-3 py-1 text-[11px] rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
