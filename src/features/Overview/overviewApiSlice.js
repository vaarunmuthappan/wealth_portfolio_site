import { apiSlice } from "../../app/api/ownApi";
import { store } from '../../app/store'

export const overviewApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetOverview: builder.query({
            query: () => `/assets/unformatAll/${store.getState().auth.userID}`,
        }),
    })
})

export const {
    useGetOverviewQuery
} = overviewApiSlice