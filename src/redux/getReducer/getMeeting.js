import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getMeetingSlice = createSlice({
    name: 'Meeting',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchMeeting.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchMeeting.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchMeeting.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setMeeting , setStatus} = getMeetingSlice.actions;
export default getMeetingSlice.reducer;

export const fetchMeeting = createAsyncThunk('/Meetingget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/MeetingTypeget?keyword=&page=`);
    const MeetingData = res.data;
    return MeetingData.data;
})