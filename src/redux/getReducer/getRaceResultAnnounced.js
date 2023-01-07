import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getraceresultSlice = createSlice({
    name: 'raceresult',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchraceresult.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchraceresult.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        })
        .addCase(fetchraceresult.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setraceresult , setStatus} = getraceresultSlice.actions;
export default getraceresultSlice.reducer;

export const fetchraceresult = createAsyncThunk('/raceresultget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getlatestraceresult`);
    const raceresultData = res.data;
    return raceresultData.data;
})