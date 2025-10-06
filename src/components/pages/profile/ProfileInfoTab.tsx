"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User as UserIcon, Mail, School, Edit3, Trash2 } from "lucide-react";
import UpdateInfoDialog from "../../molecules/dialogs/UpdateInfoDialog";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types";
import DeleteConfirmationDialog from "@/components/molecules/dialogs/DeleteConfirmationDialog";

/**
 * Renders the user's profile information and actions (edit, delete, reset password).
 *
 * @param {ProfileInfoTabProps} props - Component props
 * @returns {JSX.Element | null}
 */
interface ProfileInfoTabProps {
  /** Authenticated user info */
  user: User;
  /** Loading state */
  loading: boolean;
}

const ProfileInfoTab = ({ user, loading }: Partial<ProfileInfoTabProps>) => {
  const { handleDeleteAccount, handleUpdateUserInfo } = useAuth();
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  if (!user) return null;

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <Card className="shadow-lg border-gray-200 dark:border-gray-700">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              المعلومات الشخصية
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              <div className="flex gap-1">
                <span>+أ</span>
                <span>تفاصيل حسابك في المنصة</span>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Name */}
            <InfoField
              icon={
                <UserIcon className="h-5 w-5 text-primary dark:text-primary-light" />
              }
              label="الاسم الكامل"
              value={user.fullName || "غير محدد"}
            />

            {/* Email */}
            <InfoField
              icon={
                <Mail className="h-5 w-5 text-primary dark:text-primary-light" />
              }
              label="البريد الإلكتروني"
              value={user.email}
            />

            {/* University */}
            <InfoField
              icon={
                <School className="h-5 w-5 text-primary dark:text-primary-light" />
              }
              label="الجامعة"
              value={user.university || "لم يتم التحديد"}
            />

            {/* Actions */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 justify-center">
              <Button>
                <Link
                  href="/forget-password"
                  className="flex items-center gap-1"
                >
                  <Edit3 className="size-4" />
                  <span>تعديل كلمة المرور</span>
                </Link>
              </Button>

              <Button
                onClick={() => setOpenDialogUpdate(true)}
                className="flex gap-1"
              >
                <Edit3 className="size-4" />
                <span>تعديل الملف الشخصي</span>
              </Button>

              <Button
                variant="destructive"
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2 className="size-4" />
                <span>حذف الحساب</span>
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 px-2">
              تذكّر: حذف الحساب إجراء نهائي ولا يمكن التراجع عنه. سيتم حذف جميع
              بياناتك وملخصاتك.
            </p>
          </CardContent>
        </Card>
      </div>
      <UpdateInfoDialog
        isOpen={openDialogUpdate}
        onClose={() => setOpenDialogUpdate(false)}
        user={user}
        loading={Boolean(loading)}
        handelUpdateUserInfo={handleUpdateUserInfo}
      />
      <DeleteConfirmationDialog
        isOpen={openDialogDelete}
        onOpenChange={() => setOpenDialogDelete(false)}
        onConfirm={handleDeleteAccount}
        itemName={user.fullName}
        loading={Boolean(loading)}
      />
    </>
  );
};

/**
 * Small helper component for displaying a labeled info row with an icon.
 *
 * @param {Object} props
 * @param {JSX.Element} props.icon - Field icon
 * @param {string} props.label - Field label
 * @param {string} props.value - Field value
 */
const InfoField = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
    <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mt-1">
        {value}
      </p>
    </div>
  </div>
);

export default ProfileInfoTab;
