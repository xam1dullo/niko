import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { 
  Search, Map as MapIcon, ChevronRight, Home, 
  Activity, Info
} from 'lucide-react';
import { REGIONS, RegionData } from './data/staticData';
import { toshkentGeoJSON } from './data/toshkent';
import { regionsGeoJSON } from './data/regions';
import { andijonGeoJSON } from './data/andijon';
import { buxoroGeoJSON } from './data/buxoro';
import { fargonaGeoJSON } from './data/fargona';
import { jizzaxGeoJSON } from './data/jizzax';
import { xorazmGeoJSON } from './data/xorazm';
import { namanganGeoJSON } from './data/namangan';
import { navoiyGeoJSON } from './data/navoiy';
import { qashqadaryoGeoJSON } from './data/qashqadaryo';
import { qoraqalpogistonGeoJSON } from './data/qoraqalpogiston';
import { samarqandGeoJSON } from './data/samarqand';
import { sirdaryoGeoJSON } from './data/sirdaryo';
import { surxondaryoGeoJSON } from './data/surxondaryo';

import { DistrictView } from './components/DistrictView';
import type { Feature, FeatureCollection } from 'geojson';

// --- Types ---
type ViewState = 'home' | 'region' | 'district';

interface BreadcrumbProps {
  items: { label: string; action?: () => void }[];
}

// --- Data Mapping ---
const DISTRICT_GEOJSON_MAP: Record<string, FeatureCollection> = {
    toshkent_shahar: { type: 'FeatureCollection', features: toshkentGeoJSON.features.filter(f => f.properties!.name.toLowerCase().includes('sh.')) },
    toshkent_viloyat: { type: 'FeatureCollection', features: toshkentGeoJSON.features.filter(f => !f.properties!.name.toLowerCase().includes('sh.')) },
    andijon: andijonGeoJSON,
    buxoro: buxoroGeoJSON,
    fargona: fargonaGeoJSON,
    jizzax: jizzaxGeoJSON,
    xorazm: xorazmGeoJSON,
    namangan: namanganGeoJSON,
    navoiy: navoiyGeoJSON,
    qashqadaryo: qashqadaryoGeoJSON,
    qoraqalpogiston: qoraqalpogistonGeoJSON,
    samarqand: samarqandGeoJSON,
    sirdaryo: sirdaryoGeoJSON,
    surxondaryo: surxondaryoGeoJSON,
};

// --- Helper Components ---

