import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedRaceNameSlice = createSlice({
    name: 'deletedracename',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedracename.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedracename.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedracename.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setracename , setStatus} = getDeletedRaceNameSlice.actions;
export default getDeletedRaceNameSlice.reducer;

export const fetchdeletedracename = createAsyncThunk('/racenamegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/racenamegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


