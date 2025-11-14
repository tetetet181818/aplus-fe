import { useState } from "react";
import {
  useGetSalesUserQuery,
  useGetUserStatisticsSalesQuery,
} from "@/store/api/sales.api";

export default function useSales() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: userStatisticsSales, isLoading: userStatisticsSalesLoading } =
    useGetUserStatisticsSalesQuery(undefined);

  const {
    data: salesUserResponse,
    isLoading: salesUserLoading,
    isFetching,
    refetch,
  } = useGetSalesUserQuery({ page: currentPage, limit });

  const totalPages = salesUserResponse?.pagination?.totalPages || 1;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const salesUser = salesUserResponse?.data || [];

  return {
    salesUser,
    salesUserLoading: salesUserLoading || isFetching,
    userStatisticsSales,
    userStatisticsSalesLoading,
    pagination: {
      currentPage,
      totalPages,
      limit,
      nextPage,
      prevPage,
      setPage: setCurrentPage,
      setLimit,
      refetch,
    },
  };
}
