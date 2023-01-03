import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedEquipmentSlice = createSlice({
    name: 'deletedequipment',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedequipment.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedequipment.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedequipment.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getDeletedEquipmentSlice.actions;
export default getDeletedEquipmentSlice.reducer;

export const fetchdeletedequipment = createAsyncThunk('/equipmentgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/equipmentgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


