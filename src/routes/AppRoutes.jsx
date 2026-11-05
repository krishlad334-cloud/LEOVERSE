import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Core Pages
import Home from '../pages/Home';
import Men from '../pages/Men';
import Women from '../pages/Women';
import Kids from '../pages/Kids';
import Products from '../pages/Products';
import CategoryPage from '../pages/CategoryPage';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import Wishlist from '../pages/Wishlist';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Account Sub-pages
import Account from '../pages/Account';
import AccountOrders from '../pages/AccountOrders';
import OrderDetails from '../pages/OrderDetails';
import AccountAddresses from '../pages/AccountAddresses';

// Editorial & Auxiliary Pages
import NewArrivalsPage from '../pages/NewArrivalsPage';
import BestsellersPage from '../pages/BestsellersPage';
import SalePage from '../pages/SalePage';
import Daily from '../pages/Daily';
import Admin from '../pages/Admin';
import FAQ from '../pages/FAQ';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Collections from '../pages/Collections';
import CollectionDetails from '../pages/CollectionDetails';
import Journal from '../pages/Journal';
import JournalArticle from '../pages/JournalArticle';
import SizeGuide from '../pages/SizeGuide';
import ShippingPolicy from '../pages/ShippingPolicy';
import ReturnPolicy from '../pages/ReturnPolicy';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Standalone Full-Screen Admin Panel */}
      <Route path="/admin" element={<Admin />} />

      {/* Storefront Layout with Header, Mega Menu & Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        
        {/* Department Pages */}
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="kids" element={<Kids />} />

        {/* Product Catalog & Discovery */}
        <Route path="products" element={<Products />} />
        <Route path="shop" element={<Navigate to="/products" replace />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="search" element={<Search />} />
        
        {/* Curated Feeds */}
        <Route path="new-arrivals" element={<NewArrivalsPage />} />
        <Route path="bestsellers" element={<BestsellersPage />} />
        <Route path="sale" element={<SalePage />} />
        <Route path="daily" element={<Daily />} />

        {/* Shopping Cart & Checkout Flow */}
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />

        {/* Customer Account & Order Management */}
        <Route path="account" element={<Account />} />
        <Route path="account/orders" element={<AccountOrders />} />
        <Route path="account/orders/:id" element={<OrderDetails />} />
        <Route path="account/addresses" element={<AccountAddresses />} />
        <Route path="order-history" element={<Navigate to="/account/orders" replace />} />
        <Route path="order-tracking" element={<Navigate to="/account/orders" replace />} />

        {/* Brand & Editorial */}
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<CollectionDetails />} />
        <Route path="lookbook" element={<Navigate to="/collections" replace />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<JournalArticle />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />

        {/* Policies & Help */}
        <Route path="size-guide" element={<SizeGuide />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
