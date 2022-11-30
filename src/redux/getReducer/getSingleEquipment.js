import axios from "axios";

const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getsingleracecourse = createSlice({
    name:'singleracecourse',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchsingleracecourse.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchsingleracecourse.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchsingleracecourse.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setOwner, setStatus} = getsingleracecourse.actions;
export default getsingleracecourse.reducer;
//https://mksbackend.herokuapp.com/api/v1/singleracecourse
export const fetchsingleracecourse= createAsyncThunk('singleracecourse/fetch', async ({courseid}) => {
    const res = await axios.get(`${window.env.API_URL}/singleracecourse/${courseid}`);
    const data = res.data;
    return data.data;
}) 