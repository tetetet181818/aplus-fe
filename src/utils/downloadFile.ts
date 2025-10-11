export function downloadFile({
  noteUrl,
  noteName,
}: {
  noteUrl: string;
  noteName?: string;
}) {
  // Extract filename from URL if none provided
  const fileNameFromUrl = noteUrl.split("/").pop()?.split("?")[0] || "note";

  // Pick the correct name and make sure it ends with .pdf once
  let finalFileName = noteName || fileNameFromUrl;
  if (!finalFileName.toLowerCase().endsWith(".pdf")) {
    finalFileName += ".pdf";
  }

  // Create a link and trigger the download
  const link = document.createElement("a");
  link.href = noteUrl;
  link.download = finalFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
