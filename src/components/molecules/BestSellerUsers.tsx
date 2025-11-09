import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";

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
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500 font-medium">
        لا توجد بيانات للبائعين حتى الآن
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent>
        {data.map((seller) => (
          <CarouselItem
            key={seller._id}
            className="md:basis-1/3 sm:basis-1/2 basis-full flex justify-center"
          >
            <Card className="group w-full h-full flex flex-col justify-center items-center border-0 rounded-3xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] bg-white">
              <div className="relative w-full pt-8 pb-6 flex flex-col items-center bg-primary/5 group-hover:bg-primary/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${seller?.fullName}&backgroundColor=2563eb&backgroundType=solid`}
                      alt={seller?.fullName}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {seller?.fullName?.charAt(0)?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col justify-between text-center flex-1 w-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
                      {seller.fullName}
                    </h3>
                    <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
                  </div>

                  <Badge
                    variant="secondary"
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary border-0 font-medium text-sm hover:bg-primary/20 transition-colors"
                  >
                    {seller.university}
                  </Badge>

                  {seller.numberOfSales && (
                    <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 group-hover:border-primary/20 transition-colors">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        المبيعات
                      </p>
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <p className="text-2xl font-bold text-primary">
                          {seller.numberOfSales}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button className="mt-6 w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 hover:bg-primary/90">
                  <Link href={`/seller/${seller._id}`}>عرض الملف الشخصي</Link>
                </button>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
