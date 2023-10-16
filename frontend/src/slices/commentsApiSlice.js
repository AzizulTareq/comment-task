import { COMMENTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: (postId) => ({
        url: `${COMMENTS_URL}/post/${postId}`,
        params: postId,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    editComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `${COMMENTS_URL}/update/${id}`,
        method: "PUT",
        body: data,
        params: { id },
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `${COMMENTS_URL}/delete/${id}`,
        method: "DELETE",
        params: { id },
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentsApiSlice;
