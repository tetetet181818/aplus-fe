import {
  Bell,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  DollarSign,
  Settings,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

/** 🔔 Single notification card with icon-type badge */
export default function NotificationItem({
  title,
  body,
  type,
  user,
  date,
  read,
  id,
  handleMakeNotificationRead,
}: {
  title: string
  body: string
  type: string
  user: string
  date: string
  read: boolean
  id: string
  handleMakeNotificationRead: (id: string) => void
}) {
  /** Return icon by type */
  const getIcon = (size = 'h-4 w-4 sm:h-5 sm:w-5') => {
    switch (type) {
      case 'withdrawal':
        return <CheckCircle className={`${size} text-green-500`} />
      case 'error':
        return <AlertCircle className={`${size} text-red-500`} />
      case 'warning':
        return <AlertTriangle className={`${size} text-yellow-500`} />
      case 'auth':
        return <Info className={`${size} text-blue-500`} />
      case 'note':
        return <Users className={`${size} text-purple-500`} />
      case 'purchase':
        return <FileText className={`${size} text-indigo-500`} />
      case 'sales':
        return <DollarSign className={`${size} text-green-500`} />
      case 'info':
        return <Settings className={`${size} text-gray-500`} />
      default:
        return <Bell className={`${size} text-primary`} />
    }
  }

  /** Pick color tone for the badge background */
  const badgeStyle =
    {
      withdrawal: 'bg-green-100 text-green-600 border-green-300',
      error: 'bg-red-100 text-red-600 border-red-300',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      auth: 'bg-blue-100 text-blue-600 border-blue-300',
      note: 'bg-purple-100 text-purple-600 border-purple-300',
      purchase: 'bg-indigo-100 text-indigo-600 border-indigo-300',
      sales: 'bg-emerald-100 text-emerald-600 border-emerald-300',
      info: 'bg-gray-100 text-gray-600 border-gray-300',
    }[type] || 'bg-primary/10 text-primary border-primary/30'

  return (
    <Card
      className={`cursor-pointer border transition hover:bg-gray-100 ${
        read ? '' : 'bg-primary/20 hover:bg-primary/30'
      }`}
      onClick={() => handleMakeNotificationRead(id)}
    >
      <CardContent className="flex items-start gap-3 p-3 sm:p-4">
        {/* ==== Leading Icon ==== */}
        <div className="mt-1 flex-shrink-0">{getIcon()}</div>

        <div className="flex-1 text-[12px] sm:text-[14px]">
          <h4 className="text-sm font-medium sm:text-base">{title}</h4>
          <p className="text-muted-foreground text-[11px] sm:text-xs">{body}</p>

          {/* ==== User info ==== */}
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-[11px] sm:text-xs">
              {user}
            </span>
          </div>

          {/* ==== Footer ==== */}
          <div className="text-muted-foreground mt-2 flex items-center justify-between text-[10px] sm:text-xs">
            <span>{date}</span>

            <Badge
              variant="outline"
              className={`flex items-center gap-1 border px-2 py-1 ${badgeStyle}`}
            >
              {getIcon('h-3 w-3 sm:h-4 sm:w-4')}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
