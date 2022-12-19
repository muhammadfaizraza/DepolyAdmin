import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedSponsorSlice = createSlice({
    name: 'deletedsponsor',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedsponsor.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedsponsor.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedsponsor.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedSponsorSlice.actions;
export default getDeletedSponsorSlice.reducer;

export const fetchdeletedsponsor = createAsyncThunk('/sponsorgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/sponsorgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


