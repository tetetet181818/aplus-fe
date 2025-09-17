import { UserPlus, Upload, GraduationCap } from "lucide-react";
import { JSX } from "react";

interface StepProps {
  number: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

const Step = ({ number, icon, title, description }: StepProps) => (
  <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
    {/* Number Circle */}
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mb-4">
      {number}
    </div>

    {/* Icon */}
    <div className="p-3 bg-primary/10 text-primary rounded-full mb-4">
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </div>
);

const HowItWorksSection = (): JSX.Element => {
  const steps = [
    {
      number: "1",
      icon: <UserPlus className="h-6 w-6" />,
      title: "سجّل",
      description: "أنشئ حسابك مجانًا وابدأ رحلتك الأكاديمية معنا بسهولة.",
    },
    {
      number: "2",
      icon: <Upload className="h-6 w-6" />,
      title: "ارفع أو تصفح",
      description: "ارفع ملخصاتك لمساعدة غيرك، أو تصفح مئات الملفات المتاحة.",
    },
    {
      number: "3",
      icon: <GraduationCap className="h-6 w-6" />,
      title: "اربح وتعلم",
      description: "استفد من مشاركة المعرفة، طوّر نفسك، وحقق دخل إضافي.",
    },
  ];

  return (
    <section
      className="py-5  pb-20 bg-gray-50 dark:bg-gray-900"
      role="region"
      aria-labelledby="how-heading"
    >
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2
          id="how-heading"
          className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white"
        >
          كيف تعمل المنصة؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
