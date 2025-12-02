import React from 'react';

import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function PublishDialog({
  open,
  onClose,
  onConfirm,
  loading,
}: PublishDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>نشر الملاحظة</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من نشر هذه الملاحظة؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">إلغاء</Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="size-5" />
                <span>جاري النشر...</span>
              </>
            ) : (
              'نشر'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
