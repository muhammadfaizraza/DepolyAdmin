import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedOwnerSlice = createSlice({
    name: 'deletedowner',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedowner.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedowner.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedowner.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedOwnerSlice.actions;
export default getDeletedOwnerSlice.reducer;

export const fetchdeletedowner = createAsyncThunk('/ownergetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/ownergetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


