'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { User, Mail, School, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { Student } from '@/types'

export default function GetSingleStudentDialog({
  open,
  onClose,
  student,
}: {
  open: boolean
  onClose: () => void
  student: Student
}) {
  const infoItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>عرض بيانات الطالب</DialogTitle>
          <DialogDescription>قم بتحديد الطالب لعرض بياناته</DialogDescription>
        </DialogHeader>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={Variants}
          className="w-full"
        >
          <Card>
            <CardHeader className="border-b">
              <CardTitle>المعلومات الشخصية</CardTitle>
              <CardDescription>تفاصيل الحساب في منصة أ+</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <motion.div
                variants={infoItemVariants}
                className="bg-muted flex items-start gap-3 rounded-lg p-3"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <User className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">الاسم الكامل</p>
                  <p className="font-medium">
                    {student?.fullName || 'غير محدد'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={infoItemVariants}
                className="bg-muted flex items-start gap-3 rounded-lg p-3"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    البريد الإلكتروني
                  </p>
                  <p className="font-medium">{student?.email}</p>
                </div>
              </motion.div>

              <motion.div
                variants={infoItemVariants}
                className="bg-muted flex items-start gap-3 rounded-lg p-3"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <School className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">الجامعة</p>
                  <p className="font-medium">
                    {student?.university || 'لم يتم التحديد'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={infoItemVariants}
                className="bg-muted flex items-start gap-3 rounded-lg p-3"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <DollarSign className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">الرصيد</p>
                  <p className="font-medium">{student?.balance}</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
