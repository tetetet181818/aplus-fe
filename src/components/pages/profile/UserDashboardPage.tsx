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
import { Skeleton } from "@/components/ui/skeleton";
import { NoteCardSkeleton } from "@/components/skeletons/NoteCardSkeleton";

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

  const {
    userNotes,
    userNotesLoading,
    purchasedNotes,
    purchasedNotesLoading,
    likedNotes,
    likedNotesLoading,
  } = useNotes();

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

  // ----------------- Skeleton Loading -----------------
  if (loading) {
    return (
      <div className="py-8 px-4 md:px-6 space-y-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-40 w-full rounded-md" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
      </div>
    );
  }

  // ----------------- UI -----------------
  return (
    <div className="py-8 px-4 md:px-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-20">
        <TabsList className="flex w-full flex-nowrap gap-2 bg-transparent p-2 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-inner mb-6 overflow-x-auto scrollbar-hide">
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
              className="flex-shrink-0 min-w-[100px] sm:min-w-[120px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-300
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-600 
        data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105
        hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 rounded-xl sm:rounded-full border border-transparent
        data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400"
            >
              <Icon className="size-4 sm:size-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{label}</span>
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
              onDeleteRequest={(note) => {
                setIsDeleteConfirmOpen(true);
                console.log("delete request", note);
              }}
              router={router}
              onDownloadRequest={(note) =>
                console.log("download request", note)
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
              onDownload={(note) => console.log("download note", note)}
              downloadLoading={false}
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
        onConfirm={() => console.log("confirm delete")}
        itemName={"ملخص تجريبي"}
      />
    </div>
  );
};

export default UserDashboardPage;
