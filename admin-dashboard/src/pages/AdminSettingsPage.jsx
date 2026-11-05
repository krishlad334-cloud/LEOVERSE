import { useState } from 'react';
import { isFirebaseConfigured } from '../services/firebase';
import { Database, ShieldCheck, CheckCircle2, Sparkles, Key, AlertCircle } from 'lucide-react';
import { INITIAL_SEED_PRODUCTS } from '../data/seedCatalog';

export default function AdminSettingsPage({ onSeedCatalog }) {
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg('');
    try {
      await onSeedCatalog(INITIAL_SEED_PRODUCTS);
      setSeedMsg(`Successfully seeded ${INITIAL_SEED_PRODUCTS.length} fashion products to Firestore collection 'products'.`);
    } catch (e) {
      setSeedMsg('Seeding error: ' + e.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-serif text-[#2C4152] tracking-wide">
          Firebase Architecture & Database Settings
        </h1>
        <p className="text-xs text-gray-500">
          Configure Firebase Firestore collections, Firebase Storage buckets, and Authentication.
        </p>
      </div>

      {/* Status Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg shrink-0 ${isFirebaseConfigured ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2C4152]">
                Firebase Firestore Connection: {isFirebaseConfigured ? 'LIVE & ACTIVE' : 'LOCAL EMULATION MODE'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isFirebaseConfigured
                  ? 'Connected directly to Google Firebase Cloud Services. Real-time onSnapshot listeners are active.'
                  : 'Running in Local Reactive Mode with BroadcastChannel cross-tab sync. Add your Firebase keys in .env to connect live.'}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto shrink-0 ${
            isFirebaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {isFirebaseConfigured ? 'Cloud Connected' : 'Local Fallback'}
          </span>
        </div>

        {/* Firebase Config Checklist */}
        <div className="p-4 rounded-lg bg-[#F5F5F5] border border-gray-200 space-y-2 text-xs">
          <span className="font-bold text-[#2C4152] block uppercase tracking-wider text-[11px]">
            Environment Configuration (.env)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-500">VITE_FIREBASE_API_KEY:</span>
              <span className="font-bold">{import.meta.env.VITE_FIREBASE_API_KEY ? 'Configured (✓)' : 'Pending (.env)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-500">VITE_FIREBASE_PROJECT_ID:</span>
              <span className="font-bold">{import.meta.env.VITE_FIREBASE_PROJECT_ID || 'leoverse-store'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-500">Firestore Collection:</span>
              <span className="font-bold font-mono text-[#D5A249]">products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-500">Storage Bucket:</span>
              <span className="font-bold font-mono text-[#D5A249]">products/</span>
            </div>
          </div>
        </div>

        {/* Database Seeder */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#2C4152] block">
              Seed Master Catalog
            </span>
            <span className="text-[11px] text-gray-500">
              Writes pre-curated luxury fashion items with multiple images, sizes, colors, and prices into Firestore.
            </span>
          </div>

          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#D5A249] text-[#2C4152] hover:bg-[#E4BA68] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span>{seeding ? 'Writing to Firestore...' : 'Seed Catalog to Firestore'}</span>
          </button>
        </div>

        {seedMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{seedMsg}</span>
          </div>
        )}
      </div>

      {/* Guide Card */}
      <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#2C4152] uppercase tracking-wider">
          How to connect your personal Google Firebase project:
        </h3>
        <ol className="text-xs text-gray-600 space-y-1.5 list-decimal pl-4">
          <li>Create a project in the <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#D5A249] font-bold underline">Firebase Console</a>.</li>
          <li>Enable <strong>Firestore Database</strong> (Test mode or production mode).</li>
          <li>Enable <strong>Firebase Storage</strong> for image uploads.</li>
          <li>Enable <strong>Firebase Authentication</strong> (Email/Password provider).</li>
          <li>Copy your web app configuration keys into <code className="bg-gray-100 px-1 py-0.5 rounded text-[#2C4152] font-mono">.env</code> in the project root.</li>
          <li>Restart the Vite dev server—both the Customer Platform and Admin Dashboard will automatically sync through Firestore!</li>
        </ol>
      </div>

      {/* Engineering & Design Credits Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#2C4152] to-[#1D2A35] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D5A249] flex items-center justify-center text-[#1D2A35] font-serif font-black text-lg shrink-0">
            KL
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              LEOVERSE Digital Studio Architecture
            </h4>
            <p className="text-[11px] text-[#D5A249] font-medium">
              Developed & Designed by Krish Lad
            </p>
          </div>
        </div>
        <span className="text-[10px] text-white/60 tracking-wider uppercase bg-white/10 px-2.5 py-1 rounded-full self-start sm:self-auto font-mono">
          Engineered Edition • 2026
        </span>
      </div>
    </div>
  );
}
