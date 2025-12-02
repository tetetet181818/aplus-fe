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
  onLoginOpen: () => void;
  onRegisterOpen: () => void;
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
  onLoginOpen,
  onRegisterOpen,
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
        <Button variant="outline" className="hover:bg-primary/10 text-base">
          تصفح الملخصات
        </Button>
      </Link>

      {user ? (
        <>
          <Link href="/add-note">
            <Button className="bg-primary hover:bg-primary/90 text-base">
              <PlusCircle size={18} className="ml-2" />
              إضافة ملخص
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
          <Button
            variant="outline"
            onClick={onLoginOpen}
            className="border-primary text-primary hover:bg-primary/10 hover:text-primary text-base"
            aria-label="تسجيل الدخول"
          >
            تسجيل الدخول
          </Button>

          <Button
            onClick={onRegisterOpen}
            className="bg-primary hover:bg-primary/90 text-base"
            aria-label="إنشاء حساب"
          >
            إنشاء حساب
          </Button>
        </>
      )}
    </nav>
  );
};

export default DesktopNav;
