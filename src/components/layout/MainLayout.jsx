import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationToast from '../common/NotificationToast';
import WhatsAppButton from '../common/WhatsAppButton';

export const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] dark:bg-[#121A21] text-[#2C4152] dark:text-[#F5F5F5] transition-colors duration-200">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <NotificationToast />
    </div>
  );
};

export default MainLayout;
