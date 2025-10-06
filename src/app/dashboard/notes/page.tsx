"use client";

import {
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  School,
  DollarSign,
  LinkIcon,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeader from "@/components/atoms/SectionHeader";
import Head from "next/head";
import Link from "next/link";
import FileDetailsDialog from "@/components/molecules/dialogs/FileDetailsDialog";
import UnpublishDialog from "@/components/molecules/dialogs/UnpublishDialog";
import PublishDialog from "@/components/molecules/dialogs/PublishDialog";
import { Note } from "@/types";
import ChartLineNotes from "@/components/organisms/dashboard/ChartLineNotes";
import useDashboard from "@/hooks/useDashboard";
import { universities } from "@/constants";

/** Helper to truncate long text */
const truncateText = (text: string, maxLength: number = 20) =>
  text?.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text || "N/A";

export default function NotesDashboard() {
  const {
    notes,
    notesPagination,
    notesStats,
    notePage,
    noteLimit,
    nextNotePage,
    prevNotePage,
    changeNoteLimit,
    handelPublishNote,
    handelUnpublishNote,
    publishLoading,
    unpublishLoading,
  } = useDashboard();

  // const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    university: "",
    college: "",
    year: "",
    priceMin: "",
    priceOperator: "",
  });
  const [colleges, setColleges] = useState<string[]>([]);
  const [unpublishedNote, setUnpublishedNote] = useState(false);
  const [publishedNote, setPublishedNote] = useState(false);

  /** update colleges list when university filter changes */
  // useEffect(() => {
  //   if (filters.university) {
  //     const uniqueColleges = Array.from(
  //       new Set(
  //         notes
  //           .map((n: Note) => n.university === filters.university && n.college)
  //           .filter(Boolean)
  //       )
  //     ) as string[];
  //     setColleges(uniqueColleges);
  //   } else {
  //     setColleges([]);
  //   }
  // }, [filters.university, notes]);

  /** reset filters */
  const resetFilters = () => {
    setFilters({
      university: "",
      college: "",
      year: "",
      priceMin: "",
      priceOperator: "",
    });
    setSearchQuery("");
  };

  /** table column config */
  const columns = [
    { header: "العنوان", accessor: "title", customRender: truncateText },
    { header: "الوصف", accessor: "description", customRender: truncateText },
    { header: "الجامعة", accessor: "university" },
    { header: "الكلية", accessor: "college" },
    { header: "المادة", accessor: "subject" },
    { header: "السنة", accessor: "year" },
    {
      header: "صاحب الملخص",
      accessor: "owner_id",
      customRender: (ownerId: string) => (
        <Link
          href={`/seller/${ownerId}`}
          className="hover:underline text-blue-500"
        >
          {ownerId.slice(0, 10)}... <LinkIcon className="size-4 inline" />
        </Link>
      ),
    },
    {
      header: "السعر",
      accessor: "price",
      customRender: (p: number) => `${p} ر.س`,
    },
    {
      header: "تاريخ الإضافة",
      accessor: "created_at",
      customRender: (d: string) => new Date(d).toLocaleDateString(),
    },
    {
      header: "الإجراءات",
      customRender: (item: Note) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            onClick={() => {
              setIsDialogOpen(true);
              setSelectedFile(item);
            }}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert(`تحميل ${item.file_path}`)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      header: "النشر",
      customRender: (item: Note) =>
        item.isPublish ? (
          <Button
            variant="destructive"
            onClick={() => {
              setSelectedFile(item);
              setUnpublishedNote(true);
            }}
          >
            إلغاء النشر
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSelectedFile(item);
              setPublishedNote(true);
            }}
          >
            نشر
          </Button>
        ),
    },
  ];

  const hasActiveFilters =
    searchQuery ||
    Object.values(filters).some((val) => val !== "" && val !== null);

  return (
    <>
      <Head>
        <title>الملفات الدراسية | لوحة التحكم</title>
      </Head>

      <div className="space-y-6">
        <SectionHeader
          title="الملاحظات الدراسية"
          description="قائمة بجميع الملاحظات المرفوعة"
        />

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>الملاحظات</CardTitle>
                <CardDescription>
                  {hasActiveFilters ? "نتائج البحث" : "جميع الملاحظات المتاحة"}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
              >
                مسح الفلاتر
              </Button>
            </div>

            <ChartLineNotes
              total={notesPagination?.totalItems}
              data={notesStats}
            />

            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن ملاحظة..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* university filter */}
                <Select
                  value={filters.university}
                  onValueChange={(value) =>
                    setFilters((p) => ({ ...p, university: value }))
                  }
                >
                  <SelectTrigger>
                    <School className="h-4 w-4 opacity-70 mr-2" />
                    <SelectValue placeholder="كل الجامعات" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* college filter */}
                <Select
                  value={filters.college}
                  onValueChange={(value) =>
                    setFilters((p) => ({ ...p, college: value }))
                  }
                  disabled={!filters.university}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="كل الكليات" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* year filter */}
                <Input
                  placeholder="السنة"
                  value={filters.year}
                  onChange={(e) =>
                    setFilters((p) => ({ ...p, year: e.target.value }))
                  }
                />

                {/* price filter */}
                <div className="flex gap-2 items-center">
                  <DollarSign className="h-4 w-4 opacity-70" />
                  <Select
                    value={filters.priceOperator}
                    onValueChange={(value) =>
                      setFilters((p) => ({ ...p, priceOperator: value }))
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gt">أكبر من</SelectItem>
                      <SelectItem value="lt">أقل من</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="المبلغ"
                    className="flex-1"
                    value={filters.priceMin}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, priceMin: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col, idx) => (
                    <TableHead className="text-right" key={idx}>
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes?.map((note: Note) => (
                  <TableRow key={note._id}>
                    {columns.map((col, i) => (
                      <TableCell key={i}>
                        {col.customRender
                          ? col.customRender(
                              note[col.accessor as keyof typeof note] || note
                            )
                          : note[col.accessor as keyof typeof note] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {notesPagination && (
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">
                  عرض {(notePage - 1) * noteLimit + 1}-
                  {Math.min(notePage * noteLimit, notesPagination?.totalItems)}{" "}
                  من {notesPagination?.totalItems}
                </span>

                <div className="flex items-center gap-4">
                  <Select
                    value={noteLimit.toString()}
                    onValueChange={(val) => changeNoteLimit(parseInt(val))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="عدد العناصر" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 20, 50].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} / صفحة
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={notePage === 1}
                      onClick={prevNotePage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      الصفحة {notePage} من {notesPagination?.totalPages || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={notePage >= (notesPagination?.totalPages || 1)}
                      onClick={nextNotePage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <FileDetailsDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        item={selectedFile}
      />
      <UnpublishDialog
        open={unpublishedNote}
        onClose={() => setUnpublishedNote(false)}
        onConfirm={() => handelUnpublishNote(selectedFile?._id || "")}
        loading={unpublishLoading}
      />
      <PublishDialog
        open={publishedNote}
        onClose={() => setPublishedNote(false)}
        onConfirm={() => handelPublishNote(selectedFile?._id || "")}
        loading={publishLoading}
      />
    </>
  );
}
