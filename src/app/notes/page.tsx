import NotesListPage from '@/components/pages/notes/NotesListPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الملخصات | منصة أ+',
  description:
    'أنشئ واحتفظ بملخصاتك الدراسية في مكان واحد، واطلب ملخصات جاهزة بسرعة وسهولة.',
  keywords: [
    'الملخصات الدراسية',
    'ملخصات طلابية',
    'ملخصات المواد',
    'تلخيص الدروس',
    'تلخيص المحاضرات',
    'ملخصات جاهزة',
    'ملخص دراسي',
    'منصة ملخصات',
    'ملخصات جامعية',
    'ملخصات الثانوية',
    'موقع ملخصات',
    'إدارة الملخصات الدراسية',
    'إنشاء ملخص دراسي',
  ],
}

export default function Notes() {
  return <NotesListPage />
}
