'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import formatArabicDate from '@/utils/formateTime';

export const description = 'A simple area chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-primary)',
  },
} satisfies ChartConfig;

interface SalesState {
  totalSales: number;
  totalRevenue: number;
  averageSaleAmount: number;
  pendingSales: number;
  completedSales: number;
}

export function DetailsNoteSales({ salesState }: { salesState?: SalesState }) {
  if (!salesState) {
    return null;
  }

  const chartData = [{ date: new Date(), count: salesState.totalSales }];

  return (
    <Card className="col-span-2 m-0 mt-10 w-full border-none bg-gray-800 p-0 py-10 shadow-none">
      <CardHeader>
        <CardTitle>احصائيات مبيعات الملخص</CardTitle>
        <CardDescription>
          إجمالي المبيعات: {salesState.totalSales} | الإيرادات:{' '}
          {salesState.totalRevenue}
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0 w-full border-none p-0 shadow-none">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => formatArabicDate(value, { time: false })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
