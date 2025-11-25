import { motion } from 'framer-motion'
import FilterPanel from './FilterPanel'

export default function NotesFilterSection({
  filters,
  onFilterChange,
  onClearFilters,
  years,
}: {
  filters: {
    university: string
    college: string
    year: string
    maxPrice: string
    subject: string
    sortBy: string
  }
  onFilterChange: (type: string, value: string) => void
  onClearFilters: () => void
  years: number[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <FilterPanel
        filters={filters}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
        years={years}
      />
    </motion.div>
  )
}
