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

export const fetchcurrency = createAsyncThunk('/Currencyget/fetch', async({SearchTitle,SearchCode,SearchRate}) => {
    const res = await axios.get(`${window.env.API_URL}/Currencyget?shortCode=${SearchCode}&NameEn=${SearchTitle}&Rate=${SearchRate}&limit=${'1000'}`);
    const currencyData = res.data;
    return currencyData.data;
})