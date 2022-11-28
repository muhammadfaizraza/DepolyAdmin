import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getHorseKindSlice = createSlice({
    name: 'HorseKind',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHorseKind.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchHorseKind.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchHorseKind.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setHorseKind , setStatus} = getHorseKindSlice.actions;
export default getHorseKindSlice.reducer;

export const fetchHorseKind = createAsyncThunk('/HorseKind/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/HorseKindget?keyword=&page=`);
    const HorseKindData = res.data;
    return HorseKindData.data;
})