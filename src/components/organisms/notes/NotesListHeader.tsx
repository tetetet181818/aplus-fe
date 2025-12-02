'use client';
import { Filter, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

const NotesListHeader = ({
  onToggleFilters,
  showFilters,
  itemCount,
  totalCount,
  usersCount,
  usersTotalCount,
  hasActiveFilters,
  onClearFilters,
  searchType,
}: {
  onToggleFilters: () => void;
  showFilters: boolean;
  itemCount: number;
  totalCount: number;
  usersCount: number;
  usersTotalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  searchType: string;
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        {searchType === 'user' && (
          <h1 className="text-2xl font-bold tracking-tight">تصفح المستخدمين</h1>
        )}
        {searchType === 'file' && (
          <h1 className="text-2xl font-bold tracking-tight">تصفح الملخصات</h1>
        )}
        {searchType === 'user' && (
          <p className="text-muted-foreground text-sm">
            {hasActiveFilters ? (
              <>
                عرض <span className="font-medium">{usersCount}</span> من أصل{' '}
                <span className="font-medium">{usersTotalCount}</span> مستخدم
              </>
            ) : (
              <>
                إجمالي المستخدمين المسجلين:{' '}
                <span className="font-medium">{usersTotalCount}</span>
              </>
            )}
          </p>
        )}

        {searchType === 'note' && (
          <p className="text-muted-foreground text-sm">
            {hasActiveFilters ? (
              <>
                عرض <span className="font-medium">{itemCount}</span> من أصل{' '}
                <span className="font-medium">{totalCount}</span> ملخص
              </>
            ) : (
              <>
                إجمالي الملخصات المتاحة:{' '}
                <span className="font-medium">{totalCount}</span>
              </>
            )}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-1.5"
          >
            <X className="h-4 w-4" />
            مسح الفلاتر
          </Button>
        )}
        {searchType === 'file' && (
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleFilters}
            className="flex items-center gap-1.5"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotesListHeader;
