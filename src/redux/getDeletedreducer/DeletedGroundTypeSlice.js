import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedGroundTypeSlice = createSlice({
    name: 'deletedgroundtype',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedgroundtype.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedgroundtype.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedgroundtype.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgender , setStatus} = getDeletedGroundTypeSlice.actions;
export default getDeletedGroundTypeSlice.reducer;

export const fetchdeletedgroundtype = createAsyncThunk('/groundtypegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/groundtypegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


