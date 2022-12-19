import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedRaceCourseSlice = createSlice({
    name: 'deletedracecourse',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedracecourse.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedracecourse.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedracecourse.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedRaceCourseSlice.actions;
export default getDeletedRaceCourseSlice.reducer;

export const fetchdeletedracecourse = createAsyncThunk('/racecoursegetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/racecoursegetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


