import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const getNewsSlice = createSlice({
    name: 'news',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
 
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setNews, setStatus } = getNewsSlice.actions;
export default getNewsSlice.reducer;

export const fetchNews = createAsyncThunk('newsGet/fetch', async ({pagenumber}) => {
    const res = await axios.get(`http://3.90.189.40:4000/api/v1/newsget?keyword=&page=${pagenumber}`)
    const data =  res.data;
    return data.data;
});


