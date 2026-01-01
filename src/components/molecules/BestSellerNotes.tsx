import { Note } from '@/types';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import NoteCard from '../organisms/notes/NoteCard';
import BestSellerNotesSkeleton from '../skeletons/BestSellerNotesSkeleton';
import { Star } from 'lucide-react';

export default function BestSellerNotes({
  data,
  loading,
}: {
  data: Note[];
  loading: boolean;
}) {
  if (loading) {
    return <BestSellerNotesSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50/50 py-16 dark:bg-gray-800/50">
        <div className="mb-4 rounded-full bg-gray-200 p-4 dark:bg-gray-700">
          <Star className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          لا توجد بيانات للملخصات حتى الآن
        </p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          سيتم عرض الملخصات الأكثر مبيعًا هنا قريبًا
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel className="mx-auto w-full max-w-6xl">
        <CarouselContent className="-ml-2 md:-ml-4">
          {data?.map((note, index) => (
            <CarouselItem
              key={note._id}
              className="flex basis-full justify-center pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="animate-fade-in">
                <NoteCard note={note} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-2 border-gray-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:-left-12" />
        <CarouselNext className="right-0 border-2 border-gray-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:-right-12" />
      </Carousel>
    </div>
  );
}
