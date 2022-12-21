import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getsexshortcodeSlice = createSlice({
    name: 'sexshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchsexshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchsexshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchsexshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setsexshortcode , setStatus} = getsexshortcodeSlice.actions;
export default getsexshortcodeSlice.reducer;

export const fetchsexshortcode = createAsyncThunk('/sexshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getsexshortcode`);
    const sexshortcodeData = res.data;
    return sexshortcodeData.data;
})