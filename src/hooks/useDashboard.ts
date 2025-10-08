"use client";
import { useState, useCallback } from "react";
import { getCookie } from "@/utils/cookies";
import {
  useAcceptedWithdrawalMutation,
  useCompletedWithdrawalMutation,
  useDeleteUserMutation,
  useGetAllNotesQuery,
  useGetAllSalesQuery,
  useGetAllUsersQuery,
  useGetAllWithdrawalsQuery,
  useGetNotesStatsQuery,
  useGetOverviewQuery,
  useGetSalesStatsQuery,
  useGetUsersStatsQuery,
  useGetWithdrawalStatsQuery,
  useGetWithdrawalStatusesQuery,
  useMakeNotePublishMutation,
  useMakeNoteUnpublishMutation,
  useRejectedWithdrawalMutation,
} from "../store/api/dashboard.api";
import { toast } from "sonner";
import { AcceptedWithdrawal } from "@/types";

/**
 * Custom hook to fetch dashboard data (overview + users + notes + sales)
 */
export default function useDashboard() {
  const token: string | undefined =
    typeof document !== "undefined" ? getCookie("access_token") : undefined;

  /** ----------------- Pagination State ----------------- */
  const [userPage, setUserPage] = useState(1);
  const [userLimit, setUserLimit] = useState(10);

  const [notePage, setNotePage] = useState(1);
  const [noteLimit, setNoteLimit] = useState(10);

  const [salePage, setSalePage] = useState(1);
  const [saleLimit, setSaleLimit] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [universityFilter, setUniversityFilter] = useState<string | null>(null);

  const [emailFilter, setEmailFilter] = useState<string | null>(null);

  /** ----------------- Overview ----------------- */
  const { data, isLoading: overviewLoading } = useGetOverviewQuery({
    token: token || "",
  });

  /** ----------------- Users ----------------- */
  const [deleteUser] = useDeleteUserMutation();

  const {
    data: usersResponse,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery({
    token: token || "",
    page: userPage,
    limit: userLimit,
    fullName: searchQuery || "",
    university: universityFilter || "",
    emailFilter: emailFilter || "",
  });

  const { data: usersStats } = useGetUsersStatsQuery({ token: token || "" });

  const handleDeleteUser = async ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    try {
      await deleteUser({ token: token || "", id: userId }).unwrap();
      toast.success(`تم حذف الحساب بنجاح ${userName}`);
      refetchUsers();
    } catch {
      toast.error("فشل حذف الحساب");
    }
  };

  /** ----------------- Notes ----------------- */

  const [searchTitleNote, setSearchTitleNote] = useState("");
  const [universityFilterNote, setUniversityFilterNote] = useState<
    string | null
  >(null);
  const [collageFilterNote, setCollageFilterNote] = useState<string | null>(
    null
  );
  const [yearFilterNote, setYearFilterNote] = useState<string | null>(null);
  const [sortByNote, setSortByNote] = useState<string>("createdAt");
  const [sortOrderNote, setSortOrderNote] = useState<"asc" | "desc">("desc");

  const {
    data: notesResponse,
    isLoading: notesLoading,
    refetch: refetchNotes,
  } = useGetAllNotesQuery({
    token: token || "",
    page: notePage,
    limit: noteLimit,
    title: searchTitleNote || "",
    university: universityFilterNote || "",
    collage: collageFilterNote || "",
    year: yearFilterNote || "",
    sortBy: sortByNote,
    sortOrder: sortOrderNote,
  });

  const { data: notesStats } = useGetNotesStatsQuery({ token: token || "" });

  const [makeNotePublish, { isLoading: publishLoading }] =
    useMakeNotePublishMutation();
  const [makeNoteUnpublish, { isLoading: unpublishLoading }] =
    useMakeNoteUnpublishMutation();

  const handelPublishNote = async (noteId: string) => {
    try {
      await makeNotePublish({ token: token || "", id: noteId }).unwrap();
      toast.success(`تم نشر الملاحظة بنجاح`);
      refetchNotes();
    } catch {
      toast.error("فشل نشر الملاحظة");
    }
  };

  const handelUnpublishNote = async (noteId: string) => {
    try {
      await makeNoteUnpublish({ token: token || "", id: noteId }).unwrap();
      toast.success(`تم إلغاء نشر الملاحظة بنجاح`);
      refetchNotes();
    } catch {
      toast.error("فشل إلغاء نشر الملاحظة");
    }
  };

  /** ----------------- Sales ----------------- */
  const {
    data: salesResponse,
    isLoading: salesLoading,
    refetch: refetchSales,
  } = useGetAllSalesQuery({
    token: token || "",
    page: salePage,
    limit: saleLimit,
  });

  const { data: salesStats } = useGetSalesStatsQuery({ token: token || "" });

  /** ----------------- Withdrawals ----------------- */

  const [withdrawalPage, setWithdrawalPage] = useState(1);
  const [withdrawalLimit, setWithdrawalLimit] = useState(10);
  const [withdrawalStatus, setWithdrawalStatus] = useState<string>("all");
  const [ibanFilter, setIbanFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: withdrawalsResponse,
    isLoading: withdrawalsLoading,
    refetch: refetchWithdrawals,
  } = useGetAllWithdrawalsQuery({
    token: token || "",
    page: withdrawalPage,
    limit: withdrawalLimit,
    status: withdrawalStatus,
    iban: ibanFilter,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  });

  const { data: withdrawalsStats } = useGetWithdrawalStatsQuery({
    token: token || "",
  });

  const nextWithdrawalPage = useCallback(() => {
    if (
      withdrawalPage < (withdrawalsResponse?.data?.pagination?.totalPages || 1)
    ) {
      setWithdrawalPage((prev) => prev + 1);
      refetchWithdrawals();
    }
  }, [
    withdrawalPage,
    withdrawalsResponse?.data?.pagination?.totalPages,
    refetchWithdrawals,
  ]);

  const { data: withdrawalStatuses, isLoading: withdrawalStatusesLoading } =
    useGetWithdrawalStatusesQuery({
      token: token || "",
    });

  const [acceptedWithdrawal, { isLoading: acceptedWithdrawalLoading }] =
    useAcceptedWithdrawalMutation();
  const [rejectedWithdrawal, { isLoading: rejectedWithdrawalLoading }] =
    useRejectedWithdrawalMutation();
  const [completedWithdrawal, { isLoading: completedWithdrawalLoading }] =
    useCompletedWithdrawalMutation();

  const handleAcceptWithdrawal = async (withdrawalId: string) => {
    try {
      const res = await acceptedWithdrawal({
        token: token || "",
        id: withdrawalId,
      }).unwrap();
      toast.success(res.data.message);
      refetchWithdrawals();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleRejectWithdrawal = async (withdrawalId: string) => {
    try {
      const res = await rejectedWithdrawal({
        token: token || "",
        id: withdrawalId,
      }).unwrap();
      toast.success(res.data.message);
      refetchWithdrawals();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleCompleteWithdrawal = async (
    withdrawalId: string,
    data: AcceptedWithdrawal
  ) => {
    try {
      const res = await completedWithdrawal({
        token: token || "",
        id: withdrawalId,
        data,
      }).unwrap();
      toast.success(res.data.message);
      refetchWithdrawals();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const prevWithdrawalPage = useCallback(() => {
    if (withdrawalPage > 1) {
      setWithdrawalPage((prev) => prev - 1);
      refetchWithdrawals();
    }
  }, [withdrawalPage, refetchWithdrawals]);

  const changeWithdrawalLimit = useCallback(
    (newLimit: number) => {
      setWithdrawalLimit(newLimit);
      setWithdrawalPage(1);
      refetchWithdrawals();
    },
    [refetchWithdrawals]
  );

  /** ----------------- Pagination Helpers ----------------- */
  // Users
  const nextUserPage = useCallback(() => {
    if (userPage < (usersResponse?.data?.pagination?.totalPages || 1)) {
      setUserPage((prev) => prev + 1);
      refetchUsers();
    }
  }, [userPage, usersResponse?.data?.pagination?.totalPages, refetchUsers]);

  const prevUserPage = useCallback(() => {
    if (userPage > 1) {
      setUserPage((prev) => prev - 1);
      refetchUsers();
    }
  }, [userPage, refetchUsers]);

  const changeUserLimit = useCallback(
    (newLimit: number) => {
      setUserLimit(newLimit);
      setUserPage(1);
      refetchUsers();
    },
    [refetchUsers]
  );

  // Notes
  const nextNotePage = useCallback(() => {
    if (notePage < (notesResponse?.data?.pagination?.totalPages || 1)) {
      setNotePage((prev) => prev + 1);
      refetchNotes();
    }
  }, [notePage, notesResponse?.data?.pagination?.totalPages, refetchNotes]);

  const prevNotePage = useCallback(() => {
    if (notePage > 1) {
      setNotePage((prev) => prev - 1);
      refetchNotes();
    }
  }, [notePage, refetchNotes]);

  const changeNoteLimit = useCallback(
    (newLimit: number) => {
      setNoteLimit(newLimit);
      setNotePage(1);
      refetchNotes();
    },
    [refetchNotes]
  );

  // Sales
  const nextSalePage = useCallback(() => {
    if (salePage < (salesResponse?.data?.pagination?.totalPages || 1)) {
      setSalePage((prev) => prev + 1);
      refetchSales();
    }
  }, [salePage, salesResponse?.data?.pagination?.totalPages, refetchSales]);

  const prevSalePage = useCallback(() => {
    if (salePage > 1) {
      setSalePage((prev) => prev - 1);
      refetchSales();
    }
  }, [salePage, refetchSales]);

  const changeSaleLimit = useCallback(
    (newLimit: number) => {
      setSaleLimit(newLimit);
      setSalePage(1);
      refetchSales();
    },
    [refetchSales]
  );

  /** ----------------- Return ----------------- */
  return {
    token,
    overviews: data?.data,
    overviewLoading,

    /** users */
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

    /** notes */
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

    /** sales */
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

    /** withdrawals */
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
    loading:
      acceptedWithdrawalLoading ||
      rejectedWithdrawalLoading ||
      completedWithdrawalLoading,
  };
}
