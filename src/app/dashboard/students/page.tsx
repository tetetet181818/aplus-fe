"use client";

import { useState, type ReactNode } from "react";
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  School,
  LinkIcon,
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
import Head from "next/head";
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
import { useSearchUsersQuery } from "@/store/api/dashboard.api";
import { universities } from "@/constants";

type ColumnConfig = {
  header: string;
  accessor: keyof Student;
  customRender?: (value: Student[keyof Student], user: Student) => ReactNode;
};

/**
 * Students Dashboard
 * - Shows users with search, filters, pagination
 * - Integrates chart + skeletons
 */
export default function StudentsDashboard() {
  const {
    users,
    usersLoading,
    usersPagination,
    page,
    limit,
    nextPage,
    prevPage,
    changeLimit,
    handleDeleteUser,
    usersStats,
    token,
  } = useDashboard();

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [universityFilter, setUniversityFilter] = useState<string | null>(null);
  const [showUser, setShowUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Student | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  /** API search (fullName/email/university in one query) */
  const { data: usersSearch, isLoading: usersSearchLoading } =
    useSearchUsersQuery(
      {
        token: token || "",
        fullName: searchQuery,
        email: searchQuery,
        university: universityFilter || undefined,
        createdAt: dateFilter ? format(dateFilter, "yyyy-MM-dd") : undefined,
      },
      { skip: !searchQuery && !universityFilter && !dateFilter }
    );

  /** Decide which data to show */
  const tableData =
    searchQuery || universityFilter || dateFilter ? usersSearch?.data : users;

  const loadingState = usersLoading || usersSearchLoading;

  /** Table columns config */
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
          className="text-blue-500 hover:underline"
        >
          {user.fullName} <LinkIcon className="size-4 inline" />
        </Link>
      ),
    },
    {
      header: "الإجراءات",
      accessor: "_id",
      customRender: (_value, user) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowUser(true);
              setSelectedUser(user);
            }}
            title="عرض التفاصيل"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => {
              setConfirmDelete(true);
              setSelectedUser(user);
            }}
            title="حذف"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>إدارة الطلاب | لوحة التحكم</title>
        <meta name="description" content="إدارة قاعدة بيانات الطلاب" />
      </Head>

      <div className="space-y-6">
        <SectionHeader title="الطلاب" description="إدارة الطلاب" />

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <ChartLineStudents
              total={usersPagination?.totalItems}
              data={usersStats}
            />

            {/* Filters */}
            <div className="flex gap-3 mt-3">
              <Input
                placeholder="ابحث بالاسم / البريد / الجامعة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select
                value={universityFilter ?? "all"}
                onValueChange={(v) =>
                  setUniversityFilter(v === "all" ? null : v)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <School className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="كل الجامعات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الجامعات</SelectItem>
                  {universities?.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Calendar className="size-4 mr-2" />
                    {dateFilter
                      ? format(dateFilter, "yyyy/MM/dd", { locale: ar })
                      : "التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
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
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((c, i) => (
                    <TableHead className="text-start" key={i}>
                      {c.header}
                    </TableHead>
                  ))}
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
                    </TableRow>
                  ))
                ) : !tableData || tableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      لا توجد بيانات
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData.map((s: Student) => (
                    <TableRow key={s._id}>
                      {columns.map((col, idx) => (
                        <TableCell key={idx}>
                          {col.customRender
                            ? col.customRender(s[col.accessor], s)
                            : s[col.accessor] || "N/A"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {usersPagination && !loadingState && (
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">
                  عرض {(usersPagination.currentPage - 1) * limit + 1}-
                  {Math.min(
                    usersPagination.currentPage * limit,
                    usersPagination.totalItems
                  )}{" "}
                  من {usersPagination.totalItems}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={prevPage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    الصفحة {page} من {usersPagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === usersPagination.totalPages}
                    onClick={nextPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Select
                    value={String(limit)}
                    onValueChange={(v) => changeLimit(Number(v))}
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
