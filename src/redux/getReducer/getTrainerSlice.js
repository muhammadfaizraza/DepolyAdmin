import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getTrainerSlice = createSlice({
    name: 'trainer',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTrainer.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchTrainer.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        })
        .addCase(fetchTrainer.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setTrainer , setStatus} = getTrainerSlice.actions;
export default getTrainerSlice.reducer;

export const fetchTrainer = createAsyncThunk('/trainerget/fetch', async({SearchNameEn,SearchRemarks,SearchRating}) => {
    const res = await axios.get(`${window.env.API_URL}/SearchTrainer?NameEn=${SearchNameEn}&RemarksEn=${SearchRemarks}&TitleEn=${SearchRating}`);
    const trainerData = res.data;
    return trainerData.data;
})