import { BookOpen } from "lucide-react";

import NotesGrid from "@/components/organisms/notes/NotesGrid";
import NoResults from "@/components/atoms/NoResults";
import { Note } from "@/types";

export default function NotesResultsSection({
  filteredNotes,
}: {
  filteredNotes: Note[];
}) {
  if (filteredNotes?.length > 0) {
    return <NotesGrid notes={filteredNotes} />;
  }

  if (filteredNotes?.length === 0) {
    return (
      <NoResults
        icon={<BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />}
        title="لا توجد ملخصات"
        message={"لا توجد ملخصات متاحة في الوقت الحالي."}
      />
    );
  }
}
