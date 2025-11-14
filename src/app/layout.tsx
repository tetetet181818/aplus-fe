import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "@/utils/Providers";
import Layout from "@/components/templates/Layout";
import { Tajawal } from "next/font/google";

export const metadata: Metadata = {
  title: "سوق الملخصات الجامعية",
  description:
    "منصة لبيع وشراء الملخصات الجامعية بين الطلاب، وفر وقتك واستفد من خبرات زملائك",
  keywords: [
    "ملخصات",
    "جامعة",
    "طلاب",
    "مذاكرة",
    "بيع",
    "شراء",
    "ملخصات جامعية",
  ],
  authors: [{ name: " أ+" }],
  creator: " أ+ Team",
  openGraph: {
    title: "سوق الملخصات الجامعية",
    description: "اشترِ أو بع ملخصاتك الجامعية بسهولة وأمان عبر منصة  أ+",
    url: "https://aplusplatformsa.com",
    siteName: "سوق الملخصات الجامعية",
    locale: "ar_EG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "سوق الملخصات الجامعية",
    description: "منصة تبادل ملخصات دراسية بين طلاب الجامعات.",
    creator: "@your_handle",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700", "800"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        dir="rtl"
        className={`${tajawal.className} overflow-x-hidden w-screen`}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
