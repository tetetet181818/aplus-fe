"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User as UserIcon,
  BookOpen,
  ShoppingBag,
  DollarSign,
  Heart,
} from "lucide-react";

import UserNotesTab from "@/components/pages/profile/UserNotesTab";
import PurchasedNotesTab from "@/components/pages/profile/PurchasedNotesTab";
import DeleteConfirmationDialog from "@/components/molecules/dialogs/DeleteConfirmationDialog";
import ProfileInfoTab from "@/components/pages/profile/ProfileInfoTab";
import EarningsTab from "@/components/pages/profile/EarningsTab";
import NotesLikedTab from "@/components/pages/profile/NotesLikedTab";

import useAuth from "@/hooks/useAuth";
import useNotes from "@/hooks/useNotes";
import { NoteCardSkeleton } from "@/components/skeletons/NoteCardSkeleton";
import useNoteDetail from "@/hooks/useNoteDetail";
import ShouldLoginPrompt from "@/components/organisms/ShouldLoginPrompt";
import { downloadFile } from "@/utils/downloadFile";

/**
 * UserDashboardPage
 *
 * A tabbed dashboard page where users can:
 * - View and update profile info
 * - Manage their own notes
 * - See purchased notes and leave reviews
 * - Check their earnings
 * - Browse liked notes
 *
 * Displays skeleton placeholders while loading user data.
 */
const UserDashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const {
    userNotes,
    userNotesLoading,
    purchasedNotes,
    purchasedNotesLoading,
    likedNotes,
    likedNotesLoading,
  } = useNotes();
  const { handleDeleteNote, deleteNoteLoading } = useNoteDetail(
    itemToDelete || ""
  );

  // Dialog states
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Current active tab (from URL query param)
  const activeTab = searchParams.get("tab") || "profile";

  /**
   * Update URL query param when the active tab changes
   * @param value - the tab identifier
   */

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.replace(`/profile?${params.toString()}`);
  };

  if (!user) {
    return <ShouldLoginPrompt onNavigate={router.push} />;
  }

  // ----------------- UI -----------------
  return (
    <div className="py-8 px-4 md:px-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-20">
        <TabsList className="w-full h-auto grid grid-cols-1 md:grid-cols-5">
          {[
            { value: "profile", icon: UserIcon, label: "معلوماتي" },
            { value: "my-notes", icon: BookOpen, label: "ملخصاتي" },
            { value: "purchased", icon: ShoppingBag, label: "مشترياتي" },
            { value: "earnings", icon: DollarSign, label: "أرباحي" },
            { value: "notesLiked", icon: Heart, label: "إعجاباتي" },
          ].map(({ value, icon: Icon, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-lg"
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <ProfileInfoTab user={user} loading={loading} />
        </TabsContent>

        {/* User Notes Tab */}
        <TabsContent value="my-notes" className="mt-6">
          {userNotesLoading ? (
            <NoteCardSkeleton />
          ) : (
            <UserNotesTab
              notes={userNotes}
              onDeleteRequest={(noteId: string) => {
                setIsDeleteConfirmOpen(true);
                setItemToDelete(noteId);
              }}
              router={router}
              onDownloadRequest={(note) =>
                downloadFile({
                  noteUrl: note.file_path as string,
                  noteName: note.title as string,
                })
              }
              loading={userNotesLoading}
            />
          )}
        </TabsContent>

        {/* Purchased Notes Tab */}
        <TabsContent value="purchased" className="mt-6">
          {purchasedNotesLoading ? (
            <NoteCardSkeleton />
          ) : (
            <PurchasedNotesTab
              notes={purchasedNotes}
              router={router}
              onDownload={(note) =>
                downloadFile({
                  noteUrl: note.file_path as string,
                  noteName: note.title as string,
                })
              }
              loading={purchasedNotesLoading}
            />
          )}
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="mt-6">
          <EarningsTab currentUser={user} />
        </TabsContent>

        {/* Liked Notes Tab */}
        <TabsContent value="notesLiked" className="mt-6">
          {likedNotesLoading ? (
            <NoteCardSkeleton />
          ) : (
            <NotesLikedTab notes={likedNotes} />
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={() => handleDeleteNote({ noteId: itemToDelete || "" })}
        itemName={"ملخص تجريبي"}
        loading={deleteNoteLoading}
      />
    </div>
  );
};

export default UserDashboardPage;
