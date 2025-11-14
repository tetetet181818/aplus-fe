import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UserMenu from "./UserMenu";
import { NotificationBell } from "@/components/atoms/NotificationBell";
import { notificationType, User } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex items-center justify-center gap-3">
        <Skeleton className="w-32 h-10 rounded-md" />
        <Skeleton className="w-32 h-10 rounded-md" />
      </div>
    );
  }
  return (
    <nav className="hidden md:flex items-center gap-3">
      <Link href="/notes">
        <Button variant="outline" className="text-base hover:bg-primary/10">
          تصفح الملخصات
        </Button>
      </Link>

      {user ? (
        <>
          <Link href="/add-note">
            <Button className="text-base bg-primary hover:bg-primary/90">
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
            className="text-base border-primary text-primary hover:bg-primary/10 hover:text-primary"
            aria-label="تسجيل الدخول"
          >
            تسجيل الدخول
          </Button>

          <Button
            onClick={onRegisterOpen}
            className="text-base bg-primary hover:bg-primary/90"
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
