import { Sale } from '@/types';

import { axiosInstance } from '@/utils/apiConfig';

// ============= Types & Interfaces =============

export interface SalesUser {
  id: string;
  name: string;
  email: string;
}

export interface UserStatisticsSales {
  totalSales: number;
  revenue: number;
  conversion: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface SalesUserResponse {
  data: SalesUser[];
  pagination: Pagination;
}

export interface SaleData {
  _id: string;
  amount: number;
  status: string;
  payment_method: string;
  platform_fee: number;
  invoice_id: string;
  note_id: string;
  note_title: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface SingleSaleResponse {
  data: {
    sale: SaleData;
    seller: UserData;
    buyer: UserData;
  };
}

export interface SalesState {
  totalSales: number;
  totalRevenue: number;
  averageSaleAmount: number;
  pendingSales: number;
  completedSales: number;
}

export interface DetailsNoteSalesResponse {
  sales: Sale[];
  pagination: Pagination;
  stateSales: SalesState;
}

export interface GetDetailsNoteSalesParams {
  noteId: string;
  page: number;
  limit: number;
}

export interface SalesUserStatsResponse {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  salesByMonth: Array<{
    month: string;
    sales: number;
    revenue: number;
  }>;
  topSellingNotes: Array<{
    noteId: string;
    noteTitle: string;
    sales: number;
    revenue: number;
  }>;
}

// ============= Service Functions =============

export const salesService = {
  /**
   * Get single sale by ID
   * @param saleId - The sale ID
   * @returns Single sale details with seller and buyer info
   */
  getSingleSale: async (saleId: string): Promise<SingleSaleResponse> => {
    const response = await axiosInstance.get(`/sales/${saleId}`);
    return response.data;
  },

  /**
   * Get sales for the current user with pagination
   * @param page - Current page number
   * @param limit - Number of items per page
   * @returns Paginated sales data
   */
  getSalesUser: async ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<SalesUserResponse> => {
    const response = await axiosInstance.get(
      `/sales/get-sales-user?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  /**
   * Get sales statistics for a specific seller
   * @param sellerId - The seller ID
   * @returns Sales statistics including revenue, top notes, etc.
   */
  getSalesUserStats: async (
    sellerId: string
  ): Promise<SalesUserStatsResponse> => {
    const response = await axiosInstance.get(`/sales/stats/${sellerId}`);
    return response.data;
  },

  /**
   * Get general sales statistics for the current user
   * @returns User's sales statistics
   */
  getUserStatisticsSales: async (): Promise<UserStatisticsSales> => {
    const response = await axiosInstance.get(
      '/sales/get-user-statistics-sales'
    );
    return response.data;
  },

  /**
   * Get detailed sales information for a specific note
   * @param params - Contains noteId, page, and limit
   * @returns Sales details for the note with pagination
   */
  getDetailsNoteSales: async (
    params: GetDetailsNoteSalesParams
  ): Promise<DetailsNoteSalesResponse> => {
    const { noteId, page, limit } = params;
    const response = await axiosInstance.get(
      `/sales/get-sales-note/${noteId}?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};
