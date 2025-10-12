"use client";

import { X, Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { notificationType } from "@/types";
import NotificationItem from "./NotificationItem";
import NotificationSkeleton from "../skeletons/NotificationSkeleton";

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
  const unreadCount = notifications?.filter((n) => !n.read)?.length || 0;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* ==== Trigger ==== */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-transparent min-w-[40px] min-h-[40px]"
        >
          {notificationLoading ? (
            <Loader2 className="size-5 text-primary animate-spin" />
          ) : (
            <Bell className="size-5 text-primary" />
          )}

          {unreadCount > 0 && (
            <span
              className="absolute top-1 right-1 flex items-center justify-center 
                h-4 w-4 rounded-full bg-red-600 text-white 
                text-[9px] sm:text-[10px] font-bold shadow-md ring-2 ring-background"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* ==== Content ==== */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="
          w-[90vw] sm:w-96 max-w-sm p-0 overflow-hidden
          border bg-background shadow-2xl rounded-2xl
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
          data-[side=bottom]:slide-in-from-top-2
          max-h-[80vh] overflow-y-auto
        "
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
      <div className="flex items-center justify-between p-3 sm:p-4 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-primary" />
          <h3 className="font-semibold text-sm sm:text-lg">الإشعارات</h3>
          {!!notifications?.length && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs">
              {notifications.filter((n) => !n.read)?.length} جديد
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
      <div className="flex flex-wrap justify-between items-center gap-2 px-3 py-2 border-b bg-gray-50 dark:bg-gray-800">
        <Button
          variant="outline"
          size="sm"
          onClick={onReadAll}
          disabled={notificationLoading || !notifications?.length}
          className="text-[11px] sm:text-xs flex-1 sm:flex-none"
        >
          {notificationLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            "تحديد الكل كمقروء"
          )}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onClearAll}
          disabled={notificationLoading || !notifications?.length}
          className="text-[11px] sm:text-xs flex-1 sm:flex-none"
        >
          {notificationLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            "مسح الكل"
          )}
        </Button>
      </div>

      {/* ==== Notifications List ==== */}
      <div className="p-2 sm:p-3 space-y-2">
        {notificationLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))
        ) : notifications?.length > 0 ? (
          notifications.map((n) => (
            <NotificationItem
              key={n._id}
              id={n._id}
              title={n.title}
              body={n.message}
              type={n.type || "system"}
              user={"النظام"}
              date={new Date(n.createdAt).toLocaleDateString("ar-EG")}
              read={n.read}
              handleMakeNotificationRead={handleMakeNotificationRead}
            />
          ))
        ) : (
          <p className="text-center text-xs sm:text-sm text-muted-foreground py-6">
            لا توجد إشعارات حالياً
          </p>
        )}
      </div>
    </div>
  );
}
