'use client';
import React from 'react';

import useNotifications from '@/hooks/useNotifications';

import Footer from '../molecules/footer/Footer';
import Navbar from '../molecules/navbar/Navbar';
import { Toaster } from '../ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  useNotifications();
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Toaster richColors position="top-right" />
      <Footer />
    </>
  );
}
