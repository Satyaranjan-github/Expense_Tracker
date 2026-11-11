import { apiSlice } from "../app/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (category) => ({
                url: '/categories/create-category',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        getCategories: builder.query({
            query: (data) => ({
                url: '/categories/get-categories',
                params:  data ,
            }),
            providesTags: ["Category"]
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `/categories/${category._id}/update`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        getCategoryById: builder.query({
            query: (id) => `/categories/${id}`,
            providesTags: ["Category"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}/delete`,
                method: 'PATCH'
            }),
            invalidatesTags: ["Category"]
        }),
        getCategorySuggestions: builder.query({
            query: (query) => ({
                url: '/categories/suggestions',
                params: { query },
            })
        }),
    })
})

export const {
    useCreateCategoryMutation, 
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery,
    useLazyGetCategoryByIdQuery,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useLazyGetCategorySuggestionsQuery
} = categoriesApi