import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getSingleJockey = createSlice({
    name:'singlejockey',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchSinglejockey.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSinglejockey.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSinglejockey.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setjockey, setStatus} = getSingleJockey.actions;
export default getSingleJockey.reducer;
//https://mksbackend.herokuapp.com/api/v1/Jockeyget
export const fetchSinglejockey = createAsyncThunk('getsinglejockey/fetch', async ({jockeyid}) => {
    const res = await axios.get(`${window.env.API_URL}/singleJockey/${jockeyid}`);
    const data = res.data;
    return data.data;
})