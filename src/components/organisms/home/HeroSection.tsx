'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BookOpen, CheckCircle, Upload, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

import HeroImage from '../../../../public/hero-image.jpeg';

const HeroSection = () => {
  return (
    <header
      dir="rtl"
      className="relative overflow-hidden py-20 text-center md:py-40"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage}
          alt="Hero Image"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="scale-110 transition-transform duration-[20000ms] ease-in-out hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      </div>

      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute top-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000"></div>
      </div>

      <div className="relative z-10 px-4 md:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          <Sparkles className="h-4 w-4 animate-pulse text-blue-400" />
          <span>منصة تعليمية رائدة</span>
        </div>

        <h1 className="mb-6 animate-fade-in text-4xl leading-tight font-extrabold text-white md:text-7xl lg:text-8xl">
          <span className="block animate-slide-up">مرحبًا بك في منصة</span>
          <span className="block animate-slide-up delay-200">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
              أ+
            </span>
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl animate-fade-in delay-300 text-lg leading-relaxed text-gray-200 md:text-xl lg:text-2xl">
          المكان الأول لبيع وشراء الملخصات الجامعية بكل سهولة
        </p>

        <div className="mx-auto mb-12 max-w-lg animate-fade-in delay-500 text-right">
          <p className="mb-6 text-lg font-semibold text-white">لماذا تختار منصتنا؟</p>

          <ul className="space-y-4 text-base text-white/95 md:text-lg">
            {[
              'هل عندك ملخصات أو ملفات دراسية مفيدة؟',
              'ترفع ملخصاتك بسهولة وتكسب منها دخل إضافي',
              'تشترى ملخصات زملائك وتذاكر بذكاء',
              'تخزن كل ملفاتك في مكان واحد — آمن وسهل الوصول',
            ].map((text, index) => (
              <li
                key={index}
                className="group flex items-start gap-3 rounded-lg bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <CheckCircle className="text-primary h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="flex-1 text-right">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex animate-fade-in delay-700 flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={'/notes'}>
            <Button
              size="lg"
              className="group relative w-full overflow-hidden bg-white px-8 py-6 text-base font-semibold text-blue-600 shadow-2xl transition-all hover:scale-105 hover:bg-gray-50 hover:shadow-blue-500/50 sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="h-5 w-5 transition-transform group-hover:rotate-12" />
                تصفح الملخصات
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Button>
          </Link>
          <Link href={'/add-note'}>
            <Button
              size="lg"
              variant="default"
              className="group relative w-full overflow-hidden border-2 border-white/30 bg-blue-600 px-8 py-6 text-base font-semibold text-white shadow-2xl backdrop-blur-sm transition-all hover:scale-105 hover:border-white hover:bg-blue-700 hover:shadow-blue-500/50 sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Upload className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                أضف ملخصك الآن
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
