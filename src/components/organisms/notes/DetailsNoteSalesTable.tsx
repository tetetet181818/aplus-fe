import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from '@/components/ui/pagination'
import { Sale } from '@/types'
import formatArabicDate from '@/utils/formateTime'

interface DetailsNoteSalesTableProps {
  sales: Sale[]
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalItems: number
  }
  onNextPage: () => void
  onPrevPage: () => void
}

export default function DetailsNoteSalesTable({
  sales,
  pagination,
  onNextPage,
  onPrevPage,
}: DetailsNoteSalesTableProps) {
  const { page, totalPages, totalItems } = pagination

  return (
    <div className="col-span-2 mt-8">
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-start font-semibold">
              اسم الملخص
            </TableHead>
            <TableHead className="text-start font-semibold">
              رقم الطلب
            </TableHead>
            <TableHead className="text-start font-semibold">الربح</TableHead>
            <TableHead className="text-start font-semibold">
              تاريخ المبيعات
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale._id}>
              <TableCell>{sale.note_title}</TableCell>
              <TableCell>{sale.invoice_id}</TableCell>
              <TableCell>{sale.amount}</TableCell>
              <TableCell>
                {formatArabicDate(sale.createdAt || '', { time: false })}
              </TableCell>
            </TableRow>
          ))}

          {sales.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                لا يوجد نتائج لعرضها
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalItems > pagination.limit && (
        <Pagination className="mt-6 flex justify-center">
          <PaginationContent className="flex gap-2">
            {/* Previous */}
            <PaginationItem onClick={onPrevPage}>
              <PaginationPrevious
                href="#"
                className={page === 1 ? 'pointer-events-none opacity-40' : ''}
              />
            </PaginationItem>

            {/* Current Page Indicator */}
            <PaginationItem>
              <PaginationLink isActive href="#">
                {page}
              </PaginationLink>
            </PaginationItem>

            {/* Next */}
            <PaginationItem onClick={onNextPage}>
              <PaginationNext
                href="#"
                className={
                  page === totalPages ? 'pointer-events-none opacity-40' : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
