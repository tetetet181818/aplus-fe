import FilterPanel from '@/components/pages/notes/FilterPanel';

interface NotesFilterSectionProps {
  filterUniversity: string;
  setFilterUniversity: (value: string) => void;
  filterCollage: string;
  setFilterCollage: (value: string) => void;
  filterYear: string;
  resetFilters: () => void;
  setFilterYear: (value: string) => void;
  years: number[];
}
export default function NotesFilterSection({
  years,
  filterUniversity,
  setFilterUniversity,
  filterCollage,
  setFilterCollage,
  filterYear,
  setFilterYear,
  resetFilters,
}: NotesFilterSectionProps) {
  return (
    <div className="mb-8">
      <FilterPanel
        years={years}
        filterUniversity={filterUniversity}
        setFilterUniversity={setFilterUniversity}
        filterCollage={filterCollage}
        setFilterCollage={setFilterCollage}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        resetFilters={resetFilters}
      />
    </div>
  );
}
