import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getracecardSlice = createSlice({
    name: 'racecard',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchracecard.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchracecard.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchracecard.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setracecard , setStatus} = getracecardSlice.actions;
export default getracecardSlice.reducer;

export const fetchracecard = createAsyncThunk('/racecardget/fetch', async() => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/racecardget?keyword=&page=`);
    const racecardData = res.data;
    return racecardData.data;
})