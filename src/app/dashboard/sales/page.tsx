'use client'
import { useState, useMemo } from 'react'
import Head from 'next/head'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SalesTable from '@/components/organisms/dashboard/sales/SalesTable'
import Pagination from '@/components/organisms/dashboard/sales/Pagination'
import SalesDetailsDialog from '@/components/molecules/dialogs/SalesDetailsDialog'
import useDashboard from '@/hooks/useDashboard'
import ChartLineSales from '@/components/organisms/dashboard/ChartLineSales'
import SalesTableSkeleton from '@/components/skeletons/SalesTableSkeleton'

export default function SalesDashboard() {
  const {
    sales,
    salesPagination,
    salesStats,
    salePage,
    saleLimit,
    nextSalePage,
    prevSalePage,
    changeSaleLimit,
    salesLoading,
  } = useDashboard()

  const [statusFilter, setStatusFilter] = useState('all')
  const [searchInvoiceId, setSearchInvoiceId] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: 'created_at',
    direction: 'desc',
  })

  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedSalesId, setSelectedSalesId] = useState<string | null>(null)

  /** filter + sort client-side */
  const filteredSales = useMemo(() => {
    let data = [...sales]
    if (statusFilter !== 'all')
      data = data.filter((s) => s.status === statusFilter)
    if (searchInvoiceId)
      data = data.filter((s) =>
        s.invoice_id.toLowerCase().includes(searchInvoiceId.toLowerCase())
      )
    data.sort((a, b) => {
      const valA = a[sortConfig.key as keyof typeof a]
      const valB = b[sortConfig.key as keyof typeof b]
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
    return data
  }, [sales, statusFilter, searchInvoiceId, sortConfig])

  const handleSort = (key: string) => {
    let direction = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc')
      direction = 'asc'
    setSortConfig({ key, direction })
  }

  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <span className="opacity-30">⇅</span>
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <>
      <Head>
        <title>إدارة المبيعات</title>
      </Head>
      <div className="space-y-6">
        <ChartLineSales total={salesPagination?.totalItems} data={salesStats} />

        <Card>
          <CardHeader>
            <CardTitle>المبيعات</CardTitle>
            <CardDescription>إدارة جميع عمليات البيع</CardDescription>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="ابحث برقم العملية"
                value={searchInvoiceId}
                onChange={(e) => setSearchInvoiceId(e.target.value)}
                className="w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="failed">فشل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {salesLoading ? (
              <SalesTableSkeleton />
            ) : (
              <>
                <SalesTable
                  sales={filteredSales}
                  handleSort={handleSort}
                  renderSortIcon={renderSortIcon}
                  onShowDetails={(id) => {
                    setSelectedSalesId(id)
                    setShowDetailsDialog(true)
                  }}
                />

                {salesPagination?.totalItems > 10 && (
                  <Pagination
                    currentPage={salePage}
                    totalPages={salesPagination?.totalPages}
                    totalItems={salesPagination?.totalItems}
                    limit={saleLimit}
                    loading={salesLoading}
                    onNext={nextSalePage}
                    onPrev={prevSalePage}
                    onLimitChange={changeSaleLimit}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <SalesDetailsDialog
        open={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        salesId={selectedSalesId || ''}
      />
    </>
  )
}
