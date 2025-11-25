'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { NotebookText } from 'lucide-react'
import useSales from '@/hooks/useSales'
import LoadingSpinner from './LoadingSpinner'

export const description = 'مخطط المكالمات اليومية للذكاء الاصطناعي'

const chartConfig = {
  desktop: {
    label: 'الملخصات المباعه',
    color: 'var(--color-primary)',
  },
  mobile: {
    label: 'الملخصات المعرضه',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export default function DailyAICalls() {
  const { userStatisticsSales, userStatisticsSalesLoading } = useSales()

  if (userStatisticsSalesLoading) {
    return <LoadingSpinner message="" />
  }

  return (
    <Card dir="rtl" className="gap-3 border-none bg-transparent shadow-none">
      <CardHeader className="flex flex-row items-center justify-between p-2">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <NotebookText className="h-5 w-5 text-blue-500" />
          احصائيات الملخصات
        </CardTitle>
      </CardHeader>

      <CardContent className="rounded-2xl bg-[#FFFFFFBF] px-1 dark:bg-[#00143473]">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={userStatisticsSales?.stateNotes}
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
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="sale"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="note"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
