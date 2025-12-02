export async function downloadFile({
  noteUrl,
  noteName,
}: {
  noteUrl: string;
  noteName?: string;
}) {
  try {
    const fileNameFromUrl = noteUrl.split('/').pop()?.split('?')[0] || 'note';
    const finalFileName = `${noteName || fileNameFromUrl}.pdf`;

    const response = await fetch(noteUrl);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(
      new Blob([blob], {
        type: 'application/pdf',
      })
    );

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = finalFileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const fileNameFromUrl = noteUrl.split('/').pop()?.split('?')[0] || 'note';
    const finalFileName = `${noteName || fileNameFromUrl}.pdf`;

    const link = document.createElement('a');
    link.href = noteUrl;
    link.download = finalFileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
