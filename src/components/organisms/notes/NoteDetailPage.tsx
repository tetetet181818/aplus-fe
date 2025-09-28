"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import NoResults from "@/components/atoms/NoResults";
import {
  NoteHeader,
  NoteImage,
  NoteDescription,
  NoteMeta,
  NoteAuthorInfo,
  NoteActions,
  NotePurchaseConfirmationDialog,
  NoteDeleteConfirmationDialog,
} from "@/components/organisms/notes/NoteDetailComponents";
import ReviewDialog from "@/components/molecules/dialogs/ReviewDialog";
import Head from "next/head";
import NoteReviews from "@/components/organisms/notes/NoteReviews";
import { User } from "@/types";

// Static data for testing UI
const staticNote = {
  id: "1",
  title: "مقدمة في البرمجة",
  price: 100,
  rating: 4.5,
  cover_url: "https://via.placeholder.com/500",
  description: "هذه مقدمة في البرمجة مع شرح شامل للمفاهيم الأساسية.",
  university: "جامعة القاهرة",
  college: "كلية الحاسبات والمعلومات",
  subject: "برمجة",
  pages_number: 120,
  year: 2025,
  created_at: "2025-09-01T10:00:00Z",
  downloads: 200,
  contact_method: "email",
  owner_id: "2",
  reviews: [
    {
      userName: "أحمد علي",
      rating: 5,
      comment: "ملخص ممتاز ويغطي جميع المواضيع الأساسية.",
      created_at: "2025-09-01T12:00:00Z",
      userId: "1",
    },
    {
      userName: "سارة محمد",
      rating: 4,
      comment: "شرح جيد ولكن كان بالإمكان إضافة مزيد من الأمثلة.",
      created_at: "2025-09-02T14:30:00Z",
      userId: "2",
    },
  ],
};

// Static user data for testing UI
const currentUser: User = {
  _id: "1",
  fullName: "أحمد علي",
  email: "ahmed@example.com",
  password: "password",
  university: "جامعة القاهرة",
  role: "user",
  balance: 100,
  withdrawal_times: 0,
  likes_list: [{ id: 1 }],
  createdAt: "2025-09-01",
  updatedAt: "2025-09-01",
};

// Static owner data for testing UI
const owner = {
  full_name: "سامي حسين",
};

