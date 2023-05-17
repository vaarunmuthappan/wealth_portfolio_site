import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { setMode } = adminSlice.actions;

export default adminSlice.reducer;