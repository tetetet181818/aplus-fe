"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Loader, ShoppingBag } from "lucide-react";
import NoResults from "@/components/atoms/NoResults";
import Image from "next/image";
import { Note } from "@/types";
import { useRouter } from "next/navigation";

interface PurchasedNote extends Note {
  saleId: string;
}

interface PurchasedNotesTabProps {
  notes: PurchasedNote[];
  router: ReturnType<typeof useRouter>;
  onDownload: (note: PurchasedNote) => void;
  loading: boolean;
  downloadLoading?: boolean;
}

const PurchasedNotesTab = ({
  notes,
  router,
  onDownload,
  loading,
  downloadLoading,
}: PurchasedNotesTabProps) => {
  // Empty state
  if (!loading && notes.length === 0) {
    return (
      <NoResults
        icon={<ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
        title="لا توجد مشتريات"
        message="لم تقم بشراء أي ملخصات بعد."
        actionButton={
          <Button onClick={() => router.push("/notes")}>تصفح الملخصات</Button>
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
            {/* Cover Image */}
            <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-video sm:aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-700 dark:to-gray-900">
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

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <Badge className="bg-green-500 text-white">تم الشراء</Badge>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                  {note.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
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
              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                  السعر: {note.price} ريال
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
                    size="sm"
                    onClick={() => onDownload(note)}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                    disabled={downloadLoading}
                  >
                    {downloadLoading ? (
                      <>
                        <Loader className="size-5 animate-spin" />
                        <span>جاري التحميل</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </>
                    )}
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

export default PurchasedNotesTab;
