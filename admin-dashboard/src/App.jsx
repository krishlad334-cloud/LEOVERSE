import { useState, useEffect } from 'react';
import { useAdminAuth } from './context/AdminAuthContext';
import {
  subscribeToAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductPublish,
  seedCatalogToFirestore,
} from './services/firebase';
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';
import ProductFormModal from './components/ProductFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminMediaPage from './pages/AdminMediaPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  const { isAuthenticated, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [inquiryCount, setInquiryCount] = useState(0);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalProduct, setDeleteModalProduct] = useState(null);

  // Subscribe to real-time products list
  useEffect(() => {
    const unsubscribe = subscribeToAllProducts((list) => {
      setProducts(list || []);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Fetch inquiries count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('http://localhost:5173/api/inquiries');
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list)) {
            setInquiryCount(list.length);
          }
        }
      } catch {
        // Fallback to local
        try {
          const stored = localStorage.getItem('leoverse_newsletter_inquiries');
          if (stored) {
            setInquiryCount(JSON.parse(stored).length);
          }
        } catch {}
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 8000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2C4152] border-t-[#D5A249] rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C4152]">
            Loading LEOVERSE Studio...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  // Handlers
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (product) => {
    setDeleteModalProduct(product);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct?.id) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setIsFormModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteModalProduct(null);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    try {
      await toggleProductPublish(id, isPublished);
    } catch (err) {
      console.error('Failed to toggle publication status:', err);
    }
  };

  const handleSeedCatalog = async (seedItems) => {
    return seedCatalogToFirestore(seedItems);
  };

  const publishedCount = products.filter((p) => p.isPublished !== false).length;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#2C4152] flex flex-col">
      {/* Sticky Header */}
      <AdminNavbar
        onOpenAddProduct={handleOpenAdd}
        onSearchCatalog={(q) => {
          setGlobalSearch(q);
          if (q.trim() && activeTab !== 'dashboard' && activeTab !== 'products') {
            setActiveTab('dashboard');
          }
        }}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex-1 flex w-full">
        {/* Navigation Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          productCount={products.length}
          publishedCount={publishedCount}
          inquiryCount={inquiryCount}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenAddProduct={handleOpenAdd}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0 p-3 sm:p-6 lg:p-8 lg:ml-64 overflow-y-auto">
          <div className="w-full max-w-[1600px] mx-auto space-y-6">
            {activeTab === 'dashboard' && (
              <AdminDashboardPage
                products={products}
                globalSearch={globalSearch}
                onOpenAddProduct={handleOpenAdd}
                onSeedCatalog={handleSeedCatalog}
                onEditProduct={handleOpenEdit}
                onTogglePublish={handleTogglePublish}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'products' && (
              <AdminProductsPage
                products={products}
                initialSearch={globalSearch}
                onOpenAddProduct={handleOpenAdd}
                onEditProduct={handleOpenEdit}
                onDeleteProduct={handleOpenDelete}
                onTogglePublish={handleTogglePublish}
              />
            )}

            {activeTab === 'orders' && <AdminOrdersPage />}

            {activeTab === 'inquiries' && <AdminInquiriesPage />}

            {activeTab === 'media' && <AdminMediaPage />}

            {activeTab === 'categories' && <AdminCategoriesPage />}

            {activeTab === 'settings' && (
              <AdminSettingsPage onSeedCatalog={handleSeedCatalog} />
            )}
          </div>
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
        isEditing={Boolean(editingProduct)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteModalProduct)}
        onClose={() => setDeleteModalProduct(null)}
        onConfirm={handleConfirmDelete}
        product={deleteModalProduct}
      />
    </div>
  );
}
