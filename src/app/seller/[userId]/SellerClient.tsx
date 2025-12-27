'use client';

import { authService } from '@/services/auth.service';
import { Note } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, School } from 'lucide-react';

import NoteCard from '@/components/organisms/notes/NoteCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SellerProfilePage = ({ userId }: { userId: string }) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['userById', userId],
    queryFn: () => authService.getUserById(userId),
    enabled: !!userId,
  });

  const sellerData = data?.data;
  const seller = {
    fullName: sellerData?.user?.fullName,
    university: sellerData?.user?.university,
    _id: sellerData?.user?._id,
  };
  const sellerNotes = sellerData?.notes || [];

  return (
    <div className="px-4 py-12 md:px-6">
      {/* ================== Seller Header ================== */}
      <Card className="mb-8 overflow-hidden shadow-lg">
        <div className="h-10"></div>
        <CardContent className="-mt-16 p-6 pt-0">
          {loading ? (
            <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-6">
              <Skeleton className="border-background h-32 w-32 rounded-full border-4 shadow-md" />
              <div className="my-5 mt-4 space-y-3 text-center md:mt-0 md:text-left">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-5 w-40 rounded" />
                <Skeleton className="mt-2 h-6 w-24 rounded" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <Avatar className="border-background h-32 w-32 border-4 shadow-md">
                <AvatarFallback className="text-4xl text-black">
                  {seller?.fullName?.charAt(0).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-black">
                  {seller?.fullName || 'بائع غير معروف'}
                </h1>
                {seller?.university && (
                  <p className="mt-2 flex items-center justify-center text-gray-600 md:justify-start">
                    <School className="text-primary ml-2 h-5 w-5" />
                    {seller.university}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-center space-x-4 md:justify-start">
                  <Badge
                    variant="secondary"
                    className="border border-blue-200 bg-blue-50 px-4 py-2 text-base text-blue-700"
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="h-40 w-full rounded-t-lg" />
                  <div className="space-y-3 p-4">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sellerNotes.map((note: Note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          // Empty State
          <Card className="p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gray-100 p-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold">لا توجد ملخصات</h3>
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
