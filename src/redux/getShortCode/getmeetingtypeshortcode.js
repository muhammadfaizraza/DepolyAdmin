import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getmeetingshortcodeSlice = createSlice({
    name: 'meetingshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchmeetingshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchmeetingshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchmeetingshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setmeetingshortcode , setStatus} = getmeetingshortcodeSlice.actions;
export default getmeetingshortcodeSlice.reducer;

export const fetchmeetingshortcode = createAsyncThunk('/meetingshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getmeetingtypeshortcode`);
    const meetingshortcodeData = res.data;
    return meetingshortcodeData.data;
})