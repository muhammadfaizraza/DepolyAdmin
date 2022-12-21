import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedCategorySlice = createSlice({
    name: 'deletedcategory',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedcategory.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedcategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedcategory.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setbreeder , setStatus} = getDeletedCategorySlice.actions;
export default getDeletedCategorySlice.reducer;

export const fetchdeletedcategory = createAsyncThunk('/competitioncategorygetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/competitioncategorygetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


