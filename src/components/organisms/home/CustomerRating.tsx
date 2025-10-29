"use client";

/**
 * CustomerRating Component — displays customer reviews with smooth horizontal scrolling
 */
import React, { useState, useRef, useEffect } from "react";
import AddCoustomerRateDialog from "@/components/molecules/dialogs/AddCoustomerRateDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Star, Quote } from "lucide-react";
import useCustomerRating from "@/hooks/useCustomerRating";
import formatArabicDate from "@/utils/formateTime";
import { CustomerRatingTypes } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserRatedBeforeQuery } from "@/store/api/customer-rating.api";
import useAuth from "@/hooks/useAuth";

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
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));

  /** Skeleton card while loading */
  const RatingCardSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 space-y-4 border border-gray-100 animate-pulse h-[300px] w-[320px] flex-shrink-0">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-20 w-full rounded-lg" />
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
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
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 500, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-gradient-to-br from-white via-purple-50 to-blue-50 py-20 px-4"
    >
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-center opacity-5"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
              آراء عملائنا
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              ماذا يقول <span className="text-primary">عملاؤنا</span> عنا؟
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              آراء وتجارب عملائنا الكرام تدفعنا دائمًا لتقديم الأفضل وتطوير
              خدماتنا باستمرار.
            </p>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="flex gap-4 px-2 w-max">
            {isLoading ? (
              <div className="flex gap-4 justify-center items-center w-full">
                {Array.from({ length: 3 }).map((_, i) => (
                  <RatingCardSkeleton key={i} />
                ))}
              </div>
            ) : customerRating?.length ? (
              customerRating.map((item: CustomerRatingTypes) => (
                <div
                  key={item._id}
                  className="relative bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-300 h-[300px] w-[320px] flex-shrink-0 flex flex-col justify-between"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Quote className="size-8 text-primary/40" />
                    <div className="flex gap-1">{renderStars(item.rating)}</div>
                    <p className="text-gray-700 text-base leading-relaxed line-clamp-3">
                      {item.comment}
                    </p>
                  </div>

                  <div className="flex items-center justify-center mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      {item?.fullName && (
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${item?.fullName}`}
                            alt={item?.fullName}
                          />
                          <AvatarFallback>
                            {item?.fullName?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {item?.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatArabicDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-center text-gray-500 py-20">
                <p> لا توجد تقييمات حتى الآن.</p>
              </div>
            )}
          </div>
        </div>

        {user && !userRatedBefore && !userRatedBeforeLoading && (
          <div className="w-full flex justify-center items-center mt-16">
            <Button
              className="flex items-center gap-3 px-8 py-6 rounded-2xl text-white bg-gradient-to-br from-primary to-blue-400"
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