const NoteDetailPage = () => {
  const router = useRouter();
  const note = staticNote;
  const currentUserData = currentUser;
  const ownerData = owner;

  const false= note.owner_id === currentUser._id;
  const hasPurchased = true;
  const alreadyReviewed = note.reviews?.some(
    (review) => review.userId === currentUser._id
  );
  const isAuthenticated = true;
  const loading = false;

  const handlePurchase = () => console.log("تم الشراء");
  const handleReviewRequest = () => console.log("فتح نافذة التقييم");
  const handleDownloadFile = () => console.log("تحميل الملف");

  if (loading && !note) {
    return <LoadingSpinner message="جاري تحميل الملخص..." />;
  }

  if (!loading && (note === null || !note)) {
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

  return (
    <>
      <Head>
        <title>{`${note.title} | منصة أ+`}</title>
        <meta name="description" content={note.description.substring(0, 160)} />
      </Head>

      <motion.main
        className="py-8 px-4 md:px-6 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" /> العودة
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NoteHeader
              title={note?.title}
              price={note?.price}
              rating={note?.rating}
              noteId={note?.id}
              addNoteToLikeList={() => {}}
              removeNoteFromLikeList={() => {}}
              user={currentUserData}
              likeLoading={false}
            />

            <NoteImage src={note?.cover_url} alt={note?.title} />
            <NoteDescription description={note?.description} />
            <NoteReviews loading={loading} noteId={note?.id} />
          </motion.div>

          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NoteMeta
              university={note.university}
              college={note.college}
              subject={note.subject}
              pages={note.pages_number}
              year={note.year}
              createdAt={note.created_at}
              downloads={note.downloads}
              rating={
                note.reviews?.length
                  ? note.reviews
                      .map((review) => review.rating)
                      .reduce((a, b) => a + b, 0) / note.reviews.length
                  : 0
              }
            />

            <NoteAuthorInfo
              authorId={note.owner_id}
              authorName={ownerData?.full_name}
              isOwner={isOwner}
            />

            <NoteActions
              isOwner={isOwner}
              hasPurchased={hasPurchased}
              price={note.price}
              onPurchase={handlePurchase}
              onEdit={() => router.push(`/add-note/${note?.id}`)}
              onDelete={() => {}}
              onDownload={handleDownloadFile}
              onReview={handleReviewRequest}
              alreadyReviewed={alreadyReviewed}
              isAuthenticated={isAuthenticated}
              contactMethod={note.contact_method}
            />
          </motion.div>
        </div>

        <NotePurchaseConfirmationDialog
          isOpen={false}
          onOpenChange={() => {}}
          onConfirm={handlePurchase}
          noteTitle={note.title}
          notePrice={note.price}
        />

        {false&& (
          <NoteDeleteConfirmationDialog
            isOpen={false}
            onOpenChange={() => {}}
            onConfirm={() => {}}
            noteTitle={note.title}
          />
        )}

        {false && (
          <ReviewDialog
            isOpen={false}
            onOpenChange={() => {}}
            noteTitle={note.title}
            currentUser={currentUserData}
            existingReview={note.reviews?.find(
              (r) => r.userId === currentUserData?.id
            )}
            noteId={note?.id}
            addReviewToNote={() => {}}
          />
        )}
      </motion.main>
      <motion.main
        className="py-8 px-4 md:px-6 block sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" /> العودة
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NoteHeader
              title={note?.title}
              price={note?.price}
              rating={note?.rating}
              noteId={note?.id}
              addNoteToLikeList={() => {}}
              removeNoteFromLikeList={() => {}}
              user={currentUserData}
              likeLoading={false}
            />

            <NoteImage src={note?.cover_url} alt={note?.title} />
            <NoteDescription description={note?.description} />
            <NoteMeta
              university={note.university}
              college={note.college}
              subject={note.subject}
              pages={note.pages_number}
              year={note.year}
              createdAt={note.created_at}
              downloads={note.downloads}
              rating={
                note.reviews?.length
                  ? note.reviews
                      .map((review) => review.rating)
                      .reduce((a, b) => a + b, 0) / note.reviews.length
                  : 0
              }
            />
            <NoteActions
              isOwner={false}
              hasPurchased={hasPurchased}
              price={note.price}
              onPurchase={handlePurchase}
              onEdit={() => router.push(`/add-note/${note?.id}`)}
              onDelete={() => {}}
              onDownload={handleDownloadFile}
              downloadLoading={false}
              onReview={handleReviewRequest}
              alreadyReviewed={alreadyReviewed}
              isAuthenticated={isAuthenticated}
              contactMethod={note.contact_method}
            />
            <NoteReviews loading={loading} noteId={note?.id} />
          </motion.div>

          <NoteAuthorInfo
            authorId={note.owner_id}
            authorName={ownerData?.full_name}
            isOwner={false}
          />
        </div>

        <NotePurchaseConfirmationDialog
          isOpen={false}
          onOpenChange={() => {}}
          onConfirm={handlePurchase}
          noteTitle={note.title}
          notePrice={note.price}
        />

        {false&& (
          <NoteDeleteConfirmationDialog
            isOpen={false}
            onOpenChange={() => {}}
            onConfirm={() => {}}
            noteTitle={note.title}
          />
        )}

        {false && (
          <ReviewDialog
            isOpen={false}
            onOpenChange={() => {}}
            noteTitle={note.title}
            currentUser={currentUserData}
            existingReview={note.reviews?.find(
              (r) => r.userId === currentUserData?.id
            )}
            noteId={note?.id}
            addReviewToNote={() => {}}
          />
        )}
      </motion.main>
    </>
  );
};

export default NoteDetailPage;
