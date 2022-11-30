import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getSinglecolor = createSlice({
    name:'singlecolor',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchSinglecolor.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSinglecolor.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSinglecolor.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setcolor, setStatus} = getSinglecolor.actions;
export default getSinglecolor.reducer;
//https://mksbackend.herokuapp.com/api/v1/colorget
export const fetchSinglecolor = createAsyncThunk('getsinglecolor/fetch', async ({colorid}) => {
    const res = await axios.get(`${window.env.API_URL}/singlecolor/${colorid}`);
    const data = res.data;
    return data.data;
})