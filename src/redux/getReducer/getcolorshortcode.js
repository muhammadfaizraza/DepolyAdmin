import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getcolorshortcodeSlice = createSlice({
    name: 'colorshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcolorshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcolorshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcolorshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcolorshortcode , setStatus} = getcolorshortcodeSlice.actions;
export default getcolorshortcodeSlice.reducer;

export const fetchcolorshortcode = createAsyncThunk('/colorshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getcolorshortcode`);
    const colorshortcodeData = res.data;
    return colorshortcodeData.data;
})