import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getGroundSlice = createSlice({
    name: 'groundtype',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchgroundtype.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchgroundtype.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchgroundtype.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgroundtype , setStatus} = getGroundSlice.actions;
export default getGroundSlice.reducer;

export const fetchgroundtype = createAsyncThunk('/GroundTypeget/fetch', async({SearchTitle,SearchCode,SearchAge}) => {
    const res = await axios.get(`${window.env.API_URL}/GroundTypeget?shortCode=${SearchCode}&NameEn=${SearchTitle}&AbbrevEn=${SearchAge}`);
    const groundtype = res.data;
    return groundtype.data;
})