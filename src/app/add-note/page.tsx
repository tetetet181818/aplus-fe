import AddNotePage from '@/components/organisms/notes/AddNotePage'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'أضف ملخص جديد',
  description:
    'أنشئ أو أضف ملخصًا جديدًا بسهولة واحتفظ بملاحظاتك ومنشوراتك في مكان واحد',
  keywords: [
    'إضافة ملخص',
    'إنشاء ملخص',
    'ملخص جديد',
    'ملاحظات',
    'ملف ملخص',
    'كتابة ملخص',
    'حفظ ملخص',
    'ملخصات دراسية',
    'تلخيص نصوص',
    'نظام الملاحظات',
    'إدارة الملاحظات',
    'ملخصات سريعة',
    'ملخص جاهز',
    'منصة تلخيص',
  ],
}

export default function AddNote() {
  return <AddNotePage />
}
