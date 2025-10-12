import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Layers, Download } from "lucide-react";
import Image from "next/image";
import { Note } from "@/types";

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <div className="h-full w-full rounded-xl overflow-x-hidden">
      <Link
        href={`/notes/${note._id}`}
        className="block h-full group"
        aria-label={`View ${note.title} note details`}
        prefetch={false}
      >
        <Card className="h-full flex flex-col py-0 border-1 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30">
          <div className="relative aspect-[3/3] overflow-hidden bg-gradient-to-br py-0 from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="w-full h-full">
              <Image
                loading="lazy"
                src={note.cover_url || ""}
                alt={`Cover image for ${note.title}`}
                width={800}
                height={800}
                className="rounded-lg  object-contain"
              />
            </div>

            {note?.reviews?.length > 0 && (
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm border">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
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

          <CardContent className="p-4 pt-0 flex flex-col flex-grow space-y-3 h-fit">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {note.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                <Layers className="h-3.5 w-3.5 mr-1" />
                {note.university}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                {note.college}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                <Star className="h-3.5 w-3.5 mr-1" />
                {note.reviews && note.reviews.length > 0
                  ? (
                      note.reviews
                        .map((review) => review.rating)
                        .reduce((a, b) => a + b, 0) / note.reviews.length
                    ).toFixed(1)
                  : "0.0"}{" "}
                تقييم
              </Badge>

              <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">
                {note.price > 0 ? `${note.price} ريال` : "مجاني"}
              </Badge>
            </div>

            <div className="mt-auto pt-3 border-t border-border">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{note.pagesNumber || "N/A"} صفحة</span>
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
  );
};

export default NoteCard;
