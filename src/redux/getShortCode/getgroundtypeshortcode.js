import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getgroundshortcodeSlice = createSlice({
    name: 'groundshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchgroundshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchgroundshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchgroundshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgroundshortcode , setStatus} = getgroundshortcodeSlice.actions;
export default getgroundshortcodeSlice.reducer;

export const fetchgroundshortcode = createAsyncThunk('/groundshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getgroundtypeshortcode`);
    const groundshortcodeData = res.data;
    return groundshortcodeData.data;
})