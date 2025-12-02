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
  onLoginOpen: () => void;
  onRegisterOpen: () => void;
  user?: User | null;
  handleLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  onLoginOpen,
  onRegisterOpen,
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
      className="bg-background absolute inset-x-0 top-full z-50 border-t shadow-lg md:hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      aria-label="Mobile navigation menu"
    >
      <div className="space-y-4 px-5 py-4">
        <div className="flex flex-col space-y-2">
          <ThemeSwitcher />
          <Link href="/notes">
            <Button
              variant="ghost"
              className="w-full justify-start py-3 text-base"
              onClick={() => handleLinkClick()}
            >
              <BookOpen
                className="text-muted-foreground ml-3 h-5 w-5"
                aria-hidden="true"
              />
              تصفح الملخصات
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/add-note">
                <Button
                  variant="ghost"
                  className="w-full justify-start py-3 text-base"
                  onClick={() => handleLinkClick()}
                >
                  <PlusCircle
                    className="text-muted-foreground ml-3 h-5 w-5"
                    aria-hidden="true"
                  />
                  إضافة ملخص
                </Button>
              </Link>

              {user?.role === 'admin' && (
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-start py-3 text-base"
                    onClick={() => handleLinkClick()}
                  >
                    <LayoutDashboard
                      className="text-muted-foreground ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    لوحة التحكم
                  </Button>
                </Link>
              )}

              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="w-full justify-start py-3 text-base"
                  onClick={() => handleLinkClick()}
                >
                  <Settings
                    className="text-muted-foreground ml-3 h-5 w-5"
                    aria-hidden="true"
                  />
                  إدارة الحساب
                </Button>
              </Link>

              <Link href="/profile?tab=purchased">
                <Button
                  variant="ghost"
                  className="w-full justify-start py-3 text-base"
                  onClick={() => handleLinkClick()}
                >
                  <ShoppingBag
                    className="text-muted-foreground ml-3 h-5 w-5"
                    aria-hidden="true"
                  />
                  مشترياتي
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="text-destructive w-full justify-start py-3"
                onClick={() => handleLinkClick(handleLogout)}
              >
                <LogOut className="ml-3 h-5 w-5" aria-hidden="true" />
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start py-3 text-base"
                onClick={() => handleLinkClick(onLoginOpen)}
              >
                <LogIn
                  className="text-muted-foreground ml-3 h-5 w-5"
                  aria-hidden="true"
                />
                تسجيل الدخول
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start py-3 text-base"
                onClick={() => handleLinkClick(onRegisterOpen)}
              >
                <UserPlus
                  className="text-muted-foreground ml-3 h-5 w-5"
                  aria-hidden="true"
                />
                إنشاء حساب
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileMenu;
