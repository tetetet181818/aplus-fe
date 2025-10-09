import { useState, useCallback, memo } from "react";
import { ChevronDown, Check } from "lucide-react";

const sortOptions = [
  { value: "default", label: "الافتراضي", icon: "📝" },
  { value: "downloads_desc", label: "الأكثر تحميلًا", icon: "📥" },
  { value: "price_asc", label: "السعر: من الأقل للأعلى", icon: "💰" },
  { value: "price_desc", label: "السعر: من الأعلى للأقل", icon: "💎" },
  { value: "date_desc", label: "الأحدث", icon: "🆕" },
];

const NotesSortDropdown = memo(
  ({
    sortBy,
    onSortChange,
    setMaxDownloads,
    setMaxPrice,
    setMinPrice,
  }: {
    sortBy: string;
    onSortChange: (value: string) => void;
    setMaxDownloads: (value: boolean) => void;
    setMaxPrice: (value: boolean) => void;
    setMinPrice: (value: boolean) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentOption =
      sortOptions.find((option) => option.value === sortBy) || sortOptions[0];

    const handleSelect = useCallback(
      (value: string) => {
        setMaxDownloads(false);
        setMaxPrice(false);
        setMinPrice(false);

        switch (value) {
          case "downloads_desc":
            setMaxDownloads(true);
            break;
          case "price_desc":
            setMaxPrice(true);
            break;
          case "price_asc":
            setMinPrice(true);
            break;
        }

        onSortChange(value);
        setIsOpen(false);
      },
      [onSortChange, setMaxDownloads, setMaxPrice, setMinPrice]
    );

    return (
      <div className="relative w-full md:w-64">
        <div className="relative">
          <button
            id="sort-dropdown"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <div className="flex items-center">
              <span className="ml-2">{currentOption.icon}</span>
              <span>{currentOption.label}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-300"
                  role="listbox"
                >
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
                        sortBy === option.value
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : ""
                      }`}
                      onClick={() => handleSelect(option.value)}
                      role="option"
                      aria-selected={sortBy === option.value}
                    >
                      <span className="ml-2">{option.icon}</span>
                      <span className="flex-1">{option.label}</span>
                      {sortBy === option.value && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

NotesSortDropdown.displayName = "NotesSortDropdown";

export default NotesSortDropdown;
