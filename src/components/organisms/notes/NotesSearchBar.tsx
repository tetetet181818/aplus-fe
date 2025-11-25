import { FileText, Search as SearchIcon, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface NotesSearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  setSearchType: (type: string) => void
}

export default function NotesSearchBar({
  searchQuery,
  setSearchQuery,
  setSearchType,
}: NotesSearchBarProps) {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex w-full items-center gap-2"
    >
      <div className="relative flex w-full items-center rounded-lg border border-gray-300">
        <SearchIcon className="text-muted-foreground absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />

        <Input
          type="search"
          placeholder={'ابحث عن ملخصات، مواد، أو جامعات...'}
          className="flex-grow border-none bg-transparent pr-10 shadow-none focus:border-none focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Select onValueChange={(value) => setSearchType(value)}>
        <SelectTrigger className="w-[60px]">
          <SearchIcon className="size-5" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">
            <User className="size-5" />
            <span>المستخدم</span>
          </SelectItem>
          <SelectItem value="file">
            <FileText className="size-5" />
            <span>ملخصات</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </form>
  )
}
