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
    reactComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/react`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    removeReact: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/remove-react`,
        method: "POST",
        body: data ,
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
  useReactCommentMutation,
  useRemoveReactMutation,
} = commentsApiSlice;
