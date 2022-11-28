import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getTrackLengthSlice = createSlice({
    name: 'TrackLength',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTrackLength.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchTrackLength.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchTrackLength.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setTrackLength , setStatus} = getTrackLengthSlice.actions;
export default getTrackLengthSlice.reducer;

export const fetchTrackLength = createAsyncThunk('/TrackLength/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/TrackLengthget?keyword=&page=`);
    const TrackLengthData = res.data;
    return TrackLengthData.data;
})  