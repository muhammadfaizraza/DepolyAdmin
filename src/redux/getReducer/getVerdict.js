import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getVerdictSlice = createSlice({
    name: 'verdict',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchverdict.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchverdict.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchverdict.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setverdict , setStatus} = getVerdictSlice.actions;
export default getVerdictSlice.reducer;

export const fetchverdict = createAsyncThunk('/Verdictget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Verdictget?keyword=&page=`);
    const verdict = res.data;
    return verdict.data;
})