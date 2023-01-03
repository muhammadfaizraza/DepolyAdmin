import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getcurrencyshortcodeSlice = createSlice({
    name: 'currencyshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcurrencyshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcurrencyshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcurrencyshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcurrencyshortcode , setStatus} = getcurrencyshortcodeSlice.actions;
export default getcurrencyshortcodeSlice.reducer;

export const fetchcurrencyshortcode = createAsyncThunk('/currencyshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getcurrencyshortcode`);
    const currencyshortcodeData = res.data;
    return currencyshortcodeData.data;
})