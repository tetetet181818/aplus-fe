'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Edit3,
  BookOpen,
  ShoppingBag,
  School as University,
  DollarSign,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { User } from '@/types'

interface UserProfileCardProps {
  currentUser: User
  onEditProfile: () => void
  userNotesCount?: number
  purchasedNotesCount?: number
  totalEarnings?: number
}

const UserProfileCard = ({
  currentUser,
  onEditProfile,
  userNotesCount,
  purchasedNotesCount,
  totalEarnings,
}: Partial<UserProfileCardProps>) => {
  if (!currentUser) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="from-primary overflow-hidden bg-gradient-to-br to-blue-600 text-white shadow-xl dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="flex flex-col items-center gap-6 p-6 sm:flex-row">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarFallback className="text-primary bg-gray-200 text-3xl dark:bg-gray-700">
              {currentUser.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-right">
            <CardTitle className="text-3xl font-bold">
              {currentUser.fullName}
            </CardTitle>
            <p className="mt-1 text-blue-100 dark:text-gray-300">
              {currentUser.email}
            </p>
            <div className="mt-1 flex items-center justify-center text-sm text-blue-200 sm:justify-start dark:text-gray-400">
              <University className="ml-1 h-4 w-4" />
              <span>{currentUser.university || 'الجامعة غير محددة'}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEditProfile}
            className="mt-4 border-white/50 bg-white/20 text-white hover:bg-white/30 sm:mt-0 sm:mr-auto"
          >
            <Edit3 className="ml-2 h-4 w-4" /> تعديل الملف الشخصي
          </Button>
        </CardHeader>

        <CardContent className="bg-white/10 p-6 backdrop-blur-sm dark:bg-black/20">
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            {/* Notes Count */}
            <div className="rounded-lg bg-white/5 p-4 dark:bg-black/10">
              <BookOpen className="mx-auto mb-2 h-8 w-8 text-blue-200 dark:text-blue-300" />
              <p className="text-2xl font-semibold">{userNotesCount}</p>
              <p className="text-sm text-blue-100 dark:text-gray-300">
                ملخصاتي المعروضة
              </p>
            </div>

            {/* Purchased Notes Count */}
            <div className="rounded-lg bg-white/5 p-4 dark:bg-black/10">
              <ShoppingBag className="mx-auto mb-2 h-8 w-8 text-blue-200 dark:text-blue-300" />
              <p className="text-2xl font-semibold">{purchasedNotesCount}</p>
              <p className="text-sm text-blue-100 dark:text-gray-300">
                ملخصاتي المشتراة
              </p>
            </div>

            {/* Total Earnings */}
            <div className="rounded-lg bg-white/5 p-4 dark:bg-black/10">
              <DollarSign className="mx-auto mb-2 h-8 w-8 text-green-300 dark:text-green-400" />
              <p className="text-2xl font-semibold">
                {totalEarnings !== undefined
                  ? totalEarnings.toFixed(2)
                  : '0.00'}{' '}
                <span className="text-lg">ريال</span>
              </p>
              <p className="text-sm text-blue-100 dark:text-gray-300">
                إجمالي الأرباح
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default UserProfileCard
