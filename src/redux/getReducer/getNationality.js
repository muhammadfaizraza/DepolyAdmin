import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getNationalitySlice = createSlice({
    name: 'nationality',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchnationality.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchnationality.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchnationality.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setnationality , setStatus} = getNationalitySlice.actions;
export default getNationalitySlice.reducer;

export const fetchnationality = createAsyncThunk('/Nationalityget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Nationalityget?keyword=&page=`);
    const nationalityData = res.data;
    return nationalityData.data;
})