import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getFinalPositionSlice = createSlice({
    name: 'finalposition',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchfinalposition.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchfinalposition.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchfinalposition.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setfinaleposition , setStatus} = getFinalPositionSlice.actions;
export default getFinalPositionSlice.reducer;

export const fetchfinalposition = createAsyncThunk('/FinalPositionget/fetch', async({SearchTitle,SearchCode}) => {
    const res = await axios.get(`${window.env.API_URL}/FinalPositionget?shortCode=${SearchCode}&NameEn=${SearchTitle}&limit=${'1000'}`);
    const colorData = res.data;
    return colorData.data;
})