import { apiSlice } from "../../app/api/ownApi";
import { store } from '../../app/store'

export const equityApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetEquities: builder.query({
            query: ({ page, pageSize, sort, search }) =>
            ({
                url: `/assets/all/equities/${store.getState().auth.userID}`,
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ['Items']
        })
    })
})

export const {
    useGetEquitiesQuery,
} = equityApiSlice