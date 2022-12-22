import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getpointTableSlice = createSlice({
    name: 'pointTable',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchpointTable.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchpointTable.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchpointTable.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setpointTable , setStatus} = getpointTableSlice.actions;
export default getpointTableSlice.reducer;

export const fetchpointTable = createAsyncThunk('/pointTableget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/PointTableSystemget?keyword=&page=`);
    const pointTableData = res.data;
    return pointTableData.data;
})