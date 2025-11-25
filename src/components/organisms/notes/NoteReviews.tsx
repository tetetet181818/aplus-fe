'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  ArrowUpCircle,
  ArrowDownCircle,
  Loader2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import formatArabicDate from '@/utils/formateTime'
import { User } from '@/types'
import ReviewSkeletonItem from '@/components/skeletons/ReviewSkeletonItem'
import UpdateReviewsDialog from '@/components/molecules/dialogs/UpdateReviewsDialog'

/** ===================== Types ===================== */

/**
 * @typedef {Object} Review
 * @property {string} _id - Unique identifier of the review.
 * @property {string} [userName] - Name of the reviewer.
 * @property {number} rating - Rating value (1–5).
 * @property {string} [comment] - Review text/comment.
 * @property {string} [createdAt] - Date when the review was created.
 * @property {string} [userId] - ID of the user who posted the review.
 */
interface Review {
  _id: string
  userName?: string
  rating: number
  comment?: string
  createdAt?: string
  userId?: string
}

/**
 * @typedef {Object} NoteReviewsProps
 * @property {boolean} loading - Whether the reviews are still being loaded.
 * @property {Review[]} reviews - Array of user reviews.
 * @property {User} user - Currently authenticated user.
 * @property {(params: {noteId: string; reviewId: string}) => Promise<void>} removeReviewFromNote - Function to remove a review.
 * @property {boolean} removeReviewLoading - Whether the delete action is in progress.
 * @property {string} noteId - ID of the note these reviews belong to.
 */
interface NoteReviewsProps {
  loading: boolean
  reviews: Review[]
  user: User
  removeReviewFromNote: (params: {
    noteId: string
    reviewId: string
  }) => Promise<void>
  removeReviewLoading: boolean
  noteId: string
}

/** ===================== Review Item ===================== */

/**
 * Displays a single review item with edit/delete controls.
 * @param {Object} props
 * @param {Review} props.review - Review data.
 * @param {User} props.user - Current user data.
 * @param {(params: {noteId: string; reviewId: string}) => Promise<void>} props.removeReviewFromNote - Delete handler.
 * @param {boolean} props.removeReviewLoading - Delete button loading state.
 * @param {string} props.noteId - ID of the associated note.
 * @param {(updateReview: boolean) => void} props.setUpdateReview - Handler to toggle update dialog.
 */
const ReviewItem = ({
  review,
  user,
  removeReviewFromNote,
  removeReviewLoading,
  noteId,
  setUpdateReview,
}: {
  review: Review
  user: User
  removeReviewFromNote: (params: {
    noteId: string
    reviewId: string
  }) => Promise<void>
  removeReviewLoading: boolean
  noteId: string
  setUpdateReview: (updateReview: boolean) => void
}) => {
  return (
    <motion.div
      className="flex gap-4 py-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarFallback className="bg-blue-100 text-blue-600">
          {review.userName?.charAt(0) ?? 'U'}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="truncate font-semibold text-gray-800 dark:text-white">
            {review.userName || 'مستخدم مجهول'}
          </h4>

          <div className="flex flex-shrink-0 items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < (review?.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                )}
              />
            ))}
          </div>
        </div>

        <p className="text-sm leading-relaxed break-words text-gray-600 dark:text-gray-300">
          {review?.comment || 'لا يوجد تعليق'}
        </p>

        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {review?.createdAt
            ? formatArabicDate(review?.createdAt)
            : 'تاريخ غير معروف'}
        </p>

        {review?.userId === user?._id && (
          <div className="mt-4 flex gap-2">
            <Button
              variant="default"
              className="mt-1"
              onClick={() => setUpdateReview(true)}
            >
              تعديل
            </Button>
            <Button
              variant="destructive"
              className="mt-1 flex items-center gap-2"
              onClick={() =>
                removeReviewFromNote({
                  noteId,
                  reviewId: review?._id,
                })
              }
              disabled={removeReviewLoading}
            >
              {removeReviewLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                'حذف'
              )}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/** ===================== Sort Selector ===================== */

/**
 * Dropdown selector for sorting reviews.
 * @param {Object} props
 * @param {string} props.sortOption - Current sort selection.
 * @param {(option: string) => void} props.setSortOption - Callback to set sorting.
 */
const SortSelector = ({
  sortOption,
  setSortOption,
}: {
  sortOption: string
  setSortOption: (option: string) => void
}) => {
  const getDescription = useCallback((option: string): string => {
    const desc: Record<string, string> = {
      latest: 'سيتم عرض أحدث العناصر أولاً',
      oldest: 'سيتم عرض أقدم العناصر أولاً',
      highest: 'سيتم عرض أعلى التقييمات أولاً',
      lowest: 'سيتم عرض أدنى التقييمات أولاً',
    }
    return desc[option] || desc.latest
  }, [])

  return (
    <div className="rtl flex w-full max-w-xs flex-col space-y-2">
      <label
        htmlFor="sort-select"
        className="text-right text-sm font-medium text-gray-700"
      >
        ترتيب حسب:
      </label>

      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger
          id="sort-select"
          className="h-12 w-full rounded-lg border-2 border-gray-300 bg-white px-4 text-right shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <SelectValue placeholder="اختر طريقة الترتيب" />
        </SelectTrigger>

        <SelectContent className="rtl rounded-lg border border-gray-200 bg-white text-right shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <SelectItem value="latest">
            <div className="flex items-center">
              <ArrowUp className="ml-2 h-5 w-5 text-blue-500" />
              <span>الأحدث</span>
            </div>
          </SelectItem>
          <SelectItem value="oldest">
            <div className="flex items-center">
              <ArrowDown className="ml-2 h-5 w-5 text-blue-500" />
              <span>الأقدم</span>
            </div>
          </SelectItem>
          <SelectItem value="highest">
            <div className="flex items-center">
              <ArrowUpCircle className="ml-2 h-5 w-5 text-blue-500" />
              <span>الأعلى تقييماً</span>
            </div>
          </SelectItem>
          <SelectItem value="lowest">
            <div className="flex items-center">
              <ArrowDownCircle className="ml-2 h-5 w-5 text-blue-500" />
              <span>الأدنى تقييماً</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
        {getDescription(sortOption)}
      </p>
    </div>
  )
}

/** ===================== NoteReviews ===================== */

/**
 * Displays all reviews for a specific note with sort options, loading states, and update/delete actions.
 * @component
 * @param {NoteReviewsProps} props
 */
const NoteReviews = ({
  reviews,
  loading,
  user,
  removeReviewFromNote,
  noteId,
  removeReviewLoading,
}: NoteReviewsProps) => {
  const [sortOption, setSortOption] = useState<string>('latest')
  const [updateReview, setUpdateReview] = useState(false)

  /** Sorts reviews according to selected option. */
  const sortedReviews = [...(reviews || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt ?? '').getTime()
    const dateB = new Date(b.createdAt ?? '').getTime()

    switch (sortOption) {
      case 'latest':
        return dateB - dateA
      case 'oldest':
        return dateA - dateB
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      default:
        return 0
    }
  })

  /** Skeleton loader */
  if (loading) {
    return (
      <Card className="shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MessageSquare className="text-primary h-6 w-6" />
            التقييمات والتعليقات
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 3 }, (_, i) => (
            <ReviewSkeletonItem key={i} />
          ))}
        </CardContent>
      </Card>
    )
  }

  /** Empty state */
  if (!reviews?.length) {
    return (
      <Card className="shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MessageSquare className="text-primary h-6 w-6" />
            التقييمات والتعليقات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-4 text-center text-gray-600 dark:text-gray-400">
            لا توجد تقييمات أو تعليقات لهذا الملخص حتى الآن.
          </p>
        </CardContent>
      </Card>
    )
  }

  /** Render list */
  return (
    <Card className="shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MessageSquare className="text-primary h-6 w-6" />
            التقييمات والتعليقات ({reviews.length})
          </CardTitle>
          <SortSelector sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </CardHeader>

      <CardContent className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedReviews.map((review, index) => (
          <>
            <ReviewItem
              key={`${review?._id}_${index}`}
              review={review}
              user={user}
              removeReviewFromNote={removeReviewFromNote}
              removeReviewLoading={removeReviewLoading}
              noteId={noteId}
              setUpdateReview={setUpdateReview}
            />

            <UpdateReviewsDialog
              open={updateReview}
              onOpenChange={() => setUpdateReview(false)}
              noteId={noteId}
              reviewId={review?._id}
            />
          </>
        ))}
      </CardContent>
    </Card>
  )
}

export default NoteReviews
