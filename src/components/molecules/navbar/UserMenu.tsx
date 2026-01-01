import Image from 'next/image';
import Link from 'next/link';

import { User } from '@/types/index';
import {
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  ShoppingBag,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  handleLogout: () => void;
  user: User;
}

export default function UserMenu({ handleLogout, user }: UserMenuProps) {
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="group relative h-11 w-11 rounded-full border-2 border-gray-200 p-0 transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-500"
            >
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  width={40}
                  height={40}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <Avatar className="h-10 w-10 border-2 border-transparent transition-all duration-300 group-hover:scale-110">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white dark:from-blue-500 dark:to-purple-500">
                    {user?.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm dark:border-gray-800"></div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-2xl border-2 border-gray-200/50 bg-white p-2 shadow-xl dark:border-gray-700/50 dark:bg-gray-800" align="end" forceMount>
            <DropdownMenuLabel className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-3 dark:from-blue-950/30 dark:to-purple-950/30">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              >
                <Settings className="text-primary ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                <span>إدارة الحساب</span>
              </Link>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <LayoutDashboard className="text-primary ml-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>لوحة التحكم</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link
                href="/profile?tab=purchased"
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              >
                <ShoppingBag className="text-primary ml-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>مشترياتي</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/add-note"
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              >
                <PlusCircle className="text-primary ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                <span>إضافة ملخص</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="group cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300 dark:focus:bg-red-950/50 dark:focus:text-red-300"
            >
              <LogOut className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
