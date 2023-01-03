import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedRaceCardSlice = createSlice({
    name: 'deletedracecard',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedracecard.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedracecard.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedracecard.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgender , setStatus} = getDeletedRaceCardSlice.actions;
export default getDeletedRaceCardSlice.reducer;

export const fetchdeletedracecard = createAsyncThunk('/racecardgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/racecardgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


