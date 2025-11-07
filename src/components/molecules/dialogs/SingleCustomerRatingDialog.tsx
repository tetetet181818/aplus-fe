"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import React, { JSX } from "react";
import formatArabicDate from "@/utils/formateTime";

export default function SingleCustomerRatingDialog({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: any;
}): JSX.Element {
  if (!item) return <></>;

  const { fullName, comment, rating, createdAt } = item;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            تفاصيل تقييم العميل
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            عرض تفاصيل التقييم الخاص بالعميل
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-1">
            <Label className="text-gray-600">الاسم</Label>
            <Input
              value={fullName || "غير متوفر"}
              readOnly
              className="bg-gray-100 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-gray-600">التعليق</Label>
            <textarea
              value={comment || "لا يوجد تعليق"}
              readOnly
              rows={3}
              className="w-full rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-sm resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-gray-600">التقييم</Label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-5 ${
                    index < rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({rating})</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-gray-600">التاريخ</Label>
            <Input
              value={formatArabicDate(createdAt) || "غير محدد"}
              readOnly
              className="bg-gray-100 dark:bg-gray-800"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
