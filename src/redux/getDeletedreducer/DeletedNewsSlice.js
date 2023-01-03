import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedNewsSlice = createSlice({
    name: 'deletednews',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletednews.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletednews.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletednews.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedNewsSlice.actions;
export default getDeletedNewsSlice.reducer;

export const fetchdeletednews = createAsyncThunk('/newsgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/newsgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


