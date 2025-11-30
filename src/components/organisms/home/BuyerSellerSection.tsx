'use client'

import {
  ShoppingCart,
  Upload,
  Star,
  Download,
  Shield,
  Wallet,
  BarChart,
  Settings,
  Search,
  Bookmark,
  Tag,
  DollarSign,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import React, { ReactNode } from 'react'

interface FeatureItemProps {
  icon: ReactNode
  text: string
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <li className="flex items-start gap-3">
    <span className="text-primary mt-0.5" aria-hidden="true">
      {icon}
    </span>
    <span>{text}</span>
  </li>
)

const BuyerSellerSection: React.FC = () => {
  return (
    <section
      className="relative flex h-screen w-full items-center justify-center"
      aria-labelledby="features-heading"
    >
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/70 opacity-60 blur-[160px]" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2
          id="features-heading"
          className="mb-16 text-center text-3xl font-bold text-gray-800 md:text-4xl dark:text-white"
        >
          مميزات المنصة
        </h2>

        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          {/* Buyers Card */}
          <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl md:p-8 dark:bg-gray-800">
            <header className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                للمشترين
              </h3>
            </header>

            <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
              <FeatureItem
                icon={<Search className="h-5 w-5" />}
                text="تصفح جميع الملخصات المصنفة حسب الجامعة والتخصص"
              />
              <FeatureItem
                icon={<Download className="h-5 w-5" />}
                text="شراء فوري واستلام الملف مباشرة"
              />
              <FeatureItem
                icon={<Star className="h-5 w-5" />}
                text="تقييمات وآراء المستخدمين على كل ملخص"
              />
              <FeatureItem
                icon={<Shield className="h-5 w-5" />}
                text="ضمان استرداد إذا كان الملف فيه مشكلة فنية"
              />
              <FeatureItem
                icon={<Bookmark className="h-5 w-5" />}
                text="محفوظات 'مشترياتي' - يمكنك تحميلها في أي وقت"
              />
              <FeatureItem
                icon={<Wallet className="h-5 w-5" />}
                text="سهولة التواصل مع البائع عبر البريد أو الجوال (إن وُفر)"
              />
            </ul>
          </Card>

          {/* Sellers Card */}
          <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl md:p-8 dark:bg-gray-800">
            <header className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/50 dark:text-green-300">
                <Upload className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                للبائعين
              </h3>
            </header>

            <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
              <FeatureItem
                icon={<DollarSign className="h-5 w-5" />}
                text="بيع الملخصات وتحقيق دخل إضافي"
              />
              <FeatureItem
                icon={<Wallet className="h-5 w-5" />}
                text="نظام أرباح شفاف وسحب فوري مرتين بالشهر"
              />
              <FeatureItem
                icon={<Settings className="h-5 w-5" />}
                text="لوحة تحكم واضحة لإدارة ملخصاتك ومبيعاتك"
              />
              <FeatureItem
                icon={<Tag className="h-5 w-5" />}
                text="تحكم بالسعر والتعديل عليه بسهولة"
              />
              <FeatureItem
                icon={<BarChart className="h-5 w-5" />}
                text="إحصائيات الأداء (عدد مرات التحميل، المبيعات...)"
              />
            </ul>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600 dark:text-gray-200">
            انضم إلى مجتمعنا الأكاديمي وابدأ رحلتك سواء كبائع أو مشتري
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuyerSellerSection
