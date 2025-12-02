import { JSX } from 'react';

import { ArrowLeft, GraduationCap, Upload, UserPlus } from 'lucide-react';

interface StepProps {
  number: string;
  icon: JSX.Element;
  title: string;
  description: string;
  isLast?: boolean;
}

const Step = ({ number, icon, title, description, isLast }: StepProps) => (
  <div className="relative flex flex-col items-center">
    {/* Connecting Arrow - Hidden on mobile, shown on desktop between cards */}
    {!isLast && (
      <div className="text-primary/30 dark:text-primary/20 absolute top-16 -left-4 hidden md:block">
        <ArrowLeft className="h-8 w-8" />
      </div>
    )}

    <div className="group relative flex w-full flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:shadow-gray-950/50">
      {/* Decorative corner accent */}
      <div className="from-primary/20 absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br to-transparent opacity-50 blur-2xl transition-opacity group-hover:opacity-70"></div>

      {/* Number Badge */}
      <div className="from-primary dark:from-primary/90 relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br to-blue-600 text-2xl font-bold text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 dark:to-blue-700">
        {number}
      </div>

      {/* Icon Container */}
      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 dark:bg-primary/20 dark:text-primary/90 dark:group-hover:bg-primary/30 relative z-10 mb-6 rounded-2xl p-4 transition-all">
        <div className="transition-transform group-hover:scale-110">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="group-hover:text-primary dark:group-hover:text-primary/90 relative z-10 mb-3 text-xl font-bold text-gray-900 transition-colors dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="from-primary dark:from-primary/80 absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r to-blue-600 transition-all duration-500 group-hover:w-full dark:to-blue-700"></div>
    </div>
  </div>
);

const HowItWorksSection = (): JSX.Element => {
  const steps = [
    {
      number: '1',
      icon: <UserPlus className="h-8 w-8" />,
      title: 'سجّل',
      description: 'أنشئ حسابك مجانًا وابدأ رحلتك الأكاديمية معنا بسهولة.',
    },
    {
      number: '2',
      icon: <Upload className="h-8 w-8" />,
      title: 'ارفع أو تصفح',
      description: 'ارفع ملخصاتك لمساعدة غيرك، أو تصفح مئات الملفات المتاحة.',
    },
    {
      number: '3',
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'اربح وتعلم',
      description: 'استفد من مشاركة المعرفة، طوّر نفسك، وحقق دخل إضافي.',
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 pb-24 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      role="region"
      aria-labelledby="how-heading"
    >
      {/* Decorative background elements */}
      <div className="from-primary/5 dark:from-primary/10 absolute top-20 right-0 h-72 w-72 rounded-full bg-gradient-to-br to-transparent blur-3xl"></div>
      <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl dark:from-blue-500/10"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <div className="text-primary bg-primary/10 dark:bg-primary/20 dark:text-primary/90 mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wider uppercase">
            خطوات بسيطة
          </div>
          <h2
            id="how-heading"
            className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white"
          >
            كيف تعمل{' '}
            <span className="text-primary dark:text-primary/90">المنصة</span>؟
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            ابدأ رحلتك التعليمية في ثلاث خطوات سهلة وسريعة
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
