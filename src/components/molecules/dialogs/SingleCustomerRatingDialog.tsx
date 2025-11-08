"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Star, User, MessageCircle, Calendar } from "lucide-react";
import React, { JSX } from "react";
import formatArabicDate from "@/utils/formateTime";
import { CustomerRatingTypes } from "@/types";

export default function SingleCustomerRatingDialog({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: CustomerRatingTypes | null;
}): JSX.Element {
  if (!item) return <></>;

  const { fullName, comment, rating, createdAt } = item;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={true}>
        <DialogHeader>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg">
              <Star className="size-6 text-white" fill="white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-center text-gray-800 dark:text-white">
            تفاصيل تقييم العميل
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300 mt-2">
            عرض تفاصيل التقييم الخاص بالعميل
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10 flex flex-col gap-6 p-6">
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                <User className="size-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                الاسم
              </Label>
            </div>
            <div className="flex  items-center gap-2">
              <p className="text-gray-700 font-semibold text-xl">{fullName}</p>
            </div>
          </div>

          {/* Comment */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                <MessageCircle className="size-4 text-purple-600 dark:text-purple-400" />
              </div>
              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                التعليق
              </Label>
            </div>
            <div className="relative">
              <p className="text-gray-700 text-sm">{comment}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors">
                <Star
                  className="size-4 text-amber-600 dark:text-amber-400"
                  fill="currentColor"
                />
              </div>
              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                التقييم
              </Label>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-6 transition-transform duration-200 ${
                      index < rating
                        ? "text-amber-400 fill-amber-400 hover:scale-110"
                        : "text-gray-300 dark:text-gray-600 hover:scale-105"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {rating}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  / 5
                </span>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                <Calendar className="size-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                التاريخ
              </Label>
            </div>
            <div className="relative right-7">
              <p className="text-gray-700 font-semibold text-sm">
                {formatArabicDate(createdAt) || "غير محدد"}
              </p>
            </div>
          </div>
        </div>

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-lg p-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10">
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
