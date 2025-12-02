'use client';
import { useParams } from 'next/navigation';

import UpdateNotePage from '@/components/organisms/notes/UpdateNotePage';

import useAuth from '@/hooks/useAuth';

export default function Edit() {
  const { edit } = useParams();
  const { isAuthenticated, loading } = useAuth();
  return (
    <UpdateNotePage
      isAuthenticated={isAuthenticated}
      edit={edit as string}
      loading={loading}
    />
  );
}
