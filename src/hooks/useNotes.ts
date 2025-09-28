"use client";
import { useState } from "react";
import {
  useCreateNoteMutation,
  useGetAllNotesQuery,
} from "@/store/api/note.api";
import { CreateNoteData } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useNotes() {
  const router = useRouter();
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("access_token");
  }

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // Fetch notes with pagination
  const {
    data,
    isLoading: notesLoading,
    isFetching,
  } = useGetAllNotesQuery({ token, page, limit });

  const [createNote, { isLoading: createNoteLoading }] =
    useCreateNoteMutation();

  const handleCreateNote = async (noteData: CreateNoteData) => {
    try {
      const res = await createNote({ noteData, token: token! });
      if (res?.data?.message) {
        toast.success("تم إضافة الملخص بنجاح");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ");
    }
  };

  // ---- Pagination Logic ----
  const total = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    notes: data?.data || [],
    notesLoading,
    isFetching,
    handleCreateNote,
    createNoteLoading,

    // Pagination handlers
    pagination: {
      total,
      page,
      limit,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
      changeLimit,
    },
  };
}
