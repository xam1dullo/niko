import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Phone, Navigation, AlertTriangle, 
  CheckCircle2, FileText, ChevronDown, ChevronUp, User,
  Activity, Info
} from 'lucide-react';
import { MIROBOD_DATA, DistrictData } from '../data/staticData';

interface Props {
  regionName: string;
  districtName: string;
  districtCode: string;
}

const SkeletonLoader = () => (
    <div className="space-y-6 animate-pulse">
      {/* Overview Card Skeleton */}
      <div className="bg-slate-200/50 rounded-3xl p-6 h-[270px] md:h-[250px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-5 w-32 bg-slate-300/50 rounded-full mb-2"></div>
            <div className="h-8 w-48 bg-slate-300/50 rounded-lg mb-2"></div>
            <div className="h-5 w-40 bg-slate-300/50 rounded-lg"></div>
          </div>
          <div className="w-12 h-12 bg-slate-300/50 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-8">
          <div className="bg-slate-300/50 rounded-xl h-16"></div>
          <div className="bg-slate-300/50 rounded-xl h-16"></div>
          <div className="bg-slate-300/50 rounded-xl h-16"></div>
          <div className="bg-slate-300/50 rounded-xl h-16"></div>
        </div>
      </div>
      
      {/* Steps Skeleton */}
      <div className="bg-slate-200/50 rounded-xl h-20"></div>

      {/* Section Header Skeleton */}
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 bg-slate-200/50 rounded-lg"></div>
        <div className="h-6 w-1/3 bg-slate-200/50 rounded"></div>
      </div>
      <div className="bg-slate-200/50 rounded-lg h-20 mb-4"></div>

      {/* Dispensary Card Skeletons */}
      <div className="space-y-4">
        <div className="bg-slate-200/50 rounded-xl h-48 w-full"></div>
        <div className="bg-slate-200/50 rounded-xl h-48 w-full"></div>
      </div>
    </div>
);


