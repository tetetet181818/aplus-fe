import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types'
import UserCardSkeleton from '@/components/skeletons/UserCardSkeleton'

interface Props {
  usersLoading: boolean
  allUsers: User[]
  totalUsers: number
  currentPageUser: number
  totalPages: number
  handlePrevPage: () => void
  handleNextPage: () => void
}

export default function UserModeSection({
  usersLoading,
  allUsers,
  totalUsers,
  currentPageUser,
  totalPages,
  handlePrevPage,
  handleNextPage,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      {usersLoading ? (
        <UserCardSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {allUsers?.length ? (
              allUsers.map((user: User) => (
                <div
                  key={user._id}
                  className="flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <Avatar className="mb-3 h-16 w-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
                      alt={user.fullName}
                    />
                    <AvatarFallback>
                      {user.fullName?.charAt(0)?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-center text-base font-semibold text-gray-800">
                    {user.fullName}
                  </h3>

                  <Link
                    href={`/seller/${user._id}`}
                    className="mt-3 text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-800"
                  >
                    ملف المستخدم
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                لا يوجد مستخدمين حالياً
              </p>
            )}
          </div>

          {totalUsers > 10 && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPageUser <= 1}
                className="rounded-md border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                السابق
              </button>
              <span className="text-sm text-gray-600">
                الصفحة {currentPageUser} من {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPageUser >= totalPages}
                className="rounded-md border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
