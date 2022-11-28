import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getResultSlice = createSlice({
    name:'Result',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchResult.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchResult.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchResult.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setResult, setStatus} = getResultSlice.actions;
export default getResultSlice.reducer;
export const fetchResult = createAsyncThunk('getResult/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/GetRaceResultToBeAnnounced?keyword=&limit=&page=`);
    const data = res.data;
    return data.data;
})