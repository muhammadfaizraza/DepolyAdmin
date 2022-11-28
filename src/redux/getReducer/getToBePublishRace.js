import axios from "axios";
const {createSlice,createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

const gettobePublishRaceSlice = createSlice({
    name:'tobePublishRace',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
     extraReducers:(builder) => {
        builder
        .addCase(fetchtobePublishRace.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchtobePublishRace.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchtobePublishRace.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
     },
});

export const {settobePublishRace, setStatus} = gettobePublishRaceSlice.actions;
export default gettobePublishRaceSlice.reducer;
export const fetchtobePublishRace = createAsyncThunk('gettobePublishRace/fetch', async () => {
    const res = await axios.get(`${window.env.API_URL}/getracetobepublished?keyword=&limit=&page=`);
    const data = res.data;
    return data.data;
})