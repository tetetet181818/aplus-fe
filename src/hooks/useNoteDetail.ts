'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { noteService } from '@/services/note.service';
import { UpdateNoteData } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { downloadFile } from '@/utils/downloadFile';

import useAuth from './useAuth';

export default function useNoteDetail(id: string) {
  const { isAuthenticated, user } = useAuth();
  const [isPurchaseConfirmOpen, setIsPurchaseConfirmOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: note, isLoading: getSingleLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => noteService.getSingleNote(id),
    enabled: !!id,
  });

  const { mutateAsync: makeLikeNote, isPending: likeLoading } = useMutation({
    mutationFn: noteService.makeLikeNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note', id] });
      queryClient.invalidateQueries({ queryKey: ['toggleLike', id] });
    },
  });

  const { mutateAsync: makeUnlikeNote, isPending: unlikeLoading } = useMutation(
    {
      mutationFn: noteService.makeUnlikeNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['note', id] });
        queryClient.invalidateQueries({ queryKey: ['toggleLike', id] });
      },
    }
  );

  const { mutateAsync: updateNote, isPending: updateNoteLoading } = useMutation(
    {
      mutationFn: ({
        noteId,
        noteData,
      }: {
        noteId: string;
        noteData: FormData;
      }) => noteService.updateNote(noteId, noteData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['note', id] });
      },
    }
  );

  const { mutateAsync: deleteNote, isPending: deleteNoteLoading } = useMutation(
    {
      mutationFn: noteService.deleteNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['note', id] });
      },
    }
  );

  const {
    mutateAsync: createPaymentLink,
    isPending: createPaymentLinkLoading,
  } = useMutation({
    mutationFn: noteService.createPaymentLink,
  });

  const { data: toggleLike } = useQuery({
    queryKey: ['toggleLike', id],
    queryFn: () => noteService.toggleLike(id),
    enabled: !!id,
  });

  const handleUpdateNote = async ({
    noteId,
    noteData,
  }: {
    noteId: string;
    noteData: FormData;
  }) => {
    const res = await updateNote({ noteId, noteData });
    if (res) {
      toast.success(res.message);
      router.push('/profile?tab=my-notes');
    }
    return res;
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول أولاً لإتمام عملية الشراء');
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
  }) => {
    const res = await createPaymentLink({ userId, noteId, amount });
    if (res) {
      toast.success(res.message);
      router.push(res.data.url);
    }
  };

  const handleDownloadFile = ({
    noteUrl,
    noteName,
  }: {
    noteUrl: string;
    noteName?: string;
  }) => downloadFile({ noteUrl, noteName });

  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    const res = await deleteNote(noteId);
    if (res) {
      toast.success(res?.message);
      router.push('/profile?tab=my-notes');
    }
  };

  const addNoteToLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeLikeNote(noteId);
    if (res) toast.success(res?.message);
  };

  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote(noteId);
    if (res) toast.success(res?.message);
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
