import React, { useEffect, useState } from 'react';
import { Layers, Plus, Edit, Trash2, X, RefreshCw } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState("Men's Apparel");
  const [subcategoriesText, setSubcategoriesText] = useState('');
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setDepartment("Men's Apparel");
    setSubcategoriesText('French Flax Linen, Oxford Formal, Camp Collar');
    setImage('https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDepartment(cat.department || "Men's Apparel");
    let subs = '';
    try {
      const parsed = typeof cat.subcategories === 'string' ? JSON.parse(cat.subcategories) : cat.subcategories;
      subs = Array.isArray(parsed) ? parsed.join(', ') : '';
    } catch {
      subs = String(cat.subcategories || '');
    }
    setSubcategoriesText(subs);
    setImage(cat.image || '');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menswear category?')) return;
    try {
      await deleteCategory(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete category');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const subs = subcategoriesText.split(',').map((s) => s.trim()).filter(Boolean);
      const payload = {
        name,
        department,
        subcategories: subs,
        image
      };

      if (editingCategory) {
        await updateCategory(editingCategory.id, payload);
      } else {
        await createCategory(payload);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D6] dark:border-[#27272A]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-[0.12em] uppercase text-[#1E1E1E] dark:text-white">
            Menswear Categories & Departments
          </h1>
          <p className="text-xs text-[#77746E] dark:text-gray-400 tracking-wide mt-1">
            Configure wardrobe hierarchy for pure menswear tailoring, casuals, ethnic, outerwear, and accessories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1E1E1E] dark:bg-[#C5A880] hover:bg-black dark:hover:bg-[#B3956E] text-white dark:text-black text-xs font-semibold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A880] dark:text-black" />
          <span>Add Menswear Category</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
          <RefreshCw className="w-8 h-8 text-[#A68962] animate-spin" />
          <p className="text-xs text-gray-500 uppercase tracking-widest">Loading categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => {
            let subList = [];
            try {
              subList = typeof c.subcategories === 'string' ? JSON.parse(c.subcategories) : c.subcategories;
            } catch {}
            return (
              <div
                key={c.id}
                className="bg-white dark:bg-[#18181C] border border-[#E5E0D6] dark:border-[#27272A] hover:border-[#DCD5C9] dark:hover:border-[#383844] rounded-2xl overflow-hidden flex flex-col justify-between transition shadow-xs hover:shadow-md"
              >
                <div className="relative h-36 bg-[#F8F6F2] dark:bg-[#202026] overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#1E1E1E] text-[#C5A880] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                    {c.department}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-[#1E1E1E] dark:text-white">{c.name}</h3>
                    <p className="text-[11px] text-[#A68962] font-mono mt-0.5">slug: {c.slug}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(subList || []).map((sub, i) => (
                        <span key={i} className="text-[10px] bg-[#F8F6F2] dark:bg-[#202026] text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-md border border-[#E5E0D6] dark:border-[#2E2E36] font-medium">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E0D6] dark:border-[#27272A] flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                      {c.itemCount || 0} styles active
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 text-gray-500 hover:text-[#1E1E1E] hover:bg-[#F8F6F2] dark:hover:bg-[#202026] rounded-lg transition"
                        title="Edit category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Category Modal (Warm Light Theme) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D6] rounded-2xl w-full max-w-md p-6 text-[#242321] space-y-4 text-xs shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D6]">
              <h3 className="text-sm font-bold tracking-wider uppercase text-[#1E1E1E]">
                {editingCategory ? 'Edit Menswear Category' : 'Create Menswear Category'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-black p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#1E1E1E] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E5E0D6] focus:border-[#A68962] rounded-xl text-[#1E1E1E] outline-none"
                  placeholder="e.g. Shirts & Polos"
                  required
                />
              </div>

              <div>
                <label className="block text-[#1E1E1E] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Menswear Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E5E0D6] focus:border-[#A68962] rounded-xl text-[#1E1E1E] outline-none cursor-pointer"
                >
                  <option value="Men's Apparel">Men's Apparel</option>
                  <option value="Men's Tailoring">Men's Tailoring</option>
                  <option value="Men's Casuals">Men's Casuals</option>
                  <option value="Men's Ethnic">Men's Ethnic</option>
                  <option value="Men's Outerwear">Men's Outerwear</option>
                  <option value="Men's Accessories">Men's Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1E1E1E] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Subcategories (Comma separated)
                </label>
                <input
                  type="text"
                  value={subcategoriesText}
                  onChange={(e) => setSubcategoriesText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E5E0D6] focus:border-[#A68962] rounded-xl text-[#1E1E1E] outline-none"
                  placeholder="e.g. French Flax Linen, Oxford, Camp Collar"
                />
              </div>

              <div>
                <label className="block text-[#1E1E1E] font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Banner Image URL (Menswear Model / Garment)
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E5E0D6] focus:border-[#A68962] rounded-xl text-[#1E1E1E] outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-3 border-t border-[#E5E0D6] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#F8F6F2] hover:bg-[#EAE5DC] text-gray-700 font-semibold rounded-xl border border-[#E5E0D6] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#1E1E1E] hover:bg-black text-white font-semibold rounded-xl uppercase tracking-wider transition shadow-sm"
                >
                  {saving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
