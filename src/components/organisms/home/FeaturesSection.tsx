import {
  Bookmark,
  TrendingUp,
  Shield,
  Users,
  Rocket,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JSX, ReactNode } from "react";
import Link from "next/link";
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
    className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center h-full"
    role="listitem"
    aria-label={`ميزة: ${title}`}
  >
    <div
      className="p-4 bg-gradient-to-br from-primary to-blue-500 rounded-full text-white mb-4 inline-flex items-center justify-center shadow-md"
      aria-hidden="true"
    >
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base flex-grow leading-relaxed">
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
      title: "مصممة خصيصًا للطلاب",
      description: "منصة مصممة خصيصًا للطلاب لتلبية جميع احتياجاتهم الأكاديمية",
    },
    {
      icon: <DollarSign className="h-7 w-7" />,
      title: "نظام أرباح واضح",
      description: "أرباح شفافة وسحب سريع لتحقيق أقصى استفادة من مشاركتك",
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: "تصفح مئات الملفات",
      description: "اختر من بين مئات الملفات في تخصصك بسهولة ووضوح",
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "حماية وضمان المحتوى",
      description: "نظام أمان يضمن جودة وموثوقية جميع الملفات المعروضة",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "مجتمع طلابي نشط",
      description: "شارك المعرفة مع مجتمع طلابي متعاون ومتنوع",
    },
    {
      icon: <Rocket className="h-7 w-7" />,
      title: "انطلق نحو التميز",
      description: "ابدأ رحلتك الأكاديمية مع أدوات ذكية ودعم مستمر",
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800"
      role="region"
      aria-labelledby="features-heading"
    >
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white"
        >
          لماذا تختار منصة أ+؟
        </h2>

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
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
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            انضم اليوم وابدأ رحلتك مع أ+
          </h3>
          <p className="text-lg md:text-xl font-medium mb-8 text-primary dark:text-blue-300">
            شارك — تعلم — اربح
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/notes">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg transition-colors"
              >
                تصفح الملخصات
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 px-8 py-3 text-white rounded-lg transition-colors">
                انضم الآن
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
