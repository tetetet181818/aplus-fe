'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PaginationProps {
  pagination: {
    page: number
    limit: number
    totalPages: number
    total: number
    nextPage: () => void
    prevPage: () => void
    goToPage: (page: number) => void
    changeLimit: (limit: number) => void
  }
}

const Pagination = ({ pagination }: PaginationProps) => {
  const {
    page,
    limit,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
  } = pagination

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page > 2) {
        pages.push(1)
        if (page > 3) pages.push('...')
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) pages.push(i)

      if (page < totalPages - 1) {
        if (page < totalPages - 2) pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="mt-10 flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* الصفحات */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" disabled={page === 1} onClick={prevPage}>
          السابق
        </Button>

        {getPageNumbers().map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-3">
              ...
            </span>
          ) : (
            <Button
              key={p}
              variant={page === p ? 'default' : 'outline'}
              onClick={() => goToPage(p as number)}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={nextPage}
        >
          التالي
        </Button>
      </div>

      {/* اختيار limit */}
      <div className="text-muted-foreground flex items-center justify-center gap-3 text-sm md:justify-end">
        <span className="whitespace-nowrap">
          عرض {limit} من أصل {total}
        </span>

        <Select
          value={limit.toString()}
          onValueChange={(val) => changeLimit(Number(val))}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="عدد العناصر" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Pagination
