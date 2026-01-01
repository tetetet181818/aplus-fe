'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Award, Menu, X } from 'lucide-react';

import { NotificationBell } from '@/components/atoms/NotificationBell';
import DesktopNav from '@/components/molecules/navbar/DesktopNav';
import MobileMenu from '@/components/molecules/navbar/MobileMenu';
import { Button } from '@/components/ui/button';

import useAuth from '@/hooks/useAuth';
import useNotifications from '@/hooks/useNotifications';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, handleLogout, user, loading } = useAuth();
  const {
    notifications,
    notificationLoading,

    handleReadAllNotification,
    handelClearAllNotification,
    handleMakeNotificationRead,
  } = useNotifications();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      dir="rtl"
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/95 px-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80 md:px-8 dark:border-gray-800/50 dark:bg-gray-900/95"
    >
      <div className="mx-auto flex h-16 px-10 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105"
          onClick={() => setIsMenuOpen(false)}
          aria-label="الانتقال إلى الصفحة الرئيسية"
        >
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 shadow-lg transition-all duration-300 group-hover:shadow-blue-500/50">
            <Award className="h-6 w-6 text-white drop-shadow-sm" />
          </div>
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-xl font-extrabold text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-purple-700">
            منصة أ+
          </span>
        </Link>

        <DesktopNav
          user={user}
          handleLogout={handleLogout}
          notifications={notifications}
          notificationLoading={notificationLoading}
          handleReadAllNotification={handleReadAllNotification}
          handelClearAllNotification={handelClearAllNotification}
          handleMakeNotificationRead={handleMakeNotificationRead}
          loading={loading}
        />

        <div className="flex items-center justify-end gap-2 md:hidden">
          {isAuthenticated && (
            <NotificationBell
              notifications={notifications}
              notificationLoading={notificationLoading}
              onReadAll={handleReadAllNotification}
              onClearAll={handelClearAllNotification}
              handleMakeNotificationRead={handleMakeNotificationRead}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl border-2 border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700"
            onClick={toggleMenu}
            aria-label="فتح وإغلاق القائمة"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-700 transition-transform duration-300 dark:text-gray-300" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700 transition-transform duration-300 dark:text-gray-300" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
      />
    </header>
  );
}
