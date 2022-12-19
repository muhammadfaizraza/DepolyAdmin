import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedAdsSlice = createSlice({
    name: 'deletedads',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedads.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedads.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedads.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setnationality , setStatus} = getDeletedAdsSlice.actions;
export default getDeletedAdsSlice.reducer;

export const fetchdeletedads = createAsyncThunk('/Adsgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Adsgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


