"use client";

import useNoteDetail from "@/hooks/useNoteDetail";
import {
  Loader2,
  Download,
  Star,
  Calendar,
  FileText,
  Users,
  School,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface DetailsNoteProps {
  params: { id: string };
}

export default function DetailsNote({ params }: DetailsNoteProps) {
  const { id } = params;
  const { note, loading } = useNoteDetail(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-gray-500">جاري تحميل المذكرة...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <p className="text-lg">لا توجد بيانات للمذكرة المطلوبة</p>
        </div>
      </div>
    );
  }

  // Determine primary color variants based on note type/subject
  const getColorScheme = (subject: string) => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes("رياض") || subjectLower.includes("math")) {
      return {
        primary: "bg-blue-500",
        light: "bg-blue-50",
        border: "border-blue-200",
      };
    } else if (
      subjectLower.includes("فيزي") ||
      subjectLower.includes("physics")
    ) {
      return {
        primary: "bg-purple-500",
        light: "bg-purple-50",
        border: "border-purple-200",
      };
    } else if (
      subjectLower.includes("كيمياء") ||
      subjectLower.includes("chemistry")
    ) {
      return {
        primary: "bg-green-500",
        light: "bg-green-50",
        border: "border-green-200",
      };
    } else if (
      subjectLower.includes("أحياء") ||
      subjectLower.includes("biology")
    ) {
      return {
        primary: "bg-emerald-500",
        light: "bg-emerald-50",
        border: "border-emerald-200",
      };
    } else {
      return {
        primary: "bg-primary",
        light: "bg-primary/10",
        border: "border-primary/20",
      };
    }
  };

  const colors = getColorScheme(note.subject);

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          {note.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {note.description}
        </p>
      </div>

      {/* Cover Image */}
      {note.cover_url && (
        <div className="rounded-2xl overflow-hidden shadow-lg border">
          <Image
            src={note.cover_url}
            alt={note.title}
            width={500}
            height={500}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <Card className={`border-2 ${colors.border}`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.light} mb-2`}
                  >
                    <FileText
                      className={`w-6 h-6 ${colors.primary.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">عدد الصفحات</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.pagesNumber || "غير محدد"}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.light} mb-2`}
                  >
                    <Download
                      className={`w-6 h-6 ${colors.primary.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">عدد التحميلات</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.downloads || 0}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.light} mb-2`}
                  >
                    <Star
                      className={`w-6 h-6 ${colors.primary.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">التقييم</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.reviews.length}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.light} mb-2`}
                  >
                    <Calendar
                      className={`w-6 h-6 ${colors.primary.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">السنة</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.year}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border-2 border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <School className="w-5 h-5 text-primary" />
                المعلومات الأكاديمية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">الجامعة</p>
                  <Badge variant="secondary" className="text-base py-1 px-3">
                    <Building className="w-4 h-4 ml-1" />
                    {note.university}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">الكلية</p>
                  <Badge variant="secondary" className="text-base py-1 px-3">
                    <Users className="w-4 h-4 ml-1" />
                    {note.college}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">المادة</p>
                  <Badge
                    className={`text-white ${colors.primary} text-base py-1 px-3`}
                  >
                    {note.subject}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">حالة النشر</p>
                  <Badge
                    variant={note.isPublish ? "default" : "secondary"}
                    className="text-base py-1 px-3"
                  >
                    {note.isPublish ? "منشور" : "مسودة"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className={`border-2 ${colors.border} shadow-lg`}>
            <CardContent className="p-6 text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.light} mb-4`}
              >
                <span
                  className={`text-2xl font-bold ${colors.primary.replace(
                    "bg-",
                    "text-"
                  )}`}
                >
                  {note.price}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                السعر
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {note.price} ريال
              </p>
            </CardContent>
          </Card>

          {/* Contact & Details */}
          <Card className="border-2 border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                معلومات الاتصال
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">طريقة التواصل</p>
                  <p className="text-gray-800 font-medium">
                    {note.contactMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">تاريخ الإنشاء</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(note.createdAt).toLocaleDateString("ar-SA")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">آخر تحديث</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(note.updatedAt).toLocaleDateString("ar-SA")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
