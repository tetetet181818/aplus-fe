'use client';

import Image from 'next/image';

import { BarChart3, ChevronDown } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// 1. تعريف أنواع البيانات
interface SoldNoteDetail {
  id: string;
  title: string;
  previewImage?: string;
  price: number;
  salesCount: number;
  totalFromNote: number;
}

interface SalesSummaryCardProps {
  availableBalance: number;
  platformFee: number;
  netEarnings: number;
  soldNotesDetails: SoldNoteDetail[];
}

// 2. بيانات ثابتة للتجربة
const staticSoldNotes: SoldNoteDetail[] = [
  {
    id: '1',
    title: 'ملخص الرياضيات',
    previewImage:
      'https://images.unsplash.com/photo-1509223197845-458d87318791?w=400&q=80',
    price: 25,
    salesCount: 12,
    totalFromNote: 300,
  },
  {
    id: '2',
    title: 'ملخص الفيزياء',
    previewImage:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    price: 30,
    salesCount: 8,
    totalFromNote: 240,
  },
  {
    id: '3',
    title: 'ملخص الأدب العربي',
    previewImage:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
    price: 20,
    salesCount: 15,
    totalFromNote: 300,
  },
];

// 3. الكومبوننت الرئيسي
export default function SalesSummaryCard({
  availableBalance = 840,
  platformFee = 120,
  netEarnings = 720,
  soldNotesDetails = staticSoldNotes,
}: Partial<SalesSummaryCardProps>) {
  return (
    <Card className="border-gray-200 shadow-lg dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
          <BarChart3 className="text-primary h-6 w-6" />
          ملخص المبيعات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">
            إجمالي المبيعات (قبل الرسوم):
          </p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {availableBalance.toFixed(2)} ريال
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">رسوم المنصة:</p>
          <p className="text-lg font-bold text-red-500 dark:text-red-400">
            {platformFee.toFixed(2)} ريال
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
          <p className="font-semibold text-gray-700 dark:text-gray-200">
            صافي الأرباح:
          </p>
          <p className="text-primary dark:text-primary-light text-xl font-bold">
            {netEarnings.toFixed(2)} ريال
          </p>
        </div>

        {soldNotesDetails.length > 0 && (
          <SalesDetailsAccordion soldNotesDetails={soldNotesDetails} />
        )}
      </CardContent>
    </Card>
  );
}

// 4. الأكوردين لعرض تفاصيل المبيعات
const SalesDetailsAccordion = ({
  soldNotesDetails,
}: {
  soldNotesDetails: SoldNoteDetail[];
}) => (
  <Accordion type="single" collapsible className="w-full pt-3">
    <AccordionItem value="sales-details">
      <AccordionTrigger className="text-primary text-sm font-medium hover:no-underline">
        <div className="flex items-center gap-1">
          تفاصيل مبيعات الملخصات
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4">
        <ScrollArea className="h-[300px] pr-3">
          <div className="space-y-4">
            {soldNotesDetails.map(note => (
              <NoteSaleItem key={note.id} note={note} />
            ))}
          </div>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

// 5. عنصر المبيعات لكل ملخص
const NoteSaleItem = ({ note }: { note: SoldNoteDetail }) => (
  <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-shadow hover:shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
    <Image
      loading="lazy"
      alt={note.title}
      src={note.previewImage || '/default-note-image.jpg'}
      className="h-16 w-16 rounded-md object-cover"
      width={64}
      height={64}
      onError={(e: any) => {
        e.currentTarget.src = '/default-note-image.jpg';
      }}
    />
    <div className="flex-grow">
      <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
        {note.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        السعر: {note.price.toFixed(2)} ريال | المبيعات: {note.salesCount}
      </p>
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
        {note.totalFromNote.toFixed(2)} ريال
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        إجمالي من هذا الملخص
      </p>
    </div>
  </div>
);
