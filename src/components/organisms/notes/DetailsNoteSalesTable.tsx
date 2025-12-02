/**
 * Notes sales table with pagination (supports dark & light mode)
 */
import { Sale } from '@/types';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import formatArabicDate from '@/utils/formateTime';

interface DetailsNoteSalesTableProps {
  sales: Sale[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  onNextPage: () => void;
  onPrevPage: () => void;
}

export default function DetailsNoteSalesTable({
  sales,
  pagination,
  onNextPage,
  onPrevPage,
}: DetailsNoteSalesTableProps) {
  const { page, totalPages, totalItems, limit } = pagination;

  return (
    <div className="col-span-2 mt-8">
      <Table className="w-full overflow-hidden rounded-lg border dark:border-gray-700">
        {/* Header */}
        <TableHeader className="bg-gray-200 dark:bg-gray-800">
          <TableRow>
            <TableHead className="text-start font-semibold dark:text-gray-100">
              اسم الملخص
            </TableHead>
            <TableHead className="text-start font-semibold dark:text-gray-100">
              رقم الطلب
            </TableHead>
            <TableHead className="text-start font-semibold dark:text-gray-100">
              الربح
            </TableHead>
            <TableHead className="text-start font-semibold dark:text-gray-100">
              تاريخ المبيعات
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody className="dark:bg-gray-900">
          {sales.map(sale => (
            <TableRow
              key={sale._id}
              className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="dark:text-gray-200">
                {sale.note_title}
              </TableCell>
              <TableCell className="dark:text-gray-200">
                {sale.invoice_id}
              </TableCell>
              <TableCell className="dark:text-gray-200">
                {sale.amount}
              </TableCell>
              <TableCell className="dark:text-gray-200">
                {formatArabicDate(sale.createdAt || '', { time: false })}
              </TableCell>
            </TableRow>
          ))}

          {/* No results */}
          {sales.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-6 text-center text-gray-500 dark:text-gray-400"
              >
                لا يوجد نتائج لعرضها
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalItems > limit && (
        <Pagination className="mt-6 flex justify-center">
          <PaginationContent className="flex gap-2">
            {/* Previous */}
            <PaginationItem onClick={onPrevPage}>
              <PaginationPrevious
                href="#"
                className={`${
                  page === 1 ? 'pointer-events-none opacity-40' : ''
                } dark:text-gray-200`}
              />
            </PaginationItem>

            {/* Current Page */}
            <PaginationItem>
              <PaginationLink
                isActive
                href="#"
                className="dark:bg-gray-700 dark:text-white"
              >
                {page}
              </PaginationLink>
            </PaginationItem>

            {/* Next */}
            <PaginationItem onClick={onNextPage}>
              <PaginationNext
                href="#"
                className={`${
                  page === totalPages ? 'pointer-events-none opacity-40' : ''
                } dark:text-gray-200`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
