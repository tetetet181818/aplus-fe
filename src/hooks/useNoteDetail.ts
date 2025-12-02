'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  useCreatePaymentLinkMutation,
  useDeleteNoteMutation,
  useGetSingleNoteQuery,
  useMakeLikeNoteMutation,
  useMakeUnlikeNoteMutation,
  useToggleLikeQuery,
  useUpdateNoteMutation,
} from '@/store/api/note.api';
import { UpdateNoteData } from '@/types';
import { toast } from 'sonner';

import { downloadFile } from '@/utils/downloadFile';

import useAuth from './useAuth';

/**
 * Custom hook for managing note details, updates, likes, and payments.
 * @param {string} id - The ID of the note.
 */
export default function useNoteDetail(id: string) {
  const { isAuthenticated, user } = useAuth();
  const [isPurchaseConfirmOpen, setIsPurchaseConfirmOpen] = useState(false);
  const router = useRouter();

  const { data: note, isLoading: getSingleLoading } = useGetSingleNoteQuery(id);
  const [makeLikeNote, { isLoading: likeLoading }] = useMakeLikeNoteMutation();
  const [makeUnlikeNote, { isLoading: unlikeLoading }] =
    useMakeUnlikeNoteMutation();
  const [updateNote, { isLoading: updateNoteLoading }] =
    useUpdateNoteMutation();
  const [createPaymentLink, { isLoading: createPaymentLinkLoading }] =
    useCreatePaymentLinkMutation();
  const { data: toggleLike } = useToggleLikeQuery({ noteId: id });
  const [deleteNote, { isLoading: deleteNoteLoading }] =
    useDeleteNoteMutation();

  /**
   * Update note data.
   */
  const handleUpdateNote = async ({
    noteId,
    noteData,
  }: {
    noteId: string;
    noteData: UpdateNoteData;
  }) => {
    const res = await updateNote({ noteId, noteData });
    if (res?.data) {
      toast.success(res.data.message);
      router.push('/profile?tab=my-notes');
    }
    return res?.data;
  };

  /**
   * Open purchase confirmation modal.
   */
  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول أولاً لإتمام عملية الشراء');
      return router.push(`/notes/${id}`);
    }
    setIsPurchaseConfirmOpen(true);
  };

  /**
   * Confirm purchase and redirect to checkout.
   */
  const confirmPurchase = () => {
    router.push(
      `/checkout?userId=${user?._id}&noteId=${note?.data?._id}&amount=${note?.data?.price}`
    );
  };

  /**
   * Create a payment link for the note.
   */
  const handleCreatePaymentLink = async ({
    userId,
    noteId,
    amount,
  }: {
    userId: string;
    noteId: string;
    amount: string;
  }) => {
    const res = await createPaymentLink({ userId, noteId, amount });
    if (res?.data) {
      toast.success(res.data.message);
      router.push(res.data.data.url);
    }
  };

  /**
   * Download note file.
   */
  const handleDownloadFile = ({
    noteUrl,
    noteName,
  }: {
    noteUrl: string;
    noteName?: string;
  }) => downloadFile({ noteUrl, noteName });

  /**
   * Delete note.
   */
  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    const res = await deleteNote({ noteId });
    if (res) {
      toast.success(res?.data?.message);
      router.push('/profile?tab=my-notes');
    }
  };

  /**
   * Add note to liked list.
   */
  const addNoteToLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeLikeNote({ noteId });
    if (res) toast.success(res?.data?.message);
  };

  /**
   * Remove note from liked list.
   */
  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote({ noteId });
    if (res) toast.success(res?.data?.message);
  };

  return {
    note: note?.data,
    loading: getSingleLoading,
    handlePurchase,
    confirmPurchase,
    isPurchaseConfirmOpen,
    setIsPurchaseConfirmOpen,
    handleCreatePaymentLink,
    handleUpdateNote,
    handleDownloadFile,
    handleDeleteNote,
    addNoteToLikeList,
    removeNoteFromLikeList,
    likeLoading,
    unlikeLoading,
    deleteNoteLoading,
    createPaymentLinkLoading,
    updateNoteLoading,
    toggleLike: toggleLike?.data,
  };
}
