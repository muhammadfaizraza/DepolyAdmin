import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedRaceSlice = createSlice({
    name: 'deletedrace',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedrace.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedrace.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedrace.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setrace , setStatus} = getDeletedRaceSlice.actions;
export default getDeletedRaceSlice.reducer;

export const fetchdeletedrace = createAsyncThunk('/racegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/racegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


