"use client";

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
  DollarSign,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureItemProps {
  icon: ReactNode;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <li className="flex items-start gap-3">
    <span className="text-primary mt-0.5" aria-hidden="true">
      {icon}
    </span>
    <span>{text}</span>
  </li>
);

const BuyerSellerSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="features-heading"
    >
      <div className="px-4 md:px-6 max-w-6xl mx-auto">
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white"
        >
          مميزات المنصة
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Buyers Card */}
          <Card className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <header className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-300">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                للمشترين
              </h3>
            </header>

            <ul className="space-y-4 text-gray-700 dark:text-gray-300 list-none">
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
          <Card className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <header className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-300">
                <Upload className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                للبائعين
              </h3>
            </header>

            <ul className="space-y-4 text-gray-700 dark:text-gray-300 list-none">
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
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            انضم إلى مجتمعنا الأكاديمي وابدأ رحلتك سواء كبائع أو مشتري
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyerSellerSection;
