import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const getSliderSlice = createSlice({
    name: 'slider',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
 
    extraReducers: (builder) => {
        builder
            .addCase(fetchSlider.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchSlider.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchSlider.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setOwner, setStatus } = getSliderSlice.actions;
export default getSliderSlice.reducer;

export const fetchSlider = createAsyncThunk('Sliderget/fetch', async ({pagenumber}) => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/Sliderget?keyword=&page=${pagenumber}`)
    const data =  res.data;
    return data.data;
});

