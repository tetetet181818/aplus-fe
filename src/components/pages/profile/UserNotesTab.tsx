"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash,
  PlusCircle,
  Eye,
  Download,
  Loader,
  BookOpen,
} from "lucide-react";
import NoResults from "@/components/atoms/NoResults";
import Image from "next/image";
import { Note } from "@/types";
import { useRouter } from "next/navigation";

interface UserNotesTabProps {
  notes: Note[];
  onDeleteRequest: (noteId: string) => void;
  router: ReturnType<typeof useRouter>;
  onDownloadRequest: (note: Note) => void;

  /** Loading state for download actions */
  loading: boolean;
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
}: UserNotesTabProps) => {
  if (!notes || notes.length === 0) {
    return (
      <NoResults
        icon={<BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
        title="لا توجد ملخصات"
        message="لم تقم بإضافة أي ملخصات بعد."
        actionButton={
          <Button
            onClick={() => router.push("/add-note")}
            className="flex items-center gap-2 w-full"
          >
            <PlusCircle className="h-4 w-4" />
            إضافة ملخص جديد
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <Card
          key={note._id}
          className="py-0 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Note Cover */}
            <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-video sm:aspect-[4/3] bg-gradient-to-br from-blue-50 dark:from-gray-700 dark:to-gray-900">
              <Image
                loading="lazy"
                alt={note.title}
                width={500}
                height={500}
                src={note.cover_url || ""}
                className="object-cover w-full h-full"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
              />
            </div>

            {/* Note Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <Badge className="bg-primary text-primary-foreground">
                    {note.price} ريال
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                  {note.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  {note.university && (
                    <Badge variant="outline">{note.university}</Badge>
                  )}
                  {note.subject && (
                    <Badge variant="outline">{note.subject}</Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                  التحميلات: {note.downloads || 0} | التقييم:{" "}
                  {note.rating ? note.rating.toFixed(1) : "N/A"}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/notes/${note._id}`)}
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadRequest(note)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="size-4 animate-spin" />
                        جاري التحميل
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                    onClick={() => router.push(`/add-note/${note._id}`)}
                  >
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteRequest(note?._id)}
                  >
                    <Trash className="h-4 w-4 ml-1" />
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserNotesTab;
