import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedHorseSlice = createSlice({
    name: 'deletedhorse',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedhorse.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedhorse.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedhorse.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgender , setStatus} = getDeletedHorseSlice.actions;
export default getDeletedHorseSlice.reducer;

export const fetchdeletedhorse = createAsyncThunk('/horsegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/horsegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


