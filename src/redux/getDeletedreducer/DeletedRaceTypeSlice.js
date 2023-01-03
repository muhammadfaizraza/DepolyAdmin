import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedRaceTypeSlice = createSlice({
    name: 'deletedracetype',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedracetype.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedracetype.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedracetype.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setracename , setStatus} = getDeletedRaceTypeSlice.actions;
export default getDeletedRaceTypeSlice.reducer;

export const fetchdeletedracetype = createAsyncThunk('/racetypegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/racetypegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


