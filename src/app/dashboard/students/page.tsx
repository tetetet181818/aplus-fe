'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { universities } from '@/constants';
import { Student } from '@/types';
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  LinkIcon,
  MoreHorizontal,
  Pencil,
  School,
  Search,
  Trash2,
} from 'lucide-react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import SectionHeader from '@/components/atoms/SectionHeader';
import ConfirmDialog from '@/components/molecules/dialogs/ConfirmDialog';
import GetSingleStudentDialog from '@/components/molecules/dialogs/GetSingleStudentDialog';
import ChartLineStudents from '@/components/organisms/dashboard/ChartLineStudents';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComp } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useDashboard from '@/hooks/useDashboard';

import formatArabicDate from '@/utils/formateTime';
import { cn } from '@/lib/utils';

/**
 * Responsive Students Dashboard with TanStack Table
 * - Desktop: full table view with sorting, filtering, and column visibility
 * - Mobile: card layout per user
 * - Enhanced UX with proper loading states, empty states, and interactions
 */
export default function StudentsDashboard() {
  const {
    users,
    usersLoading,
    usersPagination,
    userPage,
    userLimit,
    nextUserPage,
    prevUserPage,
    changeUserLimit,
    searchQuery,
    setSearchQuery,
    universityFilter,
    setUniversityFilter,
    handleDeleteUser,
    usersStats,
    setEmailFilter,
    setUserPage,
  } = useDashboard();

  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showUser, setShowUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Student | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // TanStack Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Define columns with TanStack Table
  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="تحديد الكل"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="تحديد الصف"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'fullName',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-8 px-2 hover:bg-transparent"
            >
              الطالب
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="mr-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="mr-2 h-4 w-4" />
              ) : (
                <ArrowDownUp className="mr-2 h-4 w-4 opacity-50" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const student = row.original;
          return (
            <div className="font-medium text-foreground">
              {student.fullName || 'غير محدد'}
            </div>
          );
        },
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-8 px-2 hover:bg-transparent"
            >
              البريد الإلكتروني
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="mr-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="mr-2 h-4 w-4" />
              ) : (
                <ArrowDownUp className="mr-2 h-4 w-4 opacity-50" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-muted-foreground max-w-[200px] truncate">
              {row.getValue('email')}
            </div>
          );
        },
      },
      {
        accessorKey: 'university',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-8 px-2 hover:bg-transparent"
            >
              الجامعة
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="mr-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="mr-2 h-4 w-4" />
              ) : (
                <ArrowDownUp className="mr-2 h-4 w-4 opacity-50" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const university = row.getValue('university') as string;
          return (
            <div className="flex items-center gap-2">
              <span className="bg-muted rounded-md px-2 py-1 text-xs font-medium">
                {university || 'غير محدد'}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'balance',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-8 px-2 hover:bg-transparent"
            >
              الرصيد
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="mr-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="mr-2 h-4 w-4" />
              ) : (
                <ArrowDownUp className="mr-2 h-4 w-4 opacity-50" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const balance = row.getValue('balance') as number;
          return (
            <div className="font-semibold text-foreground">
              {balance?.toLocaleString('ar-SA') || 0} ر.س
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'الإجراءات',
        cell: ({ row }) => {
          const student = row.original;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                onClick={() => {
                  setShowUser(true);
                  setSelectedUser(student);
                }}
                title="عرض التفاصيل"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>عرض التفاصيل</p>
                  </TooltipContent>
                </Tooltip>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer h-8 w-8 rounded-full hover:bg-gray-100 hover:text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => {
                  window.open(`/seller/${student._id}`, '_blank', 'noopener,noreferrer');
                }}
                title="فتح الملف الشخصي"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8 rounded-full hover:bg-gray-100 hover:text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>فتح الملف الشخصي</p>
                  </TooltipContent>
                </Tooltip>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
                onClick={() => {
                  setConfirmDelete(true);  setConfirmDelete(true);
                  setSelectedUser(student);
                }}
                title="حذف"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>حذف الطالب</p>
                  </TooltipContent>
                </Tooltip>
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: userLimit,
      },
    },
    manualPagination: true, 
    pageCount: usersPagination?.totalPages || 0,
  });

  return (
    <>
      <div className="space-y-6">
        <SectionHeader title="الطلاب" description="إدارة الطلاب" />

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-4">
            <ChartLineStudents
              total={usersPagination?.totalItems}
              data={usersStats}
            />


            <div className="mt-3 flex flex-col flex-wrap gap-3 sm:flex-row">
              <div className="relative w-full flex-1 sm:w-auto">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ابحث بالاسم / البريد / الجامعة..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setEmailFilter(e.target.value);
                  }}
                  className="w-full pr-9"
                />
              </div>
              <Select
                value={universityFilter ?? 'all'}
                onValueChange={v => setUniversityFilter(v === 'all' ? null : v)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <School className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="كل الجامعات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الجامعات</SelectItem>
                  {universities.map(uni => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center sm:w-auto"
                  >
                    <Calendar className="mr-2 size-4" />
                    {dateFilter ? formatArabicDate(dateFilter) : 'التاريخ'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComp
                    mode="single"
                    selected={dateFilter || undefined}
                    onSelect={setDateFilter}
                    required
                  />
                </PopoverContent>
              </Popover>
              {/* Column Visibility Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    الأعمدة
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {table
                    .getAllColumns()
                    .filter(column => column.getCanHide())
                    .map(column => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={value =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id === 'actions'
                            ? 'الإجراءات'
                            : column.id === 'select'
                              ? 'تحديد'
                              : column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent>
            {/* ===== Desktop Table with TanStack Table ===== */}
            <div className="hidden overflow-x-auto md:block">
              <div className="rounded-lg border bg-card">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id} className="border-b hover:bg-transparent">
                        {headerGroup.headers.map(header => {
                          return (
                            <TableHead
                              key={header.id}
                              className="h-12 text-right font-semibold text-muted-foreground"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {usersLoading ? (
                      Array.from({ length: 5 }).map((_, rowIdx) => (
                        <TableRow key={rowIdx} className="border-b">
                          {table.getAllColumns().map((_, colIdx) => (
                            <TableCell key={colIdx} className="h-14">
                              <Skeleton className="h-4 w-full" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : table.getRowModel().rows?.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-muted-foreground text-sm font-medium">
                              لا توجد بيانات
                            </p>
                            <p className="text-muted-foreground text-xs">
                              جرب تغيير معايير البحث أو الفلاتر
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      table.getRowModel().rows.map(row => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                          className={cn(
                            'border-b transition-colors',
                            row.getIsSelected()
                              ? 'bg-muted/50'
                              : 'hover:bg-muted/30'
                          )}
                        >
                          {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id} className="h-14 text-right">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ===== Mobile Cards with Enhanced UX ===== */}
            <div className="block space-y-4 md:hidden">
              {usersLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-4 shadow-sm">
                    <Skeleton className="mb-2 h-5 w-2/3" />
                    <Skeleton className="mb-2 h-4 w-1/2" />
                    <Skeleton className="mb-2 h-4 w-1/3" />
                    <div className="mt-3 flex gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </Card>
                ))
              ) : users.length === 0 ? (
                <Card className="border-dashed p-8">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="text-muted-foreground text-sm font-medium">
                      لا توجد بيانات
                    </p>
                    <p className="text-muted-foreground text-xs">
                      جرب تغيير معايير البحث أو الفلاتر
                    </p>
                  </div>
                </Card>
              ) : (
                users.map((s: Student) => (
                  <Card
                    key={s._id}
                    className="border-muted hover:border-primary/50 rounded-xl border p-4 shadow-sm transition-all duration-200"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-foreground">
                        {s.fullName}
                      </h3>
                      <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
                        {s.university || 'غير محدد'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs font-medium">
                          البريد:
                        </span>
                        <span className="text-foreground truncate text-sm">
                          {s.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs font-medium">
                          الرصيد:
                        </span>
                        <span className="text-foreground font-semibold text-sm">
                          {s.balance?.toLocaleString('ar-SA') || 0} ر.س
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <Link
                        href={`/seller/${s._id}`}
                        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                      >
                        عرض الملف
                        <LinkIcon className="h-3 w-3" />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-muted"
                            title="المزيد من الإجراءات"
                          >
                            <span className="sr-only">فتح القائمة</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => {
                              setShowUser(true);
                              setSelectedUser(s);
                            }}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>عرض التفاصيل</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/seller/${s._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer"
                            >
                              <LinkIcon className="mr-2 h-4 w-4" />
                              <span>فتح الملف الشخصي</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setConfirmDelete(true);
                              setSelectedUser(s);
                            }}
                            variant="destructive"
                            className="cursor-pointer focus:bg-destructive/10 focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>حذف الطالب</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Enhanced Pagination */}
            {usersPagination && usersPagination.totalItems > 0 && (
              <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col gap-1 text-center md:text-start">
                  <span className="text-muted-foreground text-sm">
                    عرض{' '}
                    <span className="font-medium text-foreground">
                      {(usersPagination.currentPage - 1) * userLimit + 1}
                    </span>{' '}
                    إلى{' '}
                    <span className="font-medium text-foreground">
                      {Math.min(
                        usersPagination.currentPage * userLimit,
                        usersPagination.totalItems
                      )}
                    </span>{' '}
                    من{' '}
                    <span className="font-medium text-foreground">
                      {usersPagination.totalItems}
                    </span>{' '}
                    طالب
                  </span>
                  {usersPagination.totalPages > 1 && (
                    <span className="text-muted-foreground text-xs">
                      الصفحة {userPage} من {usersPagination.totalPages}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setUserPage(1);
                      }}
                      disabled={userPage === 1 || usersLoading}
                      title="الصفحة الأولى"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={userPage === 1 || usersLoading}
                      onClick={prevUserPage}
                      title="السابق"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1 px-2">
                      <span className="text-muted-foreground text-sm">
                        {userPage}
                      </span>
                      <span className="text-muted-foreground text-sm">/</span>
                      <span className="text-muted-foreground text-sm">
                        {usersPagination.totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={
                        userPage === usersPagination.totalPages || usersLoading
                      }
                      onClick={nextUserPage}
                      title="التالي"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setUserPage(usersPagination.totalPages);
                      }}
                      disabled={
                        userPage === usersPagination.totalPages || usersLoading
                      }
                      title="الصفحة الأخيرة"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select
                    value={String(userLimit)}
                    onValueChange={v => changeUserLimit(Number(v))}
                    disabled={usersLoading}
                  >
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 لكل صفحة</SelectItem>
                      <SelectItem value="10">10 لكل صفحة</SelectItem>
                      <SelectItem value="20">20 لكل صفحة</SelectItem>
                      <SelectItem value="50">50 لكل صفحة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <GetSingleStudentDialog
        open={showUser}
        onClose={() => setShowUser(false)}
        student={selectedUser!}
      />
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() =>
          handleDeleteUser({
            userId: selectedUser?._id || '',
            userName: selectedUser?.fullName || '',
          })
        }
        title="حذف الطالب"
        description="هل أنت متأكد من الحذف؟"
      />
    </>
  );
}
