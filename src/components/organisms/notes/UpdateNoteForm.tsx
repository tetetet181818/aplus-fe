'use client'

import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import BasicInfo from './BasicInfo'
import UploadFileNote from './UploadFileNote'
import UploadCoverNote from './UploadCoverNote'
import ReviewNote from './ReviewNote'
import SuccessUploadNoteDialog from '@/components/molecules/dialogs/SuccessUploadNoteDialog'
import { Note, UpdateNoteData } from '@/types'
import useNoteDetail from '@/hooks/useNoteDetail'

/** Form value types */
type UpdateNoteValues = {
  basic: {
    title: string
    price: number
    description: string
    university: string
    college: string
    subject: string
    pagesNumber: number
    year: number | null
    contactMethod: string
  }
  files: {
    cover: File | null
    file: File | null
  }
  review: {
    termsAccepted: boolean
  }
}

const initialValues: UpdateNoteValues = {
  basic: {
    title: '',
    price: 0,
    description: '',
    university: '',
    college: '',
    subject: '',
    pagesNumber: 0,
    year: new Date().getFullYear(),
    contactMethod: '',
  },
  files: {
    cover: null,
    file: null,
  },
  review: {
    termsAccepted: true,
  },
}

/** Validation schema */
const validationSchemas = {
  basic: Yup.object({
    title: Yup.string().required('العنوان مطلوب'),
    price: Yup.number().positive('يجب أن يكون موجب').required('السعر مطلوب'),
    description: Yup.string().required('الوصف مطلوب'),
    university: Yup.string().required('الجامعة مطلوبة'),
    college: Yup.string().required('الكلية مطلوبة'),
    subject: Yup.string().required('المادة مطلوبة'),
    pagesNumber: Yup.number()
      .positive('عدد الصفحات يجب أن يكون موجب')
      .required('عدد الصفحات مطلوب'),
    year: Yup.number().nullable(),
    contactMethod: Yup.string()
      .email('البريد الإلكتروني غير صالح')
      .required('طريقة التواصل مطلوبة'),
  }),
  files: Yup.object({
    cover: Yup.mixed<File>().nullable(),
    file: Yup.mixed<File>().nullable(),
  }),
  review: Yup.object({
    termsAccepted: Yup.boolean().oneOf([true], 'يجب الموافقة على الشروط'),
  }),
}

/** Helper to build FormData */
function buildFormData(values: UpdateNoteValues): FormData {
  const formData = new FormData()
  Object.entries(values.basic).forEach(([key, val]) => {
    if (val !== null && val !== undefined) formData.append(key, String(val))
  })

  if (values.files.cover) formData.append('cover', values.files.cover)
  if (values.files.file) formData.append('file', values.files.file)

  formData.append('termsAccepted', String(values.review.termsAccepted))
  return formData
}

/**
 * Multi-step form for updating an existing note
 */
const UpdateNoteForm = ({ note }: { note: Note }) => {
  const tabs = ['basic', 'file', 'cover', 'review'] as const
  type TabKey = (typeof tabs)[number]
  const [tab, setTab] = useState<TabKey>('basic')
  const { handleUpdateNote, updateNoteLoading } = useNoteDetail(note._id)
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  /** Prefill note data */
  const [formInitials, setFormInitials] = useState(initialValues)
  useEffect(() => {
    if (note) {
      setFormInitials({
        basic: {
          title: note.title || '',
          price: note.price || 0,
          description: note.description || '',
          university: note.university || '',
          college: note.college || '',
          subject: note.subject || '',
          pagesNumber: note.pagesNumber || 0,
          year: note.year || new Date().getFullYear(),
          contactMethod: note.contactMethod || '',
        },
        files: {
          cover: null,
          file: null,
        },
        review: { termsAccepted: true },
      })
    }
  }, [note])

  const formik = useFormik<UpdateNoteValues>({
    enableReinitialize: true,
    initialValues: formInitials,
    validationSchema: Yup.object({
      basic: validationSchemas.basic,
      files: validationSchemas.files,
      review: validationSchemas.review,
    }),
    onSubmit: async (values) => {
      const formData: UpdateNoteData = buildFormData(values)
      const res = await handleUpdateNote({
        noteId: note._id,
        noteData: formData,
      })
      if (res) setOpenSuccessDialog(true)
    },
  })

  const progress = ((tabs.indexOf(tab) + 1) / tabs.length) * 100

  return (
    <>
      <div dir="rtl" className="min-h-screen py-8 md:px-6">
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Card className="w-full overflow-hidden rounded-2xl border-0 shadow-xl">
            {/* Progress Header */}
            <div className="border-b bg-white px-6 py-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600">
                  {progress.toFixed(0)}%
                </span>
                <span className="text-sm font-medium text-gray-600">
                  تحديث الملاحظة
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2 rotate-180 transform bg-gray-200 [&>div]:!right-0 [&>div]:!left-0"
              />
            </div>

            {/* Steps */}
            <CardContent className="p-0" dir="rtl">
              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as TabKey)}
                className="w-full"
              >
                <TabsContent value="basic" className="p-6">
                  <BasicInfo formik={formik} nextTab={() => setTab('file')} />
                </TabsContent>

                <TabsContent value="file" className="p-6">
                  <UploadFileNote
                    formik={formik}
                    prevTab={() => setTab('basic')}
                    nextTab={() => setTab('cover')}
                  />
                </TabsContent>

                <TabsContent value="cover" className="p-6">
                  <UploadCoverNote
                    formik={formik}
                    prevTab={() => setTab('file')}
                    nextTab={() => setTab('review')}
                  />
                </TabsContent>

                <TabsContent value="review" className="p-6">
                  <ReviewNote
                    loading={updateNoteLoading}
                    formik={formik}
                    prevTab={() => setTab('cover')}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </form>
      </div>

      <SuccessUploadNoteDialog
        open={openSuccessDialog}
        onOpenChange={setOpenSuccessDialog}
      />
    </>
  )
}

export default UpdateNoteForm
