import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedCurrencySlice = createSlice({
    name: 'deletedcurrency',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedcurrency.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedcurrency.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedcurrency.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcurrency , setStatus} = getDeletedCurrencySlice.actions;
export default getDeletedCurrencySlice.reducer;

export const fetchdeletedcurrency = createAsyncThunk('/currencygetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/currencygetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


