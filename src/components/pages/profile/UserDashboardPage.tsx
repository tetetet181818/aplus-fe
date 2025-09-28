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

import EditProfileDialog from "@/components/molecules/dialogs/EditProfileDialog";
import UserNotesTab from "@/components/pages/profile/UserNotesTab";
import PurchasedNotesTab from "@/components/pages/profile/PurchasedNotesTab";
import DeleteConfirmationDialog from "@/components/molecules/dialogs/DeleteConfirmationDialog";
import ReviewDialog from "@/components/molecules/dialogs/ReviewDialog";
import ProfileInfoTab from "@/components/pages/profile/ProfileInfoTab";
import EarningsTab from "@/components/pages/profile/EarningsTab";
import NotesLikedTab from "@/components/pages/profile/NotesLikedTab";
import { Note, User } from "@/types";

interface PurchasedNote extends Note {
  saleId: string;
}

// ----------------- Static Data -----------------
const staticUser: User = {
  _id: "u1",
  fullName: "محمد علي أحمد",
  email: "mohamed@example.com",
  university: "جامعة الملك سعود",
  balance: 500,
  withdrawal_times: 2,
  password: "password",
  role: "student",
  createdAt: "2025-09-01",
  updatedAt: "2025-09-01",
};

const staticNotes: Note[] = [
  {
    id: "n1",
    title: "ملخص الرياضيات",
    description: "يغطي أساسيات التفاضل والتكامل مع أمثلة محلولة.",
    price: 25,
    downloads: 10,
    cover_url:
      "https://images.unsplash.com/photo-1509223197845-458d87318791?w=400&q=80",
  },
  {
    id: "n2",
    title: "ملخص الفيزياء",
    description: "ملاحظات شاملة عن الميكانيكا الكلاسيكية.",
    price: 30,
    downloads: 5,
    cover_url:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
  },
];

const staticPurchasedNotes: PurchasedNote[] = [
  {
    id: "p1",
    title: "ملخص الأدب العربي",
    description: "تحليل النصوص الشعرية والنثرية مع أسئلة للمراجعة.",
    price: 20,
    saleId: "ORD-101",
    cover_url:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
  },
];

const UserDashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.replace(`/profile?${params.toString()}`);
  };

  // ----------------- UI -----------------
  return (
    <>
      <div className="py-8 px-4 md:px-6">
        {/* <UserProfileCard
          currentUser={staticUser}
          onEditProfile={() => setIsEditProfileOpen(true)}
          userNotesCount={staticNotes.length}
          purchasedNotesCount={staticPurchasedNotes.length}
          totalEarnings={userTotalEarnings}
        /> */}

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mt-20"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-muted/50 dark:bg-muted/30 p-1.5 rounded-lg mb-6">
            {[
              { value: "profile", icon: UserIcon, label: "معلوماتي" },
              { value: "my-notes", icon: BookOpen, label: "ملخصاتي" },
              { value: "purchased", icon: ShoppingBag, label: "مشترياتي" },
              { value: "earnings", icon: DollarSign, label: "أرباحي" },
              { value: "notesLiked", icon: Heart, label: "الاعجابات" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex flex-col md:flex-row items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium transition-all
                    data-[state=active]:bg-primary data-[state=active]:text-white
                    data-[state=active]:shadow-sm rounded-md hover:bg-muted dark:hover:bg-muted/50"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <ProfileInfoTab
              user={staticUser}
              loading={false}
              updateUserInfo={() => console.log("update user")}
              deleteAccount={() => console.log("delete account")}
              updateUserPassword={() => console.log("update password")}
            />
          </TabsContent>

          {/* User Notes Tab */}
          <TabsContent value="my-notes" className="mt-6">
            <UserNotesTab
              notes={staticNotes}
              onDeleteRequest={(note) => {
                console.log("delete request", note);
                setIsDeleteConfirmOpen(true);
              }}
              onNavigate={router.push}
              onDownloadRequest={(note) =>
                console.log("download request", note)
              }
              loading={false}
            />
          </TabsContent>

          {/* Purchased Notes Tab */}
          <TabsContent value="purchased" className="mt-6">
            <PurchasedNotesTab
              notes={staticPurchasedNotes}
              onReviewRequest={(note) => {
                console.log("review request", note);
                setIsReviewDialogOpen(true);
              }}
              hasUserReviewed={() => false}
              userId={staticUser._id}
              onNavigate={router.push}
              onDownload={(note) => console.log("download note", note)}
              downloadLoading={false}
              loading={false}
            />
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="mt-6">
            <EarningsTab
              currentUser={staticUser}
              getSellerNotes={() => Promise.resolve(staticNotes)}
            />
          </TabsContent>

          {/* Liked Notes Tab */}
          <TabsContent value="notesLiked" className="mt-6">
            <NotesLikedTab />
          </TabsContent>
        </Tabs>

        <EditProfileDialog
          isOpen={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          user={staticUser}
          onUpdateProfile={() => console.log("update profile")}
          universities={["جامعة الملك سعود", "جامعة القاهرة"]}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteConfirmOpen}
          onOpenChange={setIsDeleteConfirmOpen}
          onConfirm={() => console.log("confirm delete")}
          itemName={"ملخص تجريبي"}
        />

        <ReviewDialog
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          noteTitle={"ملخص تجريبي"}
          onSubmit={(rating: number, comment: string) =>
            console.log("submit review", rating, comment)
          }
          user={staticUser}
        />
      </div>
    </>
  );
};

export default UserDashboardPage;
