import { apiSlice } from "./../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postBook: builder.mutation({
      query: (data) => ({
        url: "/books/create-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),

    getBooks: builder.query({
      query: ({ searchTerm, genre, publicationYear }) => {
        const params: Record<string, string> = {};
        if (searchTerm) {
          params.search = searchTerm;
        }
        if (genre) {
          params.genre = genre;
        }
        if (publicationYear) {
          params.publicationDate = publicationYear;
        }

        console.log("params", params);
        // Construct the query URL with filters
        let url = "/books";
        const queryString = Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");

        if (queryString) {
          url += `?${queryString}`;
        }

        return {
          url,
        };
      },
      providesTags: ["book"],
    }),

    updatebook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    bookById: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  usePostBookMutation,
  useGetBooksQuery,
  useUpdatebookMutation,
  useBookByIdQuery,
  useDeleteBookMutation,
} = bookApi;
