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
import { BookCheck, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import formatArabicDate from "@/utils/formateTime";
import SingleCustomerRatingDialog from "@/components/molecules/dialogs/SingleCustomerRatingDialog";

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
  const [selectedRating, setSelectedRating] =
    React.useState<CustomerRatingTypes | null>(null);
  const { customerRating } = useCustomerRating();

  /**
   * Memoized table rows to avoid unnecessary re-renders when the rating list doesn't change.
   */
  const tableRows = useMemo(
    () =>
      customerRating?.map((item: CustomerRatingTypes) => {
        const shortComment =
          item.comment.length > 50
            ? `${item.comment.slice(0, 50)}...`
            : item.comment;

        return (
          <TableRow key={item._id}>
            <TableCell>{item._id.slice(0, 6) + "..."}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.rating}</TableCell>
            <TableCell>{shortComment}</TableCell>
            <TableCell>{formatArabicDate(item.createdAt)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Actions"
                    className="transition-all hover:bg-primary/10"
                  >
                    <EllipsisVertical className="text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  {/* View */}
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

                  {/* Publish */}
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300"
                  >
                    <BookCheck className="size-4 text-green-500" /> نشر
                  </DropdownMenuItem>

                  {/* Delete */}
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer rounded-md transition-all 
                    hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Trash2 className="size-4 text-red-500" /> حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        );
      }) ?? [],
    [customerRating]
  );

  return (
    <>
      <section className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="text-right">ID</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">التقييم</TableHead>
              <TableHead className="text-right">التعليق</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </section>

      <SingleCustomerRatingDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        item={selectedRating}
      />
    </>
  );
}

export default React.memo(CustomersRatingPage);
