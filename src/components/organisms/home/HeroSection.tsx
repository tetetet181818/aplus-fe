import { Button } from '@/components/ui/button'
import { Upload, BookOpen, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import HeroImage from '../../../../public/hero-image.jpeg'
import Image from 'next/image'
import { JSX } from 'react'

const HeroSection = (): JSX.Element => {
  return (
    <header
      dir="rtl"
      className="relative overflow-hidden py-20 text-center md:py-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage}
          alt="Hero Image"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6">
        {/* Title */}
        <h1 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-6xl">
          مرحبًا بك في منصة <span className="text-blue-600">أ+</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
          المكان الأول لبيع وشراء الملخصات الجامعية بكل سهولة
        </p>

        {/* Features List */}
        <div className="mx-auto mb-12 max-w-md text-right">
          <p className="mb-4 font-medium text-white">لماذا تختار منصتنا؟</p>

          <ul className="space-y-3 text-sm text-white/90 md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
              <span>هل عندك ملخصات أو ملفات دراسية مفيدة؟</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
              <span>ترفع ملخصاتك بسهولة وتكسب منها دخل إضافي</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
              <span>تشترى ملخصات زملائك وتذاكر بذكاء</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
              <span>تخزن كل ملفاتك في مكان واحد — آمن وسهل الوصول</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={'/notes'}>
            <Button
              size="lg"
              className="text-primary w-full bg-white shadow-lg hover:bg-gray-100 sm:w-auto dark:bg-gray-800"
            >
              تصفح الملخصات <BookOpen className="mr-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={'/add-note'}>
            <Button
              size="lg"
              variant="default"
              className="w-full border-white bg-blue-600 text-white shadow-lg hover:bg-white/10 sm:w-auto"
            >
              أضف ملخصك الآن <Upload className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
