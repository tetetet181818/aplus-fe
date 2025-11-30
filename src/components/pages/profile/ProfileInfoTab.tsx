'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  User as UserIcon,
  Mail,
  School,
  Edit3,
  Trash2,
  Link2,
  Award,
} from 'lucide-react'
import UpdateInfoDialog from '../../molecules/dialogs/UpdateInfoDialog'
import DeleteConfirmationDialog from '@/components/molecules/dialogs/DeleteConfirmationDialog'
import ProfileInfoSkeleton from '@/components/skeletons/ProfileInfoSkeleton'
import useAuth from '@/hooks/useAuth'
import { User } from '@/types'
import { toast } from 'sonner'

/** Props for ProfileInfoTab */
interface ProfileInfoTabProps {
  user: User
  loading: boolean
}

/** User profile information with edit and delete actions */
export default function ProfileInfoTab({
  user,
  loading,
}: Partial<ProfileInfoTabProps>) {
  const { handleDeleteAccount, handleUpdateUserInfo } = useAuth()
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const copyProfileLink = () => {
    const profileUrl = `https://aplusplatformsa.com/seller/${user?._id}`
    navigator.clipboard.writeText(profileUrl)
    toast.success('تم نسخ رابط حسابك')
  }

  if (loading) return <ProfileInfoSkeleton />
  if (!user) return null

  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        <Card className="border-gray-200 shadow-lg transition-colors dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="border-b border-gray-200 px-4 pb-4 transition-colors sm:px-6 dark:border-gray-700">
            <CardTitle className="text-xl font-bold text-gray-800 sm:text-2xl dark:text-gray-50">
              المعلومات الشخصية
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
              تفاصيل حسابك في المنصة
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            <InfoField
              icon={
                <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              }
              label="الاسم الكامل"
              value={user.fullName || 'غير محدد'}
            />

            <InfoField
              icon={
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              }
              label="البريد الإلكتروني"
              value={user.email}
            />

            <InfoField
              icon={
                <School className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              }
              label="الجامعة"
              value={user.university || 'لم يتم التحديد'}
            />

            {user?.badgeSales && <BadgesField />}

            <ActionButtons
              onShare={copyProfileLink}
              onEdit={() => setOpenDialogUpdate(true)}
              onDelete={() => setOpenDialogDelete(true)}
            />

            <WarningText />
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
  )
}

/** Single info field with icon and label */
function InfoField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors dark:bg-gray-700/50">
      <div className="rounded-full bg-blue-50 p-2 dark:bg-blue-900/30">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-700 sm:text-base dark:text-gray-200">
          {value}
        </p>
      </div>
    </div>
  )
}

/** User badges display */
function BadgesField() {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors dark:bg-gray-700/50">
      <div className="rounded-full bg-blue-50 p-2 dark:bg-blue-900/30">
        <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
          الشارات
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="mt-1">
              <Image
                src="/best-sales.png"
                alt="شارة المبيعات الممتازة"
                width={30}
                height={30}
                className="transition-transform hover:scale-110"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>شارة المبيعات الممتازة</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

/** Action buttons section */
function ActionButtons({
  onShare,
  onEdit,
  onDelete,
}: {
  onShare: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex flex-col justify-center gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:pt-6 dark:border-gray-700">
      <Button
        onClick={onShare}
        className="gap-2 bg-blue-600 transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <Link2 className="size-4" />
        مشاركة الحساب
      </Button>

      <Button
        asChild
        variant="outline"
        className="gap-2 border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      >
        <Link href="/forget-password">
          <Edit3 className="size-4" />
          تعديل كلمة المرور
        </Link>
      </Button>

      <Button
        onClick={onEdit}
        variant="outline"
        className="gap-2 border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      >
        <Edit3 className="size-4" />
        تعديل الملف الشخصي
      </Button>

      <Button
        variant="destructive"
        onClick={onDelete}
        className="gap-2 bg-red-600 transition-colors hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
      >
        <Trash2 className="size-4" />
        حذف الحساب
      </Button>
    </div>
  )
}

/** Account deletion warning text */
function WarningText() {
  return (
    <p className="px-2 pt-2 text-center text-xs text-gray-500 transition-colors dark:text-gray-400">
      تذكّر: حذف الحساب إجراء نهائي ولا يمكن التراجع عنه. سيتم حذف جميع بياناتك
      وملخصاتك.
    </p>
  )
}
