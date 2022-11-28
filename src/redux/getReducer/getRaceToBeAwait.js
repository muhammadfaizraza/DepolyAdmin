import axios from "axios";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const gettobeRaceResultSlice = createSlice({
    name:'tobeRaceResult',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchtobeRaceResult.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchtobeRaceResult.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchtobeRaceResult.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {settobeRaceResult, setStatus} = gettobeRaceResultSlice.actions;
export default gettobeRaceResultSlice.reducer;
export const fetchtobeRaceResult = createAsyncThunk('gettobeRaceResult/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/GetRaceResultToBeAnnounced?keyword=&limit=&page=`);
    const data = res.data;
    return data.data;
})