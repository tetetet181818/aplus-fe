"use client";
import { useState } from "react";
import {
  useAddReviewToNoteMutation,
  useCreateNoteMutation,
  useGetAllNotesQuery,
  useGetLikedNotesQuery,
  useGetPurchasedNotesQuery,
  useGetUserNotesQuery,
  useMakeUnlikeNoteMutation,
  usePurchaseNoteMutation,
  useRemoveReviewFromNoteMutation,
  useUpdateReviewFromNoteMutation,
} from "@/store/api/note.api";
import { CreateNoteData, ReviewData } from "@/types";
import { toast } from "sonner";

export default function useNotes() {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("access_token");
  }
  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // Fetch notes with pagination
  const {
    data,
    isLoading: notesLoading,
    isFetching,
  } = useGetAllNotesQuery({ token, page, limit });

  /** get users notes by token */
  const { data: userNotes, isLoading: userNotesLoading } = useGetUserNotesQuery(
    { token: token || "" }
  );
  const [addReviewToNote, { isLoading: addReviewLoading }] =
    useAddReviewToNoteMutation();

  const handelAddReviewToNote = async ({
    noteId,
    reviewData,
  }: {
    noteId: string;
    reviewData: ReviewData;
  }) => {
    const res = await addReviewToNote({
      token: token || "",
      noteId,
      reviewData,
    });

    if (res) {
      toast.success(res?.data?.message);
    }
  };

  const [removeReviewFromNote, { isLoading: removeReviewLoading }] =
    useRemoveReviewFromNoteMutation();

  const handelRemoveReviewFromNote = async ({
    noteId,
    reviewId,
  }: {
    noteId: string;
    reviewId: string;
  }) => {
    const res = await removeReviewFromNote({
      noteId,
      reviewId,
      token: token || "",
    });

    if (res) {
      toast.success(res?.data?.message);
    }
  };

  const [updateReviewFromNote, { isLoading: updateReviewLoading }] =
    useUpdateReviewFromNoteMutation();

  const handleUpdateReview = async ({
    noteId,
    reviewId,
    reviewData,
  }: {
    noteId: string;
    reviewId: string;
    reviewData: ReviewData;
  }) => {
    const res = await updateReviewFromNote({
      noteId,
      reviewId,
      reviewData,
      token: token || "",
    });
    if (res) {
      toast.success(res?.data?.message);
    }

    return res?.data;
  };
  const { data: purchasedNotes, isLoading: purchasedNotesLoading } =
    useGetPurchasedNotesQuery({ token: token || "" });

  const [createNote, { isLoading: createNoteLoading }] =
    useCreateNoteMutation();

  const handleCreateNote = async (noteData: CreateNoteData) => {
    try {
      const res = await createNote({ noteData, token: token! });
      if (res?.data?.message) {
        toast.success("تم إضافة الملخص بنجاح");
      }
      return res?.data;
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ");
    }
  };

  const { data: likedNotes, isLoading: likedNotesLoading } =
    useGetLikedNotesQuery({ token: token || "" });

  const [makeUnlikeNote, { isLoading: unlikeLoading }] =
    useMakeUnlikeNoteMutation();

  const [purchaseNote, { isLoading: purchaseLoading }] =
    usePurchaseNoteMutation();

  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote({ noteId, token: token || "" });

    if (res) {
      toast.success(res?.data?.message);
    }
  };

  const handlePurchaseNote = async ({ noteId }: { noteId: string }) => {
    const res = await purchaseNote({ noteId, token: token || "" });

    if (res) {
      toast.success(res?.data?.message);
    }
  };

  // ---- Pagination Logic ----
  const total = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    notes: data?.data || [],
    notesLoading,
    isFetching,
    handleCreateNote,
    createNoteLoading,
    userNotesLoading,
    userNotes: userNotes?.data,
    purchasedNotesLoading,
    purchasedNotes: purchasedNotes?.data,
    likedNotesLoading,
    likedNotes: likedNotes?.data,
    removeNoteFromLikeList,
    unlikeLoading,
    purchaseLoading,
    handlePurchaseNote,
    handelAddReviewToNote,
    addReviewLoading,
    handelRemoveReviewFromNote,
    removeReviewLoading,
    handleUpdateReview,
    updateReviewLoading,
    // Pagination handlers
    pagination: {
      total,
      page,
      limit,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
      changeLimit,
    },
  };
}
