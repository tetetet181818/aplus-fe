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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function NotificationBell() {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full hover:bg-primary/10 h-10 w-10"
      >
        <Bell className="h-5 w-5 text-primary" />
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold"
        >
          3
        </Badge>
      </Button>
    </div>
  );
}

export function NotificationPanel() {
  return (
    <div className="fixed top-16 right-4 w-96 max-h-[80vh] bg-background border rounded-xl shadow-2xl overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">الإشعارات</h3>
          <Badge variant="secondary" className="text-xs">
            3 جديد
          </Badge>
        </div>
        <Button variant="ghost" size="icon">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-2 space-y-2">
        {/* مثال Notification */}
        <NotificationItem
          title="عملية شراء جديدة"
          body="تم شراء الملخص الخاص بك بنجاح."
          type="purchase"
          user="أحمد"
          date="١٧ سبتمبر ٢٠٢٥"
        />
        <NotificationItem
          title="تمت الموافقة على السحب"
          body="تمت الموافقة على طلب السحب الخاص بك."
          type="withdrawal"
          user="النظام"
          date="١٦ سبتمبر ٢٠٢٥"
        />
        <NotificationItem
          title="خطأ في الدفع"
          body="فشل في معالجة العملية الأخيرة."
          type="error"
          user="النظام"
          date="١٥ سبتمبر ٢٠٢٥"
        />
      </div>
    </div>
  );
}

function NotificationItem({
  title,
  body,
  type,
  user,
  date,
}: {
  title: string;
  body: string;
  type: string;
  user: string;
  date: string;
}) {
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

  return (
    <Card className="border bg-gradient-to-r from-primary/5 to-blue-500/5">
      <CardContent className="p-4 flex gap-3">
        <div>{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{body}</p>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{user}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{date}</span>
            <Badge variant="default">{type}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Toast() {
  return (
    <div className="fixed top-4 right-4 space-y-2 w-80">
      <Card className="border-2 bg-green-50 text-green-800 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-sm">نجاح</h4>
              <p className="text-xs mt-1">تمت العملية بنجاح</p>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 bg-red-50 text-red-800 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-sm">خطأ</h4>
              <p className="text-xs mt-1">حدث خطأ أثناء العملية</p>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
