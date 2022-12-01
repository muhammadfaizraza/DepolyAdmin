import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getcompetitionSlice = createSlice({
    name: 'competition',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcompetition.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcompetition.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcompetition.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcompetition , setStatus} = getcompetitionSlice.actions;
export default getcompetitionSlice.reducer;

export const fetchcompetition = createAsyncThunk('/competitionget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Competitonget?keyword=&page=`);
    const competitionData = res.data;
    return competitionData.data;
})