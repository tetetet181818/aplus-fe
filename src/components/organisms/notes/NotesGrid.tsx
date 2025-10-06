import NoteCard from "@/components/organisms/notes/NoteCard";
import { Note } from "@/types";

const NotesGrid = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {notes.map((note) => (
        <div key={note._id}>
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
