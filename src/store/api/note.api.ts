import { CreateNoteData, ReviewData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/notes` }),
  tagTypes: ["Note"],

  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: ({ token, page, limit }) => ({
        url: `/?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Note"],
    }),

    createNote: builder.mutation({
      query: ({
        noteData,
        token,
      }: {
        noteData: CreateNoteData;
        token: string;
      }) => ({
        url: `/create`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: noteData,
      }),
      invalidatesTags: ["Note"],
    }),

    purchaseNote: builder.mutation({
      query: ({
        noteId,
        token,
        invoice_id,
        status,
        message,
      }: {
        noteId: string;
        token: string;
        invoice_id: string;
        status: string;
        message: string;
      }) => ({
        url: `/${noteId}/purchase`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: {
          invoice_id,
          status,
          message,
        },
      }),
      invalidatesTags: ["Note"],
    }),

    getSingleNote: builder.query({
      query: (noteId: string) => `/${noteId}`,
      providesTags: ["Note"],
    }),

    makeLikeNote: builder.mutation({
      query: ({ noteId, token }: { noteId: string; token: string }) => ({
        url: `/${noteId}/like`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Note"],
    }),

    toggleLike: builder.query({
      query: ({ noteId, token }: { noteId: string; token: string }) => ({
        url: `/${noteId}/toggle-like`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Note"],
    }),

    makeUnlikeNote: builder.mutation({
      query: ({ noteId, token }: { noteId: string; token: string }) => ({
        url: `/${noteId}/unlike`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Note"],
    }),

    deleteNote: builder.mutation({
      query: ({ noteId, token }: { noteId: string; token: string }) => ({
        url: `/${noteId}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Note"],
    }),

    getUserNotes: builder.query({
      query: ({ token }: { token: string }) => ({
        url: `/my-notes`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Note"],
    }),

    getPurchasedNotes: builder.query({
      query: ({ token }: { token: string }) => ({
        url: `/purchased`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Note"],
    }),

    getLikedNotes: builder.query({
      query: ({ token }: { token: string }) => ({
        url: `/likes-notes`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Note"],
    }),

    addReviewToNote: builder.mutation({
      query: ({
        token,
        noteId,
        reviewData,
      }: {
        noteId: string;
        reviewData: ReviewData;
        token: string;
      }) => ({
        url: `/${noteId}/add-review`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: reviewData,
      }),
      invalidatesTags: ["Note"],
    }),
    removeReviewFromNote: builder.mutation({
      query: ({
        token,
        noteId,
        reviewId,
      }: {
        noteId: string;
        reviewId: string;
        token: string;
      }) => ({
        url: `/${noteId}/reviews/${reviewId}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Note"],
    }),
    updateReviewFromNote: builder.mutation({
      query: ({
        token,
        noteId,
        reviewId,
        reviewData,
      }: {
        noteId: string;
        reviewId: string;
        reviewData: ReviewData;
        token: string;
      }) => ({
        url: `/${noteId}/reviews/${reviewId}`,
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
        body: reviewData,
      }),
      invalidatesTags: ["Note"],
    }),

    createPaymentLink: builder.mutation({
      query: ({
        noteId,
        userId,
        amount,
        token,
      }: {
        noteId: string;
        userId: string;
        amount: string;
        token: string;
      }) => ({
        url: `/create-payment-link?userId=${userId}&noteId=${noteId}&amount=${amount}`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useCreateNoteMutation,
  useGetSingleNoteQuery,
  useMakeLikeNoteMutation,
  useMakeUnlikeNoteMutation,
  useToggleLikeQuery,
  useDeleteNoteMutation,
  useGetUserNotesQuery,
  useGetPurchasedNotesQuery,
  useGetLikedNotesQuery,
  usePurchaseNoteMutation,
  useAddReviewToNoteMutation,
  useRemoveReviewFromNoteMutation,
  useUpdateReviewFromNoteMutation,
  useCreatePaymentLinkMutation,
} = noteApi;
