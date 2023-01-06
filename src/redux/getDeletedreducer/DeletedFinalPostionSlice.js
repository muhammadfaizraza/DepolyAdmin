import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedFinalPositionSlice = createSlice({
    name: 'deletedfinalposition',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedfinalposition.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedfinalposition.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedfinalposition.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setposition , setStatus} = getDeletedFinalPositionSlice.actions;
export default getDeletedFinalPositionSlice.reducer;

export const fetchdeletedfinalposition = createAsyncThunk('/FinalPositiongetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/FinalPositiongetdeleted?keyword=&page=`);
    const deletedfinalposition = res.data;
    return deletedfinalposition.data;
})


