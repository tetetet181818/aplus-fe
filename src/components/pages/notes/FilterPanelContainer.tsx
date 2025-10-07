import FilterPanel from "./FilterPanel";

export default function FilterPanelContainer({
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
}) {
  return (
    <FilterPanel
      filters={filters}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
      years={years}
    />
  );
}
