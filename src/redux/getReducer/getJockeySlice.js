import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getjockeyslice = createSlice({
    name:'jockey',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchjockey.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchjockey.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchjockey.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setjockey, setStatus} = getjockeyslice.actions;
export default getjockeyslice.reducer;
//https://mksbackend.herokuapp.com/api/v1/Jockeyget
export const fetchjockey = createAsyncThunk('getjockey/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/Jockeyget?keyword=&page=`);
    const data = res.data;
    return data.data;
})