const MapController: React.FC<{ regionKey: string | null }> = ({ regionKey }) => {
  const map = useMap();
  useEffect(() => {
    const region = regionKey ? REGIONS[regionKey] : null;
    if (region) {
      map.setView(region.center, region.zoom, { animate: true });
    } else {
      map.setView([42.5, 64], 6, { animate: true });
    }
  }, [regionKey, map]);
  return null;
};

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => (
  <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <ChevronRight size={14} />}
        {item.action ? (
          <button 
            onClick={item.action}
            className="hover:text-primary font-medium transition-colors flex items-center gap-1"
            aria-label={`Go to ${item.label}`}
          >
            {index === 0 && <Home size={14} />}
            {item.label}
          </button>
        ) : (
          <span className="font-semibold text-slate-800" aria-current="page">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

const RegionCard: React.FC<{ region: RegionData; onClick: () => void }> = ({ region, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">
          {region.name}
        </h3>
        <p className="text-slate-500 text-sm mt-1">{region.districts.length} ta tuman</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
        <MapIcon size={20} />
      </div>
    </div>
  </div>
);

const DistrictCard: React.FC<{ name: string; code: string; onClick: () => void }> = ({ name, code, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-slate-100 hover:border-green-100 transition-all cursor-pointer flex items-center justify-between group"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Activity size={16} />
      </div>
      <div>
        <h4 className="font-bold text-slate-700">{name}</h4>
        <p className="text-xs text-slate-400 capitalize">{code.replace(/_/g, ' ')}</p>
      </div>
    </div>
    <ChevronRight size={16} className="text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
  </div>
);


// --- Main App Component ---
export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedRegionKey, setSelectedRegionKey] = useState<string | null>(null);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);

  const currentRegion = selectedRegionKey ? REGIONS[selectedRegionKey] : null;
  
  const filteredRegions = useMemo(() => {
    if (!searchQuery) return Object.entries(REGIONS);
    const lowerQ = searchQuery.toLowerCase();
    
    return Object.entries(REGIONS).filter(([key, region]) => {
      if (region.name.toLowerCase().includes(lowerQ)) return true;
      return region.districts.some(d => d.name.toLowerCase().includes(lowerQ));
    });
  }, [searchQuery]);

  const smoothScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegionClick = (key: string) => {
    setSelectedRegionKey(key);
    setView('region');
    smoothScrollToTop();
  };

  const handleDistrictClick = (code: string) => {
    setSelectedDistrictCode(code);
    setView('district');
    smoothScrollToTop();
  };

  const goHome = () => {
    setView('home');
    setSelectedRegionKey(null);
    setSelectedDistrictCode(null);
    setSearchQuery('');
    smoothScrollToTop();
  };

  const goBackToRegion = () => {
    if (selectedRegionKey) {
      setView('region');
      setSelectedDistrictCode(null);
      smoothScrollToTop();
    } else {
      goHome();
    }
  };

  // --- Map Logic ---

  const findRegionKeyFromGeoJSON = (featureName: string): string | null => {
    const REGION_NAME_MAP: Record<string, string> = {
      'toshkent sh.': 'toshkent_shahar', 'toshkent vil.': 'toshkent_viloyat', 'andijon vil.': 'andijon',
      'buxoro vil.': 'buxoro', "farg'ona vil.": 'fargona', 'jizzax vil.': 'jizzax',
      'xorazm vil.': 'xorazm', 'namangan vil.': 'namangan', 'navoiy vil.': 'navoiy',
      'qashqadaryo vil.': 'qashqadaryo', "qoraqalpog'iston res.": 'qoraqalpogiston',
      'samarqand vil.': 'samarqand', 'sirdaryo vil.': 'sirdaryo', 'surxondaryo vil.': 'surxondaryo',
    };
    const lower = featureName.toLowerCase().trim();
    return REGION_NAME_MAP[lower] || null;
  };

  const onEachRegionFeature = (feature: Feature, layer: any) => {
      const regionName = feature.properties?.name || 'Noma\'lum';
      layer.bindTooltip(regionName);
      layer.on({
          mouseover: (e: any) => e.target.setStyle({ weight: 2, color: '#1a73e8', fillOpacity: 0.7 }),
          mouseout: (e: any) => e.target.setStyle({ weight: 1, color: 'white', fillOpacity: 0.5 }),
          click: () => {
              const regionKey = findRegionKeyFromGeoJSON(regionName);
              if (regionKey) handleRegionClick(regionKey);
          }
      });
  };

  const onEachDistrictFeature = (feature: Feature, layer: any) => {
    const districtName = feature.properties?.name || '';
    layer.bindTooltip(districtName);
    layer.on({
      mouseover: (e: any) => e.target.setStyle({ weight: 3, color: '#1a73e8', fillOpacity: 0.8 }),
      mouseout: (e: any) => e.target.setStyle({ weight: 1.5, color: '#1a73e8', fillOpacity: 0.2 }),
      click: () => {
        const region = REGIONS[selectedRegionKey!];
        const normalizedDistrictName = districtName.toLowerCase().split(/[\s-]/)[0].replace(/['ʻ]/g, '');
        const district = region?.districts.find(d => 
          d.name.toLowerCase().replace(/['ʻ]/g, '').startsWith(normalizedDistrictName)
        );
        if (district) {
          handleDistrictClick(district.code);
        }
      }
    });
  };

  const MapDisplay = useMemo(() => {
    const MAP_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA', '#F1948A', '#AED6F1', '#A2D5F2'];

    const districtGeoJson = selectedRegionKey ? DISTRICT_GEOJSON_MAP[selectedRegionKey] : null;

    if (view === 'region' && districtGeoJson) {
        return (
            <GeoJSON 
                key={selectedRegionKey} 
                data={districtGeoJson as any}
                style={{ color: '#1a73e8', weight: 1.5, fillOpacity: 0.2 }}
                onEachFeature={onEachDistrictFeature}
            />
        );
    }

    return (
       <GeoJSON 
            key="regions"
            data={regionsGeoJSON}
            style={(feature) => ({
                fillColor: MAP_COLORS[(feature!.properties.region_id || 0) % MAP_COLORS.length],
                weight: 1, opacity: 1, color: 'white', fillOpacity: 0.5
            })}
            onEachFeature={onEachRegionFeature}
        />
    );
  }, [view, selectedRegionKey]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-600 text-white pb-12 pt-10 px-6 rounded-b-[2rem] shadow-2xl mb-8">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 border border-white/30 shadow-inner">
            <span className="text-3xl">🏥</span>
          </div>
          <h1 className="font-display font-black text-3xl md:text-5xl mb-2 tracking-tight">
            Nikoh Tibbiy Ko'rigi
          </h1>
          <p className="text-blue-50 text-lg mb-6 font-medium max-w-xl mx-auto">
            O'zbekiston bo'ylab nikohlanuvchi shaxslar uchun yagona tibbiy ko'rik qo'llanmasi
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['🗺 14 ta Hudud', '📍 200+ Tuman', '📱 Mobil Ilova', '✨ Bepul'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          <div className="relative max-w-lg mx-auto transform translate-y-4">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Viloyat yoki tuman nomini yozing..." 
              className="w-full py-4 pl-12 pr-4 rounded-xl shadow-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 placeholder:text-slate-400 font-medium transition-shadow"
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-6">
        
        {view === 'home' && (
          <div className="animate-fade-in-up">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-8 shadow-sm">
              <div className="flex gap-3">
                <Info className="text-amber-600 shrink-0" size={20} />
                <p className="text-sm text-amber-900">
                  <strong>Qanday foydalanish:</strong> Xaritadan yoki ro'yxatdan o'z <strong>viloyatingizni</strong> tanlang, so'ngra <strong>tumaningizni</strong> toping.
                </p>
              </div>
            </div>
          </div>
        )}

        {view !== 'district' && (
             <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg mb-8 border border-slate-200 relative z-0">
               <MapContainer center={[42.5, 64]} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapController regionKey={selectedRegionKey} />
                  {MapDisplay}
                </MapContainer>
             </div>
        )}
        
        {view === 'home' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><MapIcon size={20} /></div>
              <h2 className="text-xl font-display font-bold text-slate-800">Hududni Tanlang</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredRegions.map(([key, region]) => (
                <RegionCard key={key} region={region} onClick={() => handleRegionClick(key)} />
              ))}
              {filteredRegions.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                  <p>So'rovingiz bo'yicha hech narsa topilmadi</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'region' && currentRegion && (
          <div className="animate-fade-in-right">
            <Breadcrumbs items={[{ label: 'Bosh sahifa', action: goHome }, { label: currentRegion.name }]} />
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4 shadow-sm"><MapIcon size={32} /></div>
              <h2 className="text-2xl font-display font-bold text-slate-900">{currentRegion.name}</h2>
              <p className="text-slate-500">Quyidagi tumanlardan birini tanlang</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentRegion.districts.map((district) => (
                <DistrictCard key={district.code} name={district.name} code={district.code} onClick={() => handleDistrictClick(district.code)} />
              ))}
            </div>
          </div>
        )}

        {view === 'district' && currentRegion && selectedDistrictCode && (
          <div className="animate-fade-in-right">
             <Breadcrumbs 
              items={[
                { label: 'Bosh sahifa', action: goHome },
                { label: currentRegion.name, action: goBackToRegion },
                { label: currentRegion.districts.find(d => d.code === selectedDistrictCode)?.name || 'Tuman' }
              ]} 
            />
            <DistrictView 
              regionName={currentRegion.name}
              districtName={currentRegion.districts.find(d => d.code === selectedDistrictCode)?.name || ''}
              districtCode={selectedDistrictCode}
            />
          </div>
        )}

      </main>

      <footer className="mt-16 text-center text-slate-400 text-sm py-8 border-t border-slate-200 bg-white">
        <p>© 2025 O'zbekiston Nikoh Tibbiy Ko'rigi</p>
        <p className="mt-1">Barcha huquqlar himoyalangan</p>
      </footer>
    </div>
  );
}
