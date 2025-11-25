'use client'
import { motion } from 'framer-motion'
import {
  Shield,
  FileText,
  User,
  Database,
  Share2,
  CheckCircle,
  Cookie,
  RefreshCcw,
} from 'lucide-react'
import Head from 'next/head'
import React from 'react'

const PrivacyPolicyPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const ListItem = ({
    icon,
    title,
    children,
  }: {
    icon?: React.ReactElement<{ className?: string }>
    title: string
    children: React.ReactNode
  }) => (
    <motion.div variants={sectionVariants} className="mb-8">
      <div className="flex items-start gap-4">
        <div className="text-primary dark:text-primary-light mt-1 flex-shrink-0">
          {icon && React.cloneElement(icon, { className: 'h-6 w-6' })}
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <div className="space-y-3 leading-relaxed text-gray-600 dark:text-gray-400">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <>
      <Head>
        <title>سياسة الخصوصية | منصة أ+</title>
        <meta
          name="description"
          content="سياسة الخصوصية لمنصة أ+ للدراسة الجامعية"
        />
        <meta
          name="keywords"
          content="خصوصية, بيانات, حماية, منصة أ+, دراسة جامعية"
        />
        <meta property="og:title" content="سياسة الخصوصية | منصة أ+" />
        <meta
          property="og:description"
          content="سياسة الخصوصية لمنصة أ+ للدراسة الجامعية"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-12 text-center">
            <motion.div
              variants={sectionVariants}
              className="bg-primary/10 dark:bg-primary-light/10 mb-4 inline-block rounded-full p-4"
            >
              <Shield className="text-primary dark:text-primary-light h-12 w-12" />
            </motion.div>
            <motion.h1
              variants={sectionVariants}
              className="text-primary mb-4 text-4xl font-bold md:text-5xl"
            >
              سياسة الخصوصية – منصة أ+
            </motion.h1>
            <motion.p
              variants={sectionVariants}
              className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400"
            >
              في منصة أ+، نولي خصوصيتك أهمية قصوى ونسعى لحماية جميع بياناتك
              الشخصية التي تزودنا بها أثناء استخدامك للمنصة.
            </motion.p>
          </header>

          <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8 md:p-10 dark:bg-gray-800">
            <ListItem icon={<User />} title="١. المعلومات التي نجمعها">
              <p>عند استخدام المنصة، قد نقوم بجمع المعلومات التالية:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
                <li>
                  معلومات الحساب: الاسم، البريد الإلكتروني، الجامعة، التخصص
                </li>
                <li>بيانات الدفع: تتم معالجتها عبر بوابات دفع آمنة</li>
                <li>الملخصات والمحتوى الذي تقوم برفعه أو شرائه</li>
                <li>بيانات الاستخدام والصفحات التي تزورها</li>
              </ul>
            </ListItem>

            <ListItem icon={<FileText />} title="٢. كيفية استخدام المعلومات">
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>التواصل معك عند الحاجة للدعم أو التحديثات</li>
                <li>تحسين تجربتك على المنصة</li>
                <li>حماية المنصة من الاستخدام غير القانوني</li>
              </ul>
            </ListItem>

            <ListItem icon={<Database />} title="٣. حماية البيانات">
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>تشفير البيانات أثناء النقل</li>
                <li>أنظمة حماية ضد الاختراقات</li>
                <li>تقييد الوصول للبيانات الحساسة</li>
              </ul>
            </ListItem>

            <ListItem icon={<Share2 />} title="٤. مشاركة المعلومات">
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>لا نبيع بياناتك لأطراف ثالثة</li>
                <li>نشارك فقط ما يلزم مع بوابات الدفع</li>
              </ul>
            </ListItem>

            <ListItem icon={<CheckCircle />} title="٥. حقوق المستخدم">
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>الاطلاع على بياناتك وتعديلها أو حذفها</li>
                <li>إغلاق حسابك في أي وقت</li>
              </ul>
              <p className="mt-2">
                للتواصل:{' '}
                <a
                  href="mailto:aplusplatformsa@gmail.com"
                  className="text-primary dark:text-primary-light hover:underline"
                >
                  aplusplatformsa@gmail.com
                </a>
              </p>
            </ListItem>

            <ListItem
              icon={<Cookie />}
              title="٦. ملفات تعريف الارتباط (الكوكيز)"
            >
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>نستخدم الكوكيز لتحسين تجربة المستخدم</li>
                <li>يمكنك إيقافها من إعدادات المتصفح</li>
              </ul>
            </ListItem>

            <ListItem
              icon={<RefreshCcw />}
              title="٧. التعديلات على سياسة الخصوصية"
            >
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>قد نقوم بتحديث هذه السياسة عند الحاجة</li>
                <li>سيتم إشعارك بأي تغييرات جوهرية</li>
              </ul>
            </ListItem>
          </div>
        </div>
      </motion.main>
    </>
  )
}

export default PrivacyPolicyPage
