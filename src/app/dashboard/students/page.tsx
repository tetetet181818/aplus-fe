"use client";

import { useState, type ReactNode } from "react";
import {
  Eye,
  Trash2,
  Calendar,
  School,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import SectionHeader from "@/components/atoms/SectionHeader";
import GetSingleStudentDialog from "@/components/molecules/dialogs/GetSingleStudentDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import ConfirmDialog from "@/components/molecules/dialogs/ConfirmDialog";
import { Student } from "@/types";
import useDashboard from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import ChartLineStudents from "@/components/organisms/dashboard/ChartLineStudents";
import { universities } from "@/constants";
import formatArabicDate from "@/utils/formateTime";

type ColumnConfig = {
  header: string;
  accessor: keyof Student;
  customRender?: (value: Student[keyof Student], user: Student) => ReactNode;
};

/**
 * Responsive Students Dashboard
 * - Desktop: full table view
 * - Mobile: card layout per user
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
  } = useDashboard();

  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showUser, setShowUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Student | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadingState = usersLoading;

  const columns: ColumnConfig[] = [
    { header: "الطالب", accessor: "fullName" },
    { header: "البريد الإلكتروني", accessor: "email" },
    { header: "الجامعة", accessor: "university" },
    {
      header: "الرصيد",
      accessor: "balance",
      customRender: (v) => `${v} ر.س`,
    },
    {
      header: "عرض الملف الشخصي",
      accessor: "_id",
      customRender: (value, user) => (
        <Link
          href={`/seller/${value}`}
          className="text-blue-500 hover:underline text-sm md:text-base"
        >
          {user.fullName} <LinkIcon className="size-4 inline" />
        </Link>
      ),
    },
  ];

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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-3">
              <Input
                placeholder="ابحث بالاسم / البريد / الجامعة..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setEmailFilter(e.target.value);
                }}
                className="w-full sm:w-auto flex-1"
              />
              <Select
                value={universityFilter ?? "all"}
                onValueChange={(v) =>
                  setUniversityFilter(v === "all" ? null : v)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <School className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="كل الجامعات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الجامعات</SelectItem>
                  {universities.map((uni) => (
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
                    className="w-full sm:w-auto justify-center"
                  >
                    <Calendar className="size-4 mr-2" />
                    {dateFilter ? formatArabicDate(dateFilter) : "التاريخ"}
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
            </div>
          </CardHeader>

          <CardContent>
            {/* ===== Desktop Table ===== */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((c, i) => (
                      <TableHead
                        className="text-start text-sm font-semibold"
                        key={i}
                      >
                        {c.header}
                      </TableHead>
                    ))}
                    <TableHead className="text-start">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingState ? (
                    Array.from({ length: 5 }).map((_, rowIdx) => (
                      <TableRow key={rowIdx}>
                        {columns.map((_, colIdx) => (
                          <TableCell key={colIdx}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : !users || users.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="text-center text-gray-500 py-6"
                      >
                        لا توجد بيانات
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((s: Student) => (
                      <TableRow key={s._id}>
                        {columns.map((col, idx) => (
                          <TableCell key={idx} className="whitespace-nowrap">
                            {col.customRender
                              ? col.customRender(s[col.accessor], s)
                              : s[col.accessor] || "N/A"}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => {
                                setShowUser(true);
                                setSelectedUser(s);
                              }}
                              title="عرض التفاصيل"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setConfirmDelete(true);
                                setSelectedUser(s);
                              }}
                              title="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* ===== Mobile Cards ===== */}
            <div className="block md:hidden space-y-4">
              {loadingState ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-4 shadow-sm">
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </Card>
                ))
              ) : users.length === 0 ? (
                <p className="text-center text-gray-500 py-6">لا توجد بيانات</p>
              ) : (
                users.map((s) => (
                  <Card
                    key={s._id}
                    className="p-4 border border-muted shadow-sm rounded-xl"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-base">{s.fullName}</h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded-md">
                        {s.university || "غير محدد"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>البريد:</strong> {s.email}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>الرصيد:</strong> {s.balance} ر.س
                    </p>
                    <div className="flex justify-between mt-3">
                      <Link
                        href={`/seller/${s._id}`}
                        className="text-blue-500 text-sm flex items-center gap-1"
                      >
                        عرض الملف <LinkIcon className="size-3" />
                      </Link>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setShowUser(true);
                            setSelectedUser(s);
                          }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setConfirmDelete(true);
                            setSelectedUser(s);
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Pagination */}
            {usersPagination && !loadingState && (
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                <span className="text-sm text-muted-foreground text-center md:text-start">
                  عرض {(usersPagination.currentPage - 1) * userLimit + 1}-
                  {Math.min(
                    usersPagination.currentPage * userLimit,
                    usersPagination.totalItems
                  )}{" "}
                  من {usersPagination.totalItems}
                </span>
                <div className="flex flex-wrap gap-2 items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={userPage === 1}
                    onClick={prevUserPage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    الصفحة {userPage} من {usersPagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={userPage === usersPagination.totalPages}
                    onClick={nextUserPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Select
                    value={String(userLimit)}
                    onValueChange={(v) => changeUserLimit(Number(v))}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
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
            userId: selectedUser?._id || "",
            userName: selectedUser?.fullName || "",
          })
        }
        title="حذف الطالب"
        description="هل أنت متأكد من الحذف؟"
      />
    </>
  );
}
