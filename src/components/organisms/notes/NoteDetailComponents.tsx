"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Edit,
  Trash,
  Download,
  ShoppingCart,
  User as UserIcon,
  CalendarDays,
  BookOpen,
  Layers,
  FileText,
  Mail,
  Phone,
  Loader2,
  Loader,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cloneElement, JSX, useState } from "react";
import Image from "next/image";
import formatArabicDate from "@/utils/formateTime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types";

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

export const NoteHeader = ({
  title,
  price,
  rating,
  noteId,
  addNoteToLikeList,
  removeNoteFromLikeList,
  likeLoading,
  toggleLike,
}: NoteHeaderProps) => {
  if (!title) {
    console.error("NoteHeader: Missing required prop 'title'");
    return (
      <Card className="shadow-lg border-red-200 dark:border-red-700">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            خطأ في عرض بيانات الملخص
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <CardTitle className="text-3xl font-extrabold text-gray-800 dark:text-white">
              {title || "عنوان غير متوفر"}
            </CardTitle>

            {toggleLike ? (
              <Button
                className="mt-2"
                onClick={() => removeNoteFromLikeList({ noteId })}
                variant="destructive"
                disabled={likeLoading}
              >
                {likeLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "إلغاء الإعجاب بالملخص"
                )}
              </Button>
            ) : (
              <Button
                className="mt-2"
                onClick={() => addNoteToLikeList({ noteId })}
                disabled={likeLoading}
              >
                {likeLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "الإعجاب بالملخص"
                )}
              </Button>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge className="text-xl px-4 py-2 bg-gradient-to-tr from-primary to-blue-500 text-white shadow-md">
              {price !== undefined ? `${price} ريال` : "السعر غير متوفر"}
            </Badge>

            {rating && rating > 0 && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold text-lg">
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

export const NoteImage = ({ src, alt }: NoteImageProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="shadow-lg overflow-hidden border-gray-200 dark:border-gray-700 py-0">
      <div className="bg-gray-100 flex items-center justify-center py-0">
        {imageError ? (
          <div className="text-gray-500 flex flex-col items-center">
            <FileText className="h-16 w-16 mb-2" />
            <span>تعذر تحميل الصورة</span>
          </div>
        ) : (
          <Image
            loading="lazy"
            alt={alt || "صورة الملخص"}
            className="mx-auto object-cover"
            src={src}
            width={500}
            height={500}
            onError={handleImageError}
          />
        )}
      </div>
    </Card>
  );
};

interface NoteDescriptionProps {
  description?: string;
}

export const NoteDescription = ({ description }: NoteDescriptionProps) => {
  if (!description) {
    return (
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> وصف الملخص
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">لا يوجد وصف متوفر لهذا الملخص</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" /> وصف الملخص
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
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
    <Card className="shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" /> تفاصيل الملخص
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

const MetaItem = ({
  icon,
  label,
  value,
  defaultValue = "غير محدد",
}: MetaItemProps) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    {cloneElement(icon, { className: "h-5 w-5 text-primary/80" })}
    <strong>{label}:</strong> {value !== undefined ? value : defaultValue}
  </div>
);

interface NoteAuthorInfoProps {
  authorId: string;
  authorName: string;
  isOwner: boolean;
}

export const NoteAuthorInfo = ({
  authorId,
  authorName,
  isOwner,
}: NoteAuthorInfoProps) => {
  if (!authorId || !authorName) {
    return (
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <UserIcon className="h-6 w-6 text-primary" /> عن البائع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">معلومات البائع غير متوفرة</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-primary" /> عن البائع
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${authorName}`}
            alt={authorName}
          />
          <AvatarFallback>
            {authorName?.charAt(0)?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-right">
          <p className="font-semibold text-lg text-gray-800 dark:text-white">
            {authorName || "بائع غير معروف"}
          </p>
          <Link href={isOwner ? "/profile" : `/seller/${authorId}`}>
            <Button variant="link" className="text-primary p-0 h-auto">
              {isOwner ? "إدارة حسابي" : "عرض ملف البائع"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export const NoteActions = ({
  hasPurchased,
  price,
  onPurchase,
  onEdit,
  onDelete,
  deleteLoading,
  onDownload,
  onReview,
  alreadyReviewed,
  isAuthenticated,
  contactMethod,
  downloadLoading,
  isOwner,
}: {
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
  loading: boolean;
  downloadLoading: boolean;
  deleteLoading: boolean;
}) => {
  const handleAction = (action: () => void) => {
    try {
      if (typeof action === "function") {
        action();
      }
    } catch (error) {
      console.error("Error executing action:", error);
    }
  };

  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" /> الإجراءات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isOwner ? (
          <>
            <Button
              onClick={() => handleAction(onEdit)}
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" /> تعديل الملخص
            </Button>
            <Button
              onClick={() => handleAction(onDelete)}
              variant="destructive"
              className="w-full flex items-center gap-2"
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
              onClick={() => handleAction(onDownload)}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              {downloadLoading ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  تحميل الملف (معاينة)...
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
                <p className="text-green-600 dark:text-green-400 font-semibold text-center">
                  لقد قمت بشراء هذا الملخص.
                </p>
                <Button
                  onClick={() => handleAction(onDownload)}
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  disabled={downloadLoading}
                >
                  {downloadLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" /> تحميل
                      الملخص...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" /> تحميل الملخص
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleAction(onReview)}
                  disabled={alreadyReviewed}
                  className={`w-full flex items-center gap-2 ${
                    alreadyReviewed
                      ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  <Star className="h-4 w-4" />{" "}
                  {alreadyReviewed ? "تم التقييم" : "تقييم الملخص"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleAction(onPurchase)}
                  className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2"
                  disabled={!isAuthenticated && price > 0}
                >
                  <ShoppingCart className="h-4 w-4" />{" "}
                  {price > 0 ? `شراء الآن (${price} ريال)` : "الحصول مجاناً"}
                </Button>
                {!isAuthenticated && price > 0 && (
                  <p className="text-xs text-red-500 text-center mt-2">
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

const ContactMethod = ({ method }: { method: string }) => {
  if (!method) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
        {method.includes("@") ? (
          <Mail className="h-4 w-4 ml-2 text-primary" />
        ) : (
          <Phone className="h-4 w-4 ml-2 text-primary" />
        )}
        تواصل مع البائع:
      </h3>
      {method.includes("@") ? (
        <a
          href={`mailto:${method}`}
          className="text-primary hover:underline break-all"
          onClick={(e) => {
            if (!method.startsWith("mailto:")) {
              e.preventDefault();
              console.error("Invalid email format");
            }
          }}
        >
          {method}
        </a>
      ) : (
        <p className="text-gray-800 dark:text-gray-200 break-all">{method}</p>
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

export const NotePurchaseConfirmationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  noteTitle,
  notePrice,
}: NotePurchaseConfirmationDialogProps) => {
  const handleConfirm = () => {
    try {
      if (typeof onConfirm === "function") {
        onConfirm();
      }
    } catch (error) {
      console.error("Error confirming purchase:", error);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تأكيد عملية الشراء</DialogTitle>
          <DialogDescription>
            {noteTitle
              ? `هل أنت متأكد أنك تريد شراء ملخص "${noteTitle}" بسعر ${notePrice} ريال؟`
              : "هل أنت متأكد أنك تريد شراء هذا الملخص؟"}
            {notePrice === 0 && " (الملخص مجاني)"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="destructive">إلغاء</Button>
          <Button
            onClick={handleConfirm}
            className="bg-primary hover:bg-primary/90"
          >
            {notePrice > 0 ? "تأكيد الشراء" : "الحصول على الملخص"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface NoteDeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  noteTitle: string;
  loading: boolean;
}

export const NoteDeleteConfirmationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  noteTitle,
  loading,
}: NoteDeleteConfirmationDialogProps) => {
  const handleConfirm = () => {
    try {
      if (typeof onConfirm === "function") {
        onConfirm();
      }
    } catch (error) {
      console.error("Error confirming deletion:", error);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تأكيد عملية الحذف</DialogTitle>
          <DialogDescription>
            {noteTitle
              ? `هل أنت متأكد أنك تريد حذف ملخص "${noteTitle}"؟ لا يمكن التراجع عن هذا الإجراء.`
              : "هل أنت متأكد أنك تريد حذف هذا الملخص؟ لا يمكن التراجع عن هذا الإجراء."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive">إلغاء</Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                {" "}
                <Loader className="size-4 mx-2" />
                جاري الحذف
              </>
            ) : (
              "تأكيد الحذف"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
