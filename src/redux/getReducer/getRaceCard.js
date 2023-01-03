import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getraceCardSlice = createSlice({
    name: 'raceCard',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchraceCard.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchraceCard.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchraceCard.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setraceCard , setStatus} = getraceCardSlice.actions;
export default getraceCardSlice.reducer;

export const fetchraceCard = createAsyncThunk('/raceCardget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/RaceCardget?keyword=&page=`);
    const raceCardData = res.data;
    return raceCardData.data;
})