import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getBreederSlice = createSlice({
    name: 'breeder',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchbreeder.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchbreeder.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchbreeder.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setbreeder , setStatus} = getBreederSlice.actions;
export default getBreederSlice.reducer;

export const fetchbreeder = createAsyncThunk('/Breederget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Breederget?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})