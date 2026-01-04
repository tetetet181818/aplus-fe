'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Award, Building2, Mail, Phone } from 'lucide-react';

import PaymentMethodsSection from '@/components/atoms/PaymentMethodsSection';

import sudia_busniess_center from '../../../../public/sudia_busniess_center.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'روابط سريعة',
      links: [
        { href: '/', text: 'الرئيسية' },
        { href: '/faq', text: 'الأسئلة الشائعة' },
        { href: '/notes', text: 'تصفح الملخصات' },
        { href: '/add-note', text: 'إضافة ملخص' },
        { href: '/profile', text: 'الملف الشخصي' },
      ],
    },
    {
      title: 'المساعدة',
      links: [
        { href: '/faq', text: 'الأسئلة الشائعة' },
        { href: '/privacy-policy', text: 'سياسة الخصوصية' },
        { href: '/terms-of-service', text: 'شروط الاستخدام' },
        { href: '/contact-us', text: 'اتصل بنا' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t bg-linear-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-400/5 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo + About */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-2.5 shadow-lg">
                <Award className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="bg-linear-to-r from-blue-700 to-blue-600 bg-clip-text text-2xl font-extrabold text-transparent">
                منصة أ+
              </span>
            </div>
            <p className="max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-300">
              منصة لبيع وشراء الملخصات الجامعية بين الطلاب — وفر وقتك، تعلم من
              خبرات زملائك، وشارك معرفتك بسهولة.
            </p>

            <div className="group relative overflow-hidden rounded-2xl border-2 border-gray-200/50 bg-gradient-to-br from-white to-gray-50/50 p-4 shadow-lg transition-all duration-500 hover:border-blue-300 hover:shadow-xl dark:border-gray-700/50 dark:from-gray-800 dark:to-gray-900/50 dark:hover:border-blue-500">
              <div className="absolute inset-0 bg-linear-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 transition-all duration-500 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-purple-950/10 dark:group-hover:to-pink-950/20"></div>

              <div className="relative z-10">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    السجل التجاري
                  </span>
                </div>
                <Image
                  loading="lazy"
                  src={sudia_busniess_center}
                  alt="السجل التجاري منصة أ+"
                  className="h-auto w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 dark:from-blue-950/30 dark:to-purple-950/30">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    رقم السجل:
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    7050237267
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex items-center gap-2 text-base text-gray-600 transition-all duration-300 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      style={{
                        animationDelay: `${sectionIndex * 100 + linkIndex * 50}ms`,
                      }}
                    >
                      <span className="absolute right-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                      <span className="relative">{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payment Methods */}
          <div className="md:col-span-2 lg:col-span-1">
            <PaymentMethodsSection />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t-2 border-gray-200/50 pt-8 dark:border-gray-800/50">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear}</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                منصة أ+
              </span>
              <span>جميع الحقوق محفوظة.</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>الدعم الفني</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
