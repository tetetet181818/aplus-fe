import { Mail, Clock, Info, AlertTriangle, Send } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا | منصة أ+",
  description:
    "تواصل مع فريق دعم منصة أ+ للدراسة الجامعية عبر البريد الإلكتروني",
  keywords: ["دعم فني", "اتصل بنا", "منصة أ+", "دراسة جامعية", "مساعدة"],
  openGraph: {
    title: "اتصل بنا | منصة أ+",
    description: "تواصل مع فريق دعم منصة أ+ للدراسة الجامعية",
  },
};

const ContactUsPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent-light mb-4">
            اتصل بنا
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            فريق دعم منصة أ+ جاهز لمساعدتك في أي استفسار أو مشكلة تواجهك
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <Mail className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  البريد الإلكتروني
                </h2>
                <a
                  href="mailto:aplusplatformsa@gmail.com"
                  className="hover:underline break-all"
                >
                  aplusplatformsa@gmail.com
                </a>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              يرجى إرسال رسالتك مع توضيح نوع المشكلة أو الاستفسار
            </p>
            <a
              href="mailto:aplusplatformsa@gmail.com"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white dark:text-gray-900 rounded-md transition-colors"
            >
              <Send className="h-5 w-5 ml-2" />
              إرسال بريد إلكتروني
            </a>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <Clock className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
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
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              نحن نسعى للرد خلال 24 ساعة، وقد يستغرق الرد في بعض الحالات حتى 48
              ساعة كحد أقصى.
            </p>
          </section>
        </div>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <Info className="h-6 w-6 text-primary dark:text-primary-light" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              ملاحظات هامة
            </h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
            <li>تأكد من كتابة عنوان واضح للرسالة</li>
            <li>لا يوجد دعم عبر وسائل التواصل الاجتماعي حالياً</li>
            <li>جميع الرسائل يتم التعامل معها بسرية</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default ContactUsPage;
