import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function SalesClientTableSkeleton() {
  return (
    <Card
      className="col-span-2 gap-3 border-none bg-transparent shadow-none"
      dir="rtl"
    >
      <CardHeader className="p-2">
        <CardTitle className="text-right text-xl font-semibold">
          <Skeleton className="ml-auto h-6 w-48" />
        </CardTitle>
      </CardHeader>

      <CardContent className="rounded-2xl bg-[#FFFFFFBF] p-4 dark:bg-[#00143473]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">
                <Skeleton className="ml-auto h-4 w-24" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="ml-auto h-4 w-20" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="ml-auto h-4 w-16" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="ml-auto h-4 w-24" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-4 w-32" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-4 w-16" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-4 w-20" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="w-full space-y-2">
                    <Skeleton className="ml-auto h-4 w-12" />
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
