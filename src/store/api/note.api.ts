import { CreateNoteData } from "@/types";
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
} = noteApi;
