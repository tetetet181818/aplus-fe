'use client';

import { useState } from 'react';

import { notificationType } from '@/types';
import { Bell, Loader2, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* ==== Trigger ==== */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative min-h-[40px] min-w-[40px] rounded-full hover:bg-transparent"
        >
          {notificationLoading ? (
            <Loader2 className="text-primary size-5 animate-spin" />
          ) : (
            <Bell className="text-primary size-5" />
          )}

          {unreadCount > 0 && (
            <span className="ring-background absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-md ring-2 sm:text-[10px]">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* ==== Content ==== */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2 max-h-[80vh] w-[90vw] max-w-sm overflow-hidden overflow-y-auto rounded-2xl border p-0 shadow-2xl sm:w-96"
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
  return (
    <div className="w-full">
      {/* ==== Header ==== */}
      <div className="bg-background sticky top-0 z-10 flex items-center justify-between border-b p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <Bell className="text-primary size-5" />
          <h3 className="text-sm font-semibold sm:text-lg">الإشعارات</h3>
          {!!notifications?.length && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs">
              {notifications.filter(n => !n.read)?.length} جديد
            </Badge>
          )}
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 sm:h-8 sm:w-8"
        >
          <X className="size-4 sm:size-5" />
        </Button>
      </div>

      {/* ==== Actions ==== */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-gray-50 px-3 py-2 dark:bg-gray-800">
        <Button
          variant="outline"
          size="sm"
          onClick={onReadAll}
          disabled={notificationLoading || !notifications?.length}
          className="flex-1 text-[11px] sm:flex-none sm:text-xs"
        >
          {notificationLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            'تحديد الكل كمقروء'
          )}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onClearAll}
          disabled={notificationLoading || !notifications?.length}
          className="flex-1 text-[11px] sm:flex-none sm:text-xs"
        >
          {notificationLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            'مسح الكل'
          )}
        </Button>
      </div>

      {/* ==== Notifications List ==== */}
      <div className="space-y-2 p-2 sm:p-3">
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
          <p className="text-muted-foreground py-6 text-center text-xs sm:text-sm">
            لا توجد إشعارات حالياً
          </p>
        )}
      </div>
    </div>
  );
}
