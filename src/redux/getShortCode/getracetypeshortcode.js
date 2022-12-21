import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR:'error',
    LOADING: 'loading',
});

const getracetypeshortcodeSlice = createSlice({
    name: 'racetypeshortcode',
    initialState: {
        data:[],
        status : STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchracetypeshortcode.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchracetypeshortcode.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE
        }) 
        .addCase(fetchracetypeshortcode.rejected , (state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const {setracetypeshortcode , setStatus} = getracetypeshortcodeSlice.actions;
export default getracetypeshortcodeSlice.reducer;

export const fetchracetypeshortcode = createAsyncThunk('/racetypeshortcodeget/fetch', async() => {
    const res = await axios.get(`${window.env.API_URL}/getracetypeshortcode`);
    const racetypeshortcodeData = res.data;
    return racetypeshortcodeData.data;
})