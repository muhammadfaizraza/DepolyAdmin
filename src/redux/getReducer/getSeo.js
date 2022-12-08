import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getSeoSlice = createSlice({
    name: 'Seo',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchSeo.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSeo.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchSeo.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setSeo , setStatus} = getSeoSlice.actions;
export default getSeoSlice.reducer;

export const fetchSeo = createAsyncThunk('/Seoget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/SeoKeywordget?keyword=&page=`);
    const SeoData = res.data;
    return SeoData.data;
})