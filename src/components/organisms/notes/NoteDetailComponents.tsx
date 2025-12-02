'use client';

import { JSX, cloneElement, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { User } from '@/types';
import {
  BookOpen,
  CalendarDays,
  Download,
  Edit,
  FileText,
  Layers,
  Link2,
  Loader,
  Loader2,
  Mail,
  Phone,
  ShoppingCart,
  Star,
  Trash,
  User as UserIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import formatArabicDate from '@/utils/formateTime';

interface NoteHeaderProps {
  title: string;
  price?: number;
  rating: number;
  noteId: string;
  addNoteToLikeList: (args: { noteId: string }) => void;
  removeNoteFromLikeList: (args: { noteId: string }) => void;
  likeLoading: boolean;
  user: User;
  toggleLike: boolean;
}

/** Displays note title, price, rating, and like button */
export const NoteHeader = ({
  title,
  price,
  rating,
  noteId,
  addNoteToLikeList,
  removeNoteFromLikeList,
  likeLoading,
  toggleLike,
  user,
}: NoteHeaderProps) => {
  if (!title) {
    return (
      <Card className="border-red-200 bg-white shadow-lg dark:border-red-800 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            خطأ في عرض بيانات الملخص
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {title}
            </CardTitle>
            {user && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button
                  onClick={() =>
                    toggleLike
                      ? removeNoteFromLikeList({ noteId })
                      : addNoteToLikeList({ noteId })
                  }
                  variant={toggleLike ? 'destructive' : 'default'}
                  disabled={likeLoading}
                  className="dark:bg-opacity-90"
                >
                  {likeLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : toggleLike ? (
                    'إلغاء الإعجاب'
                  ) : (
                    'الإعجاب بالملخص'
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge className="from-primary bg-gradient-to-tr to-blue-500 px-4 py-2 text-xl text-white shadow-md dark:from-blue-600 dark:to-blue-700">
              {price !== undefined ? `${price} ريال` : 'السعر غير متوفر'}
            </Badge>

            {rating > 0 && (
              <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-lg font-semibold">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

interface NoteImageProps {
  src: string;
  alt: string;
}

/** Displays note cover image with error fallback */
export const NoteImage = ({ src, alt }: NoteImageProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden border-gray-200 bg-white py-0 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-center bg-gray-100 py-0 dark:bg-gray-800">
        {imageError ? (
          <div className="flex flex-col items-center py-16 text-gray-500 dark:text-gray-400">
            <FileText className="mb-2 h-16 w-16" />
            <span>تعذر تحميل الصورة</span>
          </div>
        ) : (
          <Image
            loading="lazy"
            alt={alt || 'صورة الملخص'}
            className="mx-auto object-cover"
            src={src}
            width={500}
            height={500}
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </Card>
  );
};

interface NoteDescriptionProps {
  description?: string;
}

/** Displays note description with fallback message */
export const NoteDescription = ({ description }: NoteDescriptionProps) => {
  return (
    <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-100">
          <FileText className="text-primary h-5 w-5 sm:h-6 sm:w-6 dark:text-blue-400" />
          وصف الملخص
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {description ? (
          <p className="max-w-full text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-700 sm:text-base sm:leading-loose dark:text-gray-300">
            {description}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic sm:text-base dark:text-gray-400">
            لا يوجد وصف متوفر لهذا الملخص
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface NoteMetaProps {
  university: string;
  college: string;
  subject: string;
  pages: number;
  year: number;
  createdAt: string;
  downloads: number;
  rating: number;
}

/** Displays note metadata (university, college, pages, etc.) */
export const NoteMeta = ({
  university,
  college,
  subject,
  pages,
  year,
  createdAt,
  downloads,
  rating,
}: NoteMetaProps) => {
  return (
    <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <Layers className="text-primary h-6 w-6 dark:text-blue-400" />
          تفاصيل الملخص
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <MetaItem icon={<Layers />} label="الجامعة" value={university} />
        <MetaItem icon={<Layers />} label="الكلية" value={college} />
        <MetaItem icon={<BookOpen />} label="المادة" value={subject} />
        <MetaItem icon={<FileText />} label="عدد الصفحات" value={pages} />
        <MetaItem icon={<CalendarDays />} label="سنة الإعداد" value={year} />
        <MetaItem
          icon={<CalendarDays />}
          label="تاريخ الإضافة"
          value={createdAt && formatArabicDate(createdAt)}
        />
        <MetaItem
          icon={<Download />}
          label="عدد التحميلات"
          value={downloads}
          defaultValue={0}
        />
        <MetaItem
          icon={<Star />}
          label="التقييم"
          value={rating}
          defaultValue={0}
        />
      </CardContent>
    </Card>
  );
};

interface MetaItemProps {
  icon: JSX.Element;
  label: string;
  value: string | number | undefined;
  defaultValue?: string | number;
}

/** Renders a single metadata item with icon */
const MetaItem = ({
  icon,
  label,
  value,
  defaultValue = 'غير محدد',
}: MetaItemProps) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    {cloneElement(icon, {
      className: 'h-5 w-5 text-primary/80 dark:text-blue-400/80',
    })}
    <strong>{label}:</strong> {value ?? defaultValue}
  </div>
);

interface NoteAuthorInfoProps {
  authorId: string;
  authorName: string;
  isOwner: boolean;
  user: User;
}

/** Displays author/seller information with avatar */
export const NoteAuthorInfo = ({
  authorId,
  authorName,
  isOwner,
  user,
}: NoteAuthorInfoProps) => {
  if (!authorId || !authorName) {
    return (
      <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            <UserIcon className="text-primary h-6 w-6 dark:text-blue-400" />
            عن البائع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">
            معلومات البائع غير متوفرة
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <UserIcon className="text-primary h-6 w-6 dark:text-blue-400" />
          عن البائع
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <Avatar className="h-16 w-16 ring-2 ring-gray-200 dark:ring-gray-700">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${authorName}`}
            alt={authorName}
          />
          <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
            {authorName?.charAt(0)?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-right">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {authorName}
          </p>
          {user && (
            <Link href={isOwner ? '/profile' : `/seller/${authorId}`}>
              <Button
                variant="link"
                className="text-primary h-auto p-0 dark:text-blue-400"
              >
                {isOwner ? 'إدارة حسابي' : 'عرض ملف البائع'}
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface NoteActionsProps {
  isOwner: boolean;
  hasPurchased: boolean;
  price: number;
  onPurchase: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDownload: () => void;
  onReview: () => void;
  alreadyReviewed: boolean;
  isAuthenticated: boolean;
  contactMethod: string;
  downloadLoading: boolean;
  deleteLoading: boolean;
  noteId: string;
  noteTitle: string;
  noteDescription?: string;
}

/** Renders action buttons (buy, download, edit, delete, share) */
export const NoteActions = ({
  isOwner,
  hasPurchased,
  price,
  onPurchase,
  onEdit,
  onDelete,
  onDownload,
  onReview,
  alreadyReviewed,
  isAuthenticated,
  contactMethod,
  downloadLoading,
  deleteLoading,
  noteId,
  noteTitle,
  noteDescription,
}: NoteActionsProps) => {
  const handleShare = async () => {
    const shareText = `${noteTitle}\n\n${noteDescription}\n\n📚 اقرأ المزيد هنا:\nhttps://www.aplusplatformsa.com/notes/${noteId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          text: shareText,
          url: `https://www.aplusplatformsa.com/notes/${noteId}`,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success('تم نسخ معلومات الملخص بنجاح');
      }
    } catch (err) {
      console.error('Share error:', err);
      toast.error('حدث خطأ أثناء المشاركة');
    }
  };

  const safeExecute = (action: () => void) => {
    try {
      action?.();
    } catch (error) {
      console.error('Action error:', error);
    }
  };

  return (
    <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <ShoppingCart className="text-primary h-6 w-6 dark:text-blue-400" />
          الإجراءات
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {isOwner ? (
          <>
            <Button
              onClick={handleShare}
              className="flex w-full items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Link2 className="h-4 w-4" /> مشاركة الملخص
            </Button>

            <Button
              onClick={() => safeExecute(onEdit)}
              className="flex w-full items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Edit className="h-4 w-4" /> تعديل الملخص
            </Button>

            <Button
              onClick={() => safeExecute(onDelete)}
              variant="destructive"
              className="flex w-full items-center gap-2 dark:bg-red-700 dark:hover:bg-red-800"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                <>
                  <Trash className="h-4 w-4" /> حذف الملخص
                </>
              )}
            </Button>

            <Button
              onClick={() => safeExecute(onDownload)}
              variant="outline"
              className="flex w-full items-center gap-2 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
              disabled={downloadLoading}
            >
              {downloadLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  تحميل الملف...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" /> تحميل الملف (معاينة)
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {hasPurchased ? (
              <>
                <p className="text-center font-semibold text-green-600 dark:text-green-400">
                  لقد قمت بشراء هذا الملخص.
                </p>

                <Button
                  onClick={handleShare}
                  className="flex w-full items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Link2 className="h-4 w-4" /> مشاركة الملخص
                </Button>

                <Button
                  onClick={() => safeExecute(onDownload)}
                  className="flex w-full items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  disabled={downloadLoading}
                >
                  {downloadLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      تحميل الملخص...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" /> تحميل الملخص
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => safeExecute(onReview)}
                  disabled={alreadyReviewed}
                  className={`flex w-full items-center gap-2 ${
                    alreadyReviewed
                      ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600'
                      : 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
                  }`}
                >
                  <Star className="h-4 w-4" />
                  {alreadyReviewed ? 'تم التقييم' : 'تقييم الملخص'}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleShare}
                  className="flex w-full items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
                >
                  <Link2 className="h-4 w-4" /> مشاركة الملخص
                </Button>

                <Button
                  onClick={() => safeExecute(onPurchase)}
                  className="bg-primary hover:bg-primary/90 flex w-full items-center gap-2 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                  disabled={!isAuthenticated && price > 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {price > 0 ? `شراء الآن (${price} ريال)` : 'الحصول مجاناً'}
                </Button>

                {!isAuthenticated && price > 0 && (
                  <p className="mt-2 text-center text-xs text-red-500 dark:text-red-400">
                    يجب تسجيل الدخول أولاً للشراء.
                  </p>
                )}
              </>
            )}
            {contactMethod && <ContactMethod method={contactMethod} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface ContactMethodProps {
  method?: string;
}

/** Displays seller contact information (email/phone) */
export const ContactMethod = ({ method }: ContactMethodProps) => {
  if (!method) return null;

  const isEmail = method.includes('@');
  const isPhone =
    !isEmail && /^(\+?\d{1,3}[- ]?)?\d{8,15}$/.test(method.trim());

  return (
    <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
      <h3 className="mb-2 flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
        {isEmail ? (
          <Mail className="text-primary ml-2 h-4 w-4 dark:text-blue-400" />
        ) : (
          <Phone className="text-primary ml-2 h-4 w-4 dark:text-blue-400" />
        )}
        تواصل مع البائع:
      </h3>

      {isEmail ? (
        <a
          href={`mailto:${method}`}
          className="text-primary break-all hover:underline dark:text-blue-400"
        >
          {method}
        </a>
      ) : isPhone ? (
        <a
          href={`tel:${method.replace(/\s+/g, '')}`}
          className="text-primary break-all hover:underline dark:text-blue-400"
        >
          {method}
        </a>
      ) : (
        <p className="break-all text-gray-800 dark:text-gray-200">{method}</p>
      )}
    </div>
  );
};

interface NotePurchaseConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  noteTitle: string;
  notePrice: number;
}

/** Confirmation dialog for note purchase */
export const NotePurchaseConfirmationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  noteTitle,
  notePrice,
}: NotePurchaseConfirmationDialogProps) => {
  const handleConfirm = () => {
    try {
      onConfirm?.();
    } catch (error) {
      console.error('Purchase confirmation error:', error);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            تأكيد عملية الشراء
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            {noteTitle
              ? `هل أنت متأكد أنك تريد شراء ملخص "${noteTitle}" بسعر ${notePrice} ريال؟`
              : 'هل أنت متأكد أنك تريد شراء هذا الملخص؟'}
            {notePrice === 0 && ' (الملخص مجاني)'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            variant="destructive"
            onClick={() => onOpenChange(false)}
            className="dark:bg-red-700 dark:hover:bg-red-800"
          >
            إلغاء
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {notePrice > 0 ? 'تأكيد الشراء' : 'الحصول على الملخص'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
