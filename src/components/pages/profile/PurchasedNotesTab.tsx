'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Download, ShoppingBag } from 'lucide-react'
import NoResults from '@/components/atoms/NoResults'
import Image from 'next/image'
import { Note } from '@/types'
import { useRouter } from 'next/navigation'
import { NoteCardSkeleton } from '@/components/skeletons/NoteCardSkeleton'

interface PurchasedNote extends Note {
  saleId: string
}

interface PurchasedNotesTabProps {
  notes: PurchasedNote[]
  router: ReturnType<typeof useRouter>
  onDownload: (note: PurchasedNote) => void
  loading: boolean
}

const PurchasedNotesTab = ({
  notes,
  router,
  onDownload,
  loading,
}: PurchasedNotesTabProps) => {
  if (!loading && notes?.length === 0) {
    return (
      <NoResults
        icon={<ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-400" />}
        title="لا توجد مشتريات"
        message="لم تقم بشراء أي ملخصات بعد."
        actionButton={
          <Button onClick={() => router.push('/notes')}>تصفح الملخصات</Button>
        }
      />
    )
  }

  if (loading) {
    return <NoteCardSkeleton />
  }

  return (
    <div className="space-y-6">
      {notes?.map((note) => (
        <Card
          key={note._id}
          className="overflow-hidden py-0 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Cover Image */}
            <div className="relative aspect-video w-full bg-gradient-to-br from-blue-50 to-blue-50 sm:aspect-[4/3] sm:w-1/3 lg:w-1/4 dark:from-gray-700 dark:to-gray-900">
              <Image
                loading="lazy"
                alt={note.title}
                width={500}
                height={500}
                src={note.cover_url || ''}
                className="h-full w-full object-cover"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="mb-1 flex items-start justify-between">
                  <Badge className="bg-green-500 text-white">تم الشراء</Badge>
                </div>
                <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
                  {note.title}
                </h3>
                <p className="mb-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {note.description}
                </p>
                <div className="mb-3 flex flex-wrap gap-2 text-xs">
                  {note.university && (
                    <Badge variant="outline">{note.university}</Badge>
                  )}
                  {note.college && (
                    <Badge variant="outline">{note.college}</Badge>
                  )}
                </div>
                <Badge variant="outline">
                  رقم الطلب : <span className="mx-2">{note.saleId}</span>
                </Badge>
              </div>

              {/* Actions */}
              <div className="mt-3 flex flex-col items-center justify-between border-t border-gray-200 pt-3 sm:flex-row dark:border-gray-700">
                <div className="mb-2 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                  السعر: {note.price} ريال
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/notes/${note._id}`)}
                  >
                    <Eye className="ml-1 h-4 w-4" />
                    عرض
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDownload(note)}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Download className="ml-1 h-4 w-4" />
                    تحميل
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default PurchasedNotesTab
