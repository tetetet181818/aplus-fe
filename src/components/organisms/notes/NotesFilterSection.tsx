import { motion } from "framer-motion";
import FilterPanel from "@/components/pages/notes/FilterPanel";

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
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
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
    </motion.div>
  );
}
