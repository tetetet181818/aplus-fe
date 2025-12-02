'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Eye, Heart, Loader2 } from 'lucide-react';

import NoResults from '@/components/atoms/NoResults';
import { NoteCardSkeleton } from '@/components/skeletons/NoteCardSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import useNotes from '@/hooks/useNotes';

interface Note {
  _id: string;
  title: string;
  description: string;
  cover_url: string;
  price: number;
  university: string;
  college: string;
}

const NotesLikedTab = ({
  notes,
  authLoading,
}: {
  notes: Note[];
  authLoading: boolean;
}) => {
  const { removeNoteFromLikeList, unlikeLoading } = useNotes();

  if (authLoading) {
    return <NoteCardSkeleton />;
  }

  if (notes?.length === 0) {
    return (
      <NoResults
        icon={<Heart className="h-12 w-12 text-blue-600" />}
        title="لا يوجد ملخصات مفضلة"
        message="لا يوجد ملخصات مفضلة"
        actionButton={
          <Button variant="default" className="mt-4">
            <Link href="/notes"> ابحث عن ملخصات</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="space-y-6">
      {notes?.map(note => (
        <motion.div
          key={note._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{
            scale: [480, 768].includes(window.innerWidth) ? 1 : 1.02,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Card className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white py-0 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row">
              {/* صورة الغلاف */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-blue-50 to-blue-50 sm:aspect-[4/3] sm:w-1/3 lg:w-1/4 dark:from-gray-700 dark:to-gray-900">
                <Image
                  loading="lazy"
                  alt={note.title}
                  className="h-full w-full object-cover"
                  src={note.cover_url}
                  width={500}
                  height={500}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                <div className="absolute top-3 right-3 sm:hidden">
                  <Badge
                    variant="default"
                    className="rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm"
                  >
                    {note.price} ريال
                  </Badge>
                </div>
              </div>

              {/* التفاصيل */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:flex-row">
                    <div className="hidden sm:block">
                      <Badge
                        variant="default"
                        className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 text-sm font-medium text-white shadow-sm"
                      >
                        {note.price} ريال
                      </Badge>
                    </div>
                  </div>

                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
                    {note.title}
                  </h3>

                  <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600 sm:mb-4 sm:line-clamp-3 sm:text-base dark:text-gray-300">
                    {note.description}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
                    <Badge
                      variant="outline"
                      className="rounded-full border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600 sm:px-3 sm:py-1 sm:text-sm dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {note.university}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-full border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600 sm:px-3 sm:py-1 sm:text-sm dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {note.college}
                    </Badge>
                  </div>
                </div>

                <div className="xs:flex-row xs:items-center flex flex-col items-start justify-between gap-3 border-t border-gray-100 pt-3 sm:pt-4 dark:border-gray-700">
                  <div className="xs:flex-row xs:w-auto flex w-full flex-col gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="xs:w-auto w-full py-5 text-white transition-colors"
                    >
                      <Link
                        className="flex items-center gap-1"
                        href={`/notes/${note._id}`}
                      >
                        <Eye className="ml-1 h-4 w-4 text-white" />
                        <span className="text-white">عرض التفاصيل</span>
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="xs:w-auto w-full bg-red-600 px-4 py-5 text-white transition-colors hover:bg-red-700 hover:text-white"
                      onClick={() =>
                        removeNoteFromLikeList({ noteId: note._id })
                      }
                      disabled={unlikeLoading}
                    >
                      {unlikeLoading ? (
                        <Loader2 className="ml-1 h-4 w-4 animate-spin" />
                      ) : (
                        <Heart className="ml-1 h-4 w-4 fill-current" />
                      )}
                      <span>إزالة الإعجاب</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default NotesLikedTab;
