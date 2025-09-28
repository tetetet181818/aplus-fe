export function downloadFile({
  noteUrl,
  noteName,
}: {
  noteUrl: string;
  noteName?: string;
}) {
  const fileNameFromUrl = noteUrl.split("/").pop()?.split("?")[0] || "file";
  const finalFileName = noteName || fileNameFromUrl;

  const link = document.createElement("a");
  link.href = noteUrl;
  link.setAttribute("download", finalFileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
