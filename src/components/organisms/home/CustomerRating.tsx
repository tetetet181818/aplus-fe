'use client';

/**
 * CustomerRating Component — displays customer reviews with smooth horizontal scrolling
 * Now with dark mode support
 */
import React, { useEffect, useRef, useState } from 'react';

import { useUserRatedBeforeQuery } from '@/store/api/customer-rating.api';
import { CustomerRatingTypes } from '@/types';
import { PlusCircle, Quote, Star } from 'lucide-react';

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
  const { data: userRatedBefore, isLoading: userRatedBeforeLoading } =
    useUserRatedBeforeQuery(undefined);

  /** Render stars for each rating */
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`size-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500'
            : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
        }`}
      />
    ));

  /** Skeleton card while loading */
  const RatingCardSkeleton = () => (
    <div className="h-[300px] w-[320px] flex-shrink-0 animate-pulse space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-md backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full dark:bg-gray-700" />
        ))}
      </div>
      <Skeleton className="h-20 w-full rounded-lg dark:bg-gray-700" />
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 dark:bg-gray-700" />
          <Skeleton className="h-3 w-16 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full dark:bg-gray-700" />
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
      className="via-bule-50 relative w-full overflow-hidden bg-gradient-to-br from-white to-blue-50 px-4 py-20 dark:from-gray-950 dark:via-blue-800/50 dark:to-blue-950/20"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-center">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-primary dark:text-primary/90 text-sm font-semibold tracking-wider uppercase">
              آراء عملائنا
            </h2>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
              ماذا يقول{' '}
              <span className="text-primary dark:text-primary/90">عملاؤنا</span>{' '}
              عنا؟
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              آراء وتجارب عملائنا الكرام تدفعنا دائمًا لتقديم الأفضل وتطوير
              خدماتنا باستمرار.
            </p>
          </div>
        </div>

        {/* Scrollable container */}
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

          <div className="flex w-max gap-4 px-2">
            {isLoading ? (
              <div className="flex w-full items-center justify-center gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <RatingCardSkeleton key={i} />
                ))}
              </div>
            ) : customerRating?.length ? (
              customerRating.map((item: CustomerRatingTypes) => (
                <div
                  key={item._id}
                  className="relative flex h-[300px] w-[320px] flex-shrink-0 flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-900/50"
                >
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <Quote className="text-primary/40 dark:text-primary/30 size-8" />
                    <div className="flex gap-1">{renderStars(item.rating)}</div>
                    <p className="line-clamp-3 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      {item.comment}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      {item?.fullName && (
                        <Avatar className="h-10 w-10 ring-2 ring-gray-100 dark:ring-gray-800">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${item?.fullName}`}
                            alt={item?.fullName}
                          />
                          <AvatarFallback className="dark:bg-gray-800 dark:text-gray-300">
                            {item?.fullName?.charAt(0)?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="text-right">
                        <p className="text-sm font-semibold dark:text-white">
                          {item?.fullName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatArabicDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex w-full items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
                <p> لا توجد تقييمات حتى الآن.</p>
              </div>
            )}
          </div>
        </div>

        {user && !userRatedBefore && !userRatedBeforeLoading && (
          <div className="mt-16 flex w-full items-center justify-center">
            <Button
              className="from-primary dark:from-primary/90 flex items-center gap-3 rounded-2xl bg-gradient-to-br to-blue-400 px-8 py-6 text-white shadow-lg transition-all hover:shadow-xl dark:to-blue-500/90"
              onClick={() => setIsOpen(true)}
            >
              <PlusCircle className="size-5" />
              <span>أضف تقييمك للمنصّة</span>
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
