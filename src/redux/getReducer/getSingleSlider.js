import axios from "axios";

const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const getSingleSlider = createSlice({
    name:'singleSlider',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchSingleSlider.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchSingleSlider.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchSingleSlider.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});


export const {setSlider, setStatus} = getSingleSlider.actions;
export default getSingleSlider.reducer;
//https://mksbackend.herokuapp.com/api/v1/Sliderget
export const fetchSingleSlider= createAsyncThunk('getsingleSlider/fetch', async ({sliderid}) => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/updateSlider/${sliderid}`);
    const data = res.data;
    return data.data;
}) 