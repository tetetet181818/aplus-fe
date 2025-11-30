'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { Profits } from '@/types';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useProfits from '@/hooks/useProfits';

export default function ProfitsPage() {
  const { theme } = useTheme();

  const {
    profits,
    pagination,
    isLoading,
    currentPage,
    totalPages,
    totalCount,
    hasNextPage,
    hasPrevPage,
    fullName,
    email,
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    handleChangeLimit,
    handleSearchFullName,
    handleSearchEmail,
    handleResetFilters,
    totalAmount,
    totalBalance,
    totalProfits,
    totalUsers,
  } = useProfits();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 sm:p-6" dir="rtl">
      {/* الرأس */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
          نظرة عامة على الأرباح
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          عرض وإدارة توزيعات الأرباح
        </p>
      </div>

      <Card className="shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">تصفية النتائج</CardTitle>
          <CardDescription>استخدم الحقول أدناه للبحث والتصفية</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Input
              type="text"
              placeholder="البحث بالاسم..."
              value={fullName}
              onChange={e => handleSearchFullName(e.target.value)}
              className="flex-1"
            />

            <Input
              type="text"
              placeholder="البحث بالإيميل..."
              value={email}
              onChange={e => handleSearchEmail(e.target.value)}
              className="flex-1"
            />

            <Button
              onClick={handleResetFilters}
              variant="outline"
              className="whitespace-nowrap"
            >
              إعادة التعيين
            </Button>
          </div>
        </CardContent>

        <Separator className="my-4" />

        <CardContent className="p-0">
          {/* عرض البطاقات على الموبايل */}
          <div className="block md:hidden">
            <div className="space-y-4 p-4">
              {profits?.map((item: Profits, index: number) => (
                <Card
                  key={item._id}
                  className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize dark:text-gray-100">
                          {item.fullName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.email}
                        </p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {index + 1}
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          المبلغ:
                        </span>
                        <div className="flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100">
                          <span>{item.balance.toLocaleString()}</span>
                          <Image
                            src={
                              theme === 'dark'
                                ? '/light-ryial-icon.png'
                                : '/dark-ryial-icon.png'
                            }
                            alt="أيقونة الريال"
                            className="size-5"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          النسبة:
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          <span>{item.profit}</span>
                          <Image
                            src={
                              theme === 'dark'
                                ? '/light-ryial-icon.png'
                                : '/dark-ryial-icon.png'
                            }
                            alt="أيقونة الريال"
                            className="mr-1 size-5"
                            width={20}
                            height={20}
                          />
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          المبلغ الإجمالي:
                        </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {item.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* عرض الجدول على سطح المكتب */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    <TableHead className="w-20 text-right">ID</TableHead>
                    <TableHead className="text-right">الاسم الكامل</TableHead>
                    <TableHead className="text-right">
                      البريد الالكتروني
                    </TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">النسبة</TableHead>
                    <TableHead className="text-right">
                      المبلغ الإجمالي
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {profits?.map((item: Profits, index: number) => (
                    <TableRow
                      key={item._id}
                      className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <TableCell className="py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {index + 1}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 font-medium capitalize">
                        {item.fullName}
                      </TableCell>

                      <TableCell className="py-4 font-medium">
                        {item.email}
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 font-semibold">
                          <span>{item.balance.toLocaleString()}</span>
                          <Image
                            src={
                              theme === 'dark'
                                ? '/light-ryial-icon.png'
                                : '/dark-ryial-icon.png'
                            }
                            alt="أيقونة الريال"
                            className="size-6"
                            width={24}
                            height={24}
                          />
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          <span>{item.profit}</span>
                          <Image
                            src={
                              theme === 'dark'
                                ? '/light-ryial-icon.png'
                                : '/dark-ryial-icon.png'
                            }
                            alt="أيقونة الريال"
                            className="mr-1 size-6"
                            width={24}
                            height={24}
                          />
                        </Badge>
                      </TableCell>

                      <TableCell className="py-4 font-bold text-green-600 dark:text-green-400">
                        {item.total.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {totalCount > 10 && (
            <div className="mt-6 flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                عرض {profits.length} من أصل {totalCount} نتيجة
              </div>

              <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                <Select
                  value={pagination.pageSize.toString()}
                  onValueChange={value => handleChangeLimit(Number(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="اختر الحجم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 لكل صفحة</SelectItem>
                    <SelectItem value="10">10 لكل صفحة</SelectItem>
                    <SelectItem value="20">20 لكل صفحة</SelectItem>
                    <SelectItem value="50">50 لكل صفحة</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-normal">
                  <Button
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    variant="outline"
                    size="sm"
                  >
                    التالي
                  </Button>

                  <div className="flex max-w-[200px] gap-1 overflow-x-auto sm:max-w-none">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        pageNum =>
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          Math.abs(pageNum - currentPage) <= 1
                      )
                      .map((pageNum, index, array) => {
                        const showEllipsis =
                          index > 0 && pageNum - array[index - 1] > 1;
                        return (
                          <div key={pageNum} className="flex items-center">
                            {showEllipsis && (
                              <span className="px-2 text-gray-500">...</span>
                            )}
                            <Button
                              onClick={() => handleGoToPage(pageNum)}
                              variant={
                                currentPage === pageNum ? 'default' : 'outline'
                              }
                              size="sm"
                              className="min-w-[2.5rem] px-2.5"
                            >
                              {pageNum}
                            </Button>
                          </div>
                        );
                      })}
                  </div>

                  <Button
                    onClick={handlePrevPage}
                    disabled={!hasPrevPage}
                    variant="outline"
                    size="sm"
                  >
                    السابق
                  </Button>
                </div>

                <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">
                  صفحة {currentPage} من {totalPages}
                </span>
              </div>
            </div>
          )}
        </CardContent>

        <Separator />

        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  إجمالي الأرباح
                </CardTitle>
                <CardDescription>
                  إجمالي المبالغ المُحققة من جميع عمليات المستخدمين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">
                    {totalProfits.toLocaleString()}
                  </p>
                  <Image
                    src={
                      theme === 'dark'
                        ? '/light-ryial-icon.png'
                        : '/dark-ryial-icon.png'
                    }
                    alt="أيقونة الريال"
                    className="size-6"
                    width={24}
                    height={24}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
                  إجمالي المبالغ المتداولة
                </CardTitle>
                <CardDescription>
                  مجموع الأرباح والمدفوعات داخل المنصّة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-200">
                    {totalAmount.toLocaleString()}
                  </p>
                  <Image
                    src={
                      theme === 'dark'
                        ? '/light-ryial-icon.png'
                        : '/dark-ryial-icon.png'
                    }
                    alt="أيقونة الريال"
                    className="size-6"
                    width={24}
                    height={24}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
                  رصيد المستخدمين الحالي
                </CardTitle>
                <CardDescription>
                  إجمالي الأرصدة المتاحة لدى جميع المستخدمين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-200">
                    {totalBalance.toLocaleString()}
                  </p>
                  <Image
                    src={
                      theme === 'dark'
                        ? '/light-ryial-icon.png'
                        : '/dark-ryial-icon.png'
                    }
                    alt="أيقونة الريال"
                    className="size-6"
                    width={24}
                    height={24}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  عدد المستخدمين النشطين
                </CardTitle>
                <CardDescription>
                  إجمالي المستخدمين الذين حققوا أرباحًا عبر المنصّة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">
                  {totalUsers}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
