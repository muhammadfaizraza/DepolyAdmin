import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedRaceKindSlice = createSlice({
    name: 'deletedracekind',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedracekind.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedracekind.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedracekind.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setrace , setStatus} = getDeletedRaceKindSlice.actions;
export default getDeletedRaceKindSlice.reducer;

export const fetchdeletedracekind = createAsyncThunk('/racekindgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/racekindgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


