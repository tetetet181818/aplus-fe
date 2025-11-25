'use client'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Palette } from 'lucide-react'
import { faqData } from '@/constants/index'

const FAQPage = () => {
  return (
    <>
      <Head>
        <title>الأسئلة الشائعة | منصة أ+</title>
        <meta
          name="description"
          content="إجابات على الأسئلة الشائعة حول استخدام منصة أ+ للدراسة الجامعية وتبادل الملخصات"
        />
        <meta
          name="keywords"
          content="أسئلة شائعة, منصة أ+, دراسة جامعية, ملخصات, دعم فني"
        />
      </Head>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <motion.h1
              className="from-primary to-accent dark:from-primary-light dark:to-accent-light mb-4 bg-gradient-to-r bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              الأسئلة الشائعة
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              نجيب هنا على أكثر الأسئلة شيوعًا حول منصة أ+
            </motion.p>
          </div>

          <div className="space-y-10">
            {faqData?.map((categoryItem, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="mb-4 flex items-center">
                  <categoryItem.icon className="text-primary dark:text-primary-light mr-3 h-6 w-6" />
                  <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-white">
                    {categoryItem.category}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {categoryItem.questions.map((faq, qIndex) => (
                    <AccordionItem
                      value={`item-${index}-${qIndex}`}
                      key={qIndex}
                      className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
                    >
                      <AccordionTrigger className="px-4 py-3 text-start hover:bg-gray-50 dark:hover:bg-gray-700">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ))}
          </div>

          <motion.div
            className="mt-16 rounded-xl bg-white p-6 text-center shadow-md dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="mb-4 flex justify-center">
              <Palette className="text-accent dark:text-accent-light h-10 w-10" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              لم تجد إجابتك؟
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              فريق الدعم لدينا جاهز لمساعدتك
            </p>
            <Link
              href="/contact-us"
              className="bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary inline-block rounded-md px-6 py-2 text-white transition-colors dark:text-gray-900"
            >
              اتصل بنا الآن
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </>
  )
}

export default FAQPage
