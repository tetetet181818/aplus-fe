'use client';

import React, { ReactNode } from 'react';

import {
  BarChart,
  Bookmark,
  DollarSign,
  Download,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Star,
  Tag,
  Upload,
  Wallet,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

interface FeatureItemProps {
  icon: ReactNode;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <li className="group/item flex items-start gap-4 rounded-lg p-2 transition-all hover:bg-white/50 dark:hover:bg-gray-700/30">
    <span className="text-primary mt-0.5 transition-transform group-hover/item:scale-110" aria-hidden="true">
      {icon}
    </span>
    <span className="flex-1">{text}</span>
  </li>
);

const BuyerSellerSection: React.FC = () => {
  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20"
      aria-labelledby="features-heading"
    >
      <div className="absolute top-1/2 left-1/2 z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-blue-400/40 blur-[180px]"></div>
      <div className="absolute top-1/4 right-1/4 z-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 z-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-500"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            للمشترين والبائعين
          </span>
        </div>
        
        <h2
          id="features-heading"
          className="mb-16 text-center text-4xl font-extrabold text-gray-800 md:text-5xl dark:text-white"
        >
          مميزات{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            المنصة
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          <Card className="group relative overflow-hidden border-2 border-blue-200/50 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400 hover:shadow-2xl md:p-10 dark:border-blue-800/50 dark:bg-gray-800 dark:hover:border-blue-600">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 transition-all duration-500 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-blue-950/10 dark:group-hover:to-blue-950/20"></div>
            
            <header className="relative z-10 mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:from-blue-600 dark:to-blue-700">
                <ShoppingCart className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                للمشترين
              </h3>
            </header>

            <ul className="relative z-10 list-none space-y-5 text-lg text-gray-700 dark:text-gray-300">
              <FeatureItem
                icon={<Search className="h-6 w-6" />}
                text="تصفح جميع الملخصات المصنفة حسب الجامعة والتخصص"
              />
              <FeatureItem
                icon={<Download className="h-6 w-6" />}
                text="شراء فوري واستلام الملف مباشرة"
              />
              <FeatureItem
                icon={<Star className="h-6 w-6" />}
                text="تقييمات وآراء المستخدمين على كل ملخص"
              />
              <FeatureItem
                icon={<Shield className="h-6 w-6" />}
                text="ضمان استرداد إذا كان الملف فيه مشكلة فنية"
              />
              <FeatureItem
                icon={<Bookmark className="h-6 w-6" />}
                text="محفوظات 'مشترياتي' - يمكنك تحميلها في أي وقت"
              />
              <FeatureItem
                icon={<Wallet className="h-6 w-6" />}
                text="سهولة التواصل مع البائع عبر البريد أو الجوال (إن وُفر)"
              />
            </ul>
            
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 group-hover:w-full"></div>
          </Card>

          <Card className="group relative overflow-hidden border-2 border-green-200/50 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-green-400 hover:shadow-2xl md:p-10 dark:border-green-800/50 dark:bg-gray-800 dark:hover:border-green-600">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-green-50/0 to-green-50/0 transition-all duration-500 group-hover:from-green-50/50 group-hover:via-green-50/30 group-hover:to-green-50/50 dark:group-hover:from-green-950/20 dark:group-hover:via-green-950/10 dark:group-hover:to-green-950/20"></div>
            
            <header className="relative z-10 mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-4 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:from-green-600 dark:to-green-700">
                <Upload className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                للبائعين
              </h3>
            </header>

            <ul className="relative z-10 list-none space-y-5 text-lg text-gray-700 dark:text-gray-300">
              <FeatureItem
                icon={<DollarSign className="h-6 w-6" />}
                text="بيع الملخصات وتحقيق دخل إضافي"
              />
              <FeatureItem
                icon={<Wallet className="h-6 w-6" />}
                text="نظام أرباح شفاف وسحب فوري مرتين بالشهر"
              />
              <FeatureItem
                icon={<Settings className="h-6 w-6" />}
                text="لوحة تحكم واضحة لإدارة ملخصاتك ومبيعاتك"
              />
              <FeatureItem
                icon={<Tag className="h-6 w-6" />}
                text="تحكم بالسعر والتعديل عليه بسهولة"
              />
              <FeatureItem
                icon={<BarChart className="h-6 w-6" />}
                text="إحصائيات الأداء (عدد مرات التحميل، المبيعات...)"
              />
            </ul>
            
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 group-hover:w-full"></div>
          </Card>
        </div>

        <div className="mt-20 text-center">
          <p className="mx-auto max-w-2xl text-xl font-medium text-gray-700 dark:text-gray-200">
            انضم إلى مجتمعنا الأكاديمي وابدأ رحلتك سواء كبائع أو مشتري
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyerSellerSection;
