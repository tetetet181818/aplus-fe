import { memo, useCallback, useState } from 'react';

import { Check, ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'default', label: 'الافتراضي', icon: '📝' },
  { value: 'downloads_desc', label: 'الأكثر تحميلًا', icon: '📥' },
  { value: 'price_asc', label: 'السعر: من الأقل للأعلى', icon: '💰' },
  { value: 'price_desc', label: 'السعر: من الأعلى للأقل', icon: '💎' },
  { value: 'date_desc', label: 'الأحدث', icon: '🆕' },
];

const NotesSortDropdown = memo(
  ({
    sortBy,
    onSortChange,
  }: {
    sortBy: string;
    onSortChange: (value: string) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentOption =
      sortOptions.find(option => option.value === sortBy) || sortOptions[0];

    const handleSelect = useCallback(
      (value: string) => {
        onSortChange(value);
        setIsOpen(false);
      },
      [onSortChange]
    );

    return (
      <div className="relative w-full md:w-64">
        <label
          htmlFor="sort-dropdown"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          ترتيب حسب:
        </label>

        <div className="relative">
          <button
            id="sort-dropdown"
            onClick={() => setIsOpen(!isOpen)}
            className="dark:hover:bg-gray-750 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-200 hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <div className="flex items-center">
              <span className="ml-2">{currentOption.icon}</span>
              <span>{currentOption.label}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
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
              <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-300"
                  role="listbox"
                >
                  {sortOptions.map(option => (
                    <li
                      key={option.value}
                      className={`flex cursor-pointer items-center px-4 py-2 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        sortBy === option.value
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          : ''
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

NotesSortDropdown.displayName = 'NotesSortDropdown';

export default NotesSortDropdown;
