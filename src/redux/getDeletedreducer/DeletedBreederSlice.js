import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedBreederSlice = createSlice({
    name: 'deletedbreeder',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedbreeder.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedbreeder.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedbreeder.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setbreeder , setStatus} = getDeletedBreederSlice.actions;
export default getDeletedBreederSlice.reducer;

export const fetchdeletedbreeder = createAsyncThunk('/breedersgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/breedersgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


