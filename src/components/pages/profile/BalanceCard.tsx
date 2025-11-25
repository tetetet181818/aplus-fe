import { DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

interface BalanceCardProps {
  netEarnings: number
  platformFeePercentage: number
}

export default function BalanceCard({
  netEarnings,
  platformFeePercentage,
}: BalanceCardProps) {
  return (
    <Card className="overflow-hidden border-transparent bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <DollarSign className="h-7 w-7" />
          الرصيد المتاح للسحب
        </CardTitle>
        <CardDescription className="text-green-100">
          هذا هو المبلغ الذي يمكنك سحبه حاليًا بعد خصم الرسوم.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-5xl font-extrabold tracking-tight">
          {netEarnings.toFixed(2)}{' '}
          <span className="text-2xl font-normal">ريال</span>
        </p>
        <p className="mt-1 text-sm text-green-200">
          يتم احتساب الرصيد بعد خصم رسوم المنصة ({platformFeePercentage * 100}
          %).
        </p>
      </CardContent>
    </Card>
  )
}
