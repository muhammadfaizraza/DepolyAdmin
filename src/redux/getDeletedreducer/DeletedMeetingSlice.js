import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedMeetingSlice = createSlice({
    name: 'deletedmeeting',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedmeeting.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedmeeting.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedmeeting.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setmeeting , setStatus} = getDeletedMeetingSlice.actions;
export default getDeletedMeetingSlice.reducer;

export const fetchdeletedmeeting = createAsyncThunk('/meetingtypegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/meetingtypegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


