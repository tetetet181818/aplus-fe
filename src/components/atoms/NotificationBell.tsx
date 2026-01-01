'use client';

import { useState } from 'react';

import { notificationType } from '@/types';
import { Bell, Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import NotificationSkeleton from '../skeletons/NotificationSkeleton';
import NotificationItem from './NotificationItem';

export function NotificationBell({
  notifications,
  notificationLoading,
  onReadAll,
  onClearAll,
  handleMakeNotificationRead,
}: {
  notifications: notificationType[];
  notificationLoading: boolean;
  onReadAll: () => void;
  onClearAll: () => void;
  handleMakeNotificationRead: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  console.log(notifications);
  // const unreadCount = notifications?.filter(n => !n.read)?.length || 0;
const unreadCount= 10
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* ==== Trigger ==== */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative h-10 w-10 rounded-full transition-all duration-200 hover:bg-accent/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`الإشعارات${unreadCount > 0 ? ` (${unreadCount} غير مقروء)` : ''}`}
        >
          {notificationLoading ? (
            <Loader2 className="text-primary size-5 animate-spin" />
          ) : (
            <Bell 
              className={`text-primary size-5 transition-transform duration-200 ${
                open ? 'rotate-12' : 'group-hover:rotate-12'
              }`} 
            />
          )}

          {unreadCount > 0 && (
            <span 
              className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-bold text-white shadow-lg ring-2 ring-background transition-all duration-200 hover:scale-110 sm:h-5 sm:w-5 sm:text-[10px]"
              role="status"
              aria-label={`${unreadCount} إشعار غير مقروء`}
            >
              <span className="absolute inset-0 rounded-full bg-red-500 opacity-75"></span>
              <span className="relative">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* ==== Content ==== */}
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 max-h-[85vh] w-[90vw] max-w-sm overflow-hidden overflow-y-auto rounded-xl border shadow-xl sm:w-96"
      >
        <NotificationPanel
          onClose={() => setOpen(false)}
          notifications={notifications}
          notificationLoading={notificationLoading}
          onReadAll={onReadAll}
          onClearAll={onClearAll}
          handleMakeNotificationRead={handleMakeNotificationRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** 📜 Notification Dropdown Content */
function NotificationPanel({
  onClose,
  notifications,
  notificationLoading,
  onReadAll,
  onClearAll,
  handleMakeNotificationRead,
}: {
  onClose: () => void;
  notifications: notificationType[];
  notificationLoading: boolean;
  onReadAll: () => void;
  onClearAll: () => void;
  handleMakeNotificationRead: (id: string) => void;
}) {
  // const unreadCount = notifications?.filter(n => !n.read)?.length || 0;
  const unreadCount= 10
  return (
    <div className="w-full">
      {/* ==== Header ==== */}
      <div className="bg-background/95 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bell className="text-primary size-4" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold leading-tight">الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="text-muted-foreground text-xs leading-tight">
                {unreadCount} غير مقروء
              </span>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-lg hover:bg-accent transition-colors"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* ==== Actions ==== */}
      {notifications?.length > 0 && (
        <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onReadAll}
            disabled={notificationLoading || unreadCount === 0}
            className="h-8 flex-1 text-xs transition-all hover:bg-accent disabled:opacity-50"
          >
            {notificationLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              'تحديد الكل كمقروء'
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            disabled={notificationLoading}
            className="h-8 flex-1 text-xs transition-all hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
          >
            {notificationLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              'مسح الكل'
            )}
          </Button>
        </div>
      )}

      {/* ==== Notifications List ==== */}
      <div className="max-h-[calc(85vh-140px)] overflow-y-auto">
        <div className="space-y-1.5 p-3">
          {notificationLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <NotificationSkeleton key={i} />
            ))
          ) : notifications?.length > 0 ? (
            notifications.map(n => (
              <NotificationItem
                key={n._id}
                id={n._id}
                title={n.title}
                body={n.message}
                type={n.type || 'system'}
                user={'النظام'}
                date={new Date(n.createdAt).toLocaleDateString('ar-EG')}
                read={n.read}
                handleMakeNotificationRead={handleMakeNotificationRead}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Bell className="text-muted-foreground size-8 opacity-50" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                لا توجد إشعارات حالياً
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                ستظهر إشعاراتك هنا عند توفرها
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
