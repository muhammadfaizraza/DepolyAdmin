import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getracekindshortcodeSlice = createSlice({
    name: 'racekindshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchracekindshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchracekindshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchracekindshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setracekindshortcode , setStatus} = getracekindshortcodeSlice.actions;
export default getracekindshortcodeSlice.reducer;

export const fetchracekindshortcode = createAsyncThunk('/racekindshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getracekindshortcode`);
    const racekindshortcodeData = res.data;
    return racekindshortcodeData.data;
})