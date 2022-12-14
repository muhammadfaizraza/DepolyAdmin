import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getAdminListSlice = createSlice({
    name: 'AdminList',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchAdminList.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchAdminList.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchAdminList.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setAdminList , setStatus} = getAdminListSlice.actions;
export default getAdminListSlice.reducer;

export const fetchAdminList = createAsyncThunk('/AdminListget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getAdmin`);
    const AdminListData = res.data;
    return AdminListData.data;
})