import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getcategoryshortcodeSlice = createSlice({
    name: 'categoryshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcategoryshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcategoryshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcategoryshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcategoryshortcode , setStatus} = getcategoryshortcodeSlice.actions;
export default getcategoryshortcodeSlice.reducer;

export const fetchcategoryshortcode = createAsyncThunk('/categoryshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getcategorytypeshortcode`);
    const categoryshortcodeData = res.data;
    return categoryshortcodeData.data;
})