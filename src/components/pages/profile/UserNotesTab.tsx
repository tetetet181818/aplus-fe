'use client'

import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Edit,
  Trash,
  PlusCircle,
  Eye,
  Download,
  Loader,
  BookOpen,
  ListCollapse,
} from 'lucide-react'
import NoResults from '@/components/atoms/NoResults'
import Image from 'next/image'
import { Note } from '@/types'
import { useRouter } from 'next/navigation'
import { NoteCardSkeleton } from '@/components/skeletons/NoteCardSkeleton'
import Link from 'next/link'

interface UserNotesTabProps {
  notes: Note[]
  onDeleteRequest: (noteId: string) => void
  router: ReturnType<typeof useRouter>
  onDownloadRequest: (note: Note) => void

  /** Loading state for download actions */
  loading: boolean
  authLoading: boolean
}

/**
 * UserNotesTab Component
 *
 * Displays the user's notes in a card layout with actions:
 * - View note
 * - Download note
 * - Edit note
 * - Delete note
 *
 * If no notes are available, shows a friendly "No Results" component.
 */
const UserNotesTab = ({
  notes,
  onDeleteRequest,
  onDownloadRequest,
  router,
  loading,
  authLoading,
}: UserNotesTabProps) => {
  if (!notes || notes.length === 0) {
    return (
      <NoResults
        icon={<BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />}
        title="لا توجد ملخصات"
        message="لم تقم بإضافة أي ملخصات بعد."
        actionButton={
          <Button
            onClick={() => router.push('/add-note')}
            className="flex w-full items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            إضافة ملخص جديد
          </Button>
        }
      />
    )
  }

  if (authLoading) {
    return <NoteCardSkeleton />
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <Card
          key={note?._id}
          className="overflow-hidden bg-white py-0 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Note Cover */}
            <div className="relative aspect-video w-full bg-gradient-to-br from-blue-50 to-blue-100 sm:aspect-[4/3] sm:w-1/3 lg:w-1/4 dark:from-gray-700 dark:to-gray-800">
              <Image
                loading="lazy"
                alt={note.title}
                width={500}
                height={500}
                src={note.cover_url || '/default-cover.png'}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
              />
            </div>

            {/* Note Info */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="mb-2 flex items-start justify-between">
                  <Badge className="bg-blue-600 text-white shadow-md dark:bg-blue-500">
                    {note.price} ريال
                  </Badge>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {note.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                  {note.description}
                </p>
                <div className="mb-3 flex flex-wrap gap-2">
                  {note.university && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {note.university}
                    </Badge>
                  )}
                  {note.subject && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {note.subject}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="mt-3 flex flex-col items-center justify-between border-t border-gray-100 pt-3 sm:flex-row dark:border-gray-700">
                <div className="mb-2 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                  <span className="font-medium">
                    التحميلات: {note.downloads || 0}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="font-medium">
                    التقييم: {note.rating ? note.rating.toFixed(1) : 'N/A'}
                  </span>
                </div>

                <CardFooter className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-300 sm:w-auto dark:border-gray-600"
                  >
                    <Link
                      href={`/details-note/${note._id}`}
                      className="flex items-center gap-1"
                    >
                      <ListCollapse className="h-4 w-4" />
                      التفاصيل
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/notes/${note._id}`)}
                    className="w-full border-gray-300 sm:w-auto dark:border-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                    عرض
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadRequest(note)}
                    disabled={loading}
                    className="w-full border-green-200 text-green-700 hover:bg-green-50 sm:w-auto dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        جاري التحميل
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        تحميل
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/add-note/${note._id}`)}
                    className="w-full text-blue-600 hover:bg-blue-50 sm:w-auto dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    <Edit className="h-4 w-4" />
                    تعديل
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteRequest(note?._id)}
                    className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto dark:bg-red-700 dark:hover:bg-red-800"
                  >
                    <Trash className="h-4 w-4" />
                    حذف
                  </Button>
                </CardFooter>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default UserNotesTab
