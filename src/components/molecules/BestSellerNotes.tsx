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

  return (
    <>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {data.map((note) => (
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
