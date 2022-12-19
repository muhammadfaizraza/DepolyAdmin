import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedSliderSlice = createSlice({
    name: 'deletedslider',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedslider.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedslider.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedslider.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedSliderSlice.actions;
export default getDeletedSliderSlice.reducer;

export const fetchdeletedslider = createAsyncThunk('/slidergetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/slidergetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


