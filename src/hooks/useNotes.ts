'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  useAddReviewToNoteMutation,
  useCreateNoteMutation,
  useGetAllNotesQuery,
  useGetBestSellerNotesQuery,
  useGetLikedNotesQuery,
  useGetUserNotesQuery,
  useMakeUnlikeNoteMutation,
  usePurchaseNoteMutation,
  useRemoveReviewFromNoteMutation,
  useUpdateReviewFromNoteMutation,
} from '@/store/api/note.api'
import { ReviewData } from '@/types'
import { toast } from 'sonner'

/**
 * Custom hook for handling all note-related operations including file uploads to Supabase
 */
export default function useNotes() {
  const supabase = createClientComponentClient()

  // Pagination & filters
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [filterUniversity, setFilterUniversity] = useState('')
  const [filterCollage, setFilterCollage] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [maxDownloads, setMaxDownloads] = useState(false)
  const [maxPrice, setMaxPrice] = useState(false)
  const [minPrice, setMinPrice] = useState(false)
  const [filterTitle, setFilterTitle] = useState('')

  /** Fetch all notes with filters and pagination */
  const {
    data,
    isLoading: notesLoading,
    isFetching,
  } = useGetAllNotesQuery({
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
  })

  /** Fetch user's notes */
  const { data: userNotes, isLoading: userNotesLoading } = useGetUserNotesQuery(
    {}
  )

  /** Fetch liked notes */
  const { data: likedNotes, isLoading: likedNotesLoading } =
    useGetLikedNotesQuery({})

  /** Fetch best seller notes */
  const { data: bestSellerNotes, isLoading: bestSellerNotesLoading } =
    useGetBestSellerNotesQuery(undefined)

  // Local loading state for file uploads
  const [uploadLoading, setUploadLoading] = useState(false)

  // Mutations
  const [createNote, { isLoading: createNoteLoading }] = useCreateNoteMutation()
  const [addReviewToNote, { isLoading: addReviewLoading }] =
    useAddReviewToNoteMutation()
  const [removeReviewFromNote, { isLoading: removeReviewLoading }] =
    useRemoveReviewFromNoteMutation()
  const [updateReviewFromNote, { isLoading: updateReviewLoading }] =
    useUpdateReviewFromNoteMutation()
  const [makeUnlikeNote, { isLoading: unlikeLoading }] =
    useMakeUnlikeNoteMutation()
  const [purchaseNote, { isLoading: purchaseLoading }] =
    usePurchaseNoteMutation()

  /**
   * Upload PDF file to Supabase Storage
   * @param file - PDF file to upload
   * @returns Public URL of uploaded file or null on error
   */
  const uploadPDFToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
      const filePath = `pdfs/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('notes')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('notes').getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('PDF upload error:', error)
      toast.error('فشل رفع الملف')
      return null
    }
  }

  /**
   * Upload cover image to Supabase Storage
   * @param file - Image file to upload
   * @returns Public URL of uploaded image or null on error
   */
  const uploadCoverToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
      const filePath = `images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('notes')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('notes').getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Cover upload error:', error)
      toast.error('فشل رفع الغلاف')
      return null
    }
  }

  /**
   * Create new note with file and cover uploads
   * @param noteData - FormData containing note information and files
   */
  const handleCreateNote = async (noteData) => {
    setUploadLoading(true)

    try {
      const file = noteData.get('file') as File | null
      const cover = noteData.get('cover') as File | null

      // Validate files
      if (!file || !cover) {
        toast.error('الملف والغلاف مطلوبان')
        return { success: false, error: 'الملف والغلاف مطلوبان' }
      }

      // Upload files to Supabase
      const [filePath, coverUrl] = await Promise.all([
        uploadPDFToSupabase(file),
        uploadCoverToSupabase(cover),
      ])

      if (!filePath || !coverUrl) {
        return { success: false, error: 'فشل رفع الملفات' }
      }

      // Remove file objects from FormData
      noteData.delete('file')
      noteData.delete('cover')

      // Add Supabase URLs to FormData
      noteData.append('file_path', filePath)
      noteData.append('cover_url', coverUrl)

      // Send to backend
      const res = await createNote({ noteData })

      if (res?.data?.message) {
        toast.success('تم إضافة الملخص بنجاح')
        return res?.data
      }

      return res
    } catch (error) {
      console.error('Create note error:', error)
      return {
        success: false,
        error: 'برجاء فحص المعلومات وحاول مرة اخرى',
      }
    } finally {
      setUploadLoading(false)
    }
  }

  /**
   * Add review to a note
   */
  const handelAddReviewToNote = async ({
    noteId,
    reviewData,
  }: {
    noteId: string
    reviewData: ReviewData
  }) => {
    const res = await addReviewToNote({ noteId, reviewData })
    if (res) toast.success(res?.data?.message)
  }

  /**
   * Remove review from a note
   */
  const handelRemoveReviewFromNote = async ({
    noteId,
    reviewId,
  }: {
    noteId: string
    reviewId: string
  }) => {
    const res = await removeReviewFromNote({ noteId, reviewId })
    if (res) toast.success(res?.data?.message)
  }

  /**
   * Update review on a note
   */
  const handleUpdateReview = async ({
    noteId,
    reviewId,
    reviewData,
  }: {
    noteId: string
    reviewId: string
    reviewData: ReviewData
  }) => {
    const res = await updateReviewFromNote({ noteId, reviewId, reviewData })
    if (res) toast.success(res?.data?.message)
    return res?.data
  }

  /**
   * Remove note from liked list
   */
  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote({ noteId })
    if (res) toast.success(res?.data?.message)
  }

  /**
   * Handle purchase of a note
   */
  const handlePurchaseNote = async ({
    noteId,
    invoice_id,
    status,
    message,
  }: {
    noteId: string
    invoice_id: string
    status: string
    message: string
  }) => {
    const res = await purchaseNote({ noteId, invoice_id, status, message })
    if (res) toast.success(res?.data?.message)
    return res
  }

  /**
   * Reset all applied filters
   */
  const resetFilters = () => {
    setFilterCollage('')
    setFilterUniversity('')
    setFilterYear('')
    setSortOrder('desc')
    setMaxDownloads(false)
    setMaxPrice(false)
    setMinPrice(false)
  }

  // Pagination calculations
  const total = data?.pagination?.total || 0
  const totalPages = data?.pagination?.totalPages || 1

  /** Navigate to next page */
  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  /** Navigate to previous page */
  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  /** Jump to specific page */
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setPage(pageNumber)
  }

  /** Change items per page */
  const changeLimit = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return {
    // Data
    notes: data?.data || [],
    userNotes: userNotes?.data,
    likedNotes: likedNotes?.data,
    bestSellerNotes: bestSellerNotes?.data,

    // Loading states
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

    // Actions
    handleCreateNote,
    removeNoteFromLikeList,
    handlePurchaseNote,
    handelAddReviewToNote,
    handelRemoveReviewFromNote,
    handleUpdateReview,

    // Filters
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

    // Pagination
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
  }
}
