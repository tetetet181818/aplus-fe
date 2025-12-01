'use client';

import { useEffect, useState } from 'react';

import { universityData } from '@/constants/index';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Type definition for filters and setter props
 */
interface FilterPanelProps {
  years: number[];
  filterUniversity: string;
  setFilterUniversity: (value: string) => void;
  filterCollage: string;
  setFilterCollage: (value: string) => void;
  filterYear: string;
  setFilterYear: (value: string) => void;
  resetFilters: () => void;
}

/**
 * A reusable filtering panel allowing users to filter notes by university, college, and year.
 * Displays dynamic select options and handles user filter changes.
 */
const FilterPanel = ({
  years,
  filterUniversity,
  setFilterUniversity,
  filterCollage,
  setFilterCollage,
  filterYear,
  setFilterYear,
  resetFilters,
}: FilterPanelProps) => {
  const [availableColleges, setAvailableColleges] = useState<string[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);

  /** Extract universities from the constants file */
  const universities: string[] =
    universityData
      ?.map(university => university?.name)
      .filter((n): n is string => typeof n === 'string') || [];

  /** When university changes, update colleges accordingly */
  useEffect(() => {
    if (!filterUniversity || filterUniversity === 'all') {
      setAvailableColleges([]);
      return;
    }
    setIsLoadingColleges(true);
    const selectedUni = universityData.find(u => u.name === filterUniversity);
    setAvailableColleges(selectedUni?.colleges || []);
    setIsLoadingColleges(false);
  }, [filterUniversity]);

  /** Helper function to render <SelectItem> options */
  const renderSelectOptions = (items: string[], placeholder: string) => {
    if (isLoadingColleges) {
      return (
        <SelectItem value="loading" disabled>
          جاري التحميل...
        </SelectItem>
      );
    }
    if (!items || items.length === 0) {
      return (
        <SelectItem value="no-options" disabled>
          {placeholder}
        </SelectItem>
      );
    }
    return (
      <>
        <SelectItem value="all">الكل</SelectItem>
        {items.map(item => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </>
    );
  };

  /** Handle filter value changes */
  const handleUniversityChange = (value: string) => {
    if (value === 'all') {
      setFilterUniversity('');
      setFilterCollage(''); // Reset college when "all" is selected
    } else {
      setFilterUniversity(value);
    }
  };

  const handleCollageChange = (value: string) => {
    if (value === 'all') {
      setFilterCollage('');
    } else {
      setFilterCollage(value);
    }
  };

  const handleYearChange = (value: string) => {
    if (value === 'all') {
      setFilterYear('');
    } else {
      setFilterYear(value);
    }
  };

  return (
    <Card className="border bg-gray-50/50 shadow-sm dark:bg-gray-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold">تصفية النتائج</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
          disabled={isLoadingColleges}
          onClick={resetFilters}
        >
          <X className="ml-1 h-4 w-4" />
          مسح الفلاتر
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {/* University Filter */}
          <div className="space-y-2">
            <Label htmlFor="university">الجامعة</Label>
            <Select
              value={filterUniversity || 'all'}
              onValueChange={handleUniversityChange}
              disabled={universities.length === 0}
            >
              <SelectTrigger id="university" className="w-full">
                <SelectValue
                  placeholder={
                    universities.length === 0
                      ? 'لا توجد جامعات متاحة'
                      : 'اختر الجامعة'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {renderSelectOptions(universities, 'لا توجد جامعات متاحة')}
              </SelectContent>
            </Select>
          </div>

          {/* College Filter */}
          <div className="space-y-2">
            <Label htmlFor="college">الكلية</Label>
            <Select
              value={filterCollage || 'all'}
              onValueChange={handleCollageChange}
              disabled={
                isLoadingColleges ||
                !filterUniversity ||
                availableColleges.length === 0
              }
            >
              <SelectTrigger id="college" className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingColleges
                      ? 'جاري التحميل...'
                      : !filterUniversity
                        ? 'اختر جامعة أولاً'
                        : availableColleges.length === 0
                          ? 'لا توجد كليات متاحة'
                          : 'اختر الكلية'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {renderSelectOptions(availableColleges, 'لا توجد كليات متاحة')}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <Label htmlFor="year">السنة</Label>
            <Select
              value={filterYear || 'all'}
              onValueChange={handleYearChange}
              disabled={years.length === 0}
            >
              <SelectTrigger id="year" className="w-full">
                <SelectValue
                  placeholder={
                    years.length === 0 ? 'لا توجد سنوات متاحة' : 'اختر السنة'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {renderSelectOptions(
                  years.map(year => year.toString()),
                  'لا توجد سنوات متاحة'
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
