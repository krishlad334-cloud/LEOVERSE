import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Pages
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import CategoryPage from '../pages/CategoryPage';
import NewArrivalsPage from '../pages/NewArrivalsPage';
import BestsellersPage from '../pages/BestsellersPage';
import SalePage from '../pages/SalePage';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Daily from '../pages/Daily';
import Admin from '../pages/Admin';
import Wishlist from '../pages/Wishlist';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from '../pages/Account';
import OrderHistory from '../pages/OrderHistory';
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
      {/* Standalone Authentication Pages (NO Navbar, NO Header, NO Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Standalone Full-Screen Professional Admin Panel with Sidebar */}
      <Route path="/admin" element={<Admin />} />

      {/* Customer Website with Storefront Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="new-arrivals" element={<NewArrivalsPage />} />
        <Route path="bestsellers" element={<BestsellersPage />} />
        <Route path="sale" element={<SalePage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="daily" element={<Daily />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="account" element={<Account />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="order-tracking" element={<OrderHistory />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<CollectionDetails />} />
        <Route path="lookbook" element={<Navigate to="/collections" replace />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<JournalArticle />} />
        <Route path="size-guide" element={<SizeGuide />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
