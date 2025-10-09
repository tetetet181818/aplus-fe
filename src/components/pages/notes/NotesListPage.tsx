"use client";

import { useState, useCallback } from "react";

import NotesListHeader from "@/components/organisms/notes/NotesListHeader";
import NotesSearchBar from "@/components/organisms/notes/NotesSearchBar";
import NotesSortDropdown from "@/components/organisms/notes/NotesSortDropdown";
import NotesFilterSection from "@/components/organisms/notes/NotesFilterSection";
import NotesResultsSection from "@/components/organisms/notes/NotesResultsSection";
import NoteCardSkeleton from "@/components/atoms/NotesSkeleton";
import Pagination from "@/components/atoms/Pagination";

import useNotes from "@/hooks/useNotes";
import useAuth from "@/hooks/useAuth";
import UserModeSection from "./UserModeSection";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const NotesListPage = () => {
  /** UI state */
  const [searchType, setSearchType] = useState<string>("file");
  const [showFilters, setShowFilters] = useState(false);

  /** Hooks */
  const {
    notes,
    notesLoading,
    pagination,
    filterUniversity,
    setFilterUniversity,
    filterCollage,
    setFilterCollage,
    filterYear,
    setFilterYear,
    resetFilters,
    setSortOrder,
    setMaxDownloads,
    setMaxPrice,
    setMinPrice,
    sortOrder,
    filterTitle,
    setFilterTitle,
  } = useNotes();

  const {
    allUsers,
    usersLoading,
    currentPageUser,
    totalUsers,
    filterFullName,
    setFilterFullName,
    totalPages,
    handleNextPage,
    handlePrevPage,
  } = useAuth();

  /** Toggle filters sidebar */
  const toggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);

  return (
    <div className="py-12 px-4 md:px-6">
      {/* Header */}
      <NotesListHeader
        onToggleFilters={toggleFilters}
        showFilters={showFilters}
        itemCount={notes?.length}
        totalCount={notes?.length}
        hasActiveFilters={false}
        onClearFilters={() => {}}
      />

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        {searchType === "user" && (
          <div className="relative flex w-full items-center mr-4">
            <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder={"ابحث عن المستخدمين..."}
              className="pr-10"
              value={filterFullName}
              onChange={(e) => setFilterFullName(e.target.value)}
            />
          </div>
        )}

        {searchType === "file" && (
          <NotesSearchBar
            searchQuery={filterTitle}
            setSearchQuery={setFilterTitle}
            setSearchType={setSearchType}
          />
        )}
        {searchType === "file" && (
          <NotesSortDropdown
            sortBy={sortOrder}
            onSortChange={setSortOrder}
            setMaxDownloads={setMaxDownloads}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        )}
      </div>

      {/* Filters */}
      {showFilters && searchType === "file" && (
        <NotesFilterSection
          years={[2026, 2025, 2023, 2022, 2021]}
          filterUniversity={filterUniversity}
          setFilterUniversity={setFilterUniversity}
          filterCollage={filterCollage}
          setFilterCollage={setFilterCollage}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          resetFilters={resetFilters}
        />
      )}

      {/* Notes Mode */}
      {searchType === "file" ? (
        notesLoading ? (
          <NoteCardSkeleton />
        ) : (
          <>
            <NotesResultsSection filteredNotes={notes} />
            {pagination?.total > 5 && <Pagination pagination={pagination} />}
          </>
        )
      ) : (
        /* Users Mode */
        <UserModeSection
          allUsers={allUsers}
          usersLoading={usersLoading}
          currentPageUser={currentPageUser}
          totalUsers={totalUsers}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </div>
  );
};

export default NotesListPage;
