'use client';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';

import SalesDetailsDialog from '@/components/molecules/dialogs/SalesDetailsDialog';
import ChartLineSales from '@/components/organisms/dashboard/ChartLineSales';
import Pagination from '@/components/organisms/dashboard/sales/Pagination';
import SalesTable from '@/components/organisms/dashboard/sales/SalesTable';
import SalesTableSkeleton from '@/components/skeletons/SalesTableSkeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useDashboard from '@/hooks/useDashboard';

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
    setStatus,
    setId,
    setInvoiceId,
  } = useDashboard();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchSaleId, setSearchSaleId] = useState('');
  const [searchInvoiceId, setSearchInvoiceId] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  });

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSalesId, setSelectedSalesId] = useState<string | null>(null);

  useEffect(() => {
    setStatus(statusFilter === 'all' ? '' : statusFilter);
  }, [statusFilter, setStatus]);

  useEffect(() => {
    setId(searchSaleId.trim());
  }, [searchSaleId, setId]);

  useEffect(() => {
    setInvoiceId(searchInvoiceId.trim());
  }, [searchInvoiceId, setInvoiceId]);

  const sortedSales = useMemo(() => {
    let data = [...sales];

    // Sort
    data.sort((a, b) => {
      const valA = a[sortConfig.key as keyof typeof a];
      const valB = b[sortConfig.key as keyof typeof b];
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [sales, sortConfig]);

  const handleSort = (key: string) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc')
      direction = 'asc';
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <span className="opacity-30">⇅</span>;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <>
      <div className="space-y-6">
        <ChartLineSales total={salesPagination?.totalItems} data={salesStats} />

        <Card>
          <CardHeader>
            <CardTitle>المبيعات</CardTitle>
            <CardDescription>إدارة جميع عمليات البيع</CardDescription>
            <div className="my-4 mt-10 grid grid-cols-1 gap-5">
              <Input
                placeholder="ابحث برقم المبيعة"
                value={searchSaleId}
                onChange={e => setSearchSaleId(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="ابحث برقم الفاتورة"
                value={searchInvoiceId}
                onChange={e => setSearchInvoiceId(e.target.value)}
                className="w-full"
              />
            </div>
          </CardHeader>

          <CardContent>
            {salesLoading ? (
              <SalesTableSkeleton />
            ) : (
              <>
                <SalesTable
                  sales={sortedSales}
                  handleSort={handleSort}
                  renderSortIcon={renderSortIcon}
                  onShowDetails={id => {
                    setSelectedSalesId(id);
                    setShowDetailsDialog(true);
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
  );
}
