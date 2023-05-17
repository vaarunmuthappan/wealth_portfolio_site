import { apiSlice } from "../../app/api/ownApi";
import { store } from '../../app/store'

export const breakdownApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetBreakdown: builder.query({
            query: () => `/assets/breakdown/${store.getState().auth.firm}`,
        }),
    })
})

export const {
    useGetBreakdownQuery
} = breakdownApiSlice