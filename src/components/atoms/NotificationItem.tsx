import {
  Bell,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  DollarSign,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/** 🔔 Single notification card with icon-type badge */
export default function NotificationItem({
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
  /** Return icon by type */
  const getIcon = (size = "h-4 w-4 sm:h-5 sm:w-5") => {
    switch (type) {
      case "withdrawal":
        return <CheckCircle className={`${size} text-green-500`} />;
      case "error":
        return <AlertCircle className={`${size} text-red-500`} />;
      case "warning":
        return <AlertTriangle className={`${size} text-yellow-500`} />;
      case "auth":
        return <Info className={`${size} text-blue-500`} />;
      case "note":
        return <Users className={`${size} text-purple-500`} />;
      case "purchase":
        return <FileText className={`${size} text-indigo-500`} />;
      case "sales":
        return <DollarSign className={`${size} text-green-500`} />;
      case "info":
        return <Settings className={`${size} text-gray-500`} />;
      default:
        return <Bell className={`${size} text-primary`} />;
    }
  };

  /** Pick color tone for the badge background */
  const badgeStyle =
    {
      withdrawal: "bg-green-100 text-green-600 border-green-300",
      error: "bg-red-100 text-red-600 border-red-300",
      warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
      auth: "bg-blue-100 text-blue-600 border-blue-300",
      note: "bg-purple-100 text-purple-600 border-purple-300",
      purchase: "bg-indigo-100 text-indigo-600 border-indigo-300",
      sales: "bg-emerald-100 text-emerald-600 border-emerald-300",
      info: "bg-gray-100 text-gray-600 border-gray-300",
    }[type] || "bg-primary/10 text-primary border-primary/30";

  return (
    <Card
      className={`border hover:bg-gray-100 transition cursor-pointer ${
        read ? "" : "bg-primary/20 hover:bg-primary/30"
      }`}
      onClick={() => handleMakeNotificationRead(id)}
    >
      <CardContent className="p-3 sm:p-4 flex gap-3 items-start">
        {/* ==== Leading Icon ==== */}
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>

        <div className="flex-1 text-[12px] sm:text-[14px]">
          <h4 className="font-medium text-sm sm:text-base">{title}</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground">{body}</p>

          {/* ==== User info ==== */}
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-[11px] sm:text-xs text-muted-foreground">
              {user}
            </span>
          </div>

          {/* ==== Footer ==== */}
          <div className="flex justify-between items-center mt-2 text-[10px] sm:text-xs text-muted-foreground">
            <span>{date}</span>

            <Badge
              variant="outline"
              className={`flex items-center gap-1 px-2 py-1 border ${badgeStyle}`}
            >
              {getIcon("h-3 w-3 sm:h-4 sm:w-4")}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
