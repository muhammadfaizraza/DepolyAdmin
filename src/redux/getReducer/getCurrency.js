import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getCurrencySlice = createSlice({
    name: 'currency',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcurrency.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcurrency.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcurrency.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcurrency , setStatus} = getCurrencySlice.actions;
export default getCurrencySlice.reducer;

export const fetchcurrency = createAsyncThunk('/Currencyget/fetch', async() => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/Currencyget?keyword=&page=`);
    const currencyData = res.data;
    return currencyData.data;
})