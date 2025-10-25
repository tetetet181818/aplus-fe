"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import NoResults from "@/components/atoms/NoResults";
import {
  NoteHeader,
  NoteImage,
  NoteDescription,
  NoteMeta,
  NoteAuthorInfo,
  NoteActions,
  NotePurchaseConfirmationDialog,
} from "@/components/organisms/notes/NoteDetailComponents";
import ReviewDialog from "@/components/molecules/dialogs/ReviewDialog";
import Head from "next/head";
import NoteReviews from "@/components/organisms/notes/NoteReviews";
import useNoteDetail from "@/hooks/useNoteDetail";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import useNotes from "@/hooks/useNotes";
import { downloadFile } from "@/utils/downloadFile";

/**
 * Note detail page component with skeleton loader and error handling.
 * Renders full note details when available, skeleton while loading,
 * and an error state if the note is not found.
 *
 * @param {Object} props
 * @param {string} props.id - The ID of the note to fetch and display.
 * @returns {JSX.Element} The rendered note detail page.
 */
const NoteDetailPage = ({ id }: { id: string }) => {
  const {
    note,
    loading,
    handlePurchase,
    addNoteToLikeList,
    removeNoteFromLikeList,
    likeLoading,
    toggleLike,
    deleteNoteLoading,
    handleDeleteNote,
    confirmPurchase,
    isPurchaseConfirmOpen,
    setIsPurchaseConfirmOpen,
  } = useNoteDetail(id);
  const { user, isAuthenticated } = useAuth();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const router = useRouter();

  const {
    handelAddReviewToNote,
    addReviewLoading,
    handelRemoveReviewFromNote,
    removeReviewLoading,
  } = useNotes();
  if (!loading && !note) {
    return (
      <NoResults
        icon={<AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />}
        title="حدث خطأ"
        message="الملخص غير موجود"
        actionButton={
          <Button onClick={() => router.push("/notes")}>
            العودة إلى قائمة الملخصات
          </Button>
        }
      />
    );
  }

  if (loading) {
    return (
      <main className="py-8 px-4 md:px-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </main>
    );
  }
  const isOwner = note?.owner_id === user?._id;

  return (
    <>
      <Head>
        <title>{`${note.title} | منصة أ+`}</title>
        <meta name="description" content={note.description.substring(0, 160)} />
      </Head>

      <main className="py-8 px-4 md:px-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" /> العودة
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <NoteHeader
              title={note.title}
              price={note.price}
              rating={note.rating}
              noteId={note?._id}
              addNoteToLikeList={addNoteToLikeList}
              removeNoteFromLikeList={removeNoteFromLikeList}
              user={user}
              likeLoading={likeLoading}
              toggleLike={toggleLike}
            />

            <NoteImage src={note.cover_url} alt={note.title} />
            <NoteDescription description={note.description} />
            <NoteReviews
              user={user}
              loading={loading}
              reviews={note?.reviews}
              noteId={note?._id}
              removeReviewFromNote={handelRemoveReviewFromNote}
              removeReviewLoading={removeReviewLoading}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <NoteMeta
              university={note.university}
              college={note.college}
              subject={note.subject}
              pages={note.pagesNumber}
              year={note.year}
              createdAt={note.createdAt}
              downloads={note.downloads}
              rating={
                note.reviews.length > 0
                  ? note.reviews.reduce(
                      (acc: number, review: { rating: number }) =>
                        acc + review.rating,
                      0
                    ) / note.reviews.length
                  : 0
              }
            />

            <NoteAuthorInfo
              authorId={note.owner_id}
              authorName={note?.ownerData?.fullName}
              isOwner={isOwner}
              user={user}
            />

            <NoteActions
              isOwner={isOwner}
              hasPurchased={note.purchased_by?.includes(user?._id)}
              price={note.price}
              onPurchase={handlePurchase}
              onEdit={() => router.push(`/add-note/${note._id}`)}
              onDelete={() => handleDeleteNote({ noteId: note._id })}
              deleteLoading={deleteNoteLoading}
              onDownload={() =>
                downloadFile({
                  noteUrl: note.file_path as string,
                  noteName: note.title as string,
                })
              }
              downloadLoading={false}
              onReview={() => setIsReviewDialogOpen(true)}
              alreadyReviewed={note?.reviews?.some(
                (review: { userId: string }) => review.userId === user?._id
              )}
              isAuthenticated={isAuthenticated}
              contactMethod={note.contactMethod}
              noteId={note._id}
              noteTitle={note.title}
              noteDescription={note.description}
            />
          </div>
        </div>

        <NotePurchaseConfirmationDialog
          isOpen={isPurchaseConfirmOpen}
          onOpenChange={() => setIsPurchaseConfirmOpen(!isPurchaseConfirmOpen)}
          onConfirm={confirmPurchase}
          noteTitle={note.title}
          notePrice={note.price}
        />

        {ReviewDialog && (
          <ReviewDialog
            isOpen={isReviewDialogOpen}
            onOpenChange={() => setIsReviewDialogOpen(!isReviewDialogOpen)}
            noteTitle={note.title}
            noteId={note._id}
            addReviewToNote={async (noteId, reviewData) => {
              handelAddReviewToNote({ noteId, reviewData });
            }}
            loading={addReviewLoading}
          />
        )}
      </main>
    </>
  );
};

export default NoteDetailPage;
