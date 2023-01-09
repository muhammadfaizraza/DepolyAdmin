import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const gettrackconditionshortcodeSlice = createSlice({
    name: 'trackconditionshortcode',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchtrackconditionshortcode.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchtrackconditionshortcode.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE
            })
            .addCase(fetchtrackconditionshortcode.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
});

export const { settrackconditionshortcode, setStatus } = gettrackconditionshortcodeSlice.actions;
export default gettrackconditionshortcodeSlice.reducer;

export const fetchtrackconditionshortcode = createAsyncThunk('/getTrackConditionshortcode/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/getTrackConditionshortcode`);
    const trackconditionshortcodeData = res.data;
    return trackconditionshortcodeData.data;
})