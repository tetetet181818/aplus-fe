import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  itemName?: string;
  loading?: boolean;
}

const DeleteConfirmationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  itemName,
  loading,
}: DeleteConfirmationDialogProps) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
    window.location.href = "/";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
            تأكيد الحذف
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            هل أنت متأكد من رغبتك في حذف {itemName || "هذا العنصر"}؟ لا يمكن
            التراجع عن هذا الإجراء.
            {itemName && itemName.toLowerCase().includes("حسابك") && (
              <span className="block mt-2 text-destructive font-semibold">
                سيتم حذف جميع بياناتك وملخصاتك بشكل دائم.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center my-6 text-destructive">
          <AlertTriangle className="h-16 w-16" />
        </div>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            إلغاء
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            تأكيد الحذف
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteConfirmationDialog;
