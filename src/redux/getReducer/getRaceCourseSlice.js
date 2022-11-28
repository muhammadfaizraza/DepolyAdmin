import axios from "axios";
import env from "react-dotenv";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getRaceCourseSlice = createSlice({
    name:'racecourse',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchracecourse.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchracecourse.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchracecourse.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setRacecourse, setStatus} = getRaceCourseSlice.actions;
export default getRaceCourseSlice.reducer;
export const fetchracecourse = createAsyncThunk('getracecourse/fetch', async () => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/getracecourse?keyword=&page=`);
    const data = res.data;
    return data.data;
})