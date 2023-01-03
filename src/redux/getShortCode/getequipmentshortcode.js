import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getequipmentshortcodeSlice = createSlice({
    name: 'equipmentshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchequipmentshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchequipmentshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchequipmentshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setequipmentshortcode , setStatus} = getequipmentshortcodeSlice.actions;
export default getequipmentshortcodeSlice.reducer;

export const fetchequipmentshortcode = createAsyncThunk('/equipmentshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getequipmentshortcode`);
    const equipmentshortcodeData = res.data;
    return equipmentshortcodeData.data;
})