import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import Link from 'next/link'

export default function BestSellerUsers({
  data,
  loading,
}: {
  data?: {
    _id: number
    fullName: string
    numberOfSales: number
    university: string
  }[]
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 font-medium text-gray-500">
        لا توجد بيانات للبائعين حتى الآن
      </div>
    )
  }

  return (
    <Carousel className="mx-auto w-full max-w-6xl">
      <CarouselContent>
        {data.map((seller) => (
          <CarouselItem
            key={seller._id}
            className="flex basis-full justify-center sm:basis-1/2 md:basis-1/3"
          >
            <Card className="group flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl">
              <div className="bg-primary/5 group-hover:bg-primary/10 relative flex w-full flex-col items-center pt-8 pb-6">
                <div className="bg-primary absolute top-0 left-0 h-1 w-full"></div>

                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${seller?.fullName}&backgroundColor=2563eb&backgroundType=solid`}
                      alt={seller?.fullName}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <AvatarFallback className="bg-primary font-semibold text-white">
                      {seller?.fullName?.charAt(0)?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-white bg-green-500"></div>
                </div>
              </div>

              <CardContent className="flex w-full flex-1 flex-col justify-between p-6 text-center">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1 truncate text-xl font-bold text-gray-800">
                      {seller.fullName}
                    </h3>
                    <div className="bg-primary mx-auto h-1 w-12 rounded-full"></div>
                  </div>

                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full border-0 px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {seller.university}
                  </Badge>

                  {seller.numberOfSales && (
                    <div className="bg-primary/5 border-primary/10 group-hover:border-primary/20 rounded-2xl border p-4 transition-colors">
                      <p className="mb-1 text-sm font-semibold text-gray-600">
                        المبيعات
                      </p>
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <p className="text-primary text-2xl font-bold">
                          {seller.numberOfSales}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button className="bg-primary hover:bg-primary/90 mt-6 w-full transform rounded-xl py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
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
  )
}
