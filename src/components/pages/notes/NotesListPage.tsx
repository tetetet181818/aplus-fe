'use client';

import { useCallback, useState } from 'react';

import { FileText, SearchIcon, User } from 'lucide-react';

import NoteCardSkeleton from '@/components/atoms/NotesSkeleton';
import Pagination from '@/components/atoms/Pagination';
import NotesFilterSection from '@/components/organisms/notes/NotesFilterSection';
import NotesListHeader from '@/components/organisms/notes/NotesListHeader';
import NotesResultsSection from '@/components/organisms/notes/NotesResultsSection';
import NotesSearchBar from '@/components/organisms/notes/NotesSearchBar';
import NotesSortDropdown from '@/components/organisms/notes/NotesSortDropdown';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import useAuth from '@/hooks/useAuth';
import useNotes from '@/hooks/useNotes';

import UserModeSection from './UserModeSection';

const NotesListPage = () => {
  const [searchType, setSearchType] = useState<string>('file');
  const [showFilters, setShowFilters] = useState(false);

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
  const toggleFilters = useCallback(() => setShowFilters(prev => !prev), []);

  return (
    <div className="px-4 py-12 md:px-6 dark:bg-gray-900">
      {/* Header */}
      <NotesListHeader
        onToggleFilters={toggleFilters}
        showFilters={showFilters}
        itemCount={notes?.length}
        totalCount={notes?.length}
        usersCount={allUsers?.length}
        usersTotalCount={allUsers?.length}
        hasActiveFilters={false}
        onClearFilters={resetFilters}
        searchType={searchType}
      />

      {/* Search and Sort Bar */}
      <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
        {searchType === 'user' && (
          <>
            <div className="relative mr-4 flex w-full items-center">
              <SearchIcon className="text-muted-foreground absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />

              <Input
                type="search"
                placeholder={'ابحث عن المستخدمين...'}
                className="border pr-10 dark:border-gray-900"
                value={filterFullName}
                onChange={e => setFilterFullName(e.target.value)}
              />
            </div>
            <Select onValueChange={value => setSearchType(value)}>
              <SelectTrigger className="w-[60px]">
                <SearchIcon className="size-5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  <User className="size-5" />
                  <span>المستخدم</span>
                </SelectItem>
                <SelectItem value="file">
                  <FileText className="size-5" />
                  <span>ملخصات</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        {searchType === 'file' && (
          <NotesSearchBar
            searchQuery={filterTitle}
            setSearchQuery={setFilterTitle}
            setSearchType={setSearchType}
          />
        )}

        {searchType === 'file' && (
          <NotesSortDropdown
            sortBy={sortOrder}
            onSortChange={setSortOrder}
            setMaxDownloads={setMaxDownloads}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        )}
      </div>

      {showFilters && searchType === 'file' && (
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

      {searchType === 'file' ? (
        notesLoading ? (
          <NoteCardSkeleton />
        ) : (
          <>
            <NotesResultsSection filteredNotes={notes} />
            {pagination?.total > 10 && <Pagination pagination={pagination} />}
          </>
        )
      ) : (
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
