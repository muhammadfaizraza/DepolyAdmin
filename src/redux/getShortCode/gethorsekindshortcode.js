import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const gethorsekindshortcodeSlice = createSlice({
    name: 'horsekindshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchhorsekindshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchhorsekindshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchhorsekindshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {sethorsekindshortcode , setStatus} = gethorsekindshortcodeSlice.actions;
export default gethorsekindshortcodeSlice.reducer;

export const fetchhorsekindshortcode = createAsyncThunk('/horsekindshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/gethorsekindshortcode`);
    const horsekindshortcodeData = res.data;
    return horsekindshortcodeData.data;
})