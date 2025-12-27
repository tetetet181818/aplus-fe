import { ReviewData } from '@/types';

import { axiosInstance } from '@/utils/apiConfig';

export const notesService = {
  getAllNotes: async (params: {
    page: number;
    limit: number;
    university: string;
    collage: string;
    year: string;
    sortOrder: string;
    maxDownloads: boolean;
    maxPrice: boolean;
    minPrice: boolean;
    title: string;
  }) => {
    const { data } = await axiosInstance.get('/notes', { params });
    return data;
  },

  getUserNotes: async () => {
    const { data } = await axiosInstance.get('/notes/user');
    return data;
  },

  getLikedNotes: async () => {
    const { data } = await axiosInstance.get('/notes/liked');
    return data;
  },

  getBestSellerNotes: async () => {
    const { data } = await axiosInstance.get('/notes/best-sellers');
    return data;
  },

  createNote: async (noteData: FormData) => {
    const { data } = await axiosInstance.post('/notes', noteData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  addReviewToNote: async (noteId: string, reviewData: ReviewData) => {
    const { data } = await axiosInstance.post(
      `/notes/${noteId}/reviews`,
      reviewData
    );
    return data;
  },

  removeReviewFromNote: async (noteId: string, reviewId: string) => {
    const { data } = await axiosInstance.delete(
      `/notes/${noteId}/reviews/${reviewId}`
    );
    return data;
  },

  updateReviewFromNote: async (
    noteId: string,
    reviewId: string,
    reviewData: ReviewData
  ) => {
    const { data } = await axiosInstance.put(
      `/notes/${noteId}/reviews/${reviewId}`,
      reviewData
    );
    return data;
  },

  makeUnlikeNote: async (noteId: string) => {
    const { data } = await axiosInstance.delete(`/notes/${noteId}/like`);
    return data;
  },

  purchaseNote: async (payload: {
    noteId: string;
    invoice_id: string;
    status: string;
    message: string;
  }) => {
    const { data } = await axiosInstance.post('/notes/purchase', payload);
    return data;
  },
};
