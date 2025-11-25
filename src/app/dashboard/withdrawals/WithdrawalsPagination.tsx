'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

interface WithdrawalsPaginationProps {
  pagination?: {
    page: number
    totalPages: number
  }
  loading?: boolean
  onNext?: () => void
  onPrev?: () => void
  onFirst?: () => void
  onLast?: () => void
}

/**
 * @component WithdrawalsPagination
 * @description Pagination component for withdrawals table, connected to parent state
 */
export default function WithdrawalsPagination({
  pagination,
  loading,
  onNext,
  onPrev,
  onFirst,
  onLast,
}: WithdrawalsPaginationProps) {
  if (!pagination || pagination.totalPages <= 1) return null

  const { page, totalPages } = pagination

  /** Render numbered page buttons dynamically */
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === page ? 'default' : 'outline'}
          size="sm"
          className="h-9 min-w-9 p-0"
          disabled={loading || i === page}
          onClick={() => {
            if (i < page) onPrev?.()
            else if (i > page) onNext?.()
          }}
        >
          {i}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-muted-foreground text-sm">
        الصفحة {page} من {totalPages}
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Button
          variant="outline"
          size="sm"
          onClick={onFirst}
          disabled={loading || page === 1}
          className="h-9 px-2"
        >
          <ChevronsRight className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={loading || page === 1}
          className="h-9 px-2"
        >
          <ChevronRight className="size-4" />
        </Button>

        {renderPageNumbers()}

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={loading || page === totalPages}
          className="h-9 px-2"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onLast}
          disabled={loading || page === totalPages}
          className="h-9 px-2"
        >
          <ChevronsLeft className="size-4" />
        </Button>
      </div>
    </div>
  )
}
