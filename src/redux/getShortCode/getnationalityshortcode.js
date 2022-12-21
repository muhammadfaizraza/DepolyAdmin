import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getnationalityshortcodeSlice = createSlice({
    name: 'nationalityshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchnationalityshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchnationalityshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchnationalityshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setnationalityshortcode , setStatus} = getnationalityshortcodeSlice.actions;
export default getnationalityshortcodeSlice.reducer;

export const fetchnationalityshortcode = createAsyncThunk('/nationalityshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getnationalityshortcode`);
    const nationalityshortcodeData = res.data;
    return nationalityshortcodeData.data;
})