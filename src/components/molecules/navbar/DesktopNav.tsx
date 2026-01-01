import Link from 'next/link';

import { User, notificationType } from '@/types';
import { PlusCircle } from 'lucide-react';

import { NotificationBell } from '@/components/atoms/NotificationBell';
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import UserMenu from './UserMenu';

/**
 * Desktop navigation bar.
 * Renders navigation buttons, user menu, and notifications.
 * Waits for token readiness before deciding what to show.
 */
interface DesktopNavProps {
  user: User | null;
  handleLogout: () => void;
  notificationLoading: boolean;
  handleReadAllNotification: () => void;
  handelClearAllNotification: () => void;
  handleMakeNotificationRead: (id: string) => void;
  notifications: notificationType[];
  loading: boolean;
}

const DesktopNav = ({
  user,
  handleLogout,
  notifications,
  notificationLoading,
  handleReadAllNotification,
  handelClearAllNotification,
  handleMakeNotificationRead,
  loading,
}: DesktopNavProps) => {
  if (loading) {
    return (
      <div className="hidden items-center justify-center gap-3 sm:flex">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    );
  }
  return (
    <nav className="hidden items-center gap-3 md:flex">
      <ThemeSwitcher />
      
      <Link href="/notes">
        <Button 
          variant="outline" 
          className="group relative overflow-hidden border-2 border-gray-200 bg-white px-5 py-2.5 text-base font-semibold transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>تصفح الملخصات</span>
          </span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-50/0 to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Button>
      </Link>

      {user ? (
        <>
          <Link href="/add-note">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
              <span className="relative z-10 flex items-center gap-2">
                <PlusCircle size={18} className="transition-transform duration-300 group-hover:rotate-90" />
                <span>إضافة ملخص</span>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </Button>
          </Link>

          <UserMenu handleLogout={handleLogout} user={user} />

          <NotificationBell
            notifications={notifications}
            notificationLoading={notificationLoading}
            onReadAll={handleReadAllNotification}
            onClearAll={handelClearAllNotification}
            handleMakeNotificationRead={handleMakeNotificationRead}
          />
        </>
      ) : (
        <>
          <Link href="/login">
            <Button
              variant="outline"
              className="cursor-pointer group relative overflow-hidden border-2 border-blue-200 bg-white px-6 py-2.5 text-base font-semibold text-blue-600 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md dark:border-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:border-blue-500 dark:hover:bg-gray-700"
              aria-label="تسجيل الدخول"
            >
              <span className="relative z-10">تسجيل الدخول</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-50/0 to-purple-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>
          </Link>

          <Link href="/register">
            <Button
              className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-700 hover:shadow-xl"
              aria-label="إنشاء حساب" 
            >
              <span className="relative z-10">إنشاء حساب</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNav;
