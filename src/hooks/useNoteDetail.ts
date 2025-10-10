"use client";

import {
  useCreatePaymentLinkMutation,
  useDeleteNoteMutation,
  useGetSingleNoteQuery,
  useMakeLikeNoteMutation,
  useMakeUnlikeNoteMutation,
  useToggleLikeQuery,
  useUpdateNoteMutation,
} from "@/store/api/note.api";
import { downloadFile } from "@/utils/downloadFile";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import useAuth from "./useAuth";
import { UpdateNoteData } from "@/types";

export default function useNoteDetail(id: string) {
  const { isAuthenticated, user } = useAuth();
  const [isPurchaseConfirmOpen, setIsPurchaseConfirmOpen] = useState(false);
  const router = useRouter();
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("access_token") || "";
  }
  const { data: note, isLoading: getSingleLoading } = useGetSingleNoteQuery(id);

  const [makeLikeNote, { isLoading: likeLoading }] = useMakeLikeNoteMutation();
  const [makeUnlikeNote, { isLoading: unlikeLoading }] =
    useMakeUnlikeNoteMutation();

  const [updateNote, { isLoading: updateNoteLoading }] =
    useUpdateNoteMutation();

  const handleUpdateNote = async ({
    noteId,
    noteData,
  }: {
    noteId: string;
    noteData: UpdateNoteData;
  }) => {
    const res = await updateNote({ noteId, noteData, token: token || "" });
    if (res?.data) {
      toast.success(res?.data?.message);
      router.push("/profile?tab=my-notes");
    }

    return res?.data;
  };

  const [createPaymentLink, { isLoading: createPaymentLinkLoading }] =
    useCreatePaymentLinkMutation();
  const { data: toggleLike } = useToggleLikeQuery({
    noteId: id,
    token: token || "",
  });
  const [deleteNote, { isLoading: deleteNoteLoading }] =
    useDeleteNoteMutation();

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.error("يجب تسجيل الدخول أولاً لإتمام عملية الشراء");
      return router.push(`/notes/${id}`);
    }
    setIsPurchaseConfirmOpen(true);
  };

  const confirmPurchase = () => {
    router.push(
      `/checkout?userId=${user?._id}&noteId=${note?.data?._id}&amount=${note?.data?.price}`
    );
  };

  const handleCreatePaymentLink = async ({
    userId,
    noteId,
    amount,
  }: {
    userId: string;
    noteId: string;
    amount: string;
    invoice_id: string;
    status: string;
    message: string;
  }) => {
    const res = await createPaymentLink({
      userId,
      noteId,
      amount,
      token: token || "",
    });

    if (res?.data) {
      toast.success(res?.data?.message);
      router.push(res?.data?.data?.url);
    }
  };

  const handleReviewRequest = () => console.log("طلب المراجعة");
  const handleDownloadFile = ({
    noteUrl,
    noteName,
  }: {
    noteUrl: string;
    noteName?: string;
  }) => downloadFile({ noteUrl, noteName });

  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    const res = await deleteNote({ noteId, token: token || "" });
    if (res) {
      toast.success(res?.data?.message);
      router.push("/profile?tab=my-notes");
    }
  };
  const addNoteToLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeLikeNote({ noteId, token: token || "" });
    if (res) {
      toast.success(res?.data?.message);
    }
  };
  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote({ noteId, token: token || "" });
    if (res) {
      toast.success(res?.data?.message);
    }
  };

  return {
    note: note?.data,
    loading: getSingleLoading,
    handlePurchase,
    handleReviewRequest,
    addNoteToLikeList,
    handleDownloadFile,
    removeNoteFromLikeList,
    likeLoading,
    unlikeLoading,
    toggleLike: toggleLike?.data,
    handleDeleteNote,
    deleteNoteLoading,
    confirmPurchase,
    isPurchaseConfirmOpen,
    setIsPurchaseConfirmOpen,
    handleCreatePaymentLink,
    createPaymentLinkLoading,
    updateNoteLoading,
    handleUpdateNote,
  };
}
