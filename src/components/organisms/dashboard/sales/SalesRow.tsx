'use client'
import { TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { Sale } from '@/types'

interface SalesRowProps {
  sale: Sale
  onShowDetails: (item: string) => void
}

export default function SalesRow({ sale, onShowDetails }: SalesRowProps) {
  const formatStatus = (status: string) => {
    switch (status) {
      case 'failed':
        return { label: 'فشل', variant: 'destructive' as const }
      case 'paid':
        return { label: 'مدفوع', variant: 'default' as const }
    }
  }

  const status = formatStatus(sale.status)

  return (
    <TableRow>
      <TableCell>{sale._id}</TableCell>
      <TableCell>{sale.note_title}</TableCell>
      <TableCell>{sale.invoice_id}</TableCell>
      <TableCell>
        {sale.amount} ر.س
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
  )
}
