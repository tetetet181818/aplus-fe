import React from 'react';

import { Banknote, BarChart3, NotebookText, Star, Users } from 'lucide-react';

import StatictisCard from '../atoms/StatictisCard';
import { StatisticsCardsSkeleton } from '../skeletons/StatictisCardsSkeleton';

/**
 * Renders a grid of statistic cards with Arabic titles and icons.
 * Supports RTL (right-to-left) layout automatically.
 */
type StatictisCardsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStatisticsSales: any;
  loading: boolean;
};
export default function StatictisCards({
  userStatisticsSales,
  loading,
}: StatictisCardsProps) {
  if (loading) {
    return <StatisticsCardsSkeleton />;
  }
  const statictisCardsData = [
    {
      icon: NotebookText,
      number: userStatisticsSales?.noteCount,
      title: 'إجمالي الملخصات',
    },
    {
      icon: Banknote,
      number: userStatisticsSales?.totalAmount.toFixed(2),
      title: ' إجمالي الأرباح',
    },
    {
      icon: BarChart3,
      number: userStatisticsSales?.salesCount,
      title: 'إجمالي المبيعات',
    },
    {
      icon: Users,
      number: userStatisticsSales?.noteCount,
      title: 'عدد الملخصات المعروضة',
    },
    {
      icon: Star,
      number: userStatisticsSales?.globalRating.toFixed(2),
      title: 'التقييم العام',
    },
  ];

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
    >
      {statictisCardsData.map((item, index) => (
        <StatictisCard
          key={index}
          icon={item.icon}
          number={item.number}
          title={item.title}
        />
      ))}
    </div>
  );
}
