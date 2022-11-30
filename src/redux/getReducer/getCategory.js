import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getcategorySlice = createSlice({
    name: 'category',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcategory.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcategory.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcategory , setStatus} = getcategorySlice.actions;
export default getcategorySlice.reducer;

export const fetchcategory = createAsyncThunk('/categoryget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/CompetitionCategoryget?keyword=&page=`);
    const categoryData = res.data;
    return categoryData.data;
})