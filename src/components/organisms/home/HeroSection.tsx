import { Button } from "@/components/ui/button";
import { Upload, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import HeroImage from "../../../../public/hero-image.jpeg";
import Image from "next/image";
import { JSX } from "react";

const HeroSection = (): JSX.Element => {
  return (
    <header
      dir="rtl"
      className="relative py-20 md:py-32 text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage}
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          مرحبًا بك في منصة <span className="text-primary">أ+</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          المكان الأول لبيع وشراء الملخصات الجامعية بكل سهولة
        </p>

        {/* Features List */}
        <div className="max-w-md mx-auto text-right mb-12">
          <p className="text-white mb-4 font-medium">لماذا تختار منصتنا؟</p>

          <ul className="space-y-3 text-white/90 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span>هل عندك ملخصات أو ملفات دراسية مفيدة؟</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span>ترفع ملخصاتك بسهولة وتكسب منها دخل إضافي</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span>تشترى ملخصات زملائك وتذاكر بذكاء</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span>تخزن كل ملفاتك في مكان واحد — آمن وسهل الوصول</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href={"/notes"}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 shadow-lg w-full sm:w-auto"
            >
              تصفح الملخصات <BookOpen className="mr-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={"/add-note"}>
            <Button
              size="lg"
              variant="default"
              className="text-white border-white hover:bg-white/10 shadow-lg w-full sm:w-auto"
            >
              أضف ملخصك الآن <Upload className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
