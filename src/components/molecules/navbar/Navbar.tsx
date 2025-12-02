'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Award, Menu, X } from 'lucide-react';

import { NotificationBell } from '@/components/atoms/NotificationBell';
import LoginDialog from '@/components/molecules/dialogs/LoginDialog';
import RegisterDialog from '@/components/molecules/dialogs/RegisterDialog';
import DesktopNav from '@/components/molecules/navbar/DesktopNav';
import MobileMenu from '@/components/molecules/navbar/MobileMenu';
import { Button } from '@/components/ui/button';

import useAuth from '@/hooks/useAuth';
import useNotifications from '@/hooks/useNotifications';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { isAuthenticated, handleLogout, user, loading } = useAuth();
  const {
    notifications,
    notificationLoading,

    handleReadAllNotification,
    handelClearAllNotification,
    handleMakeNotificationRead,
  } = useNotifications();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const switchToRegister = () => {
    setIsLoginDialogOpen(false);
    setIsRegisterDialogOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterDialogOpen(false);
    setIsLoginDialogOpen(true);
  };

  return (
    <header
      dir="rtl"
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 px-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 md:px-10 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={() => setIsMenuOpen(false)}
          aria-label="الانتقال إلى الصفحة الرئيسية"
        >
          <Award className="text-primary h-7 w-7 drop-shadow-sm" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            منصة أ+
          </span>
        </Link>

        <DesktopNav
          user={user}
          onLoginOpen={() => setIsLoginDialogOpen(true)}
          onRegisterOpen={() => setIsRegisterDialogOpen(true)}
          handleLogout={handleLogout}
          notifications={notifications}
          notificationLoading={notificationLoading}
          handleReadAllNotification={handleReadAllNotification}
          handelClearAllNotification={handelClearAllNotification}
          handleMakeNotificationRead={handleMakeNotificationRead}
          loading={loading}
        />

        {/* Mobile Hamburger */}
        <div className="flex items-center justify-end md:hidden">
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
            className="rounded-lg bg-gray-200 transition-colors hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="فتح وإغلاق القائمة"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
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
        onLoginOpen={() => {
          setIsLoginDialogOpen(true);
          setIsMenuOpen(false);
        }}
        onRegisterOpen={() => {
          setIsRegisterDialogOpen(true);
          setIsMenuOpen(false);
        }}
        handleLogout={handleLogout}
      />

      {/* Auth Dialogs */}
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        onClose={() => setIsRegisterDialogOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
    </header>
  );
}
