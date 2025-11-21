'use client'
import { useState } from 'react'
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
import { CreateNoteData, ReviewData } from '@/types'
import { toast } from 'sonner'

/**
 * Custom hook for handling all note-related operations (CRUD, filters, reviews, purchases, pagination).
 */
export default function useNotes() {
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

  /** Fetch user’s notes */
  const { data: userNotes, isLoading: userNotesLoading } = useGetUserNotesQuery(
    {},
  )

  const [addReviewToNote, { isLoading: addReviewLoading }] =
    useAddReviewToNoteMutation()

  /** Add review to a note */
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

  const [removeReviewFromNote, { isLoading: removeReviewLoading }] =
    useRemoveReviewFromNoteMutation()

  /** Remove review from a note */
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

  const [updateReviewFromNote, { isLoading: updateReviewLoading }] =
    useUpdateReviewFromNoteMutation()

  /** Update review on a note */
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

  const [createNote, { isLoading: createNoteLoading }] = useCreateNoteMutation()

  /** Create new note */
  const handleCreateNote = async (noteData: CreateNoteData) => {
    try {
      const res = await createNote({ noteData })
      if (res?.data?.message) toast.success('تم إضافة الملخص بنجاح')
      return res?.data
    } catch (error) {
      return {
        success: false,
        error: error || 'برجاء فحص المعلومات وحاول مرة اخرى',
      }
    }
  }

  /** Fetch liked notes */
  const { data: likedNotes, isLoading: likedNotesLoading } =
    useGetLikedNotesQuery({})

  const [makeUnlikeNote, { isLoading: unlikeLoading }] =
    useMakeUnlikeNoteMutation()

  const [purchaseNote, { isLoading: purchaseLoading }] =
    usePurchaseNoteMutation()

  /** Remove note from liked list */
  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote({ noteId })
    if (res) toast.success(res?.data?.message)
  }

  /** Handle purchase of a note */
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

  /** Reset all applied filters */
  const resetFilters = () => {
    setFilterCollage('')
    setFilterUniversity('')
    setFilterYear('')
    setSortOrder('desc')
    setMaxDownloads(false)
    setMaxPrice(false)
    setMinPrice(false)
  }

  const { data: bestSellerNotes, isLoading: bestSellerNotesLoading } =
    useGetBestSellerNotesQuery(undefined)

  // Pagination calculations
  const total = data?.pagination?.total || 0
  const totalPages = data?.pagination?.totalPages || 1

  /** Go to next page */
  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  /** Go to previous page */
  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  /** Jump to a specific page */
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setPage(pageNumber)
  }

  /** Change number of notes per page */
  const changeLimit = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return {
    notes: data?.data || [],
    notesLoading,
    isFetching,
    handleCreateNote,
    createNoteLoading,
    userNotesLoading,
    userNotes: userNotes?.data,
    likedNotesLoading,
    likedNotes: likedNotes?.data,
    removeNoteFromLikeList,
    bestSellerNotes: bestSellerNotes?.data,
    bestSellerNotesLoading,
    unlikeLoading,
    purchaseLoading,
    handlePurchaseNote,
    handelAddReviewToNote,
    addReviewLoading,
    handelRemoveReviewFromNote,
    removeReviewLoading,
    handleUpdateReview,
    updateReviewLoading,
    filterUniversity,
    setFilterUniversity,
    filterCollage,
    setFilterCollage,
    filterYear,
    setFilterYear,
    resetFilters,
    sortOrder,
    maxDownloads,
    maxPrice,
    minPrice,
    setSortOrder,
    setMaxDownloads,
    setMaxPrice,
    setMinPrice,
    filterTitle,
    setFilterTitle,

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
  }
}
