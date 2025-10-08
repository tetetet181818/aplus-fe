"use client";

import { useRouter } from "next/navigation";
import AddNoteForm from "./AddNoteForm";
import AddNoteLoginPrompt from "./AddNoteLoginPrompt";
import AddNotePageHeader from "./AddNotePageHeader";
import useAuth from "@/hooks/useAuth";

const AddNotePage = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  if (loading && !isAuthenticated) {
    return <AddNoteLoginPrompt onNavigate={router.push} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6">
      <AddNotePageHeader onBack={router.back} />

      <AddNoteForm />
    </div>
  );
};

export default AddNotePage;
