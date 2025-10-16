import { CreateNoteData, ReviewData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

/**
 * RTK Query API for all Note-related endpoints.
 * Handles fetching, creating, updating, liking, purchasing, and reviewing notes.
 */
export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/notes`,
    credentials: "include",
  }),
  tagTypes: ["Note"],

  endpoints: (builder) => ({
    /** Get all notes with filters and pagination */
    getAllNotes: builder.query({
      query: ({
        page,
        limit,
        title,
        university,
        collage,
        year,
        sortOrder,
        maxDownloads,
        maxPrice,
        minPrice,
      }) => ({
        url: `/?page=${page}&sortOrder=${sortOrder}&limit=${limit}&title=${title}&university=${university}&collage=${collage}&year=${year}&maxDownloads=${maxDownloads}&maxPrice=${maxPrice}&minPrice=${minPrice}`,
        method: "GET",
      }),
      providesTags: ["Note"],
    }),

    /** Create a new note */
    createNote: builder.mutation({
      query: ({ noteData }: { noteData: CreateNoteData }) => ({
        url: `/create`,
        method: "POST",
        body: noteData,
      }),
      invalidatesTags: ["Note"],
    }),

    /** Purchase a note */
    purchaseNote: builder.mutation({
      query: ({
        noteId,
        invoice_id,
        status,
        message,
      }: {
        noteId: string;
        invoice_id: string;
        status: string;
        message: string;
      }) => ({
        url: `/${noteId}/purchase`,
        method: "POST",
        body: { invoice_id, status, message },
      }),
      invalidatesTags: ["Note"],
    }),

    /** Get a single note by ID */
    getSingleNote: builder.query({
      query: (noteId: string) => `/${noteId}`,
      providesTags: ["Note"],
    }),

    /** Like a note */
    makeLikeNote: builder.mutation({
      query: ({ noteId }: { noteId: string }) => ({
        url: `/${noteId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Note"],
    }),

    /** Toggle note like state */
    toggleLike: builder.query({
      query: ({ noteId }: { noteId: string }) => ({
        url: `/${noteId}/toggle-like`,
      }),
      providesTags: ["Note"],
    }),

    /** Unlike a note */
    makeUnlikeNote: builder.mutation({
      query: ({ noteId }: { noteId: string }) => ({
        url: `/${noteId}/unlike`,
        method: "POST",
      }),
      invalidatesTags: ["Note"],
    }),

    /** Delete a note */
    deleteNote: builder.mutation({
      query: ({ noteId }: { noteId: string }) => ({
        url: `/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),

    /** Get notes created by the current user */
    getUserNotes: builder.query({
      query: () => ({ url: `/my-notes` }),
      providesTags: ["Note"],
    }),

    /** Get notes purchased by the current user */
    getPurchasedNotes: builder.query({
      query: () => ({ url: `/purchased` }),
      providesTags: ["Note"],
    }),

    /** Get notes liked by the current user */
    getLikedNotes: builder.query({
      query: () => ({ url: `/likes-notes` }),
      providesTags: ["Note"],
    }),

    /** Add a review to a note */
    addReviewToNote: builder.mutation({
      query: ({
        noteId,
        reviewData,
      }: {
        noteId: string;
        reviewData: ReviewData;
      }) => ({
        url: `/${noteId}/add-review`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Note"],
    }),

    /** Remove a review from a note */
    removeReviewFromNote: builder.mutation({
      query: ({ noteId, reviewId }: { noteId: string; reviewId: string }) => ({
        url: `/${noteId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),

    /** Update a review on a note */
    updateReviewFromNote: builder.mutation({
      query: ({
        noteId,
        reviewId,
        reviewData,
      }: {
        noteId: string;
        reviewId: string;
        reviewData: ReviewData;
      }) => ({
        url: `/${noteId}/reviews/${reviewId}`,
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: ["Note"],
    }),

    /** Create a payment link for a note purchase */
    createPaymentLink: builder.mutation({
      query: ({
        noteId,
        userId,
        amount,
      }: {
        noteId: string;
        userId: string;
        amount: string;
      }) => ({
        url: `/create-payment-link?userId=${userId}&noteId=${noteId}&amount=${amount}`,
        method: "POST",
      }),
      invalidatesTags: ["Note"],
    }),

    /** Update an existing note */
    updateNote: builder.mutation({
      query: ({
        noteId,
        noteData,
      }: {
        noteId: string;
        noteData: CreateNoteData;
      }) => ({
        url: `update/${noteId}`,
        method: "PUT",
        body: noteData,
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
  useUpdateNoteMutation,
} = noteApi;
