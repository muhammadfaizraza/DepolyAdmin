import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getBreederSlice = createSlice({
    name: 'equipment',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchequipment.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchequipment.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchequipment.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipment , setStatus} = getBreederSlice.actions;
export default getBreederSlice.reducer;

export const fetchequipment = createAsyncThunk('/Equipmentget/fetch', async() => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/Equipmentget?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})