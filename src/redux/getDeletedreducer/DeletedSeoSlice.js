import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedSeoSlice = createSlice({
    name: 'deletedseo',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedseo.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedseo.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedseo.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedSeoSlice.actions;
export default getDeletedSeoSlice.reducer;

export const fetchdeletedseo = createAsyncThunk('/seokeywordgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/seokeywordgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


