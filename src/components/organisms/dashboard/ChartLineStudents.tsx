"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

const chartConfig = {
  users: {
    label: "المستخدمين",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function ChartLineStudents({
  total,
  data,
}: {
  total: number;
  data: {
    date: string;
    users: number;
  }[];
}) {
  const [activeChart] = React.useState<keyof typeof chartConfig>("users");

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>إحصائيات المستخدمين</CardTitle>
          <CardDescription>
            عرض عدد المستخدمين المسجلين خلال الأسبوع الماضي
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active
            className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-center sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-muted-foreground text-xs">
              {chartConfig[activeChart].label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total?.toLocaleString()} مستخدم
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("ar-EG", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="users"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("ar-EG", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey="users"
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
