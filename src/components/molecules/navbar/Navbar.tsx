"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Award } from "lucide-react";

import DesktopNav from "@/components/molecules/navbar/DesktopNav";
import MobileMenu from "@/components/molecules/navbar/MobileMenu";
import LoginDialog from "@/components/molecules/dialogs/LoginDialog";
import RegisterDialog from "@/components/molecules/dialogs/RegisterDialog";
import useAuth from "@/hooks/useAuth";
import useNotifications from "@/hooks/useNotifications";
import { NotificationBell } from "@/components/atoms/NotificationBell";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { user, isAuthenticated, logoutUser, loading, isTokenReady } =
    useAuth();
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

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <header
      dir="rtl"
      role="banner"
      className="px-6 md:px-10 sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm"
    >
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
          aria-label="الانتقال إلى الصفحة الرئيسية"
        >
          <Award className="h-7 w-7 text-primary drop-shadow-sm" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            منصة أ+
          </span>
        </Link>

        <DesktopNav
          isAuthenticated={isAuthenticated}
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
          isTokenReady={isTokenReady}
        />

        {/* Mobile Hamburger */}
        <div className="md:hidden flex justify-end items-center">
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
            className="rounded-lg hover:bg-gray-100 bg-gray-200 transition-colors"
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
