import { UpdateNoteData } from '@/types';

import { axiosInstance } from '@/utils/apiConfig';

export const noteService = {
  getSingleNote: async (id: string) => {
    const { data } = await axiosInstance.get(`/notes/${id}`);
    return data;
  },

  makeLikeNote: async (noteId: string) => {
    const { data } = await axiosInstance.post(`/notes/${noteId}/like`);
    return data;
  },

  makeUnlikeNote: async (noteId: string) => {
    const { data } = await axiosInstance.delete(`/notes/${noteId}/like`);
    return data;
  },

  updateNote: async (noteId: string, noteData: FormData) => {
    const { data } = await axiosInstance.put(`/notes/${noteId}`, noteData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteNote: async (noteId: string) => {
    const { data } = await axiosInstance.delete(`/notes/${noteId}`);
    return data;
  },

  createPaymentLink: async (payload: {
    userId: string;
    noteId: string;
    amount: string;
  }) => {
    const { data } = await axiosInstance.post('/payment/create-link', payload);
    return data;
  },

  toggleLike: async (noteId: string) => {
    const { data } = await axiosInstance.get(`/notes/${noteId}/toggle-like`);
    return data;
  },
};
