import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getSingletrainer = createSlice({
    name:'singletrainer',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchSingletrainer.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSingletrainer.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSingletrainer.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {settrainer, setStatus} = getSingletrainer.actions;
export default getSingletrainer.reducer;
//https://mksbackend.herokuapp.com/api/v1/trainerget
export const fetchSingletrainer = createAsyncThunk('getsingletrainer/fetch', async ({trainerid}) => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/singletrainer/${trainerid}`);
    const data = res.data;
    return data.data;
})