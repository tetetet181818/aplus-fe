import { toast } from "sonner";
import {
  useCreateCustomerRatingMutation,
  useGetAllCustomerRatingQuery,
} from "../store/api/customer-rating.api";

export default function useCustomerRating() {
  const { data, isLoading } = useGetAllCustomerRatingQuery(undefined);
  const [createCustomerRating, { isLoading: isCreating }] =
    useCreateCustomerRatingMutation();

  const handelCreateCustomerRating = async (values: any) => {
    const res = await createCustomerRating(values);
    if (res?.data) {
      toast.success("تم إضافة التقييم بنجاح");
      return true;
    }
    return false;
  };
  return {
    customerRating: data?.data,
    isLoading,
    isCreating,
    loading: isLoading || isCreating,
    handelCreateCustomerRating,
  };
}
