import { apiSlice } from "../../app/api/ownApi";
import { store } from '../../app/store'

export const teamApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetTeam: builder.query({
            query: () => `/users/team/${store.getState().auth.userID}`,
        }),
        AddUser: builder.mutation({
            query: credentials => ({
                url: '/users',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        DeleteUser: builder.mutation({
            query: id => ({
                url: '/users',
                method: 'DELETE',
                body: { "id": id }
            })
        }),
        GetUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),
        UpdateUser: builder.mutation({
            query: (user, id) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: { ...user }
            })
        }),
    })
})

export const {
    useGetTeamQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} = teamApiSlice