import { apiSlice } from "../../app/api/ownApi";
import { store } from '../../app/store'

export const transApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetTransactions: builder.query({
            query: ({ page, pageSize, sort, search }) =>
            ({
                url: `/assets/all/${store.getState().auth.userID}`,
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ['Items']
        }),
        AddItem: builder.mutation({
            query: credentials => ({
                url: '/assets',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Items']
        }),
        DeleteItem: builder.mutation({
            query: id => ({
                url: '/assets',
                method: 'DELETE',
                body: { "id": id }
            }),
            invalidatesTags: ['Items']
        }),
        GetItemById: builder.query({
            query: (id) => `/assets/${id}`
        }),
    })
})

export const {
    useGetTransactionsQuery,
    useAddItemMutation,
    useDeleteItemMutation,
    useGetItemByIdQuery,
} = transApiSlice