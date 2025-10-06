"use client";

import {
  useDeleteNoteMutation,
  useGetSingleNoteQuery,
  useMakeLikeNoteMutation,
  useMakeUnlikeNoteMutation,
  useToggleLikeQuery,
} from "@/store/api/note.api";
import { downloadFile } from "@/utils/downloadFile";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useNotes from "./useNotes";

export default function useNoteDetail(id: string) {
  const { handlePurchaseNote } = useNotes();
  const router = useRouter();
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("access_token");
  }
  const { data: note, isLoading: getSingleLoading } = useGetSingleNoteQuery(id);
  const [makeLikeNote, { isLoading: likeLoading }] = useMakeLikeNoteMutation();
  const [makeUnlikeNote, { isLoading: unlikeLoading }] =
    useMakeUnlikeNoteMutation();
  const { data: toggleLike } = useToggleLikeQuery({
    noteId: id,
    token: token || "",
  });
  const [deleteNote, { isLoading: deleteNoteLoading }] =
    useDeleteNoteMutation();

  const handlePurchase = () => handlePurchaseNote({ noteId: id });
  const handleReviewRequest = () => console.log("طلب المراجعة");
  const handleDownloadFile = ({
    noteUrl,
    noteName,
  }: {
    noteUrl: string;
    noteName?: string;
  }) => downloadFile({ noteUrl, noteName });

  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    const res = await deleteNote({ noteId, token: token || "" });
    if (res) {
      toast.success(res?.data?.message);
      router.push("/notes");
    }
  };
  const addNoteToLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeLikeNote({ noteId, token: token || "" });
    if (res) {
      toast.success(res?.data?.message);
    }
  };
  const removeNoteFromLikeList = async ({ noteId }: { noteId: string }) => {
    const res = await makeUnlikeNote({ noteId, token: token || "" });
    if (res) {
      toast.success(res?.data?.message);
    }
  };

  return {
    note: note?.data,
    loading: getSingleLoading,
    handlePurchase,
    handleReviewRequest,
    addNoteToLikeList,
    handleDownloadFile,
    removeNoteFromLikeList,
    likeLoading,
    unlikeLoading,
    toggleLike: toggleLike?.data,
    handleDeleteNote,
    deleteNoteLoading,
  };
}
