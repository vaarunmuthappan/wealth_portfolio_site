import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/ownApi"
import authReducer from '../features/auth/authSlice'
import adminReducer from "../components/adminSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        admin: adminReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})