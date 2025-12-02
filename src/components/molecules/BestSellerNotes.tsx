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
      <div className="flex items-center justify-center py-20 font-medium text-gray-500 dark:text-gray-400">
        لا توجد بيانات للملخصات حتى الآن
      </div>
    );
  }

  return (
    <>
      <Carousel className="mx-auto w-full max-w-5xl">
        <CarouselContent>
          {data?.map(note => (
            <CarouselItem
              key={note._id}
              className="flex basis-full justify-center sm:basis-1/2 md:basis-1/3"
            >
              <NoteCard note={note} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" />
        <CarouselNext className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" />
      </Carousel>
    </>
  );
}
