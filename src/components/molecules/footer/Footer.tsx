'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Award } from 'lucide-react';

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
    <footer className="border-t bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="px-10 py-5 pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo + About */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Award className="text-primary h-7 w-7" aria-hidden="true" />
              <span className="text-foreground text-xl font-bold">منصة أ+</span>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              منصة لبيع وشراء الملخصات الجامعية بين الطلاب — وفر وقتك، تعلم من
              خبرات زملائك، وشارك معرفتك بسهولة.
            </p>
            <div className="rounded-lg border bg-white p-3 text-center shadow-sm dark:bg-gray-800">
              <Image
                loading="lazy"
                src={sudia_busniess_center}
                alt="السجل التجاري منصة أ+"
                className="h-auto w-full rounded-md"
              />
              <h2 className="text-primary mt-3 text-lg font-semibold">
                السجل التجاري: 7050237267
              </h2>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="text-foreground mb-4 text-lg font-semibold">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.text}
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
        <div className="text-muted-foreground mt-12 border-t pt-6 text-center text-sm">
          <p>© {currentYear} منصة أ+. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
