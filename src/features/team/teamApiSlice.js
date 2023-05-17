import { apiSlice } from "../../app/api/ownApi";
import { store } from '../../app/store'

export const teamApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetTeam: builder.query({
            query: () => `/users/team/${store.getState().auth.userID}`,
        }),
    })
})

export const {
    useGetTeamQuery
} = teamApiSlice