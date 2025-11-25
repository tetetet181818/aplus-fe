import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  HelpCircle,
  ShoppingCart,
  User,
  BookOpen,
  Shield,
  Server,
  Palette,
} from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة – منصة أ+',
  description:
    'تعرف على إجابات أهم الأسئلة حول منصة أ+، مثل كيفية شراء وبيع الملخصات، طرق الدفع، حماية البيانات، ودعم المستخدمين. كل ما تحتاج معرفته في مكان واحد.',
  keywords: [
    'الأسئلة الشائعة',
    'منصة أ+',
    'شراء الملخصات',
    'بيع الملخصات',
    'الطلاب',
    'طرق الدفع',
    'الدعم الفني',
    'الخصوصية',
    'الأمان',
    'التعليم الجامعي',
    'ملخصات دراسية',
  ],
  authors: [{ name: 'منصة أ+' }],
  alternates: {
    canonical: 'https://aplusplatformsa.com/faq',
  },
  openGraph: {
    title: 'الأسئلة الشائعة – منصة أ+',
    description:
      'نجيب على أكثر الأسئلة شيوعًا حول استخدام منصة أ+، البيع والشراء، الخصوصية، والدعم الفني.',
    url: 'https://aplusplatformsa.com/faq',
    siteName: 'منصة أ+',
    locale: 'ar_SA',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الأسئلة الشائعة – منصة أ+',
    description:
      'اطلع على إجابات أهم الأسئلة حول منصة أ+ وكيفية الاستفادة القصوى من خدماتها التعليمية.',
  },
}

