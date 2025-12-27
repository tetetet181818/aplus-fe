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
              className="relative h-10 w-10 rounded-full p-0"
            >
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  width={30}
                  height={30}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover"
                />
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="end" forceMount>
            <DropdownMenuLabel className="py-2 font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {user.fullName}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex w-full cursor-pointer items-center space-x-2 py-2 text-sm"
              >
                <Settings className="text-muted-foreground ml-2 h-4 w-4" />
                <span>إدارة الحساب</span>
              </Link>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="flex w-full cursor-pointer items-center space-x-2 py-2 text-sm"
                >
                  <LayoutDashboard className="text-muted-foreground ml-2 h-4 w-4" />
                  <span>لوحة التحكم</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link
                href="/profile?tab=purchased"
                className="flex w-full cursor-pointer items-center space-x-2 py-2 text-sm"
              >
                <ShoppingBag className="text-muted-foreground ml-2 h-4 w-4" />
                <span>مشترياتي</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/add-note"
                className="flex w-full cursor-pointer items-center space-x-2 py-2 text-sm"
              >
                <PlusCircle className="text-muted-foreground ml-2 h-4 w-4" />
                <span>إضافة ملخص</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-900/50 dark:focus:text-red-300"
            >
              <LogOut className="ml-2 h-4 w-4" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
