import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getbreedershortcodeSlice = createSlice({
    name: 'breedershortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchbreedershortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchbreedershortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchbreedershortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setbreedershortcode , setStatus} = getbreedershortcodeSlice.actions;
export default getbreedershortcodeSlice.reducer;

export const fetchbreedershortcode = createAsyncThunk('/getbreedershortcode/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getbreedershortcode`);
    const breedershortcodeData = res.data;
    return breedershortcodeData.data;
})