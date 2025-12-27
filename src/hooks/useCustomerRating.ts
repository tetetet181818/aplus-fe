import { customerRatingService } from '@/services/customer-rating.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useCustomerRating() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['customerRating'],
    queryFn: customerRatingService.getAllCustomerRating,
  });

  const { mutateAsync: createCustomerRating, isPending: isCreating } =
    useMutation({
      mutationFn: customerRatingService.createCustomerRating,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customerRating'] });
        queryClient.invalidateQueries({ queryKey: ['ratingDashboard'] });
      },
    });

  const { mutateAsync: deleteCustomerRating, isPending: isDeleting } =
    useMutation({
      mutationFn: customerRatingService.deleteCustomerRating,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customerRating'] });
        queryClient.invalidateQueries({ queryKey: ['ratingDashboard'] });
      },
    });

  const { mutateAsync: publishCustomerRate, isPending: isPublishing } =
    useMutation({
      mutationFn: customerRatingService.publishCustomerRate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customerRating'] });
        queryClient.invalidateQueries({ queryKey: ['ratingDashboard'] });
      },
    });

  const { mutateAsync: unPublishCustomerRate, isPending: isUnPublishing } =
    useMutation({
      mutationFn: customerRatingService.unPublishCustomerRate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customerRating'] });
        queryClient.invalidateQueries({ queryKey: ['ratingDashboard'] });
      },
    });

  const { data: ratingDashboard } = useQuery({
    queryKey: ['ratingDashboard'],
    queryFn: customerRatingService.getRatingDashboard,
  });

  const handelDeleteCustomerRating = async (id: string) => {
    const res = await deleteCustomerRating(id);
    if (res?.data) {
      toast.success('تم حذف التقييم بنجاح');
      return true;
    }
    return false;
  };

  const handelCreateCustomerRating = async (values: {
    rating: number;
    comment: string;
  }) => {
    const res = await createCustomerRating(values);
    if (res?.data) {
      toast.success('تم إضافة التقييم بنجاح');
      return true;
    }
    return false;
  };

  const handelPublishCustomerRate = async (id: string) => {
    const res = await publishCustomerRate(id);
    if (res?.data) {
      toast.success('تم نشر التقييم بنجاح');
      return true;
    }
    return false;
  };

  const handelUnPublishCustomerRate = async (id: string) => {
    const res = await unPublishCustomerRate(id);
    if (res?.data) {
      toast.success('تم إلغاء نشر التقييم بنجاح');
      return true;
    }
    return false;
  };

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
  };
}
