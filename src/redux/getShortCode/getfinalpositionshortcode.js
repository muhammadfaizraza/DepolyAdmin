import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getfinalpositionSlice = createSlice({
    name: 'finalpositionshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchfinalpositionshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchfinalpositionshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchfinalpositionshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setfinalpositionshortcode , setStatus} = getfinalpositionSlice.actions;
export default getfinalpositionSlice.reducer;

export const fetchfinalpositionshortcode = createAsyncThunk('/getFinalPositionshortcode/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getFinalPositionshortcode`);
    const finalpositionshortcodeData = res.data;
    return finalpositionshortcodeData.data;
})