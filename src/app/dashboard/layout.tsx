'use client'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { navigationItems } from '@/constants/index'
import AppSidebar from '@/components/organisms/AppSidebar'
import { Separator } from '@/components/ui/separator'
import { Activity } from 'lucide-react'
import Head from 'next/head'
import useAuth from '@/hooks/useAuth'
import ShouldLoginPrompt from '@/components/organisms/ShouldLoginPrompt'
import AccessDeniedPage from '@/components/organisms/AccessDeniedPage'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <ShouldLoginPrompt onNavigate={router.push} />
  }

  if (user?.role !== 'admin') {
    return <AccessDeniedPage onNavigate={router.push} />
  }

  return (
    <div dir="rtl">
      <Head>
        <title>لوحة التحكم | منصة أ+</title>
        <meta name="description" content="لوحة التحكم | منصة أ+" />
        <meta name="keywords" content="لوحة التحكم, منصة أ+" />
      </Head>
      <SidebarProvider>
        <AppSidebar navigationItems={navigationItems} />
        <div className="flex w-full flex-col overflow-x-hidden">
          <header className="border-muted/20 from-background to-muted/10 flex h-16 shrink-0 items-center gap-2 border-b bg-gradient-to-r px-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <SidebarTrigger className="hover:bg-primary/10 -mr-1 rounded-lg transition-colors" />
              <Activity className="text-primary h-4 w-4" />
              <span className="text-foreground font-semibold">
                لوحة تحكم المنصة التعليمية
              </span>
            </div>
            <Separator orientation="vertical" className="ml-2 h-4" />
          </header>

          <SidebarInset className={'p-10'}>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
