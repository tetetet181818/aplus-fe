'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BookOpen, LucideIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

export default function AppSidebar({
  navigationItems,
}: {
  navigationItems: {
    id: string;
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <Sidebar className="border-0 shadow-xl" side="right">
      <SidebarHeader className="border-muted/20 from-primary/5 mt-16 border-b bg-gradient-to-r to-blue-500/5">
        <div className="flex items-center space-x-3 space-x-reverse px-4 py-4">
          <div className="bg-primary/10 rounded-xl p-2" aria-hidden="true">
            <BookOpen className="text-primary h-6 w-6" />
          </div>
          <h2 className="mx-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-xl font-bold text-transparent">
            منصة أ+
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="from-background to-muted/20 bg-gradient-to-b">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-4 py-2 text-xs font-semibold tracking-wider uppercase">
            التنقل
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {navigationItems?.map(item => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.id}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        aria-label={item.title}
                        className={`flex w-full cursor-pointer items-center justify-start gap-3 rounded-xl px-4 py-6 transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-foreground'
                        }`}
                      >
                        <item.icon className="size-5" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
