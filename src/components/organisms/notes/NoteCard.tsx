import Image from 'next/image';
import Link from 'next/link';

import { Note } from '@/types';
import { BookOpen, Download, Layers, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const NoteCard = ({ note }: { note: Note }) => {
  const averageRating =
    note?.reviews && note.reviews.length > 0
      ? (
          note.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) /
          note.reviews.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="h-full w-full">
      <Link
        href={`/notes/${note._id}`}
        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
        aria-label={`View ${note.title} note details`}
        prefetch={false}
      >
        <Card className="py-0 group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary/40 dark:hover:shadow-xl dark:hover:shadow-primary/10">
          {/* Image Container with Overlay */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="relative h-full w-full">
              <Image
                loading="lazy"
                src={note.cover_url || ''}
                alt={`Cover image for ${note.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 dark:from-black/40" />
            </div>

            {/* Rating Badge - Floating */}
            {note?.reviews?.length > 0 && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur-md border border-border/50 px-3 py-1.5 text-xs font-medium shadow-lg transition-transform duration-300 group-hover/card:scale-105 dark:bg-gray-900/95 dark:border-gray-700">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                <span className="text-foreground dark:text-gray-100">{averageRating}</span>
              </div>
            )}

            {/* Price Badge - Top Right */}
            <div className="absolute top-3 right-3">
              <Badge className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-xl dark:from-blue-500 dark:to-blue-600">
                {note.price > 0 ? `${note.price} ريال` : 'مجاني'}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="flex flex-grow flex-col gap-4 p-5">
            {/* Title */}
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground transition-colors duration-200 group-hover/card:text-primary dark:text-white dark:group-hover/card:text-primary/90">
              {note.title}
            </h3>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="rounded-lg border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium transition-colors duration-200 hover:bg-muted dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Layers className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                <span className="truncate max-w-[120px]">{note.university}</span>
              </Badge>
              <Badge
                variant="outline"
                className="rounded-lg border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium transition-colors duration-200 hover:bg-muted dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <BookOpen className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                <span className="truncate max-w-[120px]">{note.college}</span>
              </Badge>
            </div>

            {/* Footer Stats */}
            <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground/70 dark:text-gray-500" />
                <span className="font-medium">{note.pagesNumber || 'N/A'}</span>
                <span className="text-xs">صفحة</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                <Download className="h-4 w-4 shrink-0 text-muted-foreground/70 dark:text-gray-500" />
                <span className="font-medium">{note.downloads || 0}</span>
                <span className="text-xs">تحميل</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default NoteCard;
