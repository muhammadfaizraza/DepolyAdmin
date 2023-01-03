import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getracenameshortcodeSlice = createSlice({
    name: 'racenameshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchracenameshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchracenameshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchracenameshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setracenameshortcode , setStatus} = getracenameshortcodeSlice.actions;
export default getracenameshortcodeSlice.reducer;

export const fetchracenameshortcode = createAsyncThunk('/racenameshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getracenameshortcode`);
    const racenameshortcodeData = res.data;
    return racenameshortcodeData.data;
})