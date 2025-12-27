'use client';
import { useCallback, useState } from 'react';

import { dashboardService } from '@/services/dashboard.service';
import { AcceptedWithdrawal } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useDashboard() {
  const queryClient = useQueryClient();

  const [userPage, setUserPage] = useState(1);
  const [userLimit, setUserLimit] = useState(10);
  const [notePage, setNotePage] = useState(1);
  const [noteLimit, setNoteLimit] = useState(10);
  const [salePage, setSalePage] = useState(1);
  const [saleLimit, setSaleLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [universityFilter, setUniversityFilter] = useState<string | null>(null);
  const [emailFilter, setEmailFilter] = useState<string | null>(null);

  const { data, isLoading: overviewLoading } = useQuery({
    queryKey: ['overview'],
    queryFn: dashboardService.getOverview,
  });

  const {
    data: usersResponse,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: [
      'users',
      userPage,
      userLimit,
      searchQuery,
      universityFilter,
      emailFilter,
    ],
    queryFn: () =>
      dashboardService.getAllUsers({
        page: userPage,
        limit: userLimit,
        fullName: searchQuery || '',
        university: universityFilter || '',
        emailFilter: emailFilter || '',
      }),
  });

  const { data: usersStats } = useQuery({
    queryKey: ['usersStats'],
    queryFn: dashboardService.getUsersStats,
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: dashboardService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['usersStats'] });
    },
  });

  const handleDeleteUser = async ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    try {
      await deleteUser(userId);
      toast.success(`تم حذف الحساب بنجاح ${userName}`);
    } catch {
      toast.error('فشل حذف الحساب');
    }
  };

  const [searchTitleNote, setSearchTitleNote] = useState('');
  const [universityFilterNote, setUniversityFilterNote] = useState<
    string | null
  >(null);
  const [collageFilterNote, setCollageFilterNote] = useState<string | null>(
    null
  );
  const [yearFilterNote, setYearFilterNote] = useState<string | null>(null);
  const [sortByNote, setSortByNote] = useState<string>('createdAt');
  const [sortOrderNote, setSortOrderNote] = useState<'asc' | 'desc'>('desc');

  const {
    data: notesResponse,
    isLoading: notesLoading,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: [
      'notes',
      notePage,
      noteLimit,
      searchTitleNote,
      universityFilterNote,
      collageFilterNote,
      yearFilterNote,
      sortByNote,
      sortOrderNote,
    ],
    queryFn: () =>
      dashboardService.getAllNotes({
        page: notePage,
        limit: noteLimit,
        title: searchTitleNote || '',
        university: universityFilterNote || '',
        collage: collageFilterNote || '',
        year: yearFilterNote || '',
        sortBy: sortByNote,
        sortOrder: sortOrderNote,
      }),
  });

  const { data: notesStats } = useQuery({
    queryKey: ['notesStats'],
    queryFn: dashboardService.getNotesStats,
  });

  const { mutateAsync: makeNotePublish, isPending: publishLoading } =
    useMutation({
      mutationFn: dashboardService.makeNotePublish,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['notesStats'] });
      },
    });

  const { mutateAsync: makeNoteUnpublish, isPending: unpublishLoading } =
    useMutation({
      mutationFn: dashboardService.makeNoteUnpublish,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['notesStats'] });
      },
    });

  const handelPublishNote = async (noteId: string) => {
    try {
      await makeNotePublish(noteId);
      toast.success('تم نشر الملاحظة بنجاح');
    } catch {
      toast.error('فشل نشر الملاحظة');
    }
  };

  const handelUnpublishNote = async (noteId: string) => {
    try {
      await makeNoteUnpublish(noteId);
      toast.success('تم إلغاء نشر الملاحظة بنجاح');
    } catch {
      toast.error('فشل إلغاء نشر الملاحظة');
    }
  };

  const [status, setStatus] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [invoiceId, setInvoiceId] = useState<string>('');

  const {
    data: salesResponse,
    isLoading: salesLoading,
    refetch: refetchSales,
  } = useQuery({
    queryKey: ['sales', salePage, saleLimit, status, id, invoiceId],
    queryFn: () =>
      dashboardService.getAllSales({
        page: salePage,
        limit: saleLimit,
        status,
        id,
        invoiceId,
      }),
  });

  const { data: salesStats } = useQuery({
    queryKey: ['salesStats'],
    queryFn: dashboardService.getSalesStats,
  });

  const [withdrawalPage, setWithdrawalPage] = useState(1);
  const [withdrawalLimit, setWithdrawalLimit] = useState(10);
  const [withdrawalStatus, setWithdrawalStatus] = useState<string>('all');
  const [ibanFilter, setIbanFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const {
    data: withdrawalsResponse,
    isLoading: withdrawalsLoading,
    refetch: refetchWithdrawals,
  } = useQuery({
    queryKey: [
      'withdrawals',
      withdrawalPage,
      withdrawalLimit,
      withdrawalStatus,
      ibanFilter,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      dashboardService.getAllWithdrawals({
        page: withdrawalPage,
        limit: withdrawalLimit,
        status: withdrawalStatus,
        iban: ibanFilter,
        startDate,
        endDate,
        sortBy,
        sortOrder,
      }),
  });

  const { data: withdrawalsStats } = useQuery({
    queryKey: ['withdrawalsStats'],
    queryFn: dashboardService.getWithdrawalStats,
  });

  const { data: withdrawalStatuses, isLoading: withdrawalStatusesLoading } =
    useQuery({
      queryKey: ['withdrawalStatuses'],
      queryFn: dashboardService.getWithdrawalStatuses,
    });

  const {
    mutateAsync: acceptedWithdrawal,
    isPending: acceptedWithdrawalLoading,
  } = useMutation({
    mutationFn: dashboardService.acceptedWithdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsStats'] });
    },
  });

  const {
    mutateAsync: rejectedWithdrawal,
    isPending: rejectedWithdrawalLoading,
  } = useMutation({
    mutationFn: dashboardService.rejectedWithdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsStats'] });
    },
  });

  const {
    mutateAsync: completedWithdrawal,
    isPending: completedWithdrawalLoading,
  } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AcceptedWithdrawal }) =>
      dashboardService.completedWithdrawal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsStats'] });
    },
  });

  const { mutateAsync: addAdminNote, isPending: addAdminNoteLoading } =
    useMutation({
      mutationFn: ({
        withdrawalId,
        updateData,
      }: {
        withdrawalId: string;
        updateData: { adminNotes: string };
      }) => dashboardService.addAdminNote(withdrawalId, updateData),
    });

  const handleAcceptWithdrawal = async (withdrawalId: string) => {
    try {
      const res = await acceptedWithdrawal(withdrawalId);
      toast.success(res.message);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const handleRejectWithdrawal = async (withdrawalId: string) => {
    try {
      const res = await rejectedWithdrawal(withdrawalId);
      toast.success(res.message);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const handleCompleteWithdrawal = async (
    withdrawalId: string,
    data: AcceptedWithdrawal
  ) => {
    try {
      const res = await completedWithdrawal({ id: withdrawalId, data });
      toast.success(res.message);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const handleAddAdminNote = async (withdrawalId: string, data: string) => {
    try {
      const res = await addAdminNote({
        withdrawalId,
        updateData: { adminNotes: data },
      });
      toast.success(res.message);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const nextUserPage = useCallback(() => {
    if (userPage < (usersResponse?.data?.pagination?.totalPages || 1)) {
      setUserPage(prev => prev + 1);
    }
  }, [userPage, usersResponse?.data?.pagination?.totalPages]);

  const prevUserPage = useCallback(() => {
    if (userPage > 1) {
      setUserPage(prev => prev - 1);
    }
  }, [userPage]);

  const changeUserLimit = useCallback((newLimit: number) => {
    setUserLimit(newLimit);
    setUserPage(1);
  }, []);

  const nextNotePage = useCallback(() => {
    if (notePage < (notesResponse?.data?.pagination?.totalPages || 1)) {
      setNotePage(prev => prev + 1);
    }
  }, [notePage, notesResponse?.data?.pagination?.totalPages]);

  const prevNotePage = useCallback(() => {
    if (notePage > 1) {
      setNotePage(prev => prev - 1);
    }
  }, [notePage]);

  const changeNoteLimit = useCallback((newLimit: number) => {
    setNoteLimit(newLimit);
    setNotePage(1);
  }, []);

  const nextSalePage = useCallback(() => {
    if (salePage < (salesResponse?.data?.pagination?.totalPages || 1)) {
      setSalePage(prev => prev + 1);
    }
  }, [salePage, salesResponse?.data?.pagination?.totalPages]);

  const prevSalePage = useCallback(() => {
    if (salePage > 1) {
      setSalePage(prev => prev - 1);
    }
  }, [salePage]);

  const changeSaleLimit = useCallback((newLimit: number) => {
    setSaleLimit(newLimit);
    setSalePage(1);
  }, []);

  const nextWithdrawalPage = useCallback(() => {
    if (
      withdrawalPage < (withdrawalsResponse?.data?.pagination?.totalPages || 1)
    ) {
      setWithdrawalPage(prev => prev + 1);
    }
  }, [withdrawalPage, withdrawalsResponse?.data?.pagination?.totalPages]);

  const prevWithdrawalPage = useCallback(() => {
    if (withdrawalPage > 1) {
      setWithdrawalPage(prev => prev - 1);
    }
  }, [withdrawalPage]);

  const changeWithdrawalLimit = useCallback((newLimit: number) => {
    setWithdrawalLimit(newLimit);
    setWithdrawalPage(1);
  }, []);

  return {
    overviews: data?.data,
    overviewLoading,
    users: usersResponse?.data?.users || [],
    usersPagination: usersResponse?.data?.pagination,
    usersLoading,
    userPage,
    userLimit,
    searchQuery,
    setSearchQuery,
    universityFilter,
    setEmailFilter,
    setUniversityFilter,
    setUserPage,
    nextUserPage,
    prevUserPage,
    changeUserLimit,
    handleDeleteUser,
    usersStats: usersStats?.data,
    notes: notesResponse?.data?.notes || [],
    notesPagination: notesResponse?.data?.pagination,
    notesLoading,
    notesStats: notesStats?.data,
    notePage,
    noteLimit,
    setNotePage,
    nextNotePage,
    prevNotePage,
    changeNoteLimit,
    handelPublishNote,
    handelUnpublishNote,
    publishLoading,
    unpublishLoading,
    searchTitleNote,
    setSearchTitleNote,
    universityFilterNote,
    setUniversityFilterNote,
    collageFilterNote,
    setCollageFilterNote,
    yearFilterNote,
    setYearFilterNote,
    sortByNote,
    setSortByNote,
    sortOrderNote,
    setSortOrderNote,
    sales: salesResponse?.data?.sales || [],
    salesPagination: salesResponse?.data?.pagination,
    salesLoading,
    salesStats: salesStats?.data,
    salePage,
    saleLimit,
    setSalePage,
    nextSalePage,
    prevSalePage,
    changeSaleLimit,
    withdrawals: withdrawalsResponse?.data?.withdrawals || [],
    withdrawalsPagination: withdrawalsResponse?.data?.pagination,
    withdrawalsLoading,
    withdrawalsStats: withdrawalsStats?.data,
    withdrawalPage,
    withdrawalLimit,
    setWithdrawalPage,
    nextWithdrawalPage,
    prevWithdrawalPage,
    changeWithdrawalLimit,
    withdrawalStatuses: withdrawalStatuses?.data,
    withdrawalStatusesLoading,
    handleAcceptWithdrawal,
    acceptedWithdrawalLoading,
    handleRejectWithdrawal,
    rejectedWithdrawalLoading,
    handleCompleteWithdrawal,
    completedWithdrawalLoading,
    ibanFilter,
    setWithdrawalStatus,
    setIbanFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    refetchWithdrawals,
    withdrawalStatus,
    handleAddAdminNote,
    addAdminNoteLoading,
    setStatus,
    setId,
    setInvoiceId,
    loading:
      acceptedWithdrawalLoading ||
      rejectedWithdrawalLoading ||
      completedWithdrawalLoading,
  };
}
