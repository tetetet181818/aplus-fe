import Link from 'next/link';

import { Loader2, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function BestSellerUsers({
  data,
  loading,
}: {
  data?: {
    _id: number;
    fullName: string;
    numberOfSales: number;
    university: string;
  }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="text-primary dark:text-primary/80 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50/50 py-16 dark:bg-gray-800/50">
        <div className="mb-4 rounded-full bg-gray-200 p-4 dark:bg-gray-700">
          <TrendingUp className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          لا توجد بيانات للبائعين حتى الآن
        </p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          سيتم عرض أفضل البائعين هنا قريبًا
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel className="mx-auto w-full max-w-6xl">
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.map((seller, index) => (
            <CarouselItem
              key={seller._id}
              className="flex basis-full justify-center pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="animate-fade-in w-full">
                <Card className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-200/50 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-900 dark:hover:border-blue-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-purple-50/0 transition-all duration-500 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-purple-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-blue-950/10 dark:group-hover:to-purple-950/20"></div>
                  
                  <div className="relative z-10 flex w-full flex-col items-center bg-gradient-to-b from-blue-50/50 to-transparent pt-10 pb-8 transition-all duration-500 group-hover:from-blue-100/50 dark:from-blue-950/30 dark:group-hover:from-blue-900/50">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"></div>
                      <Avatar className="relative h-24 w-24 border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-blue-500/50 dark:border-gray-800">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${seller?.fullName}&backgroundColor=2563eb&backgroundType=solid`}
                          alt={seller?.fullName}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 font-bold text-white dark:from-blue-500 dark:to-blue-600">
                          {seller?.fullName?.charAt(0)?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-green-400 to-green-500 shadow-lg dark:border-gray-800">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="relative z-10 flex w-full flex-1 flex-col justify-between p-6 text-center">
                    <div className="space-y-5">
                      <div>
                        <h3 className="mb-2 truncate text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {seller.fullName}
                        </h3>
                        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-20"></div>
                      </div>

                      <Badge
                        variant="secondary"
                        className="mx-auto rounded-full border-0 bg-gradient-to-r from-blue-100 to-purple-100 px-5 py-1.5 text-sm font-semibold text-blue-700 transition-all duration-300 hover:from-blue-200 hover:to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40"
                      >
                        {seller.university}
                      </Badge>

                      {seller.numberOfSales && (
                        <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-purple-50 p-5 transition-all duration-500 group-hover:border-blue-300 group-hover:shadow-lg dark:border-blue-800/50 dark:from-blue-950/30 dark:to-purple-950/30 dark:group-hover:border-blue-700">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5"></div>
                          <p className="relative z-10 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                            المبيعات
                          </p>
                          <div className="relative z-10 flex items-center justify-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                              {seller.numberOfSales}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button className="group/btn relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-xl dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800">
                      <span className="relative z-10">
                        <Link href={`/seller/${seller._id}`} className="flex items-center justify-center gap-2">
                          عرض الملف الشخصي
                        </Link>
                      </span>
                      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-white/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-20"></div>
                    </Button>
                  </CardContent>
                </Card>
              </div>
          </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 border-2 border-gray-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-purple-500 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-purple-500 dark:hover:bg-gray-700 md:-left-12" />
          <CarouselNext className="right-0 border-2 border-gray-200 bg-white shadow-lg transition-all hover:scale-110 hover:border-purple-500 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-purple-500 dark:hover:bg-gray-700 md:-right-12" />
        </Carousel>
      </div>
    );
  }
