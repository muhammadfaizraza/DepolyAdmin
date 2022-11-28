import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getAdsSlice = createSlice({
    name: 'ads',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchAds.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchAds.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchAds.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setAds , setStatus} = getAdsSlice.actions;
export default getAdsSlice.reducer;

export const fetchAds = createAsyncThunk('/adsget/fetch', async() => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/Adsget?keyword=&page=`);
    const adsData = res.data;
    return adsData.data;
})