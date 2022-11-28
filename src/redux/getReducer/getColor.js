import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getColorSlice = createSlice({
    name: 'color',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchcolor.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchcolor.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchcolor.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setcolor , setStatus} = getColorSlice.actions;
export default getColorSlice.reducer;

export const fetchcolor = createAsyncThunk('/Colorget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/Colorget?keyword=&page=`);
    const colorData = res.data;
    return colorData.data;
})