"use client";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import AddNoteLoginPrompt from "./AddNoteLoginPrompt";
import { useRouter } from "next/navigation";

export default function UpdateNotePage({
  edit,
  isAuthenticated,
  loading,
}: {
  edit: string;
  isAuthenticated: boolean;
  loading: boolean;
}) {
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <AddNoteLoginPrompt onNavigate={router.push} />;
  }
  console.log(edit);
  return <div>UpdateNotePage</div>;
}
