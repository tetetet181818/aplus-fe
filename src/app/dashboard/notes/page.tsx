"use client";

/**
 * Notes Dashboard
 * Displays uploaded notes with filters, search, pagination, and publish/unpublish actions.
 * Responsive layout: Cards on mobile, Table on desktop.
 */

import {
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  School,
  LinkIcon,
  Eye,
  RotateCcw,
} from "lucide-react";
import { useState, useMemo } from "react";
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
import ChartLineNotes from "@/components/organisms/dashboard/ChartLineNotes";
import useDashboard from "@/hooks/useDashboard";
import { Note } from "@/types";
import { universityData } from "@/constants/index";
import { downloadFile } from "@/utils/downloadFile";

/** Helper: truncate long text */
const truncateText = (text: string, maxLength = 20) =>
  text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text || "N/A";

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
    searchTitleNote,
    setSearchTitleNote,
    universityFilterNote,
    setUniversityFilterNote,
    collageFilterNote,
    setCollageFilterNote,
    yearFilterNote,
    setYearFilterNote,
  } = useDashboard();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Note | null>(null);
  const [unpublishedNote, setUnpublishedNote] = useState(false);
  const [publishedNote, setPublishedNote] = useState(false);

  /** Dynamically get colleges based on selected university */
  const collegeOptions = useMemo(() => {
    const uni = universityData.find((u) => u.name === universityFilterNote);
    return uni ? uni.colleges : [];
  }, [universityFilterNote]);

  /** Reset filters */
  const resetFilters = () => {
    setSearchTitleNote("");
    setUniversityFilterNote("");
    setCollageFilterNote("");
    setYearFilterNote("");
  };

  const hasActiveFilters =
    searchTitleNote ||
    universityFilterNote ||
    collageFilterNote ||
    yearFilterNote;

  /** Table column config */
  const columns = [
    { header: "العنوان", accessor: "title", render: truncateText },
    { header: "الوصف", accessor: "description", render: truncateText },
    { header: "الجامعة", accessor: "university" },
    { header: "الكلية", accessor: "college" },
    { header: "المادة", accessor: "subject" },
    { header: "السنة", accessor: "year" },
    {
      header: "صاحب الملخص",
      accessor: "owner_id",
      render: (ownerId: string) => (
        <Link
          href={`/seller/${ownerId}`}
          className="text-blue-500 hover:underline"
        >
          {ownerId.slice(0, 10)}... <LinkIcon className="inline size-4" />
        </Link>
      ),
    },
    {
      header: "السعر",
      accessor: "price",
      render: (p: number) => `${p} ر.س`,
    },
    {
      header: "تاريخ الإضافة",
      accessor: "created_at",
      render: (d: string) => new Date(d).toLocaleDateString(),
    },
  ];

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
            <ChartLineNotes
              total={notesPagination?.totalItems}
              data={notesStats}
            />

            {/* Filters */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن ملاحظة..."
                  className="pl-10"
                  value={searchTitleNote}
                  onChange={(e) => setSearchTitleNote(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* University Filter */}
                <Select
                  value={universityFilterNote || ""}
                  onValueChange={(value) => {
                    setUniversityFilterNote(value);
                    setCollageFilterNote("");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <School className="h-4 w-4 opacity-70 mr-2" />
                    <SelectValue placeholder="كل الجامعات" />
                  </SelectTrigger>
                  <SelectContent>
                    {universityData.map((uni) => (
                      <SelectItem key={uni.id} value={uni.name}>
                        {uni.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* College Filter */}
                <Select
                  value={collageFilterNote || ""}
                  onValueChange={setCollageFilterNote}
                  disabled={!universityFilterNote}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="كل الكليات" />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeOptions.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Year Filter */}
                <Input
                  className="w-full"
                  placeholder="السنة"
                  value={yearFilterNote || ""}
                  onChange={(e) => setYearFilterNote(e.target.value)}
                />

                {/* Reset Button */}
                <Button
                  className="w-full flex items-center gap-2"
                  variant="outline"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                >
                  <RotateCcw className="w-4 h-4" />
                  مسح الفلاتر
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Mobile View (Cards) */}
            <div className="block md:hidden space-y-4">
              {notes?.length === 0 ? (
                <p className="text-center text-muted-foreground font-semibold text-lg my-10">
                  لا يوجد نتائج
                </p>
              ) : (
                notes?.map((note: Note) => (
                  <Card key={note._id} className="border p-4 shadow-sm">
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-base">
                        {truncateText(note.title, 40)}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {truncateText(note.description, 60)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">الجامعة: </span>{" "}
                        {note.university}
                      </p>
                      <p>
                        <span className="font-semibold"> الكلية: </span>{" "}
                        {note.college}
                      </p>
                      <p>
                        <span className="font-semibold"> السنة: </span>{" "}
                        {note.year}
                      </p>
                      <p>
                        <span className="font-semibold">السعر: </span>{" "}
                        {note.price} ر.س
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsDialogOpen(true);
                            setSelectedFile(note);
                          }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            downloadFile({
                              noteUrl: String(note.file_path),
                              noteName: String(note.title),
                            })
                          }
                        >
                          <Download className="size-4" />
                        </Button>
                        {note.isPublish ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedFile(note);
                              setUnpublishedNote(true);
                            }}
                          >
                            إلغاء النشر
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedFile(note);
                              setPublishedNote(true);
                            }}
                          >
                            نشر
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col, i) => (
                      <TableHead key={i} className="text-right">
                        {col.header}
                      </TableHead>
                    ))}
                    <TableHead className="text-right">الإجراءات</TableHead>
                    <TableHead className="text-right">النشر</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notes?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 2}
                        className="h-24 text-center font-semibold my-5 text-2xl"
                      >
                        لا يوجد نتائج
                      </TableCell>
                    </TableRow>
                  ) : (
                    notes?.map((note: Note) => (
                      <TableRow key={note._id}>
                        {columns.map((col, i) => (
                          <TableCell key={i}>
                            {col.render
                              ? col.render(
                                  note[col.accessor as keyof Note] as never
                                )
                              : (note[col.accessor as keyof Note] as never) ||
                                "N/A"}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setIsDialogOpen(true);
                                setSelectedFile(note);
                              }}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                downloadFile({
                                  noteUrl: String(note.file_path),
                                  noteName: String(note.title),
                                })
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {note.isPublish ? (
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setSelectedFile(note);
                                setUnpublishedNote(true);
                              }}
                            >
                              إلغاء النشر
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setSelectedFile(note);
                                setPublishedNote(true);
                              }}
                            >
                              نشر
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {notesPagination?.totalItems > 10 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                <span className="text-sm text-muted-foreground">
                  عرض {(notePage - 1) * noteLimit + 1}-
                  {Math.min(notePage * noteLimit, notesPagination.totalItems)}{" "}
                  من {notesPagination.totalItems}
                </span>

                <div className="flex items-center gap-3">
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
                      الصفحة {notePage} من {notesPagination.totalPages || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={notePage >= (notesPagination.totalPages || 1)}
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

      {/* Dialogs */}
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
