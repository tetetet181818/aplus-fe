'use client';

import React, { useEffect, useRef, useState } from 'react';

import { customerRatingService } from '@/services/customer-rating.service';
import { CustomerRatingTypes } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Heart, PlusCircle, Quote, Star, Users } from 'lucide-react';

import AddCoustomerRateDialog from '@/components/molecules/dialogs/AddCoustomerRateDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import useAuth from '@/hooks/useAuth';
import useCustomerRating from '@/hooks/useCustomerRating';

import formatArabicDate from '@/utils/formateTime';

export default function CustomerRating() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { customerRating, isLoading } = useCustomerRating();
  const { data: userRatedBefore, isLoading: userRatedBeforeLoading } = useQuery(
    {
      queryKey: ['userRatedBefore'],
      queryFn: customerRatingService.userRatedBefore,
    }
  );

  /** Render stars for each rating */
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`size-5 transition-all duration-300 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm dark:fill-yellow-500 dark:text-yellow-500'
            : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
        }`}
      />
    ));

  /** Skeleton card while loading */
  const RatingCardSkeleton = () => (
    <div className="h-[340px] w-[340px] flex-shrink-0 animate-pulse space-y-4 rounded-3xl border-2 border-gray-200/50 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/90">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 rounded-full dark:bg-gray-700" />
        ))}
      </div>
      <Skeleton className="h-24 w-full rounded-xl dark:bg-gray-700" />
      <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 dark:bg-gray-700" />
          <Skeleton className="h-3 w-20 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full dark:bg-gray-700" />
      </div>
    </div>
  );

  /** Allow wheel to scroll horizontally */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  /** Auto-scroll every few seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 500, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-4 py-20 md:py-32 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20"
    >
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 text-sm font-semibold text-pink-600 dark:from-pink-900/30 dark:to-rose-900/30 dark:text-pink-400">
            <Heart className="h-4 w-4 fill-pink-500" />
            <span>آراء عملائنا</span>
          </div>
          
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white">
            ماذا يقول{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              عملاؤنا
            </span>{' '}
            عنا؟
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            آراء وتجارب عملائنا الكرام تدفعنا دائمًا لتقديم الأفضل وتطوير
            خدماتنا باستمرار.
          </p>
        </div>

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden scroll-smooth active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="flex w-max gap-6 px-2 pb-4">
            {isLoading ? (
              <div className="flex w-full items-center justify-center gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <RatingCardSkeleton key={i} />
                ))}
              </div>
            ) : customerRating?.length ? (
              customerRating.map((item: CustomerRatingTypes, index: number) => (
                <div
                  key={item._id}
                  className="group relative flex h-[360px] w-[360px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border-2 border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-900 dark:hover:border-blue-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 transition-all duration-500 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-purple-950/10 dark:group-hover:to-pink-950/20"></div>
                  
                  <div className="relative z-10 flex flex-col items-center space-y-5 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <Quote className="relative size-10 text-blue-500/60 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500 dark:text-blue-400/60" />
                    </div>
                    
                    <div className="flex gap-1.5 transition-transform duration-300 group-hover:scale-110">
                      {renderStars(item.rating)}
                    </div>
                    
                    <p className="line-clamp-4 text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-200">
                      {item.comment}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 flex items-center justify-center border-t-2 border-gray-100 pt-6 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                      {item?.fullName && (
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                          <Avatar className="relative h-14 w-14 border-[3px] border-white shadow-lg transition-all duration-500 group-hover:scale-110 dark:border-gray-800">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${item?.fullName}`}
                              alt={item?.fullName}
                              className="transition-transform duration-500 group-hover:scale-105"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white dark:from-blue-500 dark:to-purple-500">
                              {item?.fullName?.charAt(0)?.toUpperCase() || '?'}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {item?.fullName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatArabicDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></div>
                </div>
              ))
            ) : (
              <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-gray-50/50 py-20 dark:bg-gray-800/50">
                <div className="mb-4 rounded-full bg-gray-200 p-4 dark:bg-gray-700">
                  <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                  لا توجد تقييمات حتى الآن
                </p>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  كن أول من يشارك تجربته معنا
                </p>
              </div>
            )}
          </div>
        </div>

        {user && !userRatedBefore && !userRatedBeforeLoading && (
          <div className="mt-16 flex w-full items-center justify-center">
            <Button
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-10 py-6 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              onClick={() => setIsOpen(true)}
            >
              <span className="relative z-10 flex items-center gap-3">
                <PlusCircle className="size-5 transition-transform duration-300 group-hover:rotate-90" />
                <span>أضف تقييمك للمنصّة</span>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </Button>
          </div>
        )}
      </div>

      <AddCoustomerRateDialog
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        loading={isLoading}
      />
    </section>
  );
}
