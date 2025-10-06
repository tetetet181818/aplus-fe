"use client";
import Head from "next/head";
import { FileText, Users } from "lucide-react";
import StatCard from "@/components/atoms/StatCard";
import RecentStudentsCard from "@/components/atoms/RecentStudentsCard";
import RecentSalesCard from "@/components/atoms/RecentSalesCard";
import useDashboard from "@/hooks/useDashboard";
import StatCardSkeleton from "@/components/skeletons/StatCardSkeleton";
import RecentStudentsCardSkeleton from "@/components/skeletons/RecentStudentsCardSkeleton";
import RecentSalesCardSkeleton from "@/components/skeletons/RecentSalesCardSkeleton";

export default function Dashboard() {
  const { overviews, overviewLoading } = useDashboard();

  return (
    <>
      <Head>
        <title>لوحة التحكم | منصة أ+</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex-1 space-y-4 p-4 md:p-8 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
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
