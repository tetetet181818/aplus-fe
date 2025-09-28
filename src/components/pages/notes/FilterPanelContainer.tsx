import FilterPanel from "./FilterPanel";

export default function FilterPanelContainer({
  filters,
  onFilterChange,
  onClearFilters,
  universities,
  years,
}: {
  filters: any;
  onFilterChange: (type: string, value: string) => void;
  onClearFilters: () => void;
  universities: string[];
  years: number[];
}) {
  return (
    <FilterPanel
      filters={filters}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
      universities={universities}
      years={years}
    />
  );
}
