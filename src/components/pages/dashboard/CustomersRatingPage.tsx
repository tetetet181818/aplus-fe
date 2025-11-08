"use client";

import React, { JSX, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCustomerRating from "@/hooks/useCustomerRating";
import { CustomerRatingTypes } from "@/types";
import {
  BookCheck,
  EllipsisVertical,
  Eye,
  Trash2,
  Star,
  User,
  MessageCircle,
} from "lucide-react";
import formatArabicDate from "@/utils/formateTime";
import SingleCustomerRatingDialog from "@/components/molecules/dialogs/SingleCustomerRatingDialog";
import DeleteCustomerRateDialog from "@/components/molecules/dialogs/DeleteCustomerRateDialog";
import { Badge } from "@/components/ui/badge";

/**
 * @fileoverview CustomersRatingPage component displays a list of customer ratings
 * with options to view, publish, or delete each rating entry.
 *
 * @component
 * @example
 * // Usage:
 * <CustomersRatingPage />
 *
 * @returns {JSX.Element} The rendered Customers Rating page component.
 */
function CustomersRatingPage(): JSX.Element {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedRating, setSelectedRating] =
    React.useState<CustomerRatingTypes | null>(null);
  const {
    ratingDashboard,
    handelDeleteCustomerRating,
    handelPublishCustomerRate,
    handelUnPublishCustomerRate,
  } = useCustomerRating();

  /**
   * Memoized mobile cards for responsive design
   */
  const mobileCards = useMemo(
    () =>
      ratingDashboard?.map((item: CustomerRatingTypes) => {
        const shortComment =
          item.comment.length > 80
            ? `${item.comment.slice(0, 80)}...`
            : item.comment;

        return (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 mb-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                  <User className="size-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                    {item.fullName}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatArabicDate(item.createdAt)}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Actions"
                    className="transition-all hover:bg-primary/10 rounded-lg"
                  >
                    <EllipsisVertical className="text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                    onClick={() => {
                      setOpenDetailsDialog(true);
                      setSelectedRating(item);
                    }}
                  >
                    <Eye className="size-4 text-blue-500" /> عرض
                  </DropdownMenuItem>

                  {item.isPublish === false && (
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300"
                      onClick={() => {
                        handelPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-green-500" /> نشر
                    </DropdownMenuItem>
                  )}

                  {item.isPublish === true && (
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                      onClick={() => {
                        handelUnPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-red-500" /> إلغاء نشر
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                    onClick={() => {
                      setOpenDeleteDialog(true);
                      setSelectedRating(item);
                    }}
                  >
                    <Trash2 className="size-4 text-red-500" /> حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Rating Section */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-xl">
                  <Star
                    className="size-4 text-amber-600 dark:text-amber-400"
                    fill="currentColor"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  التقييم
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-4 ${
                        index < item.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  ({item.rating})
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <h1> الحالة</h1>
              <Badge
                className="rounded-full"
                variant={item.isPublish ? "default" : "destructive"}
              >
                {item.isPublish ? "منشور" : "غير منشور"}
              </Badge>
            </div>
            {/* Comment Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="size-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  التعليق
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {shortComment}
              </p>
            </div>

            {/* ID Badge */}
            <div className="flex justify-end mt-3">
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-lg">
                ID: {item._id.slice(0, 8)}...
              </span>
            </div>
          </div>
        );
      }) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ratingDashboard]
  );

  /**
   * Memoized table rows for desktop view
   */
  const tableRows = useMemo(
    () =>
      ratingDashboard?.map((item: CustomerRatingTypes) => {
        const shortComment =
          item.comment.length > 50
            ? `${item.comment.slice(0, 50)}...`
            : item.comment;

        return (
          <TableRow
            key={item._id}
            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <TableCell className="font-medium text-gray-600 dark:text-gray-300">
              {item._id.slice(0, 6) + "..."}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-200">
              {item.fullName}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-4 ${
                        index < item.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  ({item.rating})
                </span>
              </div>
            </TableCell>
            <TableCell className="text-gray-600 dark:text-gray-300">
              {shortComment}
            </TableCell>
            <TableCell className="text-gray-600 dark:text-gray-300">
              <Badge variant={item.isPublish ? "default" : "destructive"}>
                {item.isPublish ? "منشور" : "غير منشور"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-600 dark:text-gray-300">
              {formatArabicDate(item.createdAt)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Actions"
                    className="transition-all hover:bg-primary/10 rounded-lg"
                  >
                    <EllipsisVertical className="text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                    onClick={() => {
                      setOpenDetailsDialog(true);
                      setSelectedRating(item);
                    }}
                  >
                    <Eye className="size-4 text-blue-500" /> عرض
                  </DropdownMenuItem>

                  {item.isPublish === false && (
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300"
                      onClick={() => {
                        handelPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-green-500" /> نشر
                    </DropdownMenuItem>
                  )}

                  {item.isPublish === true && (
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                      onClick={() => {
                        handelUnPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-red-500" /> إلغاء نشر
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                    onClick={() => {
                      setOpenDeleteDialog(true);
                      setSelectedRating(item);
                    }}
                  >
                    <Trash2 className="size-4 text-red-500" /> حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        );
      }) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ratingDashboard, handelPublishCustomerRate]
  );

  return (
    <>
      {/* Desktop Table View */}
      <section className="hidden lg:block overflow-x-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
              <TableRow>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  ID
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  الاسم
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  التقييم
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  التعليق
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  الحالة
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  التاريخ
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </div>
      </section>

      {/* Mobile Cards View */}
      <section className="lg:hidden space-y-4 p-1">
        {mobileCards.length > 0 ? (
          mobileCards
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            لا توجد تقييمات متاحة
          </div>
        )}
      </section>

      <SingleCustomerRatingDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        item={selectedRating || null}
      />
      <DeleteCustomerRateDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        item={selectedRating || null}
        onConfirm={(noteId: string) => handelDeleteCustomerRating(noteId)}
      />
    </>
  );
}

export default React.memo(CustomersRatingPage);
