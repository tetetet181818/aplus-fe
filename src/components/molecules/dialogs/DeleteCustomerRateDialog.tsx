import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CustomerRatingTypes } from '@/types'

export default function DeleteCustomerRateDialog({
  open,
  onClose,
  item,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  item: CustomerRatingTypes | null
  onConfirm: (noteId: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حذف تقييم</DialogTitle>
          <DialogDescription>
            هل انت متأكد من حذف هذا التقييم؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            إلغاء
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              onConfirm(item?._id || '')
              onClose()
            }}
          >
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
