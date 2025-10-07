"use client";

import {
  X,
  Bell,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  DollarSign,
  Settings,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { notificationType } from "@/types";

/** 🔔 Main Notification Bell with unified loading state */
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
    <div className="relative">
      {/* ==== Bell Icon ==== */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((p) => !p)}
        className="relative rounded-full hover:bg-transparent w-15 h-15"
      >
        {notificationLoading ? (
          <Loader2 className="size-5 text-primary animate-spin" />
        ) : (
          <Bell className="size-5 text-primary" />
        )}

        {/* ==== Unread flag ==== */}
        {unreadCount > 0 && (
          <span
            className="absolute top-2 right-2 flex items-center justify-center 
              h-5 w-5 rounded-full bg-red-600 text-white text-[10px] 
              font-bold shadow-md ring-2 ring-background"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {/* ==== Dropdown Panel ==== */}
      {open && (
        <div className="absolute left-0 mt-2 w-96 max-h-[80vh] bg-background border rounded-xl shadow-2xl overflow-y-auto z-50">
          <NotificationPanel
            onClose={() => setOpen(false)}
            notifications={notifications}
            notificationLoading={notificationLoading}
            onReadAll={onReadAll}
            onClearAll={onClearAll}
            handleMakeNotificationRead={handleMakeNotificationRead}
          />
        </div>
      )}
    </div>
  );
}

/** 📜 Notification dropdown content */
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
      <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-primary" />
          <h3 className="font-semibold text-lg">الإشعارات</h3>
          {!!notifications?.length && (
            <Badge variant="secondary" className="text-xs">
              {notifications.filter((n) => !n.read)?.length} جديد
            </Badge>
          )}
        </div>
        <Button variant="destructive" size="icon" onClick={onClose}>
          <X className="size-5" />
        </Button>
      </div>

      {/* ==== Actions ==== */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50 dark:bg-gray-800">
        <Button
          variant="outline"
          size="sm"
          onClick={onReadAll}
          disabled={notificationLoading || !notifications?.length}
          className="text-xs gap-2"
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
          className="text-xs gap-2"
        >
          {notificationLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            "مسح الكل"
          )}
        </Button>
      </div>

      {/* ==== Notifications List ==== */}
      <div className="p-3 space-y-2">
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
          <p className="text-center text-sm text-muted-foreground py-6">
            لا توجد إشعارات حالياً
          </p>
        )}
      </div>
    </div>
  );
}

/** 💫 Skeleton loader - same layout as notification item */
function NotificationSkeleton() {
  return (
    <Card className="border bg-gradient-to-r from-primary/5 to-blue-500/5">
      <CardContent className="p-4 flex gap-3 items-start">
        <Skeleton className="h-5 w-5 rounded-full bg-primary/10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" /> {/* ==== Title ==== */}
          <Skeleton className="h-3 w-5/6" /> {/* ==== Body ==== */}
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-6 w-6 rounded-full" />{" "}
            {/* ==== Avatar ==== */}
            <Skeleton className="h-3 w-16" /> {/* ==== User ==== */}
          </div>
          <div className="flex justify-between mt-2">
            <Skeleton className="h-3 w-20" /> {/* ==== Date ==== */}
            <Skeleton className="h-4 w-10 rounded-md" /> {/* ==== Badge ==== */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/** 🔔 Single notification card item */
function NotificationItem({
  title,
  body,
  type,
  user,
  date,
  read,
  id,
  handleMakeNotificationRead,
}: {
  title: string;
  body: string;
  type: string;
  user: string;
  date: string;
  read: boolean;
  id: string;
  handleMakeNotificationRead: (id: string) => void;
}) {
  /** ==== Choose icon by type ==== */
  const getIcon = () => {
    switch (type) {
      case "withdrawal":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "auth":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "student":
        return <Users className="h-5 w-5 text-purple-500" />;
      case "purchase":
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case "sale":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "system":
        return <Settings className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  /** ==== Render notification ==== */
  return (
    <Card
      className={`border hover:bg-gray-100 transition ${
        read ? "" : "bg-primary/20 hover:bg-primary/30"
      }`}
      onClick={() => handleMakeNotificationRead(id)}
    >
      <CardContent className="p-4 flex gap-3">
        <div>{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{body}</p>

          {/* ==== User info ==== */}
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{user}</span>
          </div>

          {/* ==== Footer ==== */}
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{date}</span>
            <Badge variant="outline">{type}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
