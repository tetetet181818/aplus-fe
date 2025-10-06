"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, School } from "lucide-react";
import NoteCard from "@/components/organisms/notes/NoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserByIdQuery } from "@/store/api/auth.api";
import useAuth from "@/hooks/useAuth";
import { Note } from "@/types";

const SellerProfilePage = ({ userId }: { userId: string }) => {
  const { token } = useAuth();
  const { data, isLoading: loading } = useGetUserByIdQuery({
    id: userId,
    token: token || "",
  });

  const sellerData = data?.data;
  const seller = {
    fullName: sellerData?.user?.fullName,
    university: sellerData?.user?.university,
    _id: sellerData?.user?._id,
  };
  const sellerNotes = sellerData?.notes || [];

  return (
    <div className="py-12 px-4 md:px-6">
      {/* ================== Seller Header ================== */}
      <Card className="mb-8 overflow-hidden shadow-lg">
        <div className="h-10"></div>
        <CardContent className="p-6 pt-0 -mt-16">
          {loading ? (
            <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-6">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-background shadow-md" />
              <div className="mt-4 md:mt-0 text-center md:text-left my-5 space-y-3">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-5 w-40 rounded" />
                <Skeleton className="h-6 w-24 rounded mt-2" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                <AvatarFallback className="text-4xl text-black">
                  {seller?.fullName?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-black">
                  {seller?.fullName || "بائع غير معروف"}
                </h1>
                {seller?.university && (
                  <p className="text-gray-600 flex items-center justify-center md:justify-start mt-2">
                    <School className="ml-2 h-5 w-5 text-primary" />
                    {seller.university}
                  </p>
                )}
                <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-base bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {sellerNotes.length} ملخص
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================== Seller Notes Section ================== */}
      <div>
        {loading ? (
          // Skeleton for Notes Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="h-40 w-full rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sellerNotes.length > 0 ? (
          // Notes Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerNotes.map((note: Note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          // Empty State
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">لا توجد ملخصات</h3>
            <p className="text-gray-600">
              هذا البائع لم يقم بإضافة أي ملخصات بعد.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SellerProfilePage;
