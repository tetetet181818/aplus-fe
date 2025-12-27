'use client';
import { useCallback, useMemo, useState } from 'react';

import { profitsService } from '@/services/profits.service';
import { useQuery } from '@tanstack/react-query';

export default function useProfits() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const {
    data: profitsResponse,
    isLoading: profitsLoading,
    isFetching,
  } = useQuery({
    queryKey: ['profits', page, limit, fullName, email],
    queryFn: () =>
      profitsService.getProfits({
        page,
        limit,
        fullName,
        email,
      }),
  });

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
    setPage(1);
  }, []);

  const handleSearchFullName = useCallback((name: string) => {
    setFullName(name);
    setPage(1);
  }, []);

  const handleSearchEmail = useCallback((emailValue: string) => {
    setEmail(emailValue);
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFullName('');
    setEmail('');
    setPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    setPage(prev => prev);
  }, []);

  console.log(profitsResponse);

  return {
    profits: profitsResponse?.data || [],

    pagination,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
    pageSize: pagination.pageSize,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,

    isLoading: profitsLoading,
    isFetching,

    page,
    limit,
    fullName,
    email,

    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    handleChangeLimit,

    totalAmount: profitsResponse?.statistics?.totalAmount,
    totalBalance: profitsResponse?.statistics?.totalBalance,
    totalProfits: profitsResponse?.statistics?.totalProfits,
    totalUsers: profitsResponse?.statistics?.totalUsers,

    handleSearchFullName,
    handleSearchEmail,
    handleResetFilters,

    handleRefresh,
  };
}
