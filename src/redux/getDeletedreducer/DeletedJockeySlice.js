import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedJockeySlice = createSlice({
    name: 'deletedjockey',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedjockey.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedjockey.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedjockey.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setgender , setStatus} = getDeletedJockeySlice.actions;
export default getDeletedJockeySlice.reducer;

export const fetchdeletedjockey = createAsyncThunk('/jockeygetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/jockeygetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


