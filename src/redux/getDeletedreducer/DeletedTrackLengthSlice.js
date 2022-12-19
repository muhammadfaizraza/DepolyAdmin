import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedTrackLengthSlice = createSlice({
    name: 'deletedtracklength',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedtracklength.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedtracklength.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedtracklength.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedTrackLengthSlice.actions;
export default getDeletedTrackLengthSlice.reducer;

export const fetchdeletedtracklength = createAsyncThunk('/tracklengthgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/tracklengthgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


