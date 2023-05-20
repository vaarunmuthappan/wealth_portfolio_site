import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    // for local running
    baseUrl: 'http://localhost:3500',
    //baseUrl: 'https://wealth-portfolio-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions)

        if (refreshResult?.data) {
            const user = api.getState().auth.user
            const userID = api.getState().auth.userID
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user, userID }))

            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Items', 'Users'],
    endpoints: (builder) => ({})
})