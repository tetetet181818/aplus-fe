'use client';
import { FileText, Users } from 'lucide-react';

import RecentSalesCard from '@/components/atoms/RecentSalesCard';
import RecentStudentsCard from '@/components/atoms/RecentStudentsCard';
import StatCard from '@/components/atoms/StatCard';
import RecentSalesCardSkeleton from '@/components/skeletons/RecentSalesCardSkeleton';
import RecentStudentsCardSkeleton from '@/components/skeletons/RecentStudentsCardSkeleton';
import StatCardSkeleton from '@/components/skeletons/StatCardSkeleton';

import useDashboard from '@/hooks/useDashboard';

export default function Dashboard() {
  const { overviews, overviewLoading } = useDashboard();

  return (
    <>
      <div className="from-background via-muted/5 to-primary/5 flex-1 space-y-4 bg-gradient-to-br p-4 md:p-8">
        <div className="animate-fade-in space-y-8">
          <div className="space-y-2">
            <h1 className="from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
              لوحة التحكم
            </h1>
            <p className="text-muted-foreground text-lg">
              نظرة عامة على منصتك التعليمية
            </p>
          </div>
          {overviewLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <StatCard
                title="إجمالي الطلاب"
                value={overviews?.totalUsers}
                icon={Users}
                trend={`+${overviews?.userGrowthRate} من الشهر الماضي`}
                color="blue"
              />
              <StatCard
                title="إجمالي الملفات"
                value={overviews?.totalNotes}
                icon={FileText}
                trend={`+${overviews?.notesGrowthRate} من الشهر الماضي`}
                color="green"
              />
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {overviewLoading ? (
              <RecentStudentsCardSkeleton />
            ) : (
              <RecentStudentsCard students={overviews?.latestUsers || []} />
            )}
            {overviewLoading ? (
              <RecentSalesCardSkeleton />
            ) : (
              <RecentSalesCard sales={overviews?.latestSales || []} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
