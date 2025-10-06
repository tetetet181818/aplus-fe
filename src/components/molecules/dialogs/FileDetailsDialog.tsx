import { useCallback, memo } from "react";
import formatArabicDate from "@/utils/formateTime";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Note } from "@/types";
import { FileDown } from "lucide-react";

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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rtl">
          <div className="space-y-6 py-2">
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-blue-600">
                {item?.title}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              <DetailItem label="الكلية:" value={item?.college || ""} />
              <DetailItem label="الجامعة:" value={item?.university || ""} />
              <DetailItem label="المادة:" value={item?.subject || ""} />
              <DetailItem label="السنة:" value={String(item?.year || "")} />
              <DetailItem
                label="عدد الصفحات:"
                value={String(item?.pagesNumber || "")}
              />
              <DetailItem
                label="السعر:"
                value={item?.price ? `${item.price} ر.س` : "غير محدد"}
              />
              <DetailItem label="التنزيلات:" value={String(item?.downloads)} />
              <DetailItem
                label="تاريخ الإنشاء:"
                value={formatArabicDate(item?.createdAt || "")}
              />
            </div>

            {item?.description && (
              <div className="bg-gray-50 p-4 rounded-lg text-right">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  الوصف:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {item?.contactMethod && (
              <div className="text-right">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  طريقة التواصل:
                </h3>
                <a
                  href={`mailto:${item.contactMethod}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                  aria-label="اتصال على الرقم"
                >
                  {item.contactMethod}
                </a>
              </div>
            )}

            {item?.cover_url && (
              <div className="text-right">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  معاينة:
                </h3>
                <div className="relative w-full max-w-[300px] mx-auto aspect-[3/4]">
                  <Image
                    src={item.cover_url}
                    alt="غلاف الملف"
                    fill
                    className="object-cover rounded-lg shadow-md"
                    sizes="(max-width: 768px) 100vw, 300px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIi8+PC9zdmc+"
                  />
                </div>
              </div>
            )}

            {item?.file_path && (
              <div className="text-right">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  الملف:
                </h3>
                <a
                  href={item.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  aria-label="عرض ملف PDF"
                >
                  <span>عرض PDF</span>
                  <FileDown className="size-4" />
                </a>
              </div>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
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
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <span className="font-semibold text-gray-700">{label} </span>
        <span className="text-gray-900">{value}</span>
      </div>
    );
  }
);

FileDetailsDialog.displayName = "FileDetailsDialog";
DetailItem.displayName = "DetailItem";

export default FileDetailsDialog;
