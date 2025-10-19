import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton";

interface Props {
  usersLoading: boolean;
  allUsers: User[];
  totalUsers: number;
  currentPageUser: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {allUsers?.length ? (
              allUsers.map((user: User) => (
                <div
                  key={user._id}
                  className="w-full flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
                      alt={user.fullName}
                    />
                    <AvatarFallback>
                      {user.fullName?.charAt(0)?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-base font-semibold text-gray-800 text-center">
                    {user.fullName}
                  </h3>

                  <Link
                    href={`/seller/${user._id}`}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-150"
                  >
                    ملف المستخدم
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                لا يوجد مستخدمين حالياً
              </p>
            )}
          </div>

          {totalUsers > 10 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPageUser <= 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
              >
                السابق
              </button>
              <span className="text-sm text-gray-600">
                الصفحة {currentPageUser} من {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPageUser >= totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
