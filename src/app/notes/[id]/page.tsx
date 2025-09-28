import NoteDetailPage from "@/components/pages/notes/NoteDetailPage";

export default async function NoteDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log(id);
  return <NoteDetailPage id={id} />;
}
