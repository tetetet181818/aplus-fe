import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
export default function SuccessUploadNoteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-4xl" showCloseButton={false}>
        <div className="flex items-center justify-center flex-col">
          <video src="/success-animation.mp4" autoPlay muted />
          <DialogTitle>تم رفع الملف بنجاح</DialogTitle>
          <DialogDescription>
            شكراً لك على رفع الملف 🌟 نتمنى لك كل التوفيق والنجاح!
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
