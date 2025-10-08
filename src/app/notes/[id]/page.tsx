import NoteDetailPage from "@/components/pages/notes/NoteDetailPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفاصيل الملخص",
  description:
    "اطلب ملخصاتك الدراسية في مكان واحد، واطلب ملخصات جاهزة بسرعة وسهولة.",
  keywords: [
    "تفاصيل الملخص",
    "ملخصات",
    "تتبع الملخصات",
    "إدارة الملخصات",
    "ملخصات سريعة",
    "ملخص جاهز",
    "منصة تلخيص",
  ],
};

export default async function NoteDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <NoteDetailPage id={id} />;
}
