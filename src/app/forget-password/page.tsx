import ForgetPassword from "@/components/pages/ForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "استعادة كلمة المرور | نسيت كلمة المرور لحسابك بسهولة",
  description:
    "هل نسيت كلمة المرور؟ لا تقلق! يمكنك استعادة الوصول إلى حسابك بسهولة وأمان من خلال خطوات بسيطة لإعادة تعيين كلمة المرور. استرجع حسابك الآن في ثوانٍ.",
  keywords: [
    "نسيت كلمة المرور",
    "استعادة كلمة المرور",
    "إعادة تعيين كلمة المرور",
    "تغيير كلمة السر",
    "الدخول إلى الحساب",
    "استرجاع حسابي",
    "مشاكل تسجيل الدخول",
    "نسيت كلمة السر",
  ],
  openGraph: {
    title: "استعادة كلمة المرور | نسيت كلمة المرور لحسابك بسهولة",
    description:
      "استعد الوصول إلى حسابك بسرعة وأمان في حال نسيت كلمة المرور. فقط أدخل بريدك الإلكتروني أو رقم هاتفك لإعادة تعيين كلمة السر بخطوات بسيطة.",
    type: "website",
    locale: "ar",
    url: "https://aplusplatformsa.com/forget-password",
  },
};

export default function page() {
  return <ForgetPassword />;
}
