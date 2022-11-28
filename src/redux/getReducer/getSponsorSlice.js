import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getSponsorSlice = createSlice({
    name:'sponsor',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchSponsor.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSponsor.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSponsor.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setSponsor, setStatus} = getSponsorSlice.actions;
export default getSponsorSlice.reducer;
// 'https://mksbackend.herokuapp.com/api/v1/Sponsorget'
export const fetchSponsor = createAsyncThunk('sponsor/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/Sponsorget?keyword=&page=1`);
    const data = res.data;
    return data.data;
})