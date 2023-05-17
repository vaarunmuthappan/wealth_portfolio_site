import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, userID: null, firm: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, userID, firm, accessToken } = action.payload
            state.user = user
            state.userID = userID
            state.firm = firm
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.userID = null
            state.firm = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUserID = (state) => state.auth.userID
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentFirm = (state) => state.auth.firm
export const selectCurrentToken = (state) => state.auth.token