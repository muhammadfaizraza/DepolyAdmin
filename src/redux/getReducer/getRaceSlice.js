import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getRaceSlice = createSlice({
    name:'race',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchrace.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchrace.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchrace.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setRace, setStatus} = getRaceSlice.actions;
export default getRaceSlice.reducer;
export const fetchrace = createAsyncThunk('getrace/fetch', async () => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/getrace?keyword=&limit=&page=`);
    const data = res.data;
    return data.data;
})