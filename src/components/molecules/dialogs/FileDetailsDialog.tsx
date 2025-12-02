import { memo, useCallback } from 'react';

import Image from 'next/image';

import { Note } from '@/types';
import { FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { downloadFile } from '@/utils/downloadFile';
import formatArabicDate from '@/utils/formateTime';

interface FileDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  item: Note | null;
}

const FileDetailsDialog = memo(
  ({ open, onClose, item }: FileDetailsDialogProps) => {
    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="rtl max-h-[90vh] max-w-3xl overflow-y-auto">
          <div className="space-y-6 py-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-600 md:text-3xl">
                {item?.title}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 text-right md:grid-cols-2">
              <DetailItem label="الكلية:" value={item?.college || ''} />
              <DetailItem label="الجامعة:" value={item?.university || ''} />
              <DetailItem label="المادة:" value={item?.subject || ''} />
              <DetailItem label="السنة:" value={String(item?.year || '')} />
              <DetailItem
                label="عدد الصفحات:"
                value={String(item?.pagesNumber || '')}
              />
              <DetailItem
                label="السعر:"
                value={item?.price ? `${item.price} ر.س` : 'غير محدد'}
              />
              <DetailItem label="التنزيلات:" value={String(item?.downloads)} />
              <DetailItem
                label="تاريخ الإنشاء:"
                value={formatArabicDate(item?.createdAt || '')}
              />
            </div>

            {item?.description && (
              <div className="rounded-lg bg-gray-50 p-4 text-right">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  الوصف:
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            )}

            {item?.contactMethod && (
              <div className="text-right">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  طريقة التواصل:
                </h3>
                <a
                  href={`mailto:${item.contactMethod}`}
                  className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                  aria-label="اتصال على الرقم"
                >
                  {item.contactMethod}
                </a>
              </div>
            )}

            {item?.cover_url && (
              <div className="text-right">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  معاينة:
                </h3>
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px]">
                  <Image
                    src={item.cover_url}
                    alt="غلاف الملف"
                    fill
                    className="rounded-lg object-cover shadow-md"
                    sizes="(max-width: 768px) 100vw, 300px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIi8+PC9zdmc+"
                  />
                </div>
              </div>
            )}

            {item?.file_path && (
              <div className="text-right">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  الملف:
                </h3>
                <Button
                  onClick={() =>
                    downloadFile({
                      noteName: String(item.title),
                      noteUrl: String(item.file_path),
                    })
                  }
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                  aria-label="عرض ملف PDF"
                >
                  <span>عرض PDF</span>
                  <FileDown className="size-4" />
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-100"
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

const DetailItem = memo(
  ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <span className="font-semibold text-gray-700">{label} </span>
        <span className="text-gray-900">{value}</span>
      </div>
    );
  }
);

FileDetailsDialog.displayName = 'FileDetailsDialog';
DetailItem.displayName = 'DetailItem';

export default FileDetailsDialog;
