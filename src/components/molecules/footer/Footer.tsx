"use client";

import Link from "next/link";
import { Award } from "lucide-react";
import PaymentMethodsSection from "@/components/atoms/PaymentMethodsSection";
import sudia_busniess_center from "../../../../public/sudia_busniess_center.jpeg";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "روابط سريعة",
      links: [
        { href: "/", text: "الرئيسية" },
        { href: "/FAQPage", text: "الأسئلة الشائعة" },
        { href: "/notes", text: "تصفح الملخصات" },
        { href: "/add-note", text: "إضافة ملخص" },
        { href: "/profile", text: "الملف الشخصي" },
      ],
    },
    {
      title: "المساعدة",
      links: [
        { href: "/faq", text: "الأسئلة الشائعة" },
        { href: "/privacy-policy", text: "سياسة الخصوصية" },
        { href: "/terms-of-service", text: "شروط الاستخدام" },
        { href: "/contact-us", text: "اتصل بنا" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t">
      <div className="py-5 pt-20  px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo + About */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Award className="h-7 w-7 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold text-foreground">منصة أ+</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              منصة لبيع وشراء الملخصات الجامعية بين الطلاب — وفر وقتك، تعلم من
              خبرات زملائك، وشارك معرفتك بسهولة.
            </p>
            <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm p-3 text-center">
              <Image
                loading="lazy"
                src={sudia_busniess_center}
                alt="السجل التجاري منصة أ+"
                className="w-full h-auto rounded-md"
              />
              <h2 className="text-lg font-semibold mt-3 text-primary">
                السجل التجاري: 7050237267
              </h2>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
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
        <div className="border-t mt-12 pt-6 text-center text-muted-foreground text-sm">
          <p>© {currentYear} منصة أ+. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