const faqData = [
  {
    category: 'عام',
    icon: <HelpCircle className="text-primary mr-2 h-5 w-5" />,
    questions: [
      {
        question: 'ما هي فكرة منصة أ+؟',
        answer:
          'منصة أ+ تتيح للطلاب رفع ملخصاتهم الدراسية وبيعها لزملائهم، كما يمكنهم شراء ملخصات جاهزة من طلاب آخرين لتسهيل المذاكرة وتوفير الوقت.',
      },
      {
        question: 'هل منصة أ+ معتمدة من جهة رسمية؟',
        answer:
          'لسنا جهة تعليمية رسمية، ولكننا نوفر بيئة آمنة لتبادل المحتوى الدراسي بين الطلاب بشكل قانوني.',
      },
    ],
  },
  {
    category: 'للطلاب المشترين',
    icon: <ShoppingCart className="text-primary mr-2 h-5 w-5" />,
    questions: [
      {
        question: 'كيف أشتري ملخص؟',
        answer:
          'قم بتسجيل الدخول، ابحث عن الملخص الذي تحتاجه، اضغط على "شراء"، واختر وسيلة الدفع المناسبة.',
      },
      {
        question: 'ماذا لو كان الملخص سيئ الجودة أو غير مفيد؟',
        answer:
          'يمكنك تقييم المحتوى وكتابة ملاحظتك، وفي حال وجود مشكلة كبيرة أو تضليل، يمكنك تقديم بلاغ وسيتم النظر فيه سريعًا.',
      },
      {
        question: 'هل المحتوى يكون بصيغة قابلة للتعديل؟',
        answer:
          'جميع الملخصات تُرفع بصيغة PDF لحفظ حقوق البائع، ولا يمكن تعديلها.',
      },
    ],
  },
  {
    category: 'للطلاب البائعين',
    icon: <User className="text-primary mr-2 h-5 w-5" />,
    questions: [
      {
        question: 'كيف يمكنني بيع ملخصاتي؟',
        answer:
          'سجّل الدخول، اختر "رفع ملخص"، واملأ البيانات المطلوبة مثل اسم المادة، الجامعة، السعر، وصف الملخص، ثم ارفع الملف بصيغة PDF.',
      },
      {
        question: 'كم أربح من كل عملية بيع؟',
        answer:
          'تأخذ منصة أ+ نسبة عمولة ثابتة (مثلاً 15%) من كل عملية، ويتم تحويل الأرباح المتبقية إلى محفظتك داخل الحساب.',
      },
      {
        question: 'متى يتم تحويل أرباحي؟',
        answer:
          'تُحوّل الأرباح مباشرة بعد عملية الشراء ويمكنك سحبها متى ما تجاوزت الحد الأدنى للسحب.',
      },
      {
        question: 'هل أستطيع بيع نفس الملخص لأكثر من طالب؟',
        answer:
          'نعم، يمكنك بيع نفس الملخص لعدد غير محدود من الطلاب طالما هو من إعدادك الشخصي وليس منسوخًا.',
      },
    ],
  },
  {
    category: 'المحتوى والجودة',
    icon: <BookOpen className="text-primary mr-2 h-5 w-5" />,
    questions: [
      {
        question: 'هل هناك حد أدنى أو أقصى لعدد الصفحات؟',
        answer:
          'نعم، الحد الأدنى هو صفحة واحدة والحد الأقصى 300 صفحة للملخص الواحد.',
      },
      {
        question: 'هل أستطيع الإبلاغ عن ملخص مسروق أو غير أخلاقي؟',
        answer:
          'بالتأكيد. يمكن لأي مستخدم الإبلاغ عن محتوى مخالف أو منسوخ، وسيتم التحقق منه واتخاذ الإجراء المناسب.',
      },
    ],
  },
  {
    category: 'التقنية والدعم',
    icon: <Server className="text-primary mr-2 h-5 w-5" />,
    questions: [
      {
        question: 'ما هي وسائل الدفع المتاحة؟',
        answer: 'ندعم وسائل الدفع التالية: مدى، فيزا/ماستر كارد.',
      },
      {
        question: 'ماذا أفعل إذا واجهت مشكلة تقنية؟',
        answer: 'تواصل معنا عبر صفحة اتصل بنا وسنقوم بمساعدتك.',
      },
    ],
  },
  {
    category: 'الخصوصية والأمان',
    icon: <Shield className="text-primary mr-2 h-5 w-5" />,
    questions: [
      {
        question: 'هل بياناتي الشخصية محمية؟',
        answer:
          'نعم، نلتزم بسياسات خصوصية صارمة، ولا نشارك بياناتك مع أي جهة خارجية.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-4 py-12 md:px-6 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mb-12 text-center">
        <h1 className="text-primary mb-4 text-4xl font-bold md:text-5xl">
          الأسئلة الشائعة
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          الأسئلة الشائعة
        </p>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          نجيب هنا على أكثر الأسئلة شيوعًا حول منصة أ+. إذا لم تجد إجابتك، لا
          تتردد في الاتصال بنا.
        </p>
      </div>

      {faqData.map((categoryItem, index) => (
        <div key={index} className="mb-10">
          <div className="mb-6 flex items-center">
            {React.cloneElement(categoryItem.icon, {
              className: 'h-8 w-8 mr-3 text-primary dark:text-primary-light',
            })}
            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
              {categoryItem.category}
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
          >
            {categoryItem.questions.map((faq, qIndex) => (
              <AccordionItem
                value={`item-${index}-${qIndex}`}
                key={qIndex}
                className="border-b-0 last:border-b-0"
              >
                <AccordionTrigger className="rounded-md px-4 text-base hover:bg-gray-50 md:text-lg dark:hover:bg-gray-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm leading-relaxed md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
      <div className="mt-16 rounded-lg bg-white p-8 text-center shadow-xl dark:bg-gray-800">
        <Palette className="text-accent dark:text-accent-light mx-auto mb-4 h-12 w-12" />
        <h3 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
          لم تجد إجابتك؟
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          فريق الدعم لدينا جاهز لمساعدتك. تواصل معنا عبر صفحة &quot;اتصل
          بنا&quot; وسنكون سعداء بالرد على استفساراتك.
        </p>
        <Link
          href="/contact-us"
          className="bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary inline-flex transform items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm transition-transform hover:scale-105 dark:text-gray-900"
        >
          اتصل بنا الآن
        </Link>
      </div>
    </div>
  )
}
