import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getsubscriberSlice = createSlice({
    name: 'subscriber',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchsubscriber.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchsubscriber.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchsubscriber.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setsubscriber , setStatus} = getsubscriberSlice.actions;
export default getsubscriberSlice.reducer;

export const fetchsubscriber = createAsyncThunk('/subscriberget/fetch', async() => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/getsubscriber?keyword=&page=`);
    const subscriberData = res.data;
    return subscriberData.data;
})