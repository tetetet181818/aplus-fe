'use client';
import { useCallback, useMemo, useState } from 'react';

import { useGetProfitsQuery } from '@/store/api/profits.api';

export default function useProfits() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const {
    data: profitsResponse,
    isLoading: profitsLoading,
    isFetching,
  } = useGetProfitsQuery({
    page,
    limit,
    fullName,
    email,
  });

  // Pagination data
  const pagination = useMemo(
    () =>
      profitsResponse?.pagination || {
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
        pageSize: 10,
        totalCount: 0,
        totalPages: 1,
      },
    [profitsResponse]
  );

  // Handlers
  const handleNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [pagination.hasNextPage]);

  const handlePrevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      setPage(prev => prev - 1);
    }
  }, [pagination.hasPrevPage]);

  const handleGoToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
        setPage(pageNumber);
      }
    },
    [pagination.totalPages]
  );

  const handleChangeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  const handleSearchFullName = useCallback((name: string) => {
    setFullName(name);
    setPage(1); // Reset to first page when searching
  }, []);

  const handleSearchEmail = useCallback((emailValue: string) => {
    setEmail(emailValue);
    setPage(1); // Reset to first page when searching
  }, []);

  const handleResetFilters = useCallback(() => {
    setFullName('');
    setEmail('');
    setPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    // Force refetch by changing page momentarily
    setPage(prev => prev);
  }, []);

  console.log(profitsResponse);

  return {
    // Data
    profits: profitsResponse?.data || [],

    // Pagination info
    pagination,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
    pageSize: pagination.pageSize,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,

    // Loading states
    isLoading: profitsLoading,
    isFetching,

    // Filter values
    page,
    limit,
    fullName,
    email,

    // Pagination handlers
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    handleChangeLimit,

    totalAmount: profitsResponse?.statistics?.totalAmount,
    totalBalance: profitsResponse?.statistics?.totalBalance,
    totalProfits: profitsResponse?.statistics?.totalProfits,
    totalUsers: profitsResponse?.statistics?.totalUsers,

    // Filter handlers
    handleSearchFullName,
    handleSearchEmail,
    handleResetFilters,

    // Utility
    handleRefresh,
  };
}
