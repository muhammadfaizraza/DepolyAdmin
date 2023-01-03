import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedVerdictSlice = createSlice({
    name: 'deletedverdict',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedverdict.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedverdict.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedverdict.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {settrainer , setStatus} = getDeletedVerdictSlice.actions;
export default getDeletedVerdictSlice.reducer;

export const fetchdeletedverdict = createAsyncThunk('/verdictgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/verdictgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


