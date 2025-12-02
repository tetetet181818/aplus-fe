import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 | الصفحة غير موجودة',
  description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
};

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4"
      dir="rtl"
    >
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6">
          <span className="bg-gradient-to-r from-[#3b82f6] to-[#3b82f6] bg-clip-text text-9xl font-bold text-transparent">
            404
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          عذرًا! الصفحة غير موجودة
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لا تقلق، دعنا نعيدك إلى
          الصفحة الرئيسية.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#3b82f6] px-6 py-3 font-medium text-[#f8fafc] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          العودة للصفحة الرئيسية
        </Link>

        <div className="mt-12 flex justify-center space-x-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="h-3 w-3 animate-bounce rounded-full bg-blue-200"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
