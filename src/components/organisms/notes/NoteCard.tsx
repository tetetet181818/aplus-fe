import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, BookOpen, Layers, Download } from 'lucide-react'
import Image from 'next/image'
import { Note } from '@/types'

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <div className="h-full w-full overflow-x-hidden rounded-xl">
      <Link
        href={`/notes/${note._id}`}
        className="group block h-full"
        aria-label={`View ${note.title} note details`}
        prefetch={false}
      >
        <Card className="hover:border-primary/30 flex h-full flex-col overflow-hidden rounded-xl border-1 py-0 transition-all duration-300">
          <div className="relative aspect-[3/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-0">
            <div className="h-full w-full">
              <Image
                loading="lazy"
                src={note.cover_url || ''}
                alt={`Cover image for ${note.title}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            {note?.reviews?.length > 0 && (
              <div className="bg-background/80 text-foreground absolute bottom-3 left-3 flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs shadow-sm backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {(
                    note.reviews
                      .map((review) => review.rating)
                      .reduce((a, b) => a + b, 0) / note.reviews.length
                  ).toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <CardContent className="flex h-fit flex-grow flex-col space-y-3 p-4 pt-0">
            <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg leading-tight font-semibold transition-colors">
              {note.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                <Layers className="mr-1 h-3.5 w-3.5" />
                {note.university}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                {note.college}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                <Star className="mr-1 h-3.5 w-3.5" />
                {note.reviews && note.reviews.length > 0
                  ? (
                      note.reviews
                        .map((review) => review.rating)
                        .reduce((a, b) => a + b, 0) / note.reviews.length
                    ).toFixed(1)
                  : '0.0'}{' '}
                تقييم
              </Badge>

              <Badge className="from-primary rounded-full bg-gradient-to-r to-blue-600 px-3 py-1 text-xs font-medium text-white shadow-md">
                {note.price > 0 ? `${note.price} ريال` : 'مجاني'}
              </Badge>
            </div>

            <div className="border-border mt-auto border-t pt-3">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{note.pagesNumber || 'N/A'} صفحة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>{note.downloads || 0} تحميل</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default NoteCard
