'use client';

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
    return <LoadingSpinner message="" />;
  }
  return (
    <section className="mx-auto w-full overflow-x-hidden py-10 dark:bg-gradient-to-l dark:from-gray-900 dark:to-gray-800">
      <div className="my-10 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">
          الأكثر مبيعًا في منصة <span className="text-primary">أ+</span>
        </h1>
        <p className="mt-2 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          تصفّح قائمة منتجاتنا وخدماتنا الأكثر رواجًا بين المستخدمين في منصة
          <span className="text-primary mx-1">أ+</span>، حيث الجودة تلتقي
          بالثقة، والتجربة تثبت تميزنا يومًا بعد يوم.
        </p>
      </div>

      <Tabs defaultValue="notes" className="mx-auto w-full max-w-6xl">
        <TabsList className="bg-primary/20 mx-auto flex w-1/2 justify-between rounded-full p-1 px-0">
          <TabsTrigger
            className="data-[state=active]:bg-primary w-1/2 cursor-pointer rounded-full py-4 transition-colors data-[state=active]:text-white"
            value="sellers"
          >
            البائعين
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary w-1/2 cursor-pointer rounded-full py-4 transition-colors data-[state=active]:text-white"
            value="notes"
          >
            الملخصات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sellers" className="mt-10">
          <BestSellerUsers
            data={getBestSellerUsers}
            loading={getBestSellerUsersLoading}
          />
        </TabsContent>

        <TabsContent value="notes" className="mt-10">
          <BestSellerNotes
            data={bestSellerNotes}
            loading={bestSellerNotesLoading}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
