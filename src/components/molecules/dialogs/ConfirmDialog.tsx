import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onClose(false)} variant="outline">
            إلغاء
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose(false);
            }}
            variant="destructive"
          >
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
