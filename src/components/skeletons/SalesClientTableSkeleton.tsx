import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function SalesClientTableSkeleton() {
  return (
    <Card
      className="border-none bg-transparent shadow-none gap-3 col-span-2"
      dir="rtl"
    >
      <CardHeader className="p-2">
        <CardTitle className="font-semibold text-xl text-right">
          <Skeleton className="h-6 w-48 ml-auto" />
        </CardTitle>
      </CardHeader>

      <CardContent className="dark:bg-[#00143473] bg-[#FFFFFFBF] rounded-2xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-24 ml-auto" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-24 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-32 ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-20 ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-12 ml-auto" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
