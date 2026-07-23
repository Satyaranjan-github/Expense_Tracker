import { apiSlice } from "../app/apiSlice";

export const transactionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTransaction: builder.mutation({
            query: (transaction) => ({
                url: '/transactions/create-transaction',
                method: 'POST',
                body: transaction
            }),
            invalidatesTags: ["Transactions"]
        }),
        getTransactions: builder.query({
            query: () => '/transactions/get-transactions',
            providesTags: ["Transactions"]
        }),
        updateTransaction: builder.mutation({
            query: (transaction) => ({
                url: `/transactions/${transaction._id}/update`,
                method: 'PATCH',
                body: transaction
            }),
            invalidatesTags: ["Transactions"]
        }),
        getTransactionById: builder.query({
            query: (id) => `/transactions/${id}`,
            providesTags: ["Transactions"]
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/transactions/${id}/delete`,
                method: 'PATCH'
            }),
            invalidatesTags: ["Transactions"]
        })
    })
})

export const {
    useCreateTransactionMutation, 
    useLazyGetTransactionsQuery,
    useGetTransactionsQuery,
    useDeleteTransactionMutation,
    useGetTransactionByIdQuery,
    useUpdateTransactionMutation
} = transactionsApi