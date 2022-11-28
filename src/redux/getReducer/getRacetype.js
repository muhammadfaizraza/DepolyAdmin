import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getRaceTypeSlice = createSlice({
    name: 'RaceType',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchRaceType.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchRaceType.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchRaceType.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setRaceType , setStatus} = getRaceTypeSlice.actions;
export default getRaceTypeSlice.reducer;

export const fetchRaceType = createAsyncThunk('/RaceTypeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/RaceTypeget?keyword=&page=`);
    const RaceTypeData = res.data;
    return RaceTypeData.data;
})  