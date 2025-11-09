"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import useSales from "@/hooks/useSales";
import { Sale } from "@/types";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

export default function MyStatisticsTab() {
  const { salesUser, salesUserLoading, pagination } = useSales();
  const [timeRange, setTimeRange] = React.useState("90d");

  const {
    currentPage,
    totalPages,
    limit,
    setLimit,
    nextPage,
    prevPage,
    setPage,
  } = pagination;

  const total = salesUser?.length ? pagination.totalPages * limit : 0;

  // ----------- Handlers for empty or error states -----------
  const hasData = salesUser && salesUser.length > 0;

  if (salesUserLoading) return <LoadingSpinner message="" />;
  return (
    <div className="px-10">
      {/* ---------------- Chart Section ---------------- */}
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>مبيعات الملخصات</CardTitle>
            <CardDescription>إحصائيات المبيعات</CardDescription>
          </div>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
              <SelectValue placeholder="آخر 3 أشهر" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                آخر 3 أشهر
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                آخر 30 يوم
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                آخر 7 أيام
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          {salesUserLoading ? (
            <p className="text-center py-4">جاري التحميل...</p>
          ) : hasData ? (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={salesUser}>
                <defs>
                  <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="createdAt"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("ar-EG", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString("ar-EG", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="amount"
                  type="natural"
                  fill="url(#fillSales)"
                  stroke="var(--color-primary)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <p className="text-center py-4 text-gray-500">
              لا توجد مبيعات حالياً
            </p>
          )}
        </CardContent>
      </Card>

      {/* ---------------- Table Section ---------------- */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>تفاصيل المبيعات حسب الملخص</CardTitle>
          <CardDescription>قائمة الملخصات الأكثر مبيعًا</CardDescription>
        </CardHeader>

        <CardContent>
          {hasData ? (
            <>
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>الملخص</TableHead>
                    <TableHead>السعر</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesUser.map((item: Sale) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item.note_title}
                      </TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* ---------------- Pagination ---------------- */}
              {total > 10 && (
                <div className="w-full mt-10 flex items-center justify-between">
                  <Select
                    value={limit.toString()}
                    onValueChange={(val) => setLimit(Number(val))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="عدد العناصر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={prevPage}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === index + 1}
                            onClick={() => setPage(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {totalPages > 3 && <PaginationEllipsis />}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={nextPage}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <p className="text-center py-4 text-gray-500">
              لا توجد مبيعات حالياً
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
