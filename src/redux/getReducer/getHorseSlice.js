import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getHorseSlice = createSlice({
    name: 'horse',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHorse.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchHorse.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        })
        .addCase(fetchHorse.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setHorse , setStatus} = getHorseSlice.actions;
export default getHorseSlice.reducer;

export const fetchHorse = createAsyncThunk('/horseget/fetch', async({SearchTitle,SearchCode,SearchAge}) => {
    const res = await axios.get(`${window.env.API_URL}gethorse?shortCode=${SearchCode}&NameEn=${SearchTitle}&DOB=${SearchAge}`);
    const horseData = res.data;
    return horseData.data;
})