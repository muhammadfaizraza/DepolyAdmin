import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getnewsletterSlice = createSlice({
    name: 'newsletter',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchnewsletter.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchnewsletter.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchnewsletter.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setnewsletter , setStatus} = getnewsletterSlice.actions;
export default getnewsletterSlice.reducer;

export const fetchnewsletter = createAsyncThunk('/newsletterget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/GetNewsLetter?keyword=&page=`);
    const newsletterData = res.data;
    return newsletterData.data;
})