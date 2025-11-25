import { UserPlus, Upload, GraduationCap } from 'lucide-react'
import { JSX } from 'react'

interface StepProps {
  number: string
  icon: JSX.Element
  title: string
  description: string
}

const Step = ({ number, icon, title, description }: StepProps) => (
  <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-xl dark:bg-gray-800">
    {/* Number Circle */}
    <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white">
      {number}
    </div>

    {/* Icon */}
    <div className="bg-primary/10 text-primary mb-4 rounded-full p-3">
      {icon}
    </div>

    {/* Title */}
    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300">
      {description}
    </p>
  </div>
)

const HowItWorksSection = (): JSX.Element => {
  const steps = [
    {
      number: '1',
      icon: <UserPlus className="h-6 w-6" />,
      title: 'سجّل',
      description: 'أنشئ حسابك مجانًا وابدأ رحلتك الأكاديمية معنا بسهولة.',
    },
    {
      number: '2',
      icon: <Upload className="h-6 w-6" />,
      title: 'ارفع أو تصفح',
      description: 'ارفع ملخصاتك لمساعدة غيرك، أو تصفح مئات الملفات المتاحة.',
    },
    {
      number: '3',
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'اربح وتعلم',
      description: 'استفد من مشاركة المعرفة، طوّر نفسك، وحقق دخل إضافي.',
    },
  ]

  return (
    <section
      className="bg-gray-50 py-5 pb-20 dark:bg-gray-900"
      role="region"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Title */}
        <h2
          id="how-heading"
          className="mb-14 text-center text-3xl font-extrabold text-gray-900 md:text-4xl dark:text-white"
        >
          كيف تعمل المنصة؟
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
  )
}

export default HowItWorksSection
