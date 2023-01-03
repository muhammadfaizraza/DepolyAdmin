import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedCompetitionSlice = createSlice({
    name: 'deletedCompetition',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedcompetition.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedcompetition.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedcompetition.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcompetition , setStatus} = getDeletedCompetitionSlice.actions;
export default getDeletedCompetitionSlice.reducer;

export const fetchdeletedcompetition = createAsyncThunk('/competitiongetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/competitiongetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


