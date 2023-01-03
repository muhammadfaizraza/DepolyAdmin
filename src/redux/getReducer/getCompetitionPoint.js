import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getcompetitionpointSlice = createSlice({
    name: 'competitionpoint',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcompetitionpoint.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcompetitionpoint.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcompetitionpoint.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcompetitionpoint , setStatus} = getcompetitionpointSlice.actions;
export default getcompetitionpointSlice.reducer;

export const fetchcompetitionpoint = createAsyncThunk('/competitionpointget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/competitionpointget?keyword=&page=`);
    const competitionpointData = res.data;
    return competitionpointData.data;
})