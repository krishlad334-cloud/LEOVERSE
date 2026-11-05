import React, { useEffect, useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  Upload,
  Play,
  Eye,
  Trash2,
  Search,
  RefreshCw,
  X
} from 'lucide-react';
import { getMedia, uploadMedia, updateMedia, deleteMedia, getProducts } from '../../services/api';

export const AdminMediaLibrary = () => {
  const [mediaList, setMediaList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [assignModalMedia, setAssignModalMedia] = useState(null);

  // Upload form state
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadProductId, setUploadProductId] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [mediaData, prodsData] = await Promise.all([
        getMedia({
          type: typeFilter,
          productId: productFilter,
          search: searchQuery
        }),
        getProducts()
      ]);
      setMediaList(mediaData);
      setProducts(prodsData);
    } catch (err) {
      setError(err.message || 'Failed to load media items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [typeFilter, productFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadFiles(files);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (uploadFiles.length === 0) return;
    setUploading(true);
    setError('');

    try {
      for (const file of uploadFiles) {
        const base64 = await fileToBase64(file);
        await uploadMedia({
          fileData: base64,
          fileName: file.name,
          fileType: file.type,
          title: uploadTitle || file.name,
          productId: uploadProductId || null,
          duration: file.type.startsWith('video/') ? 18 : 0
        });
      }

      setUploadModalOpen(false);
      setUploadFiles([]);
      setUploadTitle('');
      setUploadProductId('');
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to upload media');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media asset?')) return;
    try {
      await deleteMedia(id);
      if (previewMedia?.id === id) setPreviewMedia(null);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete media');
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignModalMedia) return;
    try {
      await updateMedia(assignModalMedia.id, { productId: assignModalMedia.productId });
      setAssignModalMedia(null);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to reassign media');
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = String(reader.result || '');
        const data = res.split(',')[1] || '';
        resolve(data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
    return Math.round(bytes / 1024) + ' KB';
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.12em] uppercase text-[#1E1E1E] dark:text-white">
            Media Library
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide mt-1 font-semibold">
            Central repository for men's fashion photography, runway clips, and real-time impression counts
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1E1E1E] dark:bg-[#C5A880] hover:bg-black dark:hover:bg-[#B3956E] text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Menswear Media</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl space-y-4 shadow-xs">
        {/* Top Controls Row: Search Bar + Product Mapping Dropdown */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
            {/* Search input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <input
                type="text"
                placeholder="Search assets by title, file name, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F6F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-[#1E1E1E] dark:text-white text-xs pl-9 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-[#A68962] transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black dark:hover:text-white p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Product mapping filter */}
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="bg-[#F8F6F2] dark:bg-[#202026] border border-[#DCD5C9] dark:border-[#2E2E36] text-[#1E1E1E] dark:text-white text-xs font-semibold py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#A68962] cursor-pointer"
            >
              <option value="">All Menswear Styles</option>
              <option value="unassigned">Unassigned Media Only</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 self-end md:self-auto">
            <span className="font-semibold">Showing {mediaList.length} Assets</span>
            {(typeFilter !== 'all' || productFilter || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setTypeFilter('all');
                  setProductFilter('');
                  setSearchQuery('');
                }}
                className="text-[#A68962] dark:text-[#C5A880] font-bold hover:underline cursor-pointer ml-1"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Media type chips (Clean Flex Wrap without chunky horizontal scrollbar) */}
        <div className="pt-3 border-t border-[#E5E0D6] dark:border-[#27272A] flex flex-wrap items-center gap-1.5 sm:gap-2 no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1 hidden sm:inline">
            Media Format:
          </span>
          {[
            { id: 'all', label: 'All Media', count: mediaList.length },
            { id: 'image', label: 'Photos Only', icon: ImageIcon, count: mediaList.filter((m) => m.type === 'image').length },
            { id: 'video', label: 'Videos Only', icon: Video, count: mediaList.filter((m) => m.type === 'video').length }
          ].map((item) => {
            const isSelected = typeFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTypeFilter(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#1E1E1E] dark:bg-[#C5A880] text-white dark:text-black shadow-xs'
                    : 'bg-[#F8F6F2] dark:bg-[#202026] text-gray-700 dark:text-gray-300 hover:bg-[#EAE5DC] dark:hover:bg-[#2A2A34] border border-[#E5E0D6]/60 dark:border-[#2E2E36]'
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-black/20 dark:bg-black/30 text-current'
                    : 'bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
          <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Loading media assets...</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] rounded-2xl space-y-3 shadow-xs">
          <ImageIcon className="w-10 h-10 text-gray-400 mx-auto" />
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">No media items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => {
            const isVideo = item.type === 'video';
            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] hover:border-[#A68962] dark:hover:border-[#C5A880] rounded-xl overflow-hidden flex flex-col shadow-xs hover:shadow-lg transition duration-200"
              >
                {/* Media Container */}
                <div
                  onClick={() => setPreviewMedia(item)}
                  className="relative aspect-square bg-[#FAF9F6] dark:bg-[#202026] cursor-pointer overflow-hidden flex items-center justify-center"
                >
                  {isVideo ? (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        muted
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/15 transition">
                        <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}

                  {/* Badge */}
                  <span className={`absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase shadow-xs ${
                    isVideo ? 'bg-pink-600 text-white' : 'bg-[#1E1E1E] text-white'
                  }`}>
                    {isVideo ? 'VIDEO' : 'PHOTO'}
                  </span>

                  {/* Live Impression Counters */}
                  <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center space-x-1 text-[10px] text-white font-semibold shadow">
                    {isVideo ? (
                      <>
                        <Play className="w-3 h-3 text-pink-400 fill-pink-400" />
                        <span>{item.viewsCount || 0} plays</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 text-[#C5A880]" />
                        <span>{item.viewsCount || 0} views</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Info & Details */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <p className="text-xs font-bold text-[#1E1E1E] dark:text-white truncate" title={item.title}>
                      {item.title || item.fileName}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {item.productName ? (
                        <span className="text-[#A68962] dark:text-[#C5A880] font-semibold">
                          {item.productName}
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400 italic">Unassigned Asset</span>
                      )}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-[#27272A] flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                    <span>{formatFileSize(item.fileSize)}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setAssignModalMedia({ ...item })}
                        className="px-2 py-0.5 bg-[#F8F6F2] dark:bg-[#202026] hover:bg-[#EAE5DC] text-gray-800 dark:text-gray-200 rounded font-semibold text-[9px] border border-[#E5E0D6] dark:border-[#2E2E36] cursor-pointer"
                        title="Reassign to product"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:text-red-600 transition cursor-pointer"
                        title="Delete Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Media Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D6] rounded-2xl w-full max-w-lg p-6 text-[#242321] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D6]">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-[#A68962]" />
                <h3 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E]">Upload Menswear Media</h3>
              </div>
              <button onClick={() => setUploadModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Select Image / Video Files
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                  onChange={handleFileChange}
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1E1E1E] file:text-white hover:file:bg-black cursor-pointer"
                  required
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Supports MP4, WebM runway clips (up to 50MB) and JPG, PNG, WebP photos (up to 8MB)
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Media Title / Caption (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Linen Shirt Runway Movement"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] focus:outline-none focus:border-[#A68962]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Assign to Menswear Style (Optional)
                </label>
                <select
                  value={uploadProductId}
                  onChange={(e) => setUploadProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-[#1E1E1E] focus:outline-none focus:border-[#A68962]"
                >
                  <option value="">Leave Unassigned in Media Library</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-[#E5E0D6] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-[#1E1E1E] hover:bg-black text-white font-bold uppercase tracking-wider rounded-xl disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Save to Library'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal for Video & Image */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D6] rounded-2xl w-full max-w-3xl overflow-hidden text-[#242321] flex flex-col max-h-[90vh] shadow-2xl">
            <div className="p-4 bg-[#FAF9F6] border-b border-[#E5E0D6] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1E1E]">{previewMedia.title || previewMedia.fileName}</h3>
                <span className="text-[10px] text-gray-500 font-mono">{previewMedia.id}</span>
              </div>
              <button onClick={() => setPreviewMedia(null)} className="text-gray-500 hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black flex items-center justify-center min-h-[300px] max-h-[500px] overflow-hidden">
              {previewMedia.type === 'video' ? (
                <video
                  src={previewMedia.url}
                  controls
                  autoPlay
                  className="max-h-[460px] w-auto rounded-lg shadow-2xl"
                />
              ) : (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  className="max-h-[460px] w-auto object-contain rounded-lg"
                />
              )}
            </div>

            <div className="p-5 bg-white border-t border-[#E5E0D6] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-gray-600">
                  Assigned Style:{' '}
                  <strong className="text-black">
                    {previewMedia.productName || 'Unassigned'}
                  </strong>
                </p>
                <p className="text-gray-600">
                  Engagement Stats:{' '}
                  <strong className={previewMedia.type === 'video' ? 'text-pink-600 font-bold' : 'text-sky-700 font-bold'}>
                    {previewMedia.viewsCount || 0} {previewMedia.type === 'video' ? 'plays' : 'views'}
                  </strong>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    const itm = previewMedia;
                    setPreviewMedia(null);
                    setAssignModalMedia({ ...itm });
                  }}
                  className="px-3 py-1.5 bg-[#F8F6F2] hover:bg-[#EAE5DC] text-gray-800 rounded-lg font-bold border border-[#E5E0D6]"
                >
                  Change Style Mapping
                </button>
                <button
                  onClick={() => handleDelete(previewMedia.id)}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold"
                >
                  Delete Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModalMedia && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D6] rounded-2xl w-full max-w-md p-6 text-[#242321] space-y-4 text-xs shadow-2xl">
            <h3 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E]">
              Assign Media to Menswear Style
            </h3>
            <p className="text-gray-600">
              Select which style should showcase <strong>{assignModalMedia.title || assignModalMedia.fileName}</strong>.
            </p>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <select
                value={assignModalMedia.productId || ''}
                onChange={(e) => setAssignModalMedia({ ...assignModalMedia, productId: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DCD5C9] rounded-xl text-black font-semibold"
              >
                <option value="">Unassigned (Keep in Media Library only)</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignModalMedia(null)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1E1E1E] text-white font-bold rounded-lg uppercase tracking-wider"
                >
                  Save Mapping
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMediaLibrary;
