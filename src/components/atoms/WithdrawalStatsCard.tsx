import { cn } from '@/lib/utils';

interface WithdrawalStatsCardProps {
  title: string;
  value: number;
  className?: string;
}

export default function WithdrawalStatsCard({
  title,
  value,
  className,
}: WithdrawalStatsCardProps) {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();

    if (
      statusLower.includes('pending') ||
      statusLower.includes('قيد الانتظار') ||
      statusLower.includes('قيد المراجعة')
    ) {
      return {
        text: 'text-amber-700 dark:text-amber-300',
        count: 'text-amber-900 dark:text-amber-100',
        bg: 'bg-amber-500/10',
      };
    } else if (
      statusLower.includes('completed') ||
      statusLower.includes('success') ||
      statusLower.includes('مكتمل') ||
      statusLower.includes('موافق عليه')
    ) {
      return {
        text: 'text-emerald-700 dark:text-emerald-300',
        count: 'text-emerald-900 dark:text-emerald-100',
        bg: 'bg-emerald-500/10',
      };
    } else if (
      statusLower.includes('failed') ||
      statusLower.includes('rejected') ||
      statusLower.includes('فشل')
    ) {
      return {
        text: 'text-rose-700 dark:text-rose-300',
        count: 'text-rose-900 dark:text-rose-100',
        bg: 'bg-rose-500/10',
      };
    } else if (
      statusLower.includes('accepted') ||
      statusLower.includes('ملغى')
    ) {
      return {
        text: 'text-gray-700 dark:text-gray-300',
        count: 'text-gray-900 dark:text-gray-100',
        bg: 'bg-gray-500/10',
      };
    }

    return {
      text: 'text-indigo-700 dark:text-indigo-300',
      count: 'text-indigo-900 dark:text-indigo-100',
      bg: 'bg-indigo-500/10',
    };
  };

  const colors = getStatusColor(title);

  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-3 text-center',
        className
      )}
    >
      <div
        className={cn(
          'rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 group-hover:scale-105',
          colors.text,
          colors.bg
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          'text-3xl font-bold tracking-tight transition-all duration-300 group-hover:scale-110',
          colors.count
        )}
      >
        {value.toLocaleString('ar-EG')}
      </div>
    </div>
  );
}
