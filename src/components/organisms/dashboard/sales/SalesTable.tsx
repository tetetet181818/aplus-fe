"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SalesRow from "./SalesRow";
import { Sale } from "@/types";
export default function SalesTable({
  sales,
  handleSort,
  renderSortIcon,
  onShowDetails,
}: {
  sales: Sale[];
  handleSort: (key: string) => void;
  renderSortIcon: (key: string) => string;
  onShowDetails: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right" onClick={() => handleSort("id")}>
            رقم البيع {renderSortIcon("id")}
          </TableHead>
          <TableHead
            className="text-right"
            onClick={() => handleSort("note_title")}
          >
            الدورة {renderSortIcon("note_title")}
          </TableHead>
          <TableHead className="text-right">رقم العملية</TableHead>
          <TableHead
            className="text-right"
            onClick={() => handleSort("amount")}
          >
            المبلغ {renderSortIcon("amount")}
          </TableHead>
          <TableHead
            className="text-right"
            onClick={() => handleSort("created_at")}
          >
            التاريخ {renderSortIcon("created_at")}
          </TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale: Sale) => (
          <SalesRow key={sale._id} sale={sale} onShowDetails={onShowDetails} />
        ))}
      </TableBody>
    </Table>
  );
}
