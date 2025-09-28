"use client";
import { useState, useCallback } from "react";
import NotesListHeader from "@/components/organisms/notes/NotesListHeader";
import NotesSearchBar from "@/components/organisms/notes/NotesSearchBar";
import NotesSortDropdown from "@/components/organisms/notes/NotesSortDropdown";
import NotesFilterSection from "@/components/organisms/notes/NotesFilterSection";
import NotesResultsSection from "@/components/organisms/notes/NotesResultsSection";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import useNotes from "@/hooks/useNotes";
import NoteCardSkeleton from "@/components/atoms/NotesSkeleton";
import Pagination from "@/components/atoms/Pagination";

// Static Users
const staticUsers: User[] = [
  {
    _id: "1",
    fullName: "أحمد علي",
    email: "ahmed@example.com",
    password: "",
    university: "",
    role: "",
    balance: 0,
    withdrawal_times: 0,
    likes_list: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "2",
    fullName: "سارة محمد",
    email: "sara123@example.com",
    password: "",
    university: "",
    role: "",
    balance: 0,
    withdrawal_times: 0,
    likes_list: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "3",
    fullName: "محمد عبد الله",
    email: "mohamed@example.com",
    password: "",
    university: "",
    role: "",
    balance: 0,
    withdrawal_times: 0,
    likes_list: [],
    createdAt: "",
    updatedAt: "",
  },
];

export const metaData = {
  title: "تصفح وابحث عن الملخصات",
  description: "تصفح وابحث عن أفضل الملخصات الدراسية الجامعية",
  keywords: ["ملخصات دراسية", "جامعة", "ملخصات جامعية", "دروس", "محاضرات"],
};

const NotesListPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("file");
  const [showFilters, setShowFilters] = useState(false);
  const { notes, notesLoading, pagination } = useNotes();
  const toggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);

  const [filters, setFilters] = useState({
    university: "",
    college: "",
    year: "",
    maxPrice: "",
    subject: "",
    sortBy: "default",
  });
  return (
    <div className="py-12 px-4 md:px-6">
      <NotesListHeader
        onToggleFilters={toggleFilters}
        showFilters={showFilters}
        itemCount={notes?.length}
        totalCount={notes?.length}
        hasActiveFilters={false}
        onClearFilters={() => {}}
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <NotesSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchType={setSearchType}
          searchType={searchType}
        />
        {searchType === "file" && (
          <NotesSortDropdown sortBy={filters.sortBy} onSortChange={() => {}} />
        )}
      </div>

      {showFilters && searchType === "file" && (
        <NotesFilterSection
          filters={filters}
          onFilterChange={() => {}}
          onClearFilters={() => {}}
          years={[2023, 2022, 2021]}
        />
      )}

      {notesLoading ? (
        <NoteCardSkeleton />
      ) : searchType === "file" ? (
        <>
          <NotesResultsSection
            filteredNotes={notes}
            hasActiveFilters={false}
            onClearFilters={() => {}}
          />
          {pagination && <Pagination pagination={pagination} />}
        </>
      ) : (
        <>
          <div className="flex justify-around items-center flex-wrap gap-4">
            {staticUsers.map((user) => (
              <div
                key={user._id}
                className="p-4 border rounded-lg shadow-sm bg-white w-fit flex justify-around items-center flex-col"
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
                    alt={user.fullName}
                  />
                  <AvatarFallback>
                    {user.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{user.fullName}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <Link
                  className="text-blue-500 hover:underline"
                  href={`/seller/${user._id}`}
                >
                  ملف المستخدم
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesListPage;
