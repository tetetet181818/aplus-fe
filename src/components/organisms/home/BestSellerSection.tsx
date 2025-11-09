"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BestSellerNotes from "@/components/molecules/BestSellerNotes";
import BestSellerUsers from "@/components/molecules/BestSellerUsers";
import useNotes from "@/hooks/useNotes";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

export default function BestSellerSection() {
  const { bestSellerNotes, bestSellerNotesLoading } = useNotes();
  const { getBestSellerUsers, getBestSellerUsersLoading } = useAuth();
  if (getBestSellerUsersLoading || bestSellerNotesLoading) {
    return <LoadingSpinner message="" />;
  }
  return (
    <section className="w-screen mx-auto py-10">
      <div className="flex flex-col items-center my-10 text-center">
        <h1 className="text-2xl font-bold">
          الأكثر مبيعًا في منصة <span className="text-primary">أ+</span>
        </h1>
        <p className="text-xl text-gray-600 mt-2 max-w-3xl">
          تصفّح قائمة منتجاتنا وخدماتنا الأكثر رواجًا بين المستخدمين في منصة
          <span className="text-primary mx-1">أ+</span>، حيث الجودة تلتقي
          بالثقة، والتجربة تثبت تميزنا يومًا بعد يوم.
        </p>
      </div>

      <Tabs defaultValue="notes" className="mx-auto w-full max-w-6xl">
        <TabsList className="w-1/2 mx-auto rounded-full bg-primary/20 p-1 flex justify-between px-0">
          <TabsTrigger
            className="cursor-pointer py-4 rounded-full w-1/2 data-[state=active]:bg-primary data-[state=active]:text-white transition-colors"
            value="sellers"
          >
            البائعين
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer py-4 rounded-full w-1/2 data-[state=active]:bg-primary data-[state=active]:text-white transition-colors"
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
