import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getverdictshortcodeSlice = createSlice({
    name: 'verdictshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchverdictshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchverdictshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchverdictshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setverdictshortcode , setStatus} = getverdictshortcodeSlice.actions;
export default getverdictshortcodeSlice.reducer;

export const fetchverdictshortcode = createAsyncThunk('/verdictshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getverdictshortcode`);
    const verdictshortcodeData = res.data;
    return verdictshortcodeData.data;
})