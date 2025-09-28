"use client";
import AddNotePage from "@/components/organisms/notes/AddNotePage";
import { useParams } from "next/navigation";
export default function Edit() {
  const { edit } = useParams();
  return <AddNotePage edit={!!edit} />;
}
