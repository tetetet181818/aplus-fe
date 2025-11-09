import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Note } from "@/types";
import NoteCard from "../organisms/notes/NoteCard";
import BestSellerNotesSkeleton from "../skeletons/BestSellerNotesSkeleton";
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
      <div className="flex items-center justify-center py-20 text-gray-500 font-medium">
        لا توجد بيانات للملخصات حتى الآن
      </div>
    );
  }

  return (
    <>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {data?.map((note) => (
            <CarouselItem
              key={note._id}
              className="md:basis-1/3 sm:basis-1/2 basis-full flex justify-center"
            >
              <NoteCard note={note} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
