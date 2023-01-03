import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedTrainerSlice = createSlice({
    name: 'deletedtrainer',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedtrainer.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedtrainer.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedtrainer.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {settrainer , setStatus} = getDeletedTrainerSlice.actions;
export default getDeletedTrainerSlice.reducer;

export const fetchdeletedtrainer = createAsyncThunk('/trainergetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/trainergetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


