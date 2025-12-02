'use client';

import React, { JSX, useMemo } from 'react';

import { CustomerRatingTypes } from '@/types';
import {
  BookCheck,
  EllipsisVertical,
  Eye,
  MessageCircle,
  Star,
  Trash2,
  User,
} from 'lucide-react';

import DeleteCustomerRateDialog from '@/components/molecules/dialogs/DeleteCustomerRateDialog';
import SingleCustomerRatingDialog from '@/components/molecules/dialogs/SingleCustomerRatingDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useCustomerRating from '@/hooks/useCustomerRating';

import formatArabicDate from '@/utils/formateTime';

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
            className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Header Section */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-100 p-2 dark:bg-indigo-900">
                  <User className="size-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
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
                    className="hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <EllipsisVertical className="text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] rounded-xl border border-gray-200 shadow-lg dark:border-gray-700"
                >
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                    onClick={() => {
                      setOpenDetailsDialog(true);
                      setSelectedRating(item);
                    }}
                  >
                    <Eye className="size-4 text-blue-500" /> عرض
                  </DropdownMenuItem>

                  {item.isPublish === false && (
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900 dark:hover:text-green-300"
                      onClick={() => {
                        handelPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-green-500" /> نشر
                    </DropdownMenuItem>
                  )}

                  {item.isPublish === true && (
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900 dark:hover:text-red-300"
                      onClick={() => {
                        handelUnPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-red-500" /> إلغاء نشر
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900 dark:hover:text-red-300"
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
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-900">
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
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
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
                variant={item.isPublish ? 'default' : 'destructive'}
              >
                {item.isPublish ? 'منشور' : 'غير منشور'}
              </Badge>
            </div>
            {/* Comment Section */}
            <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
              <div className="mb-2 flex items-center gap-2">
                <MessageCircle className="size-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  التعليق
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {shortComment}
              </p>
            </div>

            {/* ID Badge */}
            <div className="mt-3 flex justify-end">
              <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
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
            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <TableCell className="font-medium text-gray-600 dark:text-gray-300">
              {item._id.slice(0, 6) + '...'}
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
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
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
              <Badge variant={item.isPublish ? 'default' : 'destructive'}>
                {item.isPublish ? 'منشور' : 'غير منشور'}
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
                    className="hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <EllipsisVertical className="text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] rounded-xl border border-gray-200 shadow-lg dark:border-gray-700"
                >
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                    onClick={() => {
                      setOpenDetailsDialog(true);
                      setSelectedRating(item);
                    }}
                  >
                    <Eye className="size-4 text-blue-500" /> عرض
                  </DropdownMenuItem>

                  {item.isPublish === false && (
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900 dark:hover:text-green-300"
                      onClick={() => {
                        handelPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-green-500" /> نشر
                    </DropdownMenuItem>
                  )}

                  {item.isPublish === true && (
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900 dark:hover:text-red-300"
                      onClick={() => {
                        handelUnPublishCustomerRate(item._id);
                      }}
                    >
                      <BookCheck className="size-4 text-red-500" /> إلغاء نشر
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900 dark:hover:text-red-300"
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
      <section className="hidden overflow-x-auto lg:block">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
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
      <section className="space-y-4 p-1 lg:hidden">
        {mobileCards.length > 0 ? (
          mobileCards
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
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
