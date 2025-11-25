import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'

interface UnpublishDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export default function UnpublishDialog({
  open,
  onClose,
  onConfirm,
  loading,
}: UnpublishDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>الغاء نشر الملاحظة</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من الغاء نشر هذه الملاحظة؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">إلغاء</Button>
          <Button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="size-5" />
                <span>جاري الغاء نشر...</span>
              </>
            ) : (
              'الغاء نشر'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
