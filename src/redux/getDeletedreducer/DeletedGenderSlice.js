import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedGenderSlice = createSlice({
    name: 'deletedgender',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedgender.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedgender.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedgender.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgender , setStatus} = getDeletedGenderSlice.actions;
export default getDeletedGenderSlice.reducer;

export const fetchdeletedgender = createAsyncThunk('/Adsgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Adsgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


