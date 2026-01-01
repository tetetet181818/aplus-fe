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
    className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800 dark:hover:border-blue-500"
    role="listitem"
    aria-label={`ميزة: ${title}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 transition-all duration-500 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-blue-950/10 dark:group-hover:to-blue-950/20"></div>
    
    <div
      className="relative z-10 mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-5 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-500/50"
      aria-hidden="true"
    >
      <div className="transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
    </div>
    
    <h3 className="relative z-10 mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 md:text-2xl dark:text-white dark:group-hover:text-blue-400">
      {title}
    </h3>
    
    <p className="relative z-10 flex-grow text-base leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200">
      {description}
    </p>
    
    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 group-hover:w-full"></div>
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
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-sky-50 py-20 md:py-32 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800"
      role="region"
      aria-labelledby="features-heading"
    >
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            مميزاتنا
          </span>
        </div>
        
        <h2
          id="features-heading"
          className="mb-4 text-center text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white"
        >
          لماذا تختار منصة{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            أ+
          </span>
          ؟
        </h2>
        
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
          اكتشف المميزات التي تجعل منصتنا الخيار الأمثل لرحلتك الأكاديمية
        </p>

        <div
          className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="مميزات المنصة"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-1">
          <div className="rounded-3xl bg-white p-8 text-center dark:bg-gray-900">
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              انضم اليوم وابدأ رحلتك مع{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                أ+
              </span>
            </h3>
            <p className="text-lg font-semibold text-blue-600 md:text-xl dark:text-blue-400">
              شارك — تعلم — اربح
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