export const DistrictView: React.FC<Props> = ({ regionName, districtName, districtCode }) => {
  const [data, setData] = useState<DistrictData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate API fetch. 
    // In a real app, we would fetch /api/districts/${districtCode}
    setLoading(true);
    setTimeout(() => {
      // For demo purposes, we only have full data for Mirobod. 
      // For others, we'll use a generic template or modify Mirobod data slightly.
      if (districtCode === 'mirobod') {
        setData(MIROBOD_DATA);
      } else {
        // Fallback generic data
        const genericData = { ...MIROBOD_DATA };
        genericData.district_name = districtName;
        genericData.region_name = regionName;
        genericData.has_data = false;
        setData(genericData);
      }
      setLoading(false);
    }, 600);
  }, [districtCode, districtName, regionName]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
        
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${data.has_data ? 'bg-emerald-400/30 text-emerald-50' : 'bg-yellow-400/30 text-yellow-50'}`}>
                {data.has_data ? '✅ Tasdiqlangan' : '⚠️ Umumiy ma\'lumot'}
              </span>
            </div>
            <h2 className="text-3xl font-display font-bold mb-1">{data.district_name}</h2>
            <p className="text-blue-100 opacity-90">📍 {data.region_name}</p>
          </div>
          <div className="text-4xl opacity-20">🏥</div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-8">
            <StatsBox value={data.dispensaries.length} label="Dispanser" />
            <StatsBox value={data.polyclinicTests.length} label="Tahlil" />
            <StatsBox value={data.faq.length} label="Savollar" />
            <StatsBox value="Aloqa" label="Mavjud" />
        </div>
      </div>

      {/* Steps Visualization */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-600">
         <StepItem icon="🏨" label="1. Dispanser" active />
         <div className="h-0.5 flex-1 bg-slate-200 mx-2"></div>
         <StepItem icon="🏥" label="2. Poliklinika" active />
         <div className="h-0.5 flex-1 bg-slate-200 mx-2"></div>
         <StepItem icon="📄" label="3. Xulosa" active />
      </div>

      {/* SECTION 1: DISPENSARIES */}
      <div>
        <SectionHeader icon={<MapPin size={20} />} title="1-QADAM: Dispanserlar" />
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg mb-4 text-sm text-orange-900 flex gap-3">
          <Clock size={18} className="shrink-0 text-orange-600" />
          <p>Dispanserlarga <strong>ertalab erta (08:00)</strong> boring. Pasport va propiska nusxasini unutmang.</p>
        </div>

        <div className="space-y-4">
          {data.dispensaries.map((disp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0 bg-gradient-to-br ${getGradient(idx)}`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{disp.title}</h3>
                  <p className="text-sm text-slate-500">{disp.subtitle}</p>
                </div>
              </div>
              
              <div className="p-4 space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-700">{disp.address}</span>
                    {disp.addressNote && <span className="block text-slate-400 text-xs italic">{disp.addressNote}</span>}
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock size={16} className="text-slate-400 shrink-0" />
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">{disp.hours}</span>
                </div>
                {disp.phones && (
                  <div className="flex gap-3 items-center">
                    <Phone size={16} className="text-slate-400 shrink-0" />
                    <span className="text-slate-700">{disp.phones.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 p-3 flex gap-2 flex-wrap">
                {disp.phones && disp.phones[0] && (
                  <a href={`tel:${disp.phones[0]}`} className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 bg-white border border-slate-200 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors">
                    <Phone size={14} /> Qo'ng'iroq
                  </a>
                )}
                {disp.coords && (
                  <a href={`https://maps.google.com/?q=${disp.coords[0]},${disp.coords[1]}`} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 bg-blue-600 py-2 rounded-lg text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm">
                    <Navigation size={14} /> Xaritada
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: POLYCLINIC */}
      <div>
        <SectionHeader icon={<Activity size={20} />} title="2-QADAM: Poliklinika" />
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4 text-sm text-blue-900 flex gap-3">
          <Info size={18} className="shrink-0 text-blue-600" />
          <p>OIV (SPID) tekshiruvi uchun faqat <strong>Dushanba, Chorshanba, Juma</strong> kunlari 08:00–09:00 orasida boring.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {data.polyclinicTests.map((test, idx) => (
            <div key={idx} className="flex items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0 mr-4">
                {test.step}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm md:text-base">{test.name}</h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  {test.location}
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${test.special ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                {test.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: CONCLUSION */}
      <div>
        <SectionHeader icon={<FileText size={20} />} title="3-QADAM: Xulosa" />
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex gap-4 items-start">
          <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
          <div>
             <h4 className="font-bold text-emerald-900 text-lg mb-1">{data.conclusion.location}</h4>
             <p className="text-emerald-800 text-sm leading-relaxed">{data.conclusion.description}</p>
          </div>
        </div>
      </div>

      {/* SECTION 4: FAQ */}
      <div>
        <SectionHeader icon={<AlertTriangle size={20} />} title="Ko'p So'raladigan Savollar" />
        <div className="space-y-2">
          {data.faq.map((item, idx) => (
             <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {item.question}
                  {openFaqIndex === idx ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-100">
                    {item.answer}
                  </div>
                )}
             </div>
          ))}
        </div>
      </div>

      {/* CONTACT CARD */}
      <div className="bg-slate-800 rounded-2xl p-6 text-center text-white mt-8">
        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
           <User size={32} />
        </div>
        <h3 className="text-xl font-bold mb-1">{data.contact.name}</h3>
        <p className="text-slate-400 text-sm mb-6">{data.contact.description}</p>
        <div className="flex justify-center gap-3">
           {data.contact.telegram && (
             <a href={`https://t.me/${data.contact.telegram}`} target="_blank" rel="noreferrer" className="bg-[#0088cc] hover:bg-[#0077b5] px-6 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
               Telegram
             </a>
           )}
        </div>
      </div>

    </div>
  );
};

// --- Sub-components ---

const StatsBox = ({ value, label }: { value: string | number, label: string }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
    <div className="font-bold text-xl">{value}</div>
    <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
  </div>
);

const StepItem = ({ icon, label, active }: { icon: string, label: string, active?: boolean }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-base border border-slate-200">
      {icon}
    </div>
    <span className={active ? 'text-slate-900' : 'text-slate-400'}>{label}</span>
  </div>
);

const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center gap-3 mb-4 mt-6">
    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
      {icon}
    </div>
    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
  </div>
);

const getGradient = (idx: number) => {
  const grads = [
    'from-pink-400 to-rose-500',
    'from-sky-400 to-blue-500',
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500'
  ];
  return grads[idx % grads.length];
};
