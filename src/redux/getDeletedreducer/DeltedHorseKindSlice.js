import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getDeletedHoreKindSlice = createSlice({
    name: 'deletedhorsekind',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchdeletedthorsekind.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchdeletedthorsekind.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchdeletedthorsekind.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {settrainer , setStatus} = getDeletedHoreKindSlice.actions;
export default getDeletedHoreKindSlice.reducer;

export const fetchdeletedthorsekind = createAsyncThunk('/horsekindgetdeleted/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/horsekindgetdeleted?keyword=&page=`);
    const breederData = res.data;
    return breederData.data;
})


