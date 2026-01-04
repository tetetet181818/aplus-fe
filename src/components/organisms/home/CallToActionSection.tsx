import { JSX } from 'react';

import Link from 'next/link';

import { BookOpen, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const CallToActionSection = (): JSX.Element => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-500 py-20 text-white md:py-32 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center md:px-6">
        <div className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
          ابدأ الآن
        </div>

        <h2
          id="cta-heading"
          className="mb-6 text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl"
        >
          هل أنت مستعد لمشاركة{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
            معرفتك
          </span>{' '}
          أو العثور على أفضل الملخصات؟
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/95 md:text-2xl dark:text-gray-200">
          انضم إلى مجتمعنا اليوم وابدأ رحلتك نحو التميز الأكاديمي. شارك ملخصاتك،
          ساعد الآخرين، وحقق دخلاً إضافياً.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row md:gap-8">
          <Link href="/notes" className="group">
            <Button
              size="lg"
              className="relative overflow-hidden bg-white px-10 py-6 text-lg font-bold text-blue-600 shadow-2xl transition-all hover:scale-110 hover:text-white hover:shadow-white/50 sm:w-auto"
              aria-label="تصفح الملخصات المتاحة على المنصة"
            >
              <span className="relative z-10 flex items-center gap-3">
                <BookOpen
                  className="h-6 w-6 transition-transform group-hover:rotate-12"
                  aria-hidden="true"
                />
                تصفح الملخصات
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Button>
          </Link>

          <Link href="/add-note" className="group">
            <Button
              size="lg"
              variant="outline"
              className="relative overflow-hidden border-2 border-white/50 bg-white/10 px-10 py-6 text-lg font-bold text-white shadow-2xl backdrop-blur-sm transition-all hover:scale-110 hover:border-white hover:bg-white/20 hover:shadow-white/50 sm:w-auto"
              aria-label="أضف ملخصك الآن إلى منصة أ+"
            >
              <span className="relative z-10 flex items-center gap-3">
                <PlusCircle
                  className="h-6 w-6 transition-transform group-hover:rotate-90"
                  aria-hidden="true"
                />
                أضف ملخصك الآن
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPageElement',
            name: 'انضم إلى منصة أ+ الأكاديمية',
            description:
              'منصة للطلاب لبيع وشراء الملخصات الجامعية والمواد التعليمية',
            mainEntity: {
              '@type': 'Action',
              name: 'انضم إلى المنصة',
              description:
                'انضم إلى مجتمعنا اليوم وابدأ رحلتك نحو التميز الأكاديمي',
              potentialAction: [
                {
                  '@type': 'Action',
                  name: 'تصفح الملخصات',
                  url: '/notes',
                  actionPlatform: 'http://schema.org/WebPlatform',
                },
                {
                  '@type': 'Action',
                  name: 'أضف ملخصك',
                  url: '/add-note',
                  actionPlatform: 'http://schema.org/WebPlatform',
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
