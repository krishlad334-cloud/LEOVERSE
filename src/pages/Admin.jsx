import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminMediaLibrary from './admin/AdminMediaLibrary';
import AdminProductAnalytics from './admin/AdminProductAnalytics';
import AdminCategories from './admin/AdminCategories';
import AdminOrders from './admin/AdminOrders';
import AdminLogin from './admin/AdminLogin';

export const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('leoverse_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const tabFromUrl = searchParams.get('tab') || 'overview';
  const prodFromUrl = searchParams.get('productId') || '';

  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [selectedProductId, setSelectedProductId] = useState(prodFromUrl);

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  useEffect(() => {
    if (prodFromUrl) {
      setSelectedProductId(prodFromUrl);
    }
  }, [prodFromUrl]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('tab', tabId);
      return next;
    });
  };

  const handleNavigateToAnalytics = (productId) => {
    if (productId) {
      setSelectedProductId(productId);
      setSearchParams({ tab: 'analytics', productId });
    } else {
      setSearchParams({ tab: 'analytics' });
    }
    setActiveTab('analytics');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('leoverse_admin_token');
    sessionStorage.removeItem('leoverse_admin_user');
    setUser(null);
  };

  if (!user) {
    return <AdminLogin onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      onLogout={handleLogout}
      user={user}
    >
      {activeTab === 'overview' && (
        <AdminDashboard
          onNavigateToAnalytics={handleNavigateToAnalytics}
          onNavigateToProducts={() => handleSelectTab('products')}
          onNavigateToMedia={() => handleSelectTab('media')}
        />
      )}

      {activeTab === 'products' && (
        <AdminProducts
          onNavigateToAnalytics={handleNavigateToAnalytics}
        />
      )}

      {activeTab === 'media' && (
        <AdminMediaLibrary />
      )}

      {activeTab === 'analytics' && (
        <AdminProductAnalytics
          initialProductId={selectedProductId}
        />
      )}

      {activeTab === 'categories' && (
        <AdminCategories />
      )}

      {activeTab === 'orders' && (
        <AdminOrders />
      )}
    </AdminLayout>
  );
};

export default Admin;
