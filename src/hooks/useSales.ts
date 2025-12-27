import { useState } from 'react';

import { salesService } from '@/services/sales.service';
import { useQuery } from '@tanstack/react-query';

export default function useSales() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: userStatisticsSales, isLoading: userStatisticsSalesLoading } =
    useQuery({
      queryKey: ['userStatisticsSales'],
      queryFn: () => salesService.getUserStatisticsSales(),
    });

  const {
    data: salesUserResponse,
    isLoading: salesUserLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['salesUser', currentPage, limit],
    queryFn: () => salesService.getSalesUser({ page: currentPage, limit }),
  });

  const totalPages = salesUserResponse?.pagination?.totalPages || 1;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const salesUser = salesUserResponse?.data || [];

  return {
    salesUser,
    salesUserLoading: salesUserLoading || isFetching,
    userStatisticsSales,
    userStatisticsSalesLoading,
    pagination: {
      currentPage,
      totalPages,
      limit,
      nextPage,
      prevPage,
      setPage: setCurrentPage,
      setLimit,
      refetch,
    },
  };
}

export function useSalesDetails(saleId: string | null) {
  const { data, isLoading } = useQuery({
    queryKey: ['singleSale', saleId],
    queryFn: () => salesService.getSingleSale(saleId!),
    enabled: !!saleId,
  });

  return {
    data,
    isLoading,
  };
}
