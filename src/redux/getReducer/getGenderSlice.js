import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getGenderSlice = createSlice({
    name: 'gender',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchgender.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchgender.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchgender.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgender , setStatus} = getGenderSlice.actions;
export default getGenderSlice.reducer;

export const fetchgender = createAsyncThunk('/Sexget/fetch', async() => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/Sexget?keyword=&page=`);
    const genderData = res.data;
    return genderData.data;
})