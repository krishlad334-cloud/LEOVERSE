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
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#121214] text-[#242321] dark:text-[#F3EFE6] transition-colors duration-200">
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
