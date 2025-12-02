import { JSX, ReactNode } from 'react';

import {
  Bookmark,
  DollarSign,
  Rocket,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element => (
  <article
    className="flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    role="listitem"
    aria-label={`ميزة: ${title}`}
  >
    <div
      className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-500 p-4 text-white shadow-md"
      aria-hidden="true"
    >
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl dark:text-white">
      {title}
    </h3>
    <p className="flex-grow text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300">
      {description}
    </p>
  </article>
);

interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

const FeaturesSection = (): JSX.Element => {
  const features: FeatureItem[] = [
    {
      icon: <Bookmark className="h-7 w-7" />,
      title: 'مصممة خصيصًا للطلاب',
      description: 'منصة مصممة خصيصًا للطلاب لتلبية جميع احتياجاتهم الأكاديمية',
    },
    {
      icon: <DollarSign className="h-7 w-7" />,
      title: 'نظام أرباح واضح',
      description: 'أرباح شفافة وسحب سريع لتحقيق أقصى استفادة من مشاركتك',
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: 'تصفح مئات الملفات',
      description: 'اختر من بين مئات الملفات في تخصصك بسهولة ووضوح',
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'حماية وضمان المحتوى',
      description: 'نظام أمان يضمن جودة وموثوقية جميع الملفات المعروضة',
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'مجتمع طلابي نشط',
      description: 'شارك المعرفة مع مجتمع طلابي متعاون ومتنوع',
    },
    {
      icon: <Rocket className="h-7 w-7" />,
      title: 'انطلق نحو التميز',
      description: 'ابدأ رحلتك الأكاديمية مع أدوات ذكية ودعم مستمر',
    },
  ];

  return (
    <section
      className="bg-gradient-to-b from-white to-sky-50 py-20 md:py-28 dark:from-gray-900 dark:to-gray-800"
      role="region"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <h2
          id="features-heading"
          className="mb-14 text-center text-3xl font-extrabold text-gray-900 md:text-4xl dark:text-white"
        >
          لماذا تختار منصة أ+؟
        </h2>

        {/* Features Grid */}
        <div
          className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="مميزات المنصة"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            انضم اليوم وابدأ رحلتك مع أ+
          </h3>
          <p className="text-primary mb-8 text-lg font-medium md:text-xl dark:text-blue-300">
            شارك — تعلم — اربح
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
