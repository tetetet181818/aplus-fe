"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Loader, ShoppingBag } from "lucide-react";
import NoResults from "@/components/atoms/NoResults";
import Image from "next/image";
import { Note } from "@/types";

// 1. تعريف نوع بيانات الملخص المشتَرى
interface PurchasedNote extends Note {
  saleId: string;
}

// 2. Props للكومبوننت
interface PurchasedNotesTabProps {
  notes: PurchasedNote[];
  onNavigate: (path: string) => void;
  onDownload: (note: PurchasedNote) => void;
  loading: boolean;
  downloadLoading: boolean;
}

// 3. بيانات ثابتة للتجربة
const staticNotes: PurchasedNote[] = [
  {
    id: "1",
    title: "ملخص الرياضيات",
    description: "ملخص يغطي أساسيات التفاضل والتكامل مع أمثلة عملية.",
    cover_url:
      "https://images.unsplash.com/photo-1509223197845-458d87318791?w=800&q=80",
    price: 50,
    university: "جامعة الملك سعود",
    college: "كلية العلوم",
    saleId: "ORD-1001",
    rating: [],
  },
  {
    id: "2",
    title: "ملخص الفيزياء",
    description: "ملاحظات شاملة عن الميكانيكا الكلاسيكية مع تمارين محلولة.",
    cover_url:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    price: 70,
    university: "جامعة القاهرة",
    college: "كلية الهندسة",
    saleId: "ORD-1002",
    rating: [],
  },
  {
    id: "3",
    title: "ملخص الأدب العربي",
    description:
      "تحليل نصوص شعرية ونثرية مع أسئلة للمراجعة قبل الامتحان النهائي.",
    cover_url:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    price: 40,
    university: "جامعة عين شمس",
    college: "كلية الآداب",
    saleId: "ORD-1003",
    rating: [],
  },
];

// 4. الكومبوننت
const PurchasedNotesTab = ({
  notes = staticNotes,
  onNavigate = (path) => console.log("Navigate to:", path),
  onDownload = (note) => console.log("Download note:", note),
  loading = false,
  downloadLoading = false,
}: Partial<PurchasedNotesTabProps>) => {
  if (!loading && notes?.length === 0) {
    return (
      <NoResults
        icon={<ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
        title="لا توجد مشتريات"
        message="لم تقم بشراء أي ملخصات بعد."
        actionButton={
          <Button onClick={() => onNavigate("/notes")}>تصفح الملخصات</Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => {
        return (
          <Card
            key={note.id}
            className="py-0 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row">
              {/* صورة الغلاف */}
              <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-video sm:aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-700 dark:to-gray-900">
                <Image
                  loading="lazy"
                  alt={note.title}
                  width={500}
                  height={500}
                  src={note.cover_url || ""}
                  className="object-cover w-full h-full"
                  placeholder="blur"
                  blurDataURL="/placeholder-image.jpg"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
                />
              </div>

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
                    <Badge variant="outline">{note.university}</Badge>
                    <Badge variant="outline">{note.college}</Badge>
                  </div>
                  <Badge variant="outline">
                    رقم الطلب : <span className="mx-2">{note.saleId}</span>
                  </Badge>
                </div>

                {/* الأزرار */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                    السعر: {note.price} ريال
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(`/notes/${note.id}`)}
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
        );
      })}
    </div>
  );
};

export default PurchasedNotesTab;
