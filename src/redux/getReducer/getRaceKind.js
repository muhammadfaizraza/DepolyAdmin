import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getRaceKindSlice = createSlice({
    name: 'raceKinds',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchRaceKind.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchRaceKind.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchRaceKind.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setRaceKind , setStatus} = getRaceKindSlice.actions;
export default getRaceKindSlice.reducer;

export const fetchRaceKind = createAsyncThunk('/RaceKind/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/RaceKindget?keyword=&page=`);
    const RaceKindData = res.data;
    return RaceKindData.data;
})