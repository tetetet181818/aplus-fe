"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import useSales from "@/hooks/useSales";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";

export const description = "Sales statistics overview";

const chartConfig = {
  sales: {
    label: "Sales Performance",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

export default function SalesOverview() {
  const { userStatisticsSales, userStatisticsSalesLoading } = useSales();

  if (userStatisticsSalesLoading) {
    <LoadingSpinner message="" />;
  }
  return (
    <Card className="border-none bg-transparent shadow-none gap-3" dir="rtl">
      <CardHeader className="p-2">
        <CardTitle className="font-semibold text-xl text-right">
          نظرة عامة على مبيعات الملخصات
        </CardTitle>
      </CardHeader>

      <CardContent className="dark:bg-[#00143473] bg-[#FFFFFFBF] rounded-2xl p-4 grid grid-cols-2 gap-4">
        <div className="dark:bg-[#FFFFFF0F] bg-[#06B6D40F] rounded-2xl p-4 flex flex-col items-end">
          <div className="flex items-center gap-2">
            <h4 className="text-2xl font-bold">
              {userStatisticsSales?.salesCount}
            </h4>
            <Image
              src="/sales-incremment.png"
              alt="sales"
              width={22}
              height={22}
              className="text-[#06B6D4]"
            />
          </div>
          <p className="text-sm text-gray-500">إجمالي المبيعات</p>
        </div>

        <div className="dark:bg-[#FFFFFF0F] bg-[#06B6D40F] rounded-2xl p-4 flex flex-col items-end">
          <div className="flex items-center gap-2">
            <h4 className="text-2xl font-bold">
              {userStatisticsSales?.totalAmount.toFixed(2)}
            </h4>
            <Image
              className="text-[#06B6D4]"
              src="/riyal-icon.svg"
              alt="riyal"
              width={22}
              height={22}
            />
          </div>
          <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
        </div>

        <div className="my-5 col-span-2">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={userStatisticsSales?.stateSales}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-sales)" radius={8} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
