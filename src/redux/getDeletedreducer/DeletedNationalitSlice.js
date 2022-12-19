import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedNationalitySlice = createSlice({
    name: 'deletednationality',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletednationality.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletednationality.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletednationality.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setnationality , setStatus} = getDeletedNationalitySlice.actions;
export default getDeletedNationalitySlice.reducer;

export const fetchdeletednationality = createAsyncThunk('/nationalitygetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/nationalitygetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


