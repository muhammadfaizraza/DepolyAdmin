import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const getDeletedTrackConditionSlice = createSlice({
    name: 'deletedtrackcondition',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchdeletedtrackcondition.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchdeletedtrackcondition.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE
            })
            .addCase(fetchdeletedtrackcondition.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
});

export const { setequipment, setStatus } = getDeletedTrackConditionSlice.actions;
export default getDeletedTrackConditionSlice.reducer;

export const fetchdeletedtrackcondition = createAsyncThunk('/TrackConditiongetdeleted/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/TrackConditiongetdeleted?keyword=&page=`);
    const trackConditionData = res.data;
    return trackConditionData.data;
})


