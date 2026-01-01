'use client';

import { Trophy, Star, TrendingUp } from 'lucide-react';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import BestSellerNotes from '@/components/molecules/BestSellerNotes';
import BestSellerUsers from '@/components/molecules/BestSellerUsers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useAuth from '@/hooks/useAuth';
import useNotes from '@/hooks/useNotes';

export default function BestSellerSection() {
  const { bestSellerNotes, bestSellerNotesLoading } = useNotes();
  const { getBestSellerUsers, getBestSellerUsersLoading } = useAuth();

  if (getBestSellerUsersLoading || bestSellerNotesLoading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner message="جاري تحميل الأكثر مبيعًا..." />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 md:py-32 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-400">
            <Trophy className="h-4 w-4" />
            <span>الأكثر مبيعًا</span>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white">
            الأكثر مبيعًا في منصة{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              أ+
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
            تصفّح قائمة منتجاتنا وخدماتنا الأكثر رواجًا بين المستخدمين في منصة{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              أ+
            </span>
            ، حيث الجودة تلتقي بالثقة، والتجربة تثبت تميزنا يومًا بعد يوم.
          </p>
        </div>

        <Tabs defaultValue="notes" className="mx-auto w-full max-w-6xl">
          <div className="mb-10 flex justify-center">
            <TabsList className="group relative inline-flex h-14 w-full max-w-md items-center justify-center gap-2 rounded-2xl bg-gray-100/80 p-1.5 backdrop-blur-sm dark:bg-gray-800/80">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5"></div>
              
              <TabsTrigger
                value="notes"
                className="group/trigger relative z-10 flex-1 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-white/50 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-gray-400 dark:data-[state=inactive]:hover:bg-gray-700/50 dark:data-[state=inactive]:hover:text-white"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 transition-transform duration-300 group-data-[state=active]/trigger:rotate-12" />
                  الملخصات
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="sellers"
                className="group/trigger relative z-10 flex-1 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-white/50 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-gray-400 dark:data-[state=inactive]:hover:bg-gray-700/50 dark:data-[state=inactive]:hover:text-white"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 transition-transform duration-300 group-data-[state=active]/trigger:scale-110" />
                  البائعين
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="sellers"
            className="mt-8 animate-fade-in data-[state=active]:animate-fade-in"
          >
            <BestSellerUsers
              data={getBestSellerUsers}
              loading={getBestSellerUsersLoading}
            />
          </TabsContent>

          <TabsContent
            value="notes"
            className="mt-8 animate-fade-in data-[state=active]:animate-fade-in"
          >
            <BestSellerNotes
              data={bestSellerNotes}
              loading={bestSellerNotesLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
