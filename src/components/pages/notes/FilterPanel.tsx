"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { universityData } from "@/constants/index";

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  years,
}: {
  filters: {
    university: string;
    college: string;
    year: string;
    maxPrice: string;
    subject: string;
    sortBy: string;
  };
  onFilterChange: (type: string, value: string) => void;
  onClearFilters: () => void;
  years: number[];
}) => {
  const [availableColleges, setAvailableColleges] = useState<string[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);

  // Extract universities from universityData
  const universities: string[] =
    universityData
      ?.map((university) => university?.name)
      .filter((n): n is string => typeof n === "string") || [];

  useEffect(() => {
    const loadColleges = async () => {
      if (!filters?.university) {
        setAvailableColleges([] as string[]);
        return;
      }

      setIsLoadingColleges(true);
      try {
        // Find the selected university in universityData
        const selectedUniversity = universityData?.find(
          (uni) => uni.name === filters?.university
        );

        const colleges: string[] =
          (selectedUniversity?.colleges as string[]) || [];
        setAvailableColleges(colleges);
      } catch (err) {
        console.error("Error loading colleges:", err);
        setAvailableColleges([] as string[]);
      } finally {
        setIsLoadingColleges(false);
      }
    };

    loadColleges();
  }, [filters?.university]);

  const renderSelectOptions = (items: string[], placeholder: string) => {
    if (isLoadingColleges) {
      return (
        <SelectItem value="loading" disabled>
          جاري التحميل...
        </SelectItem>
      );
    }

    if (!items || items?.length === 0) {
      return (
        <SelectItem value="no-options" disabled>
          {placeholder}
        </SelectItem>
      );
    }

    return (
      <>
        <SelectItem value="all">الكل</SelectItem>
        {items?.map((item: string) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </>
    );
  };

  const handleValueChange = (type: string, value: string) => {
    if (value === "all") {
      onFilterChange(type, "");
    } else {
      onFilterChange(type, value);
    }
  };

  return (
    <Card className="bg-gray-50/50 dark:bg-gray-900/50 border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold">تصفية النتائج</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-destructive"
          disabled={isLoadingColleges}
        >
          <X className="h-4 w-4 ml-1" />
          مسح الفلاتر
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="university">الجامعة</Label>
            <Select
              value={filters?.university || ""}
              onValueChange={(value) => handleValueChange("university", value)}
              disabled={universities.length === 0}
            >
              <SelectTrigger id="university" className="w-full">
                <SelectValue
                  placeholder={
                    universities.length === 0
                      ? "لا توجد جامعات متاحة"
                      : "اختر الجامعة"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {renderSelectOptions(universities, "لا توجد جامعات متاحة")}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="college">الكلية</Label>
            <Select
              value={filters?.college || ""}
              onValueChange={(value) => handleValueChange("college", value)}
              disabled={
                isLoadingColleges ||
                !filters?.university ||
                availableColleges.length === 0
              }
            >
              <SelectTrigger id="college" className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingColleges
                      ? "جاري التحميل..."
                      : !filters?.university
                      ? "اختر جامعة أولاً"
                      : availableColleges.length === 0
                      ? "لا توجد كليات متاحة"
                      : "اختر الكلية"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {renderSelectOptions(availableColleges, "لا توجد كليات متاحة")}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">السنة</Label>
            <Select
              value={filters?.year?.toString() || ""}
              onValueChange={(value) => handleValueChange("year", value)}
              disabled={years.length === 0}
            >
              <SelectTrigger id="year" className="w-full">
                <SelectValue
                  placeholder={
                    years.length === 0 ? "لا توجد سنوات متاحة" : "اختر السنة"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {renderSelectOptions(
                  years.map((year) => year.toString()),
                  "لا توجد سنوات متاحة"
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
