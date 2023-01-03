import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedColorSlice = createSlice({
    name: 'deletedcolor',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedcolor.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedcolor.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedcolor.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcolor , setStatus} = getDeletedColorSlice.actions;
export default getDeletedColorSlice.reducer;

export const fetchdeletedcolor = createAsyncThunk('/equipmentgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/colorgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


