'use client'

import useNoteDetail from '@/hooks/useNoteDetail'
import {
  Loader2,
  Download,
  Star,
  Calendar,
  FileText,
  Users,
  School,
  Building,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { DetailsNoteSales } from '@/components/organisms/notes/DetailsNoteSales'
import DetailsNoteSalesTable from '@/components/organisms/notes/DetailsNoteSalesTable'
import { useGetDetailsNoteSalesQuery } from '@/store/api/sales.api'
import { useState } from 'react'

interface DetailsNoteProps {
  params: { id: string }
}

export default function DetailsNote({ params }: DetailsNoteProps) {
  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(10)
  const { id } = params
  const { note, loading } = useNoteDetail(id)
  const { data: detailsNoteSales, isLoading: detailsNoteSalesLoading } =
    useGetDetailsNoteSalesQuery({ noteId: id, page, limit })
  if (loading || detailsNoteSalesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="text-primary mx-auto h-12 w-12 animate-spin" />
          <p className="text-gray-500">جاري تحميل المذكرة...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg">لا توجد بيانات للمذكرة المطلوبة</p>
        </div>
      </div>
    )
  }

  const nextPage = () => {
    if (
      detailsNoteSales?.pagination &&
      page < detailsNoteSales.pagination.totalPages
    ) {
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 lg:p-8">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl leading-tight font-bold text-gray-800 lg:text-4xl">
          {note.title}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
          {note.description}
        </p>
      </div>

      {/* Cover Image */}
      {note.cover_url && (
        <div className="overflow-hidden rounded-2xl border shadow-lg">
          <Image
            src={note.cover_url}
            alt={note.title}
            width={500}
            height={500}
            className="h-64 w-full object-cover lg:h-80"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Stats */}
          <Card className={`border-2 border-gray-100`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div
                    className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50`}
                  >
                    <FileText className={`text-primary h-6 w-6`} />
                  </div>
                  <p className="text-sm text-gray-600">عدد الصفحات</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.pagesNumber || 'غير محدد'}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50`}
                  >
                    <Download className={`text-primary h-6 w-6`} />
                  </div>
                  <p className="text-sm text-gray-600">عدد التحميلات</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.downloads || 0}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50`}
                  >
                    <Star className={`text-primary h-6 w-6`} />
                  </div>
                  <p className="text-sm text-gray-600">التقييم</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {note.reviews.length}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50`}
                  >
                    <Calendar className={`text-primary h-6 w-6`} />
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
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
                <School className="text-primary h-5 w-5" />
                المعلومات الأكاديمية
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">الجامعة</p>
                  <Badge variant="secondary" className="px-3 py-1 text-base">
                    <Building className="ml-1 h-4 w-4" />
                    {note.university}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">الكلية</p>
                  <Badge variant="secondary" className="px-3 py-1 text-base">
                    <Users className="ml-1 h-4 w-4" />
                    {note.college}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">المادة</p>
                  <Badge className={`px-3 py-1 text-base text-white`}>
                    {note.subject}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">حالة النشر</p>
                  <Badge
                    variant={note.isPublish ? 'default' : 'secondary'}
                    className="px-3 py-1 text-base"
                  >
                    {note.isPublish ? 'منشور' : 'مسودة'}
                  </Badge>
                </div>
                <DetailsNoteSales salesState={detailsNoteSales?.stateSales} />
                <DetailsNoteSalesTable
                  sales={detailsNoteSales?.sales}
                  pagination={detailsNoteSales?.pagination}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Price Card */}
          <Card className={`border-2 border-gray-100 shadow-lg`}>
            <CardContent className="p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                السعر
              </h3>
              <p className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-900">
                <p>{note.price}</p>
                <Image
                  src="/riyal-icon.svg"
                  alt="ريال"
                  width={20}
                  height={20}
                />
              </p>
            </CardContent>
          </Card>

          {/* Contact & Details */}
          <Card className="border-2 border-gray-100">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                معلومات الاتصال
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">طريقة التواصل</p>
                  <p className="font-medium text-gray-800">
                    {note.contactMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">تاريخ الإنشاء</p>
                  <p className="font-medium text-gray-800">
                    {new Date(note.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">آخر تحديث</p>
                  <p className="font-medium text-gray-800">
                    {new Date(note.updatedAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
