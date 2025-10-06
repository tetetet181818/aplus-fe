"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { Sale } from "@/types";

interface SalesRowProps {
  sale: Sale;
  onShowDetails: (item: string) => void;
}

export default function SalesRow({ sale, onShowDetails }: SalesRowProps) {
  const formatStatus = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "مكتمل", variant: "default" as const };
      case "pending":
        return { label: "قيد الانتظار", variant: "secondary" as const };
      default:
        return { label: "فشل", variant: "destructive" as const };
    }
  };

  const status = formatStatus(sale.status);

  return (
    <TableRow>
      <TableCell>{sale._id}</TableCell>
      <TableCell>{sale.note_title}</TableCell>
      <TableCell>{sale.invoice_id}</TableCell>
      <TableCell>
        {sale.amount} ر.س
        {sale.platform_fee && (
          <div className="text-xs text-muted-foreground">
            عمولة: {sale.platform_fee} ر.س | طريقة الدفع: {sale.payment_method}
          </div>
        )}
      </TableCell>
      <TableCell>
        {new Date(sale.createdAt || "").toLocaleDateString("ar-EG")}
      </TableCell>
      <TableCell>
        <Badge variant={status.variant}>{status.label}</Badge>
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onShowDetails(sale._id)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="ml-2">
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
