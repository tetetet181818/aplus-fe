'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Student } from '@/types'

/**
 * Show list of recent students.
 */
export default function RecentStudentsCard({
  students,
}: {
  students: Student[]
}) {
  return (
    <Card className="card-hover border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">الطلاب الجدد</CardTitle>
        <CardDescription>أحدث تسجيلات الطلاب</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students?.map((student, index) => (
            <div
              key={student._id}
              className="bg-muted/30 hover:bg-muted/50 animate-slide-in flex items-center gap-2 space-x-4 space-x-reverse rounded-lg p-3 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Avatar className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center font-semibold">
                {student?.fullName
                  ?.split(' ')
                  ?.map((n: string) => n[0])
                  ?.join('')}
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{student.fullName}</p>
                <p className="text-muted-foreground text-xs">{student.email}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
