'use client'

import { JSX, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
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
import useAuth from '@/hooks/useAuth'
import { User } from '@/types'
import DeleteConfirmationDialog from '@/components/molecules/dialogs/DeleteConfirmationDialog'
import { toast } from 'sonner'
import ProfileInfoSkeleton from '@/components/skeletons/ProfileInfoSkeleton'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * Renders the user's profile information and actions (edit, delete, reset password).
 *
 * @param {ProfileInfoTabProps} props - Component props
 * @returns {JSX.Element | null}
 */
interface ProfileInfoTabProps {
  /** Authenticated user info */
  user: User
  /** Loading state */
  loading: boolean
}

const ProfileInfoTab = ({ user, loading }: Partial<ProfileInfoTabProps>) => {
  const { handleDeleteAccount, handleUpdateUserInfo } = useAuth()
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const copyToClipboard = (text: string) => {
    toast.success('تم نسخ رابط حسابك')
    navigator.clipboard.writeText(text)
  }

  if (loading) return <ProfileInfoSkeleton />
  if (!user) return null

  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        <Card className="border-gray-200 shadow-lg dark:border-gray-700">
          <CardHeader className="border-b border-gray-200 px-4 pb-4 sm:px-6 dark:border-gray-700">
            <CardTitle className="text-xl font-bold text-gray-800 sm:text-2xl dark:text-white">
              المعلومات الشخصية
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
              <div className="flex gap-1">
                <span>+أ</span>
                <span>تفاصيل حسابك في المنصة</span>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {/* Name */}
            <InfoField
              icon={
                <UserIcon className="text-primary dark:text-primary-light h-5 w-5" />
              }
              label="الاسم الكامل"
              value={user.fullName || 'غير محدد'}
            />

            {/* Email */}
            <InfoField
              icon={
                <Mail className="text-primary dark:text-primary-light h-5 w-5" />
              }
              label="البريد الإلكتروني"
              value={user.email}
            />

            {/* University */}
            <InfoField
              icon={
                <School className="text-primary dark:text-primary-light h-5 w-5" />
              }
              label="الجامعة"
              value={user.university || 'لم يتم التحديد'}
            />

            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-2">
                <Award className="text-primary dark:text-primary-light h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                  الشارات
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <p className="mt-1 text-sm font-medium text-gray-700 sm:text-base dark:text-gray-200">
                        {user?.badgeSales === true && (
                          <Image
                            src={'/best-sales.png'}
                            alt=""
                            width={30}
                            height={30}
                            className="my-2"
                          />
                        )}
                      </p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p> شارة المبيعات الممتازة</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:pt-6 dark:border-gray-700">
              <Button
                onClick={() =>
                  copyToClipboard(
                    `https://aplusplatformsa.com/seller/${user._id}`
                  )
                }
              >
                <Link2 className="size-4" />
                مشاركة الحساب
              </Button>

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

            <p className="px-2 pt-2 text-center text-xs text-gray-500 dark:text-gray-400">
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
  )
}

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
  icon: JSX.Element
  label: string
  value: string
}) => (
  <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
    <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-2">
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

export default ProfileInfoTab
