'use client';

import { useState } from 'react';

import { notesService } from '@/services/notes.service';
import { ReviewData } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useNotes() {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filterUniversity, setFilterUniversity] = useState('');
  const [filterCollage, setFilterCollage] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [maxDownloads, setMaxDownloads] = useState(false);
  const [maxPrice, setMaxPrice] = useState(false);
  const [minPrice, setMinPrice] = useState(false);
  const [filterTitle, setFilterTitle] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const {
    data,
    isLoading: notesLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      'notes',
      page,
      limit,
      filterUniversity,
      filterCollage,
      filterYear,
      sortOrder,
      maxDownloads,
      maxPrice,
      minPrice,
      filterTitle,
    ],
    queryFn: () =>
      notesService.getAllNotes({
        page,
        limit,
        university: filterUniversity,
        collage: filterCollage,
        year: filterYear,
        sortOrder,
        maxDownloads,
        maxPrice,
        minPrice,
        title: filterTitle,
      }),
  });

  const { data: userNotes, isLoading: userNotesLoading } = useQuery({
    queryKey: ['userNotes'],
    queryFn: notesService.getUserNotes,
  });

  const { data: likedNotes, isLoading: likedNotesLoading } = useQuery({
    queryKey: ['likedNotes'],
    queryFn: notesService.getLikedNotes,
  });

  const { data: bestSellerNotes, isLoading: bestSellerNotesLoading } = useQuery(
    {
      queryKey: ['bestSellerNotes'],
      queryFn: notesService.getBestSellerNotes,
    }
  );

  const { mutateAsync: createNote, isPending: createNoteLoading } = useMutation(
    {
      mutationFn: notesService.createNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['userNotes'] });
      },
    }
  );

  const { mutateAsync: addReviewToNote, isPending: addReviewLoading } =
    useMutation({
      mutationFn: ({
        noteId,
        reviewData,
      }: {
        noteId: string;
        reviewData: ReviewData;
      }) => notesService.addReviewToNote(noteId, reviewData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['note'] });
      },
    });

  const { mutateAsync: removeReviewFromNote, isPending: removeReviewLoading } =
    useMutation({
      mutationFn: ({
        noteId,
        reviewId,
      }: {
        noteId: string;
        reviewId: string;
      }) => notesService.removeReviewFromNote(noteId, reviewId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['note'] });
      },
    });

  const { mutateAsync: updateReviewFromNote, isPending: updateReviewLoading } =
    useMutation({
      mutationFn: ({
        noteId,
        reviewId,
        reviewData,
      }: {
        noteId: string;
        reviewId: string;
        reviewData: ReviewData;
      }) => notesService.updateReviewFromNote(noteId, reviewId, reviewData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['note'] });
      },
    });

  const { mutateAsync: makeUnlikeNote, isPending: unlikeLoading } = useMutation(
    {
      mutationFn: notesService.makeUnlikeNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['likedNotes'] });
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['note'] });
      },
    }
  );

  const { mutateAsync: purchaseNote, isPending: purchaseLoading } = useMutation(
    {
      mutationFn: notesService.purchaseNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        queryClient.invalidateQueries({ queryKey: ['userNotes'] });
      },
    }
  );

  const uploadPDFToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `pdfs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('notes')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('notes').getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('PDF upload error:', error);
      toast.error('فشل رفع الملف');
      return null;
    }
  };

  const uploadCoverToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('notes')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('notes').getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Cover upload error:', error);
      toast.error('فشل رفع الغلاف');
      return null;
    }
  };

  const handleCreateNote = async (noteData: FormData) => {
    setUploadLoading(true);

    try {
      const file = noteData.get('file') as File | null;
      const cover = noteData.get('cover') as File | null;

      if (!file || !cover) {
        toast.error('الملف والغلاف مطلوبان');
        return { success: false, error: 'الملف والغلاف مطلوبان' };
      }

      const [filePath, coverUrl] = await Promise.all([
        uploadPDFToSupabase(file),
        uploadCoverToSupabase(cover),
      ]);

      if (!filePath || !coverUrl) {
        return { success: false, error: 'فشل رفع الملفات' };
      }

      noteData.delete('file');
      noteData.delete('cover');
      noteData.append('file_path', filePath);
      noteData.append('cover_url', coverUrl);

      const res = await createNote(noteData);

      if (res?.message) {
        toast.success('تم إضافة الملخص بنجاح');
        return res;
      }

      return res;
    } catch (error) {
      console.error('Create note error:', error);
      return {
        success: false,
        error: 'برجاء فحص المعلومات وحاول مرة اخرى',
      };
    } finally {
      setUploadLoading(false);
    }
  };

  const handelAddReviewToNote = async ({
    noteId,
    reviewData,
  }: {
    noteId: string;
    reviewData: ReviewData;
  }) => {
    const res = await addReviewToNote({ noteId, reviewData });
    if (res) toast.success(res?.message);
  };

  const handelRemoveReviewFromNote = async ({
    noteId,
    reviewId,
  }: {
    noteId: string;
    reviewId: string;
  }) => {
    const res = await removeReviewFromNote({ noteId, reviewId });
    if (res) toast.success(res?.message);
  };

  const handleUpdateReview = async ({
    noteId,
    reviewId,
    reviewData,
  }: {
    noteId: string;
    reviewId: string;
    reviewData: ReviewData;
  }) => {
    const res = await updateReviewFromNote({ noteId, reviewId, reviewData });
    if (res) toast.success(res?.message);
    return res;
  };

  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote(noteId);
    if (res) toast.success(res?.message);
  };

  const handlePurchaseNote = async ({
    noteId,
    invoice_id,
    status,
    message,
  }: {
    noteId: string;
    invoice_id: string;
    status: string;
    message: string;
  }) => {
    const res = await purchaseNote({ noteId, invoice_id, status, message });
    if (res) toast.success(res?.message);
    return res;
  };

  const resetFilters = () => {
    setFilterCollage('');
    setFilterUniversity('');
    setFilterYear('');
    setSortOrder('desc');
    setMaxDownloads(false);
    setMaxPrice(false);
    setMinPrice(false);
  };

  const total = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  const nextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setPage(pageNumber);
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    notes: data?.data || [],
    userNotes: userNotes?.data,
    likedNotes: likedNotes?.data,
    bestSellerNotes: bestSellerNotes?.data,

    notesLoading,
    isFetching,
    createNoteLoading: uploadLoading || createNoteLoading,
    userNotesLoading,
    likedNotesLoading,
    bestSellerNotesLoading,
    unlikeLoading,
    purchaseLoading,
    addReviewLoading,
    removeReviewLoading,
    updateReviewLoading,

    handleCreateNote,
    removeNoteFromLikeList,
    handlePurchaseNote,
    handelAddReviewToNote,
    handelRemoveReviewFromNote,
    handleUpdateReview,

    filterUniversity,
    setFilterUniversity,
    filterCollage,
    setFilterCollage,
    filterYear,
    setFilterYear,
    filterTitle,
    setFilterTitle,
    sortOrder,
    setSortOrder,
    maxDownloads,
    setMaxDownloads,
    maxPrice,
    setMaxPrice,
    minPrice,
    setMinPrice,
    resetFilters,

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
