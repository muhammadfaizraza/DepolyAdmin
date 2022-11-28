import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getRaceNameSlice = createSlice({
    name: 'RaceName',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchRaceName.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchRaceName.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchRaceName.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setRaceName , setStatus} = getRaceNameSlice.actions;
export default getRaceNameSlice.reducer;

export const fetchRaceName = createAsyncThunk('/RaceName/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/RaceNameget?keyword=&page=`);
    const RaceNameData = res.data;
    return RaceNameData.data;
})