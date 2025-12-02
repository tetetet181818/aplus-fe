'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { Sale } from '@/types';
import { Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface SalesRowProps {
  sale: Sale;
  onShowDetails: (item: string) => void;
}

export default function SalesRow({ sale, onShowDetails }: SalesRowProps) {
  const { theme } = useTheme();
  const formatStatus = (status: string) => {
    switch (status) {
      case 'failed':
        return { label: 'فشل', variant: 'destructive' as const };
      case 'paid':
        return { label: 'مدفوع', variant: 'default' as const };
    }
  };

  const status = formatStatus(sale.status);

  return (
    <TableRow>
      <TableCell>{sale._id}</TableCell>
      <TableCell>{sale.note_title}</TableCell>
      <TableCell>{sale.invoice_id}</TableCell>
      <TableCell>
        <p className="flex items-center gap-2">
          {sale.amount}
          <Image
            src={
              theme === 'dark'
                ? '/light-ryial-icon.png'
                : '/dark-ryial-icon.png'
            }
            alt="rial"
            className="size-4"
            height={10}
            width={10}
          />
        </p>
        {sale.commission && (
          <div className="text-muted-foreground text-xs">
            عمولة: {sale.commission || 'N/A'} ر.س | طريقة الدفع:{' '}
            {sale.payment_method || 'N/A'}
          </div>
        )}
      </TableCell>
      <TableCell>
        {new Date(sale.createdAt || '').toLocaleDateString('ar-EG')}
      </TableCell>
      <TableCell>
        <Badge variant={status?.variant}>{status?.label}</Badge>
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onShowDetails(sale._id)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
