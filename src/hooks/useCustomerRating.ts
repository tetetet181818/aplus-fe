import { toast } from 'sonner'
import {
  useCreateCustomerRatingMutation,
  useDeleteCustomerRatingMutation,
  useGetAllCustomerRatingQuery,
  useGetRatingDashboardQuery,
  usePublishCustomerRateMutation,
  useUnPublishCustomerRateMutation,
} from '../store/api/customer-rating.api'

export default function useCustomerRating() {
  const { data, isLoading } = useGetAllCustomerRatingQuery(undefined)

  const [createCustomerRating, { isLoading: isCreating }] =
    useCreateCustomerRatingMutation()

  const [deleteCustomerRating, { isLoading: isDeleting }] =
    useDeleteCustomerRatingMutation()

  const handelDeleteCustomerRating = async (id: string) => {
    const res = await deleteCustomerRating(id)
    if (res?.data) {
      toast.success('تم حذف التقييم بنجاح')
      return true
    }
    return false
  }

  const handelCreateCustomerRating = async (values: {
    rating: number
    comment: string
  }) => {
    const res = await createCustomerRating(values)
    if (res?.data) {
      toast.success('تم إضافة التقييم بنجاح')
      return true
    }
    return false
  }

  const [publishCustomerRate, { isLoading: isPublishing }] =
    usePublishCustomerRateMutation()

  const handelPublishCustomerRate = async (id: string) => {
    const res = await publishCustomerRate(id)
    if (res?.data) {
      toast.success('تم نشر التقييم بنجاح')
      return true
    }
    return false
  }

  const [unPublishCustomerRate, { isLoading: isUnPublishing }] =
    useUnPublishCustomerRateMutation()

  const handelUnPublishCustomerRate = async (id: string) => {
    const res = await unPublishCustomerRate(id)
    if (res?.data) {
      toast.success('تم إلغاء نشر التقييم بنجاح')
      return true
    }
    return false
  }

  const { data: ratingDashboard } = useGetRatingDashboardQuery(undefined)

  return {
    customerRating: data?.data,
    isLoading,
    isCreating,
    isDeleting,
    isPublishing,
    isUnPublishing,
    loading:
      isLoading || isCreating || isDeleting || isPublishing || isUnPublishing,
    handelCreateCustomerRating,
    handelDeleteCustomerRating,
    handelPublishCustomerRate,
    handelUnPublishCustomerRate,
    ratingDashboard: ratingDashboard?.data,
  }
}
