'use client';

import { useRouter } from 'next/navigation';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';

import useAuth from '@/hooks/useAuth';

import AddNoteForm from './AddNoteForm';
import AddNoteLoginPrompt from './AddNoteLoginPrompt';
import AddNotePageHeader from './AddNotePageHeader';

const AddNotePage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AddNoteLoginPrompt onNavigate={router.push} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900">
      <AddNotePageHeader onBack={router.back} />

      <AddNoteForm />
    </div>
  );
};

export default AddNotePage;
