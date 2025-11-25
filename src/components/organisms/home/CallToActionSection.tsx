import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, PlusCircle } from 'lucide-react'
import { JSX } from 'react'

const CallToActionSection = (): JSX.Element => {
  return (
    <section
      className="from-primary bg-gradient-to-br to-blue-600 py-16 text-white md:py-24 dark:from-gray-800 dark:to-gray-900"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
        {/* Heading */}
        <h2
          id="cta-heading"
          className="mb-6 text-3xl leading-tight font-extrabold md:text-4xl lg:text-5xl"
        >
          هل أنت مستعد لمشاركة معرفتك أو العثور على أفضل الملخصات؟
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl dark:text-gray-300">
          انضم إلى مجتمعنا اليوم وابدأ رحلتك نحو التميز الأكاديمي. شارك ملخصاتك،
          ساعد الآخرين، وحقق دخلاً إضافياً.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-6">
          <Link href="/notes">
            <Button
              size="lg"
              className="text-primary flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-2xl sm:w-auto"
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
              className="text-primary flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-3.5 text-base font-semibold transition-all hover:scale-105 hover:bg-white/10 hover:shadow-2xl sm:w-auto dark:border-white dark:text-white"
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
  )
}

export default CallToActionSection
