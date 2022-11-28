import axios from "axios";

const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getSingleOwner = createSlice({
    name:'singleowner',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchSingleOwner.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSingleOwner.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSingleOwner.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {setOwner, setStatus} = getSingleOwner.actions;
export default getSingleOwner.reducer;
//https://mksbackend.herokuapp.com/api/v1/ownerget
export const fetchSingleOwner= createAsyncThunk('getsingleOwner/fetch', async ({id}) => {
    const res = await axios.get(`${window.env.API_URL}/singleOwner/${id}`);
    const data = res.data;
    return data.data;
}) 