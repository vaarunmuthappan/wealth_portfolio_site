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
        })
    })
})

export const {
    useGetTransactionsQuery
} = transApiSlice