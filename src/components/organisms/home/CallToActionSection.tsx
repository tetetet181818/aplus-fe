import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle } from "lucide-react";
import { JSX } from "react";

const CallToActionSection = (): JSX.Element => {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-primary to-blue-600 dark:from-gray-800 dark:to-gray-900 text-white"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="px-4 md:px-6 text-center max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
        >
          هل أنت مستعد لمشاركة معرفتك أو العثور على أفضل الملخصات؟
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-white/80 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          انضم إلى مجتمعنا اليوم وابدأ رحلتك نحو التميز الأكاديمي. شارك ملخصاتك،
          ساعد الآخرين، وحقق دخلاً إضافياً.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <Link href="/notes">
            <Button
              size="lg"
              className="bg-white flex justify-center items-center gap-2 text-primary hover:bg-gray-100 hover:shadow-2xl transition-all hover:scale-105 w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl"
              aria-label="تصفح الملخصات المتاحة على المنصة"
            >
              <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
              تصفح الملخصات
            </Button>
          </Link>

          <Link href="/add-note">
            <Button
              size="lg"
              variant="outline"
              className="flex justify-center items-center gap-2 border-2 text-primary border-white dark:text-white dark:border-white hover:bg-white/10 hover:shadow-2xl transition-all hover:scale-105 w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl"
              aria-label="أضف ملخصك الآن إلى منصة أ+"
            >
              <PlusCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              أضف ملخصك الآن
            </Button>
          </Link>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            name: "انضم إلى منصة أ+ الأكاديمية",
            description:
              "منصة للطلاب لبيع وشراء الملخصات الجامعية والمواد التعليمية",
            mainEntity: {
              "@type": "Action",
              name: "انضم إلى المنصة",
              description:
                "انضم إلى مجتمعنا اليوم وابدأ رحلتك نحو التميز الأكاديمي",
              potentialAction: [
                {
                  "@type": "Action",
                  name: "تصفح الملخصات",
                  url: "/notes",
                  actionPlatform: "http://schema.org/WebPlatform",
                },
                {
                  "@type": "Action",
                  name: "أضف ملخصك",
                  url: "/add-note",
                  actionPlatform: "http://schema.org/WebPlatform",
                },
              ],
            },
          }),
        }}
      />
    </section>
  );
};

export default CallToActionSection;
