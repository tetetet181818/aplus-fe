'use client';

import { JSX } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';
import {
  BookOpen,
  LayoutDashboard,
  LogIn,
  LogOut,
  PlusCircle,
  Settings,
  ShoppingBag,
  UserPlus,
} from 'lucide-react';

import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher';
import { Button } from '@/components/ui/button';

interface User {
  role?: string;
  [key: string]: unknown;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user?: User | null;
  handleLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  handleLogout,
}: MobileMenuProps): JSX.Element | null => {
  if (!isOpen) return null;

  const handleLinkClick = (action?: () => void) => {
    if (action) action();
    onClose();
  };

  return (
    <motion.nav
      className="absolute inset-x-0 top-full z-50 border-t-2 border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/95 md:hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      aria-label="Mobile navigation menu"
    >
      <div className="space-y-2 px-4 py-6">
        <div className="mb-4 flex items-center justify-center">
          <ThemeSwitcher />
        </div>
        
        <Link href="/notes">
          <Button
            variant="ghost"
            className="group w-full justify-start rounded-xl border-2 border-transparent bg-gray-50 py-3.5 text-base font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700"
            onClick={() => handleLinkClick()}
          >
            <BookOpen
              className="text-primary ml-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="text-gray-700 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
              تصفح الملخصات
            </span>
          </Button>
        </Link>

          {isAuthenticated ? (
            <>
              <Link href="/add-note">
                <Button
                  className="group relative w-full justify-start overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                  onClick={() => handleLinkClick()}
                >
                  <PlusCircle
                    className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">إضافة ملخص</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </Button>
              </Link>

              {user?.role === 'admin' && (
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="group w-full justify-start rounded-xl border-2 border-transparent bg-gray-50 py-3.5 text-base font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700"
                    onClick={() => handleLinkClick()}
                  >
                    <LayoutDashboard
                      className="text-primary ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="text-gray-700 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                      لوحة التحكم
                    </span>
                  </Button>
                </Link>
              )}

              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="group w-full justify-start rounded-xl border-2 border-transparent bg-gray-50 py-3.5 text-base font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700"
                  onClick={() => handleLinkClick()}
                >
                  <Settings
                    className="text-primary ml-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
                    aria-hidden="true"
                  />
                  <span className="text-gray-700 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                    إدارة الحساب
                  </span>
                </Button>
              </Link>

              <Link href="/profile?tab=purchased">
                <Button
                  variant="ghost"
                  className="group w-full justify-start rounded-xl border-2 border-transparent bg-gray-50 py-3.5 text-base font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700"
                  onClick={() => handleLinkClick()}
                >
                  <ShoppingBag
                    className="text-primary ml-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="text-gray-700 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                    مشترياتي
                  </span>
                </Button>
              </Link>

              <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>

              <Button
                variant="ghost"
                className="group w-full justify-start rounded-xl border-2 border-red-200 bg-red-50 py-3.5 text-base font-medium text-red-600 transition-all duration-300 hover:border-red-300 hover:bg-red-100 hover:shadow-md dark:border-red-800 dark:bg-red-950/30 dark:text-red-400 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                onClick={() => handleLinkClick(handleLogout)}
              >
                <LogOut className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                <span>تسجيل الخروج</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="group w-full justify-start rounded-xl border-2 border-blue-200 bg-white py-3.5 text-base font-semibold text-blue-600 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md dark:border-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:border-blue-500 dark:hover:bg-gray-700"
                  onClick={() => handleLinkClick()}
                >
                  <LogIn
                    className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>تسجيل الدخول</span>
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  className="group relative w-full justify-start overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                  onClick={() => handleLinkClick()}
                >
                  <UserPlus
                    className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">إنشاء حساب</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </Button>
              </Link>
            </>
          )}
      </div>
    </motion.nav>
  );
};

export default MobileMenu;
