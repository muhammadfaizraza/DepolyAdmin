import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const getTrackConditionSlice = createSlice({
    name: 'trackcondition',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchtrackCondition.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchtrackCondition.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE
            })
            .addCase(fetchtrackCondition.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
});

export const { settrackcondition, setStatus } = getTrackConditionSlice.actions;
export default getTrackConditionSlice.reducer;

export const fetchtrackCondition = createAsyncThunk('/TrackConditionget/fetch', async ({ SearchTitle, SearchCode }) => {
    const res = await axios.get(`${window.env.API_URL}/TrackConditionget?AbbrevEn=${SearchCode}&NameEn=${SearchTitle}&limit=${'1000'}`);
    const TrackConditionData = res.data;
    return TrackConditionData.data;
})