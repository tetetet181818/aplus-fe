'use client'

/**
 * تفاصيل المذكرة مع دعم الوضع الداكن والفاتح.
 * @component
 */
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

/** ألوان قابلة لإعادة الاستخدام */
const baseText = 'text-gray-800 dark:text-gray-100'
const subText = 'text-gray-600 dark:text-gray-400'
const cardStyle =
  'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
const iconBg = 'bg-gray-50 dark:bg-gray-800'

export default function DetailsNote({ params }: DetailsNoteProps) {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const { id } = params
  const { note, loading } = useNoteDetail(id)
  const { data: detailsNoteSales, isLoading: salesLoading } =
    useGetDetailsNoteSalesQuery({ noteId: id, page, limit })

  if (loading || salesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="text-primary mx-auto h-12 w-12 animate-spin" />
          <p className={subText}>جاري تحميل المذكرة...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className={`${subText} text-lg`}>لا توجد بيانات للمذكرة المطلوبة</p>
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
    if (page > 1) setPage((prev) => prev - 1)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 lg:p-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className={`text-3xl font-bold lg:text-4xl ${baseText}`}>
          {note.title}
        </h1>
        <p className={`mx-auto max-w-3xl text-lg leading-relaxed ${subText}`}>
          {note.description}
        </p>
      </div>

      {/* Cover */}
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
        {/* Main Section */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Stats */}
          <Card className={cardStyle}>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {/* Stat Item */}
                {[
                  {
                    icon: FileText,
                    label: 'عدد الصفحات',
                    value: note.pagesNumber || 'غير محدد',
                  },
                  {
                    icon: Download,
                    label: 'عدد التحميلات',
                    value: note.downloads || 0,
                  },
                  {
                    icon: Star,
                    label: 'التقييم',
                    value: note.reviews.length,
                  },
                  {
                    icon: Calendar,
                    label: 'السنة',
                    value: note.year,
                  },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
                    >
                      <item.icon className="text-primary h-6 w-6" />
                    </div>
                    <p className={`text-sm ${subText}`}>{item.label}</p>
                    <p className={`text-xl font-semibold ${baseText}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card className={cardStyle}>
            <CardContent className="p-6">
              <h3
                className={`mb-4 flex items-center gap-2 text-xl font-semibold ${baseText}`}
              >
                <School className="text-primary h-5 w-5" />
                المعلومات الأكاديمية
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className={`text-sm ${subText}`}>الجامعة</p>
                  <Badge variant="secondary" className="px-3 py-1 text-base">
                    <Building className="ml-1 h-4 w-4" />
                    {note.university}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className={`text-sm ${subText}`}>الكلية</p>
                  <Badge variant="secondary" className="px-3 py-1 text-base">
                    <Users className="ml-1 h-4 w-4" />
                    {note.college}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className={`text-sm ${subText}`}>المادة</p>
                  <Badge className="px-3 py-1 text-base text-white">
                    {note.subject}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className={`text-sm ${subText}`}>حالة النشر</p>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price */}
          <Card className={`${cardStyle} shadow-lg`}>
            <CardContent className="p-6 text-center">
              <h3 className={`mb-2 text-xl font-semibold ${baseText}`}>
                السعر
              </h3>
              <p
                className={`flex items-center justify-center gap-2 text-3xl font-bold ${baseText}`}
              >
                {note.price}
                <Image
                  src="/riyal-icon.svg"
                  alt="ريال"
                  width={20}
                  height={20}
                />
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className={cardStyle}>
            <CardContent className="p-6">
              <h3 className={`mb-4 text-lg font-semibold ${baseText}`}>
                معلومات الاتصال
              </h3>

              <div className="space-y-3">
                <div>
                  <p className={`text-sm ${subText}`}>طريقة التواصل</p>
                  <p className={`font-medium ${baseText}`}>
                    {note.contactMethod}
                  </p>
                </div>

                <div>
                  <p className={`text-sm ${subText}`}>تاريخ الإنشاء</p>
                  <p className={baseText}>
                    {new Date(note.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>

                <div>
                  <p className={`text-sm ${subText}`}>آخر تحديث</p>
                  <p className={baseText}>
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
