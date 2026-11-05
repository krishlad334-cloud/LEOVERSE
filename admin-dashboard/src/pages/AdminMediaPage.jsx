import { useState } from 'react';
import { uploadImageToStorage, isFirebaseConfigured } from '../services/firebase';
import { Upload, Image as ImageIcon, Copy, Check, Trash2, ExternalLink } from 'lucide-react';

export default function AdminMediaPage() {
  const [images, setImages] = useState([
    {
      id: 'm1',
      url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      name: 'linen_mandarin_shirt.jpg',
      size: '1.2 MB',
      date: '2026-11-04'
    },
    {
      id: 'm2',
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      name: 'silk_blend_blazer.jpg',
      size: '2.4 MB',
      date: '2026-11-04'
    },
    {
      id: 'm3',
      url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      name: 'calfskin_sneakers.jpg',
      size: '1.8 MB',
      date: '2026-11-04'
    },
    {
      id: 'm4',
      url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      name: 'automatic_chronograph.jpg',
      size: '2.1 MB',
      date: '2026-11-05'
    }
  ]);

  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newItems = [];
      for (const file of Array.from(files)) {
        const downloadUrl = await uploadImageToStorage(file, 'media-library');
        newItems.push({
          id: 'media_' + Date.now() + Math.random().toString(36).substring(2, 5),
          url: downloadUrl,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          date: new Date().toISOString().split('T')[0]
        });
      }
      setImages((prev) => [...newItems, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C4152] tracking-wide">
            Firebase Storage & Media Library
          </h1>
          <p className="text-xs text-gray-500">
            Upload high-resolution photography assets directly to your cloud storage bucket.
          </p>
        </div>

        <label className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#2C4152] text-white hover:bg-[#1E2D3A] transition-colors shadow-sm cursor-pointer w-full sm:w-auto">
          <Upload className="w-4 h-4 text-[#D5A249]" />
          <span>{uploading ? 'Uploading to Storage...' : 'Upload Media to Cloud'}</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Cloud bucket banner */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#D5A249]/20 text-[#2C4152] shrink-0">
            <ImageIcon className="w-5 h-5 text-[#2C4152]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#2C4152] block">
              Active Storage Bucket: {isFirebaseConfigured ? 'Google Cloud Storage' : 'Local Mock & Data URLs'}
            </span>
            <span className="text-[11px] text-gray-500">
              High-speed CDN delivery enabled for customer product gallery images.
            </span>
          </div>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 rounded-md text-gray-700 self-start sm:self-auto shrink-0">
          {images.length} Assets
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:border-[#D5A249] transition-all flex flex-col justify-between"
          >
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(img.id, img.url)}
                  className="p-2 rounded-full bg-white text-[#2C4152] hover:bg-[#D5A249] transition-colors"
                  title="Copy URL"
                >
                  {copiedId === img.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-[#2C4152] hover:bg-[#D5A249] transition-colors"
                  title="View full size"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="p-2.5 text-xs">
              <span className="font-semibold text-[#2C4152] block truncate" title={img.name}>
                {img.name}
              </span>
              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                <span>{img.size}</span>
                <span>{img.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
