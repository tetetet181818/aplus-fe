import { Mail, Clock, Info, AlertTriangle, Send } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const ContactUsPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="from-primary to-accent dark:from-primary-light dark:to-accent-light mb-4 bg-gradient-to-r bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            اتصل بنا
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            فريق دعم منصة أ+ جاهز لمساعدتك في أي استفسار أو مشكلة تواجهك
          </p>
        </header>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
            <div className="mb-4 flex items-start gap-4">
              <Mail className="text-primary dark:text-primary-light mt-1 h-6 w-6" />
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  البريد الإلكتروني
                </h2>
                <a
                  href="mailto:aplusplatformsa@gmail.com"
                  className="break-all hover:underline"
                >
                  aplusplatformsa@gmail.com
                </a>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              يرجى إرسال رسالتك مع توضيح نوع المشكلة أو الاستفسار
            </p>
            <a
              href="mailto:aplusplatformsa@gmail.com"
              className="bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-white transition-colors dark:text-gray-900"
            >
              <Send className="ml-2 h-5 w-5" />
              إرسال بريد إلكتروني
            </a>
            <div className="my-10 mb-4 flex items-start gap-4">
              <Image
                src="/logos_whatsapp-icon.svg"
                alt="whatsapp-icon"
                width={30}
                height={30}
                className="mt-1"
              />
              <div className="">
                <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  واتساب
                </h2>
              </div>
            </div>
            <Button asChild className="w-full text-sm font-medium">
              <a
                href="https://wa.me/966511021507"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all"
              >
                تواصل معنا على واتساب
              </a>
            </Button>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
            <div className="mb-4 flex items-start gap-4">
              <Clock className="text-primary dark:text-primary-light mt-1 h-6 w-6" />
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  أوقات الرد
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  الأحد - الخميس
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  10 ص - 6 م (توقيت السعودية)
                </p>
              </div>
            </div>
            <p className="flex items-center text-gray-600 dark:text-gray-400">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              نحن نسعى للرد خلال 24 ساعة، وقد يستغرق الرد في بعض الحالات حتى 48
              ساعة كحد أقصى.
            </p>
          </section>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-4">
            <Info className="text-primary dark:text-primary-light h-6 w-6" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              ملاحظات هامة
            </h2>
          </div>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-700 dark:text-gray-300">
            <li>تأكد من كتابة عنوان واضح للرسالة</li>
            <li>لا يوجد دعم عبر وسائل التواصل الاجتماعي حالياً</li>
            <li>جميع الرسائل يتم التعامل معها بسرية</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

export default ContactUsPage